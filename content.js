let currentUrl = window.location.href;

chrome.runtime.sendMessage({url: currentUrl}, function(response) {
    console.log("URL enviada pro background.js")
})