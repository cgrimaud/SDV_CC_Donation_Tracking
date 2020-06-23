

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
        // const rooms = JSON.parse(xhr.responseText);
        console.log(typeof xhr.responseText)
        }
}


xhr.open('GET', 'rooms.json');
xhr.send();


