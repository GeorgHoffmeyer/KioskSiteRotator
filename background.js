
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

chrome.webNavigation.onCompleted.addListener(function(details) {
    console.log("[background.js] CurrentIndex begin: " + currentIndex);
    console.log("[background.js] url: " + urls[currentIndex].url);
    chrome.tabs.executeScript({
        code: 'window.setTimeout(function(){switchSite("'+ urls[currentIndex].url+'")}, '+ urls[currentIndex].duration+')'
      })
      currentIndex++;
    if(currentIndex >= urls.length) {
        currentIndex = 0;
      }
      console.log("[background.js] CurrentIndex end: " + currentIndex);
    
})

chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log("Button Clicked");
    
});

/*
chrome.runtime.onInstalled.addListener(()=>{
    //chrome.alarms.create("switchSite", {delayInMinutes: urls[0].duration} );
    chrome.tabs.executeScript({
        code: 'window.setTimeout(switchSite, ' + urls[0].duration + ')'
    })
});
*/

//chrome.alarms.onAlarm.addListener(switchSite);