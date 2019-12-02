var startTime;
var stopTime;
var totalTime;

function startRunning() {
    start = new Date();
    startTime = (start.getMonth() + 1) + '/' + start.getDate() + '/' + start.getFullYear() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
    document.getElementById("startButton").innerHTML = "stop";
    document.getElementById("startButton").removeAttribute("onclick");
    document.getElementById("startButton").setAttribute("onclick", "stopRunning()");
    //alert(startTime);
}

function stopRunning() {
    stop = new Date();
    stopTime = (stop.getMonth() + 1) + '/' + stop.getDate() + '/' + stop.getFullYear() + ' ' + stop.getHours() + ':' + stop.getMinutes() + ':' + stop.getSeconds();

    totalTime = (stop.getHours() - start.getHours()) + ':' + (stop.getMinutes() - start.getMinutes()) + ':' + (stop.getSeconds() - start.getSeconds());

    document.getElementById("startButton").innerHTML = "start";
    document.getElementById("startButton").removeAttribute("onclick");
    document.getElementById("startButton").setAttribute("onclick", "startRunning()");

    
    //alert(startTime);
    //alert(stopTime);
    //alert(totalTime);
}