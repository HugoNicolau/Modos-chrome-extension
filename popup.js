// Function to update the UI based on the stored state
function updatePopupUI(state) {
  const toggleButton = document.getElementById("toggleButton");
  toggleButton.textContent = state ? "Play Extension" : "Pause Extension";
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");

  // Load the initial state from chrome.storage.local and update de UI
  chrome.storage.local.get("extensionPaused", function (data) {
    const extensionPaused = data.extensionPaused;
    updatePopupUI(extensionPaused);
  });

  // Listen for button click to toggle the extension state
  toggleButton.addEventListener("click", function () {
    chrome.storage.local.get("extensionPaused", function (data) {
      const extensionPaused = data.extensionPaused;
      const newExtensionPaused = !extensionPaused;

      chrome.storage.local.set(
        { extensionPaused: newExtensionPaused },
        function () {
          console.log(
            "Extension state changed:",
            newExtensionPaused ? "paused" : "playing"
          );
          // Update the UI
          updatePopupUI(newExtensionPaused);
        }
      );
    });
  });
});
