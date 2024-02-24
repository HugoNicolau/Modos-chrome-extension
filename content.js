document.addEventListener('DOMContentLoaded', function() {
    
    let currentUrl = window.location.href;
    
    chrome.runtime.sendMessage({url: currentUrl}, function(response) {
        console.log("URL enviada pro background.js")
    });
    
    // Add black screen
    var blackScreen = document.createElement('div');
    blackScreen.style.position = 'fixed';
    blackScreen.style.top = '0';
    blackScreen.style.left = '0';
    blackScreen.style.width = '100%';
    blackScreen.style.height = '100%';
    blackScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    blackScreen.style.zIndex = '9999';
    document.body.appendChild(blackScreen);

    window.addEventListener('load', function() {
        console.log('Page Loaded');
    });
});