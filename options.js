document.addEventListener('DOMContentLoaded', function() {
    const labelInput = document.getElementById('labelName');
    const linkInput = document.getElementById('linkUrl');
    const addLinkButton = document.getElementById('addLinkButton');
    const saveLabelButton = document.getElementById('saveLabelButton');
    const statusMessage = document.getElementById('statusMessage');
    const linkList = document.getElementById('linkList');

    let label = '';
    let links = [];


    chrome.storage.sync.get(['label', 'links'], function(data) {
        label = data.label || '';
        links = data.links || [];
        renderLinks();
    });


    addLinkButton.addEventListener('click', function() {
        const url = linkInput.value.trim();
        if (url !== '') {
            links.push(url);
            linkInput.value = '';
            renderLinks();
        }
    });

    saveLabelButton.addEventListener('click', function() {
        const newLabel = labelInput.value.trim();
        if (newLabel !== '') {
            label = newLabel;
            labelInput.value = '';
            chrome.storage.sync.set({ 'label': label, 'links': links }, function() {
                statusMessage.textContent = 'Label saved successfully.';
            });
        } else {
            statusMessage.textContent = 'Please enter a label name.';
        }
    });

    function renderLinks() {
        linkList.innerHTML = '';
        links.forEach(function(link) {
            const listItem = document.createElement('li');
            listItem.textContent = link;
            linkList.appendChild(listItem);
        });
    }
});