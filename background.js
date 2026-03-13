// background.js

function checkDateReset(data, today) {
  if (data.lastDate !== today) {
    chrome.storage.local.set({ watchTime: 0, lastDate: today });
    return 0;
  }
  return data.watchTime || 0;
}

// Receive heartbeat from active YouTube tabs
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "youtube_heartbeat") {
    const today = new Date().toDateString();
    
    chrome.storage.local.get(['watchTime', 'lastDate', 'watchLimit'], (data) => {
      let currentTime = checkDateReset(data, today);
      
      // Increment time by 1 second
      currentTime += 1;
      chrome.storage.local.set({ watchTime: currentTime });
      
      // Check if limit is reached
      let limitReached = false;
      if (data.watchLimit && currentTime >= data.watchLimit * 60) {
        limitReached = true;
      }
      
      sendResponse({ limitReached: limitReached, currentTime: currentTime });
    });
    
    return true; // indicates we will send response asynchronously
  }
});
