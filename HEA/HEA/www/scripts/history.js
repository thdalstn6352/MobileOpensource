window.addEventListener("DOMContentLoaded", (event) => {
    // Retrieve all objects from storage
    for (var i = 0; i < localStorage.length; i++) {
        var retrievedResult = localStorage.getItem('result' + i);
        console.log(localStorage.key(i), JSON.parse(retrievedResult));
    }
    console.log(localStorage.length);
    loadHistory();
});

function loadHistory() {
    /*var result
    for (var i = 0; i < localStorage.length; i++) {
        var keyname = window.localStorage.key(i);

        result += "<div " + "id = \"" + keyname + "\"" + ">" + "///" + keyname + "///" + JlocalStorage.getItem('result' + i) + "</div>";
    }
    document.getElementById('result').innerHTML = result;*/

    var output;

    for (var i = 0, len = localStorage.length; i < len; ++i) {
        var keyname = window.localStorage.key(i);
        console.log(localStorage.getItem('result' + i));
        output += "<p " + "id = \"" + keyname + "\"" + ">" + localStorage.getItem(keyname) + "</p>";
    }

    document.getElementById("result").innerHTML = output;
}

function clearHistory() {
    localStorage.clear();
    document.location.reload();
}