// Saves options to chrome.storage
function save_options() {
  var settingsurl = document.getElementById('settingsurl').value;
  var loadfromserver = $('#loadfromserver')[0].checked;
  var localdata = $('#localdata').val();
  
  chrome.storage.sync.set({
    settingsurl: settingsurl,
    loadfromserver: loadfromserver,
    localdata: localdata
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.\n' + settingsurl + "\n" + loadfromserver;
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default settingsurl as empty string
  chrome.storage.sync.get({
    settingsurl: "",
    loadfromserver: false,
    localdata: '{"fullscreen": true,"urls": [{"url": "https://www.google.de","duration": 5000},{"url": "https://www.bing.com","duration": 5000},{"url": "https://www.yahoo.com","duration": 5000}]}'
  }, function (items) {
    document.getElementById('settingsurl').value = items.settingsurl;
	$('#localdata').val(items.localdata);
    if(loadfromserver) {
      $('#loadfromserver')[0].checked = true;
    }

    setVisibilites();
  });
}

function setVisibilites() {
  if($('#loadfromserver')[0].checked) {
    $('#settingsurl').show();
    $('#settingsurllabel').show();
    $('#localdata').hide();
    $('#localdatalabel').hide();
  } else {
    $('#settingsurl').hide();
    $('#settingsurllabel').hide();
    $('#localdata').show();
    $('#localdatalabel').show();
  }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);

$("#loadfromserver").click(setVisibilites);