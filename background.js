chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Check if the message includes the 'isEnabled' or 'isShortcutEnabled' property
  if (request.isEnabled !== undefined || request.isShortcutEnabled !== undefined) {
    // Query the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // Check if at least one tab is found
      if (tabs.length > 0) {
        // Get the first tab
        var targetTab = tabs[0];
        var tabId = targetTab.id;

        // Check if the content script is already injected
        var contentScriptAlreadyInjected = targetTab.url.startsWith("http");

        if (contentScriptAlreadyInjected) {
          // If the content script is already injected, send the message directly to it
          chrome.tabs.sendMessage(tabId, {
            isEnabled: request.isEnabled,
            isShortcutEnabled: request.isShortcutEnabled
          });
        } else {
          // If the content script is not yet injected, wait for the page to load
          chrome.tabs.onUpdated.addListener(function onTabUpdated(tabId, changeInfo) {
            // Check if the page has finished loading
            if (changeInfo.status === "complete") {
              // Send the message to the content script
              chrome.tabs.sendMessage(tabId, {
                isEnabled: request.isEnabled,
                isShortcutEnabled: request.isShortcutEnabled
              });

              // Remove the event listener after the content script is loaded
              chrome.tabs.onUpdated.removeListener(onTabUpdated);
            }
          });
        }
      }
    });
  }
});
