// Function to update the UI based on the stored state
function updatePopupUI(state) {
  const toggleButton = document.getElementById("toggleButton");
  toggleButton.textContent = state ? "Play Extension" : "Pause Extension";
}

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById('optionsButton').addEventListener('click', function() {
    chrome.tabs.create({ url: 'options.html' });
  });

  const groupContainer = document.getElementById('groupContainer');

  chrome.storage.local.get('groups', function(data) {
    const groups = data.groups || [];

    // Create buttons for each group
    groups.forEach(function(group) {
      const button = document.createElement('button');
      button.classList.add('groupButton');
      button.textContent = group;
      chrome.storage.local.get('selectedGroup', function(data) {
        groupName = data.selectedGroup;
        if (button.textContent === groupName) {
          button.classList.add('selected');
        }
      });

      button.addEventListener('click', function() {
        // Remove 'selectec' class from all buttons
        document.querySelectorAll('.groupButton').forEach(btn => {
          btn.classList.remove('selected');
        });

        // Add selected class to the clicked button
        this.classList.add('selected');
        console.log('Group selected: ', group);
        chrome.storage.local.set({ selectedGroup: group }, function () {
          console.log("Selected group changed: ", group);
        });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.reload(tabs[0].id);
        });
      });
      groupContainer.appendChild(button);
    });
  });

  const toggleButton = document.getElementById("toggleButton");
  if (toggleButton.textContent === "Pause Extension") {
    toggleButton.classList.remove('playing');
    toggleButton.classList.add('paused');
  } else if (toggleButton.textContent === "Play Extension") {
    toggleButton.classList.remove('paused');
    toggleButton.classList.add('playing');
  }

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
    // Reload the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
    if (toggleButton.textContent === "Pause Extension") {
      toggleButton.classList.remove('playing');
      toggleButton.classList.add('paused');
    } else if (toggleButton.textContent === "Play Extension") {
      toggleButton.classList.remove('paused');
      toggleButton.classList.add('playing');
    }
  });
});
