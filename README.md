# Chrome-Extension
Screen Reader with On-Off Button. Live on the Chrome Webstore! https://chromewebstore.google.com/detail/screen-reader-with-on-off/opfcfblanbkggiclagpppaegfcipejlc 
# Screen Reader with On-Off Button

**Version:** 1.0  
**Description:**  
This Chrome extension provides a lightweight screen reader that users can toggle on and off via a popup interface or keyboard shortcuts. It enhances webpage accessibility by reading out visible elements and offering keyboard navigation features.

---

## Features

- Toggle screen reader on/off from the popup or with `Ctrl + Z + B`.
- Enable/disable keyboard navigation shortcuts.
- Navigate through visible elements on the page using `Tab`.
- Press `Shift` to stop speech.
- Press `Alt` to hear the website's meta description.

---

## How It Works

- **Popup Interface (`popup.html`, `popup.js`)**:  
  Allows users to enable/disable the screen reader and keyboard shortcuts via checkboxes.

- **Content Script (`content_script.js`)**:  
  Injected into every webpage, it highlights and reads aloud elements as the user navigates. It also listens for key events to control functionality.

- **Background Service Worker (`background.js`)**:  
  Handles messaging between the popup and content scripts, ensuring state is synchronized.

- **Manifest (`manifest.json`)**:  
  Defines the extension's configuration, including permissions, scripts, and icons.

---

## Permissions

- `activeTab`, `tabs`, `storage` – Used to access the current page and store toggle states.

---

## Installation

1. [Install it directly from the Chrome Web Store](https://chromewebstore.google.com/detail/screen-reader-with-on-off/opfcfblanbkggiclagpppaegfcipejlc)

OR
1. Download the extension files in this repo.
2. Go to `chrome://extensions/` in your browser.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the extension folder.
5. Use the popup or keyboard shortcuts to interact with the screen reader.

---

## Keyboard Shortcuts

| Shortcut         | Action                          |
|------------------|----------------------------------|
| `Ctrl + Z + B`   | Toggle screen reader             |
| `Tab`            | Focus and read next element      |
| `Shift`          | Stop speaking                    |
| `Alt`            | Read website's meta description  |

---
