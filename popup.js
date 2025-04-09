document.addEventListener("DOMContentLoaded", function () {
  var toggleSwitch = document.getElementById("toggleSwitch");
  var shortcutSwitch = document.getElementById("shortcutSwitch");

  chrome.storage.sync.get(["isEnabled", "isShortcutEnabled"], function (data) {
    toggleSwitch.checked = data.isEnabled === undefined ? true : data.isEnabled;
    shortcutSwitch.checked =
      data.isShortcutEnabled === undefined ? true : data.isShortcutEnabled;
  });

  toggleSwitch.addEventListener("change", function () {
    chrome.storage.sync.set({ isEnabled: toggleSwitch.checked });
    chrome.runtime.sendMessage({ isEnabled: toggleSwitch.checked });
  });

  shortcutSwitch.addEventListener("change", function () {
    chrome.storage.sync.set({ isShortcutEnabled: shortcutSwitch.checked });
    chrome.runtime.sendMessage({ isShortcutEnabled: shortcutSwitch.checked });
  });
});

document.addEventListener("keydown", function (event) {
  var shortcutSwitch = document.getElementById("shortcutSwitch");
  if (
    shortcutSwitch.checked &&
    event.ctrlKey &&
    event.key === "z" &&
    event.key === "b"
  ) {
    event.preventDefault();
    toggleScreenReader();
  }
});

function toggleScreenReader() {
  var toggleSwitch = document.getElementById("toggleSwitch");
  toggleSwitch.checked = !toggleSwitch.checked;
  chrome.storage.sync.set({ isEnabled: toggleSwitch.checked });
  chrome.runtime.sendMessage({ isEnabled: toggleSwitch.checked });
}

