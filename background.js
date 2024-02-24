// let rule1 = {
//     conditions: [
//       new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: { hostSuffix: 'youtube.com', schemes: ['https'] },
//         css: ["input[type='password']"]
//       })
//     ],
//     actions: [ new chrome.declarativeContent.ShowAction() ]
//   };
  
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    if (message.url) {
      let url = message.url;

      console.log("URL visitado:", url)
    }
  })