
var urls = [{
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

var currentIndex = 0;
var activeTabId = null;
const alarmName = "switchSite";

chrome.browserAction.onClicked.addListener(function (tab) {
    log("Button clicked");
    log("current Tab Id " + tab.id);

    if (activeTabId == null) {
        log("activated for Tab " + activeTabId);
        activeTabId = tab.id;
        init();
    } else {
        log("deactivated");
        activeTabId = null;
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

function log(message) {
    console.log(formatDate(new Date()) + " [background.js] " + message);
}

function increseCurrentIndex() {
    currentIndex++;
    if (currentIndex >= urls.length) {
        currentIndex = 0;
    }
    log("CurrentIndex: " + currentIndex);
}

function init() {
    log("init called");
    chrome.alarms.create(alarmName, { when: Date.now() });
}

chrome.runtime.onInstalled.addListener(() => {
    init();
});

chrome.alarms.onAlarm.addListener(function (alarm) {

    if (alarm.name == alarmName && activeTabId) {
        var urlObj = urls[currentIndex];

        log("URL: " + urlObj.url + " duration: " + urlObj.duration);

        chrome.tabs.executeScript(activeTabId, {
            code: 'window.location.href = "' + urlObj.url + '"'
        });

        chrome.alarms.create(alarmName, { when: Date.now() + 5000 });

        increseCurrentIndex();
    }
});
