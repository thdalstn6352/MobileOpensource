var startTime, stopTime, totalTime;
var speed, speedTotal = 0;

function startRunning() {
    start = new Date();
    startTime = (start.getMonth() + 1) + '/' + start.getDate() + '/' + start.getFullYear() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
    document.getElementById("startButton").innerHTML = "stop";
    document.getElementById("startButton").removeAttribute("onclick");
    document.getElementById("startButton").setAttribute("onclick", "stopRunning()");

    // using setInterval to make it better
    window.setTimeout(function (position) {
        alert('Speed: ' + navigator.geolocation.getCurrentPosition(watchSpeed, onError) + '\n');
    }, 1000);
}

function stopRunning() {
    stop = new Date();
    stopTime = (stop.getMonth() + 1) + '/' + stop.getDate() + '/' + stop.getFullYear() + ' ' + stop.getHours() + ':' + stop.getMinutes() + ':' + stop.getSeconds();

    totalTime = (stop.getHours() - start.getHours()) + ':' + (stop.getMinutes() - start.getMinutes()) + ':' + (stop.getSeconds() - start.getSeconds());

    document.getElementById("startButton").innerHTML = "start";
    document.getElementById("startButton").removeAttribute("onclick");
    document.getElementById("startButton").setAttribute("onclick", "startRunning()");

    alert('Start: ' + startTime + ' Stop: ' + stopTime + ' Total: ' + totalTime + ' Speed: ' + speed);

    var result = { 'Start ': startTime, 'Stop ': stopTime, 'Total ': totalTime };

    // Put the object into storage
    var i;
    for (i = 0; i < localStorage.length; i++) {}
    localStorage.setItem('result' + i, JSON.stringify(result));

    // using clearInterval to make it better
}

var watchSpeed = function (position) {
    speed = position.coords.speed;
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

//navigator.geolocation.getCurrentPosition(onSuccess, onError);