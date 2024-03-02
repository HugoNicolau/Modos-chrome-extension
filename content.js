// Listen for messages from the background script or popup script
chrome.storage.local.get("extensionPaused", function (data) {
  const extensionPaused = data.extensionPaused;
  if (!extensionPaused && typeof window !== "undefined" && window.location) {
    let currentUrl = window.location.href;
    try {
      function getDomain(url) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          url = "http://" + url;
        }
        const parsedUrl = new URL(url);
        return parsedUrl.hostname;
      }
    } catch (error) {
      console.error("Error parsing URL:", error);
    }

    // Get current selected group
    chrome.storage.local.get("selectedGroup", function (data) {
      const selectedGroup = data.selectedGroup;

      chrome.storage.local.get(["links", "groups"], function (data) {
        const savedLinks = data.links || [];
        savedLinks.forEach(function (item) {
          if (
            getDomain(item.link) == getDomain(currentUrl) &&
            selectedGroup === item.group
          ) {
            const init = function () {
              var blackScreen = document.createElement("div");
              blackScreen.id = "blackScreen";
              blackScreen.style.position = "fixed";
              blackScreen.style.top = "0";
              blackScreen.style.left = "0";
              blackScreen.style.width = "100%";
              blackScreen.style.height = "100%";
              blackScreen.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
              blackScreen.style.zIndex = "9999";
              blackScreen.style.display = "flex";
              blackScreen.style.flexDirection = "column";
              blackScreen.style.justifyContent = "center";
              blackScreen.style.alignItems = "center";

              var message = document.createElement("div");
              message.id = "blackScreenMessage";
              message.style.color = "white";
              message.style.fontSize = "48px";
              message.textContent = "Site não permitido no grupo";
              message.style.textAlign = "center";
              message.style.marginBottom = "20px";

              const button = document.createElement("button");
              button.textContent = "Pause";
              button.style.padding = "10px 20px"; // Add padding for better appearance
              button.style.fontSize = "18px"; // Increase font size
              button.style.border = "none"; // Remove border
              button.style.borderRadius = "5px"; // Add border radius
              button.style.backgroundColor = "red"; // Change background color
              button.style.color = "white"; // Change text color
              button.style.cursor = "pointer"; // Add pointer cursor

              // Listener to hover button
              button.addEventListener("mouseenter", function () {
                button.style.backgroundColor = "darkred";
              });

              // Reset background color on mouse leave
              button.addEventListener("mouseleave", function () {
                button.style.backgroundColor = "red";
              });

              // Add event listener to handle button click
              button.addEventListener("click", function () {
                // Send message to background script to toggle the extension state
                chrome.runtime.sendMessage({ action: "pauseExtension" });
              });

              blackScreen.appendChild(message);
              blackScreen.appendChild(button);
              document.body.appendChild(blackScreen);
            };
            init();
          }
        });
      });
    });
    // here
  } else {
    console.log("Content script is paused");
  }
});
