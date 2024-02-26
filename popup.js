// console.log("Testando popup console.log")

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let currentTab = tabs[0];
    chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        func: () => {
            var messageElement = document.getElementById('messages');
            if (messageElement) {
                messageElement.textContent = 'Bem vindo ao meu rastreador de sites!';
            }
        
            chrome.storage.local.get('visitedSites', function(data) {
                var visitedSites = data.visitedSites || [];
        
                console.log('Visited sites:', visitedSites);
                
                if (Array.isArray(visitedSites)) {
                    
        
                    var visitedSitesList = document.getElementById('visited-sites-list');
                    visitedSitesList.innerHTML = '';
                    visitedSites.forEach(function(site) {
                        var listItem = document.createElement('li');
                        listItem.textContent = site;
                        visitedSitesList.appendChild(listItem);
                    });
                } else {
                    console.error('Visited sites data is not an array:', visitedSites);
                }
            });
        }
    });

    chrome.runtime.sendMessage({ requestUrl: true});

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.log("Message received in popup.js", message)
        if (message.url) {
            let url = message.url;
            document.getElementById('url').textContent = 'Current URL: ' + url;
        }
    });
});
