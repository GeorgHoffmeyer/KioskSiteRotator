

/*
window.setTimeout(function(){
 switchSite();
}, 0);
*/

function switchSite(url) {

    console.log(formatDate(new Date()) + " [content_script.js] url: " + url);
    window.location.href = url;
    
    //window.setTimeout(function(){switchSite()}, timeout)

    
} 

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