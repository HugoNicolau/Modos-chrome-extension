    
let currentUrl = window.location.href;
    
console.log('currentUrl:', currentUrl);
chrome.runtime.sendMessage({url: currentUrl}, function(response) {
    console.log("URL enviada pro background.js")

});

const init = function(){

    var blackScreen = document.createElement('div');
    blackScreen.style.position = 'fixed';
    blackScreen.style.top = '0';
    blackScreen.style.left = '0';
    blackScreen.style.width = '100%';
    blackScreen.style.height = '100%';
    blackScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    blackScreen.style.zIndex = '9999';
    
    var message = document.createElement('div');
    message.style.position = 'absolute';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate( -50%, -50%)';
    message.style.color = 'white';
    message.style.fontSize = '48px';
    message.textContent = 'ESTE SITE NÃO PODE SER ACESSADO';
    

    blackScreen.appendChild(message);
    document.body.appendChild(blackScreen);
    
}
  init();
  