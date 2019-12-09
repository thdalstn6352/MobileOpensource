window.addEventListener("DOMContentLoaded", (event) => {
    loadHistory();
});

function loadHistory() {
    var outputT;
    var outputC;
    /*for (var i = 0, len = localStorage.length; i < len; ++i) {
        var keyname = window.localStorage.key(i);
        console.log(localStorage.getItem('result' + i));
        output += "<p " + "id = \"" + keyname + "\"" + ">" + localStorage.getItem(keyname) + "</p>";
    }*/
    // Retrieve all objects from storage
    for (var i = 0; i < localStorage.length; i++) {
        var retrievedResult = localStorage.getItem('result' + i);
        console.log(localStorage.key(i), JSON.parse(retrievedResult));
        outputT = "<p " + "id = \"outputT\"" + ">";
        outputT += JSON.parse(retrievedResult).start;
        outputT +=", ";
        outputT += JSON.parse(retrievedResult).stop;
        outputT += "</p>";
        outputC = "<p " + "id = \"outputC\"" + ">";
        outputC += JSON.parse(retrievedResult).total;
        outputC += "\"  ||  ";
        outputC += JSON.parse(retrievedResult).speed;
        outputC += " km/h  ||  ";
        outputC += JSON.parse(retrievedResult).distance;
        outputC += " m" + "</p>";
    }
    console.log(localStorage.length);

    document.getElementById("result").innerHTML = outputT;
    //document.getElementById("result").appendChild(document.createElement('br'));
    document.getElementById("result").innerHTML += outputC;
}

function clearHistory() {
    localStorage.clear();
    document.location.reload();
}