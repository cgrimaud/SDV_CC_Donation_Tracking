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
        // createTableRows(items);
    }


    init()

    // dataTable function that populates table rows on webpage
    function initTable() {
        $('#table_id').dataTable( {
            select: true,
            scrollY: "550px",
            scrollCollapse: true,
            paging: false,
            data: items,
            columns: [
                {data: 'completed'}, 
                {data: 'image',
                render: function(data, type, row) {
                    return '<img src="'+data+'" />';
                    }
                },
                {data: 'name'},
                {data: 'bundle'},
                {data: 'room'}
            ],
            columnDefs: [
                {"className": "dt-center", "targets": "_all"},
            ],
            
        })

        let completedColumn = $("tr td:nth-child(1)")
        completedColumn.replaceWith('<th style="text-align: center"><input type="checkbox" class:"checkbox" /></th>')

        let itemColumn = $("tr td:nth-child(3)")
        var popover = itemColumn.attr({"data-toggle":"popover"})
        $('[data-toggle="popover"]').popover({
            placement : 'right',
            trigger: 'click',
            title: 'Location',
            content: "loading text..."
        });
        function addLocationTextToPopover() { 
            itemColumn.on({
                'mouseenter': function(){
                        var txt = $(this).html();
                        let getItemObject = items.find(item => item.name === txt)
                        var locationText = getItemObject.location
                        itemColumn.attr({"data-content": locationText})  
                }
            });
        }
        
        addLocationTextToPopover()
        
    }
        
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
        itemObject = new Item(item.completed, item.image, item.name, bundle.name, room.name, item.id, item.location)
        items.push(itemObject)
    };
    

});
