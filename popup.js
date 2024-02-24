// console.log("Testando popup console.log")

document.addEventListener('DOMContentLoaded', function() {

    var messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = 'Bem vindo ao meu rastreador de sites!';
    }

    chrome.storage.local.get('visitedSites', function(data) {
        var visitedSites = data.visitedSites || [];

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
});