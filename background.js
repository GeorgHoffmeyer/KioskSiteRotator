
var urls = [{
    url: "https://www.google.de",
    duration: 0.1
},
{
    url: "https://www.bing.com",
    duration: 0.1
},
{
    url: "https://www.yahoo.com",
    duration: 0.1
}];

var currentIndex = 0;


chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    chrome.tabs.executeScript({
          code: 'window.location = "https://www.google.com/"'
        });
    switchSite("https://www.yahoo.com", 1000);
  });

  function switchSite(url, duration) {
      console.log("switch site");
      chrome.tabs.executeScript({
          code: 'window.location = "' + url + '"'
      });
  }

chrome.runtime.onInstalled.addListener(()=>{
    chrome.alarms.create("switchSite", {delayInMinutes: urls[0].duration} );
});

function switchSite() {
    console.debug("CurrentIndex: " + currentIndex);
    if(currentIndex <= urls.length) {
      currentIndex++;
    } else {
        currentIndex = 0;
    }
    chrome.tabs.executeScript({
        code: 'window.location = "' + urls[currentIndex].url + '"' 
    })
    chrome.alarms.create("switchSite", {delayInMinutes: urls[currentIndex].duration} );
} 

chrome.alarms.onAlarm.addListener(switchSite);