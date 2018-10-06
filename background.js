
var urls;
/* = [{
    url: "https://www.google.de",
    duration: 5000
},
{
    url: "https://www.bing.com",
    duration: 5000
},
{
    url: "https://www.yahoo.com",
    duration: 5000
}];
*/

var currentIndex = 0;
var activeTabId = null;
const alarmName = "switchSite";

chrome.browserAction.onClicked.addListener(function (tab) {
    debug("Button clicked");
    debug("current Tab Id " + tab.id);

    if (activeTabId == null) {
        debug("activated for Tab " + activeTabId);
        activeTabId = tab.id;
        init();
    } else {
        debug("deactivated");
        activeTabId = null;
    }
});


chrome.runtime.onInstalled.addListener(() => {
    init();
});

chrome.alarms.onAlarm.addListener(function (alarm) {

    if (alarm.name == alarmName && activeTabId) {
        var urlObj = urls[currentIndex];

        debug("URL: " + urlObj.url + " duration: " + urlObj.duration);

        chrome.tabs.executeScript(activeTabId, {
            code: 'window.location.href = "' + urlObj.url + '"'
        });

        chrome.alarms.create(alarmName, { when: Date.now() + 5000 });

        increseCurrentIndex();
    }
});

function formatDate(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function debug(message) {
    console.debug(formatDate(new Date()) + " [background.js - DEBUG] " + message);
}

function log(message) {
    console.log(formatDate(new Date()) + " [background.js - LOG] " + message);
}

function increseCurrentIndex() {
    currentIndex++;
    if (currentIndex >= urls.length) {
        currentIndex = 0;
    }
    debug("CurrentIndex: " + currentIndex);
}

function init() {
    debug("init called");
    loadSettings();
    chrome.alarms.create(alarmName, { when: Date.now() });
}

function loadSettings() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://georghoffmeyer.files.wordpress.com/2018/10/url_sample.pdf", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            urls = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
}
