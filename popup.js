document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', function() {
        // Get the current flag value
        chrome.storage.local.get('extensionPaused', function(data) {
            const extensionPaused = data.extensionPaused;
            const newExtensionPaused = !extensionPaused;
            chrome.storage.local.set({ 'extensionPaused': newExtensionPaused }, function() {
                console.log('Extension state changed:', newExtensionPaused ? 'paused' : 'playing');
                toggleButton.textContent = newExtensionPaused ? 'Play Extension' : 'Pause Extension';

                chrome.runtime.sendMessage({ action: 'toggleExtensionState', extensionPaused: newExtensionPaused });
            });
        });
    });
});
