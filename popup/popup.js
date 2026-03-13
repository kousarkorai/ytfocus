document.addEventListener('DOMContentLoaded', () => {
  const focusToggle = document.getElementById('focusToggle');
  const timeDisplay = document.getElementById('timeDisplay');
  const resetTimeBtn = document.getElementById('resetTimeBtn');
  const limitInput = document.getElementById('limitInput');
  const saveLimitBtn = document.getElementById('saveLimitBtn');
  const limitStatus = document.getElementById('limitStatus');

  // Load initial state
  chrome.storage.local.get(['focusMode', 'watchTime', 'watchLimit', 'lastDate'], (data) => {
    // Focus Mode Toggle
    focusToggle.checked = data.focusMode !== false; // Default to true if not set

    // Watch Time
    updateTimeDisplay(data.watchTime || 0);

    // Watch Limit
    if (data.watchLimit) {
      limitInput.value = data.watchLimit;
      limitStatus.textContent = `Current limit: ${data.watchLimit} minutes`;
    }
  });

  // Listen for time updates from background
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.watchTime) {
      updateTimeDisplay(changes.watchTime.newValue);
    }
  });

  // Focus Mode Toggle Handler
  focusToggle.addEventListener('change', (e) => {
    const isEnabled = e.target.checked;
    chrome.storage.local.set({ focusMode: isEnabled });
  });

  // Reset Time Handler
  resetTimeBtn.addEventListener('click', () => {
    chrome.storage.local.set({ watchTime: 0 }, () => {
      updateTimeDisplay(0);
    });
  });

  // Save Limit Handler
  saveLimitBtn.addEventListener('click', () => {
    const limitMinutes = parseInt(limitInput.value, 10);
    if (!isNaN(limitMinutes) && limitMinutes > 0) {
      chrome.storage.local.set({ watchLimit: limitMinutes }, () => {
        limitStatus.textContent = `Current limit: ${limitMinutes} minutes`;
      });
    } else if (limitInput.value === '') {
      chrome.storage.local.remove('watchLimit', () => {
        limitStatus.textContent = 'No limit set';
      });
    }
  });

  function updateTimeDisplay(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    timeDisplay.textContent = 
      `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
});
