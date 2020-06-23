

// fetch('rooms.json')
//     .then(response => response.json())
//     .then(data => console.log(data))

$.getJSON("rooms.json", function( data ) {
    rooms = data
    console.log(rooms)
})
