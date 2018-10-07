# About

This is a small chrome extension which loads defined pages after a defined duration in the current tab. It also can be started in+ Fullscreen so you can use this extension for Kiosk-Mode.

This plugin does not totated open tabs. It loads the defined urls in the same tab. So every update is a page request.

# settings 

The settings can be stored in a json file an the plugin will load it.

## structure

    {
        "fullscreen": true,
        "urls": [
            {
                "url": "https://www.google.de",
                "duration": 5000
            },
            {
                "url": "https://www.bing.com",
                "duration": 5000
            },
            {
                "url": "https://www.yahoo.com",
                "duration": 5000
            }
        ]
    }

# Installation

This extension is in an early state of development, so there is no ready-to-install package and it is also not avaliable thru the chrome store.

First you have to [donwload](https://github.com/GeorgHoffmeyer/KioskSiteRotator/archive/master.zip) or [clone](https://github.com/GeorgHoffmeyer/KioskSiteRotator.git) the repo.

To install this extension you have to go to Menu -> More Tools -> Extensions (or type chrome://extensions/ in the Adreesbar). On this page you have to switch the developermode on. Now you can load the Extension from disk by clicking the button "Load unpacked extension".