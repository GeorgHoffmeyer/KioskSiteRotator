

/*
window.setTimeout(function(){
 switchSite();
}, 0);
*/

function switchSite(url) {

    console.log("[content_script.js] url: " + url);
    window.location = url;
    
    //window.setTimeout(function(){switchSite()}, timeout)

    
} 
