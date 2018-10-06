// Saves options to chrome.storage
function save_options() {
    var settingsurl = document.getElementById('settingsurl').value;
    alert(settingsurl)
    chrome.storage.sync.set({
        settingsurl: settingsurl
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.' + settingsurl;
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default settingsurl as empty string
    chrome.storage.sync.get({
        settingsurl: ""
    }, function(items) {
      document.getElementById('settingsurl').value = items.settingsurl;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);