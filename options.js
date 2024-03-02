document.addEventListener("DOMContentLoaded", function () {
  const websiteLinkInput = document.getElementById("websiteLink");
  const saveLinkButton = document.getElementById("saveLinkButton");
  const statusMessage = document.getElementById("statusMessage");
  const savedLinksList = document.getElementById("savedLinks");
  const linkGroupInput = document.getElementById("linkGroup");
  const addGroupForm = document.getElementById("addGroupForm");
  const newGroupInput = document.getElementById("newGroup");
  const addGroupButton = document.getElementById("addGroupButton");
  const savedGroupsList = document.getElementById("group-list");
  

  // Load saved links from Chrome storage
  chrome.storage.local.get(["links", "groups"], function (data) {
    const savedLinks = data.links || [];
    const savedGroups = data.groups || [];
    renderLinks(savedLinks);
    renderGroups(savedGroups);
    renderGroupList(savedGroups);
  });

  // Save link when button is clicked
  saveLinkButton.addEventListener("click", function () {
    const newLink = websiteLinkInput.value.trim();
    const newLinkGroup = linkGroupInput.value.trim();
    if (newLink !== "" && newLinkGroup !== "") {
      // Retrieve existing links from Chrome storage
      chrome.storage.local.get(["links", "groups"], function (data) {
        const savedLinks = data.links || [];
        const savedGroups = data.groups || [];
        // Add the new link to the array
        savedLinks.push({ link: newLink, group: newLinkGroup });

        if (!savedGroups.includes(newLinkGroup)) {
          savedGroups.push(newLinkGroup);
        }
        // Save the updated array to Chrome storage
        chrome.storage.local.set({ links: savedLinks, groups: savedGroups }, function () {
          // Display success message
          statusMessage.textContent = "Link saved successfully.";
          statusMessage.classList.add("green");
          statusMessage.classList.remove("red");
          // Update the displayed links
          renderLinks(savedLinks);
          renderGroups(savedGroups);
        });
      });
      // Clear the input field
      websiteLinkInput.value = "";
      linkGroupInput.value = "";
    } else {
      // Display error message if input is empty
      statusMessage.textContent = "Please enter a valid link and group.";
      statusMessage.classList.add("red");
      statusMessage.classList.remove("green");
    }
  });

  // Add group when form is submitted
  addGroupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const newGroup = newGroupInput.value.trim();
    if (newGroup !== "") {
      chrome.storage.local.get("groups", function (data) {
        const savedGroups = data.groups || [];
        if (!savedGroups.includes(newGroup)){

          savedGroups.push(newGroup);
          chrome.storage.local.set({ groups: savedGroups}, function () {
            statusMessage.textContent = "Group added successfully";
            statusMessage.classList.add("green");
            statusMessage.classList.remove("red");
            newGroupInput.value = "";
            renderGroups(savedGroups);
            renderGroupList(savedGroups);

          });
        } else {
          statusMessage.textContent = "This group already exists."
          statusMessage.classList.add("red");
          statusMessage.classList.remove("green");
          newGroupInput.value = "";
        }
      });
    } else {
      statusMessage.textContent = "Please enter a valid group name."
      statusMessage.classList.add("red");
      statusMessage.classList.remove("green");
    }
  });

  // Function to render saved links
  function renderLinks(links) {
    savedLinksList.innerHTML = "";
    links.forEach(function (linkObject) {
      const listItem = document.createElement("li");
      listItem.textContent = `${linkObject.link} - ${linkObject.group}`;
      
      // Function to remove items
      const removeButton = document.createElement("button");
      removeButton.textContent = "❌";
      removeButton.classList.add("delete-button");
      removeButton.addEventListener("click", function () {
        removeLink(linkObject.link);
      });
      listItem.appendChild(removeButton);
      savedLinksList.appendChild(listItem);
    });
  }

  function removeLink(linkToRemove) {
    chrome.storage.local.get("links", function (data) {
      const savedLinks = data.links || [];
      const updatedLinks = savedLinks.filter(link => link.link !== linkToRemove);

      chrome.storage.local.set({ links: updatedLinks }, function () {
        renderLinks(updatedLinks);
      });
    });
  }

  // Function to render saved groups in the dropdown
  function renderGroups(groups) {
    linkGroupInput.innerHTML = "";
    groups.forEach(function (group) {
      const option = document.createElement("option");
      option.value = group;
      option.textContent = group;
      linkGroupInput.appendChild(option);
    });
  }

  function renderGroupList(groups) {

    savedGroupsList.innerHTML = "";  
    groups.forEach(group => {
      const listItem = document.createElement("li");
      listItem.textContent = group;
      savedGroupsList.appendChild(listItem);
      // Function to remove items
      const removeButton = document.createElement("button");
      removeButton.textContent = "❌";
      removeButton.classList.add("delete-button");
      removeButton.addEventListener("click", function () {
        removeGroup(group);
      });
      listItem.appendChild(removeButton);
    });
  }

  function removeGroup(groupToRemove) {
    chrome.storage.local.get("groups", function (data) {
      const savedGroups = data.groups || [];
      const updatedGroups = savedGroups.filter(group => group !== groupToRemove);

      chrome.storage.local.set({ groups: updatedGroups }, function () {
        renderGroups(updatedGroups);
        renderGroupList(updatedGroups);
      });
    });
  }

});
