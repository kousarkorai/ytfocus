# YouTube Focus Mode – Productivity Booster

![License](https://img.shields.io/badge/license-MIT-yellow.svg)

A professional Chrome Extension (Manifest V3) that helps users stay focused while watching YouTube. It hides time-wasting distractions and tracks your daily watch time.

**Key Features:**

- 🛡️ **Hide Distractions:** Instantly hides recommended videos, shorts, sidebar suggestions, comments, end screens, and trending sections.
- ⏱️ **Watch Time Tracker:** See exactly how much time you've spent on YouTube today right in the extension popup.
- 🛑 **Daily Watch Limit:** Set a daily allowance for YouTube (e.g., 30 mins) and get a full-screen block when your time is up.
- 🎛️ **Quick Toggle Focus Mode:** Easily switch Focus Mode on or off with a single click if you want to browse normally.
- ⚡ **Lightweight & Privacy First:** No data leaves your browser. Watch time and settings are stored locally on your device.

---

## 🛠️ Installation Instructions (Developer Mode)

To install this extension in Google Chrome locally:

1. Download or clone this repository to your computer.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable the **Developer mode** toggle in the top right corner.
4. Click the **Load unpacked** button in the top left corner.
5. Select the folder containing the extension files (`Youtube Focus Mode - Productivity Booster`).
6. The extension is now installed! You can pin it to your toolbar by clicking the puzzle icon.

---

## 📁 Folder Structure

```
Youtube Focus Mode - Productivity Booster/
│
├── manifest.json       # Chrome Manifest V3 configuration
├── background.js       # Background service worker for time tracking
├── content.js          # Injected script to handle DOM elements & limits
├── content.css         # Styles to hide distractions & show the block overlay
├── README.md           # Documentation and Web Store assets
│
├── icons/              # Extension icons used in browser and store
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
└── popup/              # Extension popup interface
    ├── popup.html      # Popup UI structure
    ├── popup.css       # Clean, modern, minimalist popup styles
    └── popup.js        # UI logic, state management, and real-time updates
```

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details. Replace "Your Name" in the `LICENSE` file with the correct copyright holder and adjust the year if needed.
