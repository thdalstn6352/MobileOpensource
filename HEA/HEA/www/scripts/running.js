var startTime, stopTime, totalTime;
var startTimeCalc;
var speed, distance = 0;

function startRunning() {
    startTimeCalc = Date.now();
    start = new Date();
    startTime = (start.getMonth() + 1) + '/' + start.getDate() + '/' + start.getFullYear() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
    document.getElementById("startButton").innerHTML = "stop";
    document.getElementById("startButton").removeAttribute("onclick");
    document.getElementById("startButton").setAttribute("onclick", "stopRunning()");

    // using setInterval to make it better
    window.setTimeout(function (position) {
        navigator.geolocation.getCurrentPosition(watchSpeed, onError);
    }, 1000);
}

function stopRunning() {
    stop = new Date();
    stopTime = (stop.getMonth() + 1) + '/' + stop.getDate() + '/' + stop.getFullYear() + ' ' + stop.getHours() + ':' + stop.getMinutes() + ':' + stop.getSeconds();

    totalTime = Math.floor((Date.now() - startTimeCalc) / 1000);

    document.getElementById("startButton").innerHTML = "start";
    document.getElementById("startButton").removeAttribute("onclick");
    document.getElementById("startButton").setAttribute("onclick", "startRunning()");

    calculateDistance();

    alert('Start: ' + startTime + ' Stop: ' + stopTime + ' Total: ' + totalTime + '\"' + ' Speed: ' + speed + ' Distance: ' + distance + ' m');

    var result = { 'Start ': startTime, 'Stop ': stopTime, 'Total ': totalTime, 'Speed': speed, 'Distance': distance };

    // Put the object into storage
    var i;
    for (i = 0; i < localStorage.length; i++) {}
    localStorage.setItem('result' + i, JSON.stringify(result));

    // using clearInterval to make it better
}

var watchSpeed = function (position) {
    speed = position.coords.speed;
    if (speed == null) {
        speed = 0;
    }
    //alert(speed);
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
navigator.geolocation.getCurrentPosition(watchSpeed, onError);

function calculateDistance() {
    distance = (speed * (totalTime / 60)).toFixed(3);
}