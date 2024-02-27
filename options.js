document.addEventListener('DOMContentLoaded', function() {
    const websiteLinkInput = document.getElementById('websiteLink');
    const saveLinkButton = document.getElementById('saveLinkButton');
    const statusMessage = document.getElementById('statusMessage');
    const savedLinksList = document.getElementById('savedLinks');

    // Load saved links from Chrome storage
    chrome.storage.local.get('links', function(data) {
        const savedLinks = data.links || [];
        renderLinks(savedLinks);
    });

    // Save link when button is clicked
    saveLinkButton.addEventListener('click', function() {
        const newLink = websiteLinkInput.value.trim();
        if (newLink !== '') {
            // Retrieve existing links from Chrome storage
            chrome.storage.local.get('links', function(data) {
                const savedLinks = data.links || [];
                // Add the new link to the array
                savedLinks.push(newLink);
                // Save the updated array to Chrome storage
                chrome.storage.local.set({ 'links': savedLinks }, function() {
                    // Display success message
                    statusMessage.textContent = 'Link saved successfully.';
                    // Update the displayed links
                    renderLinks(savedLinks);
                });
            });
            // Clear the input field
            websiteLinkInput.value = '';
        } else {
            // Display error message if input is empty
            statusMessage.textContent = 'Please enter a valid link.';
        }
    });

    // Function to render saved links
    function renderLinks(links) {
        savedLinksList.innerHTML = '';
        links.forEach(function(link) {
            const listItem = document.createElement('li');
            listItem.textContent = link;
            savedLinksList.appendChild(listItem);
        });
    }
});
