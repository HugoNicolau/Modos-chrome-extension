// Listen for messages from the background script or popup script
chrome.storage.local.get('extensionPaused', function(data) {
    const extensionPaused = data.extensionPaused;
    if(!extensionPaused) {
        let currentUrl = window.location.href;
            function getDomain(url) {
                const parsedUrl = new URL(url);
                return parsedUrl.hostname;
            }

            console.log("currentUrl:", currentUrl);
            chrome.runtime.sendMessage({ url: currentUrl }, function(response) {
                console.log("URL enviada pro background.js");
            });

            chrome.storage.local.get("links", function(data) {
                const savedLinks = data.links || [];
                savedLinks.forEach(function(link) {
                    if (getDomain(link) == getDomain(currentUrl)) {
                        const init = function() {
                            var blackScreen = document.createElement("div");
                            blackScreen.id = "blackScreen";
                            blackScreen.style.position = "fixed";
                            blackScreen.style.top = "0";
                            blackScreen.style.left = "0";
                            blackScreen.style.width = "100%";
                            blackScreen.style.height = "100%";
                            blackScreen.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                            blackScreen.style.zIndex = "9999";

                            var message = document.createElement("div");
                            message.id = "blackScreenMessage";
                            message.style.position = "absolute";
                            message.style.top = "50%";
                            message.style.left = "50%";
                            message.style.transform = "translate( -50%, -50%)";
                            message.style.color = "white";
                            message.style.fontSize = "48px";
                            message.textContent = "ESTE SITE NÃO PODE SER ACESSADO";

                            blackScreen.appendChild(message);
                            document.body.appendChild(blackScreen);
                        };
                        init();
                    }
                });
            });
    } else {
        console.log('Content script is paused')
    }
})