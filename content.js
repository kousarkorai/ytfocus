// content.js

let focusMode = true;
let limitOverlayAdded = false;
let heartbeatInterval = null;

// Initialize
chrome.storage.local.get(['focusMode'], (data) => {
  focusMode = data.focusMode !== false; // Default true
  updateFocusModeUI();
});

// Listen for storage changes (e.g., from popup)
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.focusMode) {
    focusMode = changes.focusMode.newValue;
    updateFocusModeUI();
  }
});

// Toggle a class on the html to enable/disable CSS hiding rules
function updateFocusModeUI() {
  if (focusMode) {
    document.documentElement.classList.add('focus-mode-active');
  } else {
    document.documentElement.classList.remove('focus-mode-active');
  }
}

// Function to show the block overlay when time limit is reached
function showLimitOverlay() {
  if (limitOverlayAdded) return;
  if (!document.body) {
    setTimeout(showLimitOverlay, 100);
    return;
  }
  
  // Pause any playing videos
  const videos = document.querySelectorAll('video');
  videos.forEach(video => video.pause());
  
  const overlay = document.createElement('div');
  overlay.id = 'yt-focus-limit-overlay';
  
  const iconUrl = chrome.runtime.getURL('icons/icon128.png');
  
  overlay.innerHTML = `
    <img src="${iconUrl}" class="icon" alt="Focus Icon">
    <h1>Time's Up!</h1>
    <p>You have reached your daily YouTube watch limit.</p>
    <p>Time to get back to work! Productivity awaits.</p>
  `;
  
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  limitOverlayAdded = true;
}

function removeLimitOverlay() {
  const overlay = document.getElementById('yt-focus-limit-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = '';
    limitOverlayAdded = false;
  }
}

// Heartbeat for time tracking
function startHeartbeat() {
  if (heartbeatInterval) return;
  
  heartbeatInterval = setInterval(() => {
    // Only count time if the page is visible 
    // We removed document.hasFocus() because interacting with the popup causes tab to lose focus
    if (document.visibilityState === 'visible') {
      chrome.runtime.sendMessage({ action: "youtube_heartbeat" }, (response) => {
        if (chrome.runtime.lastError) {
          // Extension might be reloaded, ignore error
          return;
        }
        
        if (response && response.limitReached) {
          showLimitOverlay();
        } else if (response && !response.limitReached && limitOverlayAdded) {
          // In case the limit was increased or reset
          removeLimitOverlay();
        }
      });
    }
  }, 1000); // 1 second heartbeat
}

// Start heartbeat when the script loads
startHeartbeat();
