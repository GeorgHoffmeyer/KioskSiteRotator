// Saves options to chrome.storage
function save_options() {
  var settingsurl = $('#settingsurl').value;
  var loadfromserver = $('#loadfromserver')[0].checked;
  var localdata = $('#localdata').val();
  //console.log(loadfromserver);
  
  chrome.storage.local.set({
    settingsurl: settingsurl,
    loadfromserver: loadfromserver,
    localdata: localdata
  }, function () {
    // Update status to let user know options were saved.
    var status = $('#status');
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
  chrome.storage.local.get({
    settingsurl: "",
    loadfromserver: false,
    localdata: '{"fullscreen": true,"urls": [{"url": "https://www.google.de","duration": 5000},{"url": "https://www.bing.com","duration": 5000},{"url": "https://www.yahoo.com","duration": 5000}]}'
  }, function (items) {
	  console.log(items);
    $('#settingsurl').value = items.settingsurl;
	$('#localdata').val(items.localdata);
    if(items.loadfromserver) {
      $('#loadfromserver')[0].checked = true;
    } else {
	  $('#loadfromserver')[0].checked = false;
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

$('#save').click(function() {
	console.log('save clicked')
	save_options();
});

$('#loadfromserver').click(function(){
	setVisibilites();
});

$().ready(function(){
	restore_options();
});