

var rooms = [];
    
    function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.open('GET', 'rooms.json', true); 
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function init() {
        loadJSON(function(response) {
            rooms = JSON.parse(response)
            console.log(rooms)

        });
    }

init()