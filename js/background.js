
const alarmName = "switchSite";
const iconPlay = "../img/play.png";
const iconStop = "../img/stop.png"
var settings;
var currentIndex = 0;
var activeTabId = null;
var settingsUrl;// = "https://georghoffmeyer.files.wordpress.com/2018/10/url_sample2.pdf";

chrome.browserAction.onClicked.addListener(function (tab) {
    debug("Button clicked");
    debug("current Tab Id " + tab.id);

    if (activeTabId == null) {
        debug("activated for Tab " + activeTabId);
        activeTabId = tab.id;
		//setIcon(iconPlay)
        init();
    } else {
        debug("deactivated");
        activeTabId = null;
		//setIcon(iconStop);
    }
});


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({
        settingsurl: ""
    }, function(items) {
      settingsUrl = items.settingsurl;
    });
    init();
});

chrome.alarms.onAlarm.addListener(function (alarm) {

    if (alarm.name == alarmName && activeTabId && settings) {
        var urlObj = settings.urls[currentIndex];

        debug("URL: " + urlObj.url + " duration: " + urlObj.duration);

        chrome.tabs.executeScript(activeTabId, {
            code: 'window.location.href = "' + urlObj.url + '"'
        });

        chrome.alarms.create(alarmName, { when: Date.now() + urlObj.duration });

        increseCurrentIndex();
    }
});

function increseCurrentIndex() {
    currentIndex++;
    if (currentIndex >= settings.urls.length) {
        currentIndex = 0;
    }
    debug("CurrentIndex: " + currentIndex);
}

function init() {
    debug("init called");
	
	chrome.storage.local.get(function(result) {
		console.log(result);
		if(result.loadfromserver) {
			settingsUrl = result.settingsurl;
            loadSettingsFromUrl();
		} else {
			//settings = JSON.parse(result.localdata);
		}
        });
}

function loadSettingsFromUrl() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", settingsUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            settings = JSON.parse(xhr.responseText);
            if(settings.fullscreen) {
                chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { state: "fullscreen" })
            } else {
                chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, { state: "normal" })
            }

            chrome.alarms.create(alarmName, { when: Date.now() });
        }
    }
    xhr.send();
}

function setIcon(icon) {
    chrome.browserAction.setIcon({path: icon});
}