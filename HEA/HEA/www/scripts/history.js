window.addEventListener("DOMContentLoaded", (event) => {
    // Retrieve all objects from storage
    for (var i = 0; i < localStorage.length; i++) {
        var retrievedResult = localStorage.getItem('result' + i);
        console.log(localStorage.key(i), JSON.parse(retrievedResult));
    }
    console.log(localStorage.length);
});

function loadHistory() {
    //var result = document.createElement('li')
    //result.appendChild(document.createTextNode('Start: ' + startTime + ' Stop: ' + stopTime + ' Total: ' + totalTime));
    //document.getElementById('result').appendChild(result);
}