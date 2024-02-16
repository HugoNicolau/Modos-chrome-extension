let rule1 = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostSuffix: 'youtube.com', schemes: ['https'] },
        css: ["input[type='password']"]
      })
    ],
    actions: [ new chrome.declarativeContent.ShowAction() ]
  };
  