
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    if (message.requestUrl) {
      let currentUrl = getCurrentUrl();
      chrome.runtime.sendMessage({url: currentUrl})

      console.log("URL visitado:", url)
    }
  });

  function getCurrentUrl() {
    return window.location.href;
  }

  setInterval(function() {
    let currentUrl = getCurrentUrl();
    chrome.storage.local.get('visitedSites', function(data) {
      let visitedSites = data.visitedSites || [];
      visitedSites.push(currentUrl);
      chrome.storage.local.set({ 'visitedSites': visitedSites });
    });
  }, 6000);

  function getCurrentUrl() {
    return window.location.href;
  }