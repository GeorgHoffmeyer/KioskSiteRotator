
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
