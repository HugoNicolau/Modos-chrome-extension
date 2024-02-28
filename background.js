// Initialize the extension state
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({ 'extensionPaused': false });
});
// Listen for messages from the popup script to toggle the extension state
chrome.runtimeonMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'toggleExtensionState') {
    const extensionPaused = message.extensionPaused;
    chrome.storage.local.set({ 'extensionPaused': extensionPaused }, function() {
      console.log('Extension state changed:', extensionPaused ? 'paused' : 'playing');
    });
  }
});