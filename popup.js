document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', function() {
        // Get the current flag value
        chrome.storage.local.get('contentEnabled', function(data) {
            const contentEnabled = data.contentEnabled;
            // Toggle the flag
            const newContentEnabled = !contentEnabled;
            chrome.storage.local.set({ 'contentEnabled': newContentEnabled }, function() {
                console.log('Content script enabled:', newContentEnabled);
                toggleButton.textContent = newContentEnabled ? 'Disable Content' : 'Enable Content';


                chrome.tabs.query({ active: true, currentWindow: true}, function(tabs) {
                    const currentTab = tabs[0];
                    chrome.tabs.sendMessage(currentTab.id, { action: 'toggleScript', contentEnabled: newContentEnabled});
                });
            });
        });
    });
});
