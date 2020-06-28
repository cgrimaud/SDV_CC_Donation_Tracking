$(document).ready( function () {

    // will be populated with instances of Item 
    let items = []

    // assigning .getJSON method to a variable to be called in async init
    var loadJSON = $.getJSON("rooms.json", function (data){
        return data
    })

    // async function so loadJSON can be completed before the rest of the functions run
    async function init(){
        let rooms = await loadJSON;
        getAllRooms(rooms);
        initTable()
        }


    init()

    // dataTable function that populates table rows on webpage
    function initTable() {
        $('#table_id').DataTable( {

            data: items,
            columns: [
                {data: 'completed'},
                {data: 'name'},
                {data: 'location'},
                {data: 'bundle'},
                {data: 'room'}
            ]
        })
    }
        
    class Item {
        constructor(completed, item, location, bundle, room) {
            this.completed = completed
            this.name = item;
            this.location = location;
            this.bundle = bundle;
            this.room = room;
        }
    };

    // iterates over the array of Community Center Room objects, and passes each room object to the getAllBundles function
    function getAllRooms (roomObject) {
        roomObject.forEach( room => getAllBundles(room))
    };

    // iterates over the Bundle objects inside of a single Room object and passes the room and bundle to getAllItems function
    function getAllBundles (room) {
        room.bundles.forEach( bundle => getAllItems(room, bundle))
    };

    // iterates over the Item objects inside of a single bundle associated with a single room and passes the room, bundle, and item to createItemObject
    function getAllItems(room, bundle) {
        bundle.items.forEach(item => createItemObject(room, bundle, item))
    };

    // creates a new instance of an Item and adds it to the items array
    function createItemObject(room, bundle, item) {
        itemObject = new Item(item.completed, item.name, item.location, bundle.name, room.name, )
        items.push(itemObject)
    };

});
