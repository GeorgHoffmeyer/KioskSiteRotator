
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
    console.log(formatDate(new Date()) + " [background.js] Button clicked");
    console.log(formatDate(new Date()) + " [background.js] current Tab Id " + tab.id);

    if (activeTabId != null) {
        console.log(formatDate(new Date()) + " [background.js] activated");
        activeTabId = tab.id;
    } else {
        console.log(formatDate(new Date()) + " [background.js] deactivated");
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

function increseCurrentIndex() {
    currentIndex++;
    if (currentIndex >= urls.length) {
        currentIndex = 0;
    }
    console.log(formatDate(new Date()) + " [background.js] CurrentIndex: " + currentIndex);
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create(alarmName, { when: Date.now() });
});

chrome.alarms.onAlarm.addListener(function (alarm) {

    if (alarm.name == alarmName) {
        var urlObj = urls[currentIndex];

        console.log(formatDate(new Date()) + " [background.js] URL: " + urlObj.url + " duration: " + urlObj.duration);

        chrome.tabs.executeScript({
            code: 'window.location.href = "' + urlObj.url + '"'
        });

        chrome.alarms.create(alarmName, { when: Date.now() + 5000 });

        increseCurrentIndex();
    }
});
