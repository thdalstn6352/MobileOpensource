function loadHistory() {
    // Retrieve the object from storage
    var retrievedResult = localStorage.getItem('result');
    console.log('retrievedResult: ', JSON.parse(retrievedResult));
    //var result = document.createElement('li')
    //result.appendChild(document.createTextNode('Start: ' + startTime + ' Stop: ' + stopTime + ' Total: ' + totalTime));
    //document.getElementById('result').appendChild(result);
}