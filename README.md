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