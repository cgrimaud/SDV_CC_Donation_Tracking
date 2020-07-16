$(document).ready( function () {

    // will be populated with instances of Item 
    let items = []

    // assigning .getJSON method to a variable to be called in async init function
    var loadJSON = $.getJSON("rooms.json", function (data){
        return data
    })

            
    class Item {
        constructor(completed, image, item, bundle, room, id, location) {
            this.completed = completed
            this.image = image
            this.name = item;
            this.bundle = bundle;
            this.room = room;
            this.id = id;
            this.location = location;
        }
    };

    ////// FUNCTIONS TO PARSE THE ARRAY OF ROOM OBJECTS TO CREATE ARRAY OF ITEM OBJECTS ////////

    // iterates over the array of Community Center Room objects, and passes each room object to the parseAllBundles function
    function parseAllRooms (roomObject) {
        roomObject.forEach( room => parseAllBundles(room))
    };

    // iterates over the Bundle objects inside of a single Room object and passes the room and bundle to parseAllItems function
    function parseAllBundles (room) {
        room.bundles.forEach( bundle => parseAllItems(room, bundle))
    };

    // iterates over the Item objects inside of a single bundle associated with a single room and passes the room, bundle, and item to createItemObject
    function parseAllItems(room, bundle) {
        bundle.items.forEach(item => createItemObject(room, bundle, item))
    };

    // creates a new instance of an Item and adds it to the items array
    function createItemObject(room, bundle, item) {
        itemObject = new Item(item.completed, item.image, item.name, bundle.name, room.name, item.id, item.location)
        items.push(itemObject)
    };
    



    function createItemRows(listOfItems){
        // if local storage has rows, populate based on that
        if (localStorage.getItem('rows')) {
            $('#tableRows').html(localStorage.getItem('rows'));

            // enable popover on item cells
            $('[data-toggle="popover"]').popover({
            placement : 'right',
            trigger: 'click'
            });
        // otherwise, build the rows from scratch
        } else {
            listOfItems.forEach(item => buildItemRow(item))  
        } 

        $('input[type="checkbox"]').click( function(){
            if ($(this).prop("checked") == true){
                let row = this.closest("tr")
                $(row).detach()  
            }
            // saves table rows to local storage
            var rows = $('#tableRows').html();
            localStorage.setItem("rows", rows);
        })
        
    }

    function buildItemRow(item){
        let row = `<tr id="${item.id}" style="background-color: #ffcb68">
                        <td class="checkbox" align="center">
                            <input type="checkbox">                                
                        </td>
                        <td><img src="${item.image}" alt="${item.name}" title="${item.name}"</td>
                        <td data-toggle="popover" title="Location" data-content="${item.location}" style="color:blue">${item.name}</td>
                        <td>${item.bundle}</td>
                        <td>${item.room}</td>
                    </tr>`

        $('#tableRows').append(row)

        // enable popover on Item cells
        $('[data-toggle="popover"]').popover({
            placement : 'right',
            trigger: 'click'
        });
    }

    // filter table search field functionality
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        var row = $("#master_table tbody tr")
        row.filter(function() {    
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#reset").click(function() {
        localStorage.clear();
        location.reload(true);
    });


    // async function so loadJSON can be completed before the rest of the functions run
    async function init(){
        let rooms = await loadJSON;
        parseAllRooms(rooms);
        createItemRows(items);
    }

    init()

});





