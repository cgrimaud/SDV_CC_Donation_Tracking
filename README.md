# Stardew Valley Community Center Tracking

Stardew Valley is an open-ended country-life RPG. One part of the game is the option to restore the dilapidated Community Center building by donating specific items.

This website contains a dynamically generated table of the different items that can be donated to help restore the community center. 

## To run the website:

The website is hosted on GitHub pages, so the easiest way to review it would be to [check it out here.](https://cgrimaud.github.io/SDV_CC_Donation_Tracking/). 

#### If you want to download and test locally:

You will need some sort of local server in order to load the JSON file. I used [this npm package](https://www.npmjs.com/package/local-web-server) with great success.

## Functionality:
A table of all of the donatable items will be generated when the website first loads.

You can use the search field to search for any text in the table (Item, Bundle, or Room): 

<img src="https://github.com/cgrimaud/SDV_CC_Donation_Tracking/blob/master/gifs/sdvSearch.gif" width="550px" height="500px" />

You can click on the item name to see a popup with information about how to obtain the item in the game: 

<img src="https://github.com/cgrimaud/SDV_CC_Donation_Tracking/blob/master/gifs/sdvPopups.gif" width="550px" height="500px" />

When you click the "completed" box on a row, that row will disappear:

<img src="https://github.com/cgrimaud/SDV_CC_Donation_Tracking/blob/master/gifs/sdvCompleted.gif" width="550px" height="500px" />


The website uses the localStorage property so if you leave (or refresh) the page, it will be the same when you return. The "Reset Items" button in the navbar clears the localStorage property so the original table can repopulate with all of the items: 

<img src="https://github.com/cgrimaud/SDV_CC_Donation_Tracking/blob/master/gifs/sdvLocalStorage.gif" width="550px" height="500px" />


## CL Requirements Met:

#### 5+ Commits on Github

#### Read and parse an external file (such as JSON or CSV) into your application and display some data from that in your app

It [reads](https://github.com/cgrimaud/SDV_CC_Donation_Tracking/blob/e5ed99e0ac758887671af96e1287791773259baa/file.js#L6-L9) the local [rooms.json](https://github.com/cgrimaud/SDV_CC_Donation_Tracking/blob/e5ed99e0ac758887671af96e1287791773259baa/rooms.json) file and [parses](https://github.com/cgrimaud/SDV_CC_Donation_Tracking/blob/e5ed99e0ac758887671af96e1287791773259baa/file.js#L24-L46) it to create an array of Item objects.

#### Create a dictionary or list, populate it with several values, retrieve at least one value, and use it in your program

[items](https://github.com/cgrimaud/SDV_CC_Donation_Tracking/blob/e5ed99e0ac758887671af96e1287791773259baa/file.js#L4) is the array referenced above. This array is then used to create the table on the webpage. 


#### Create and use a function that accepts two or more values, calculates or determines a new value based on those inputs, and returns a value

[createItemObjet()](https://github.com/cgrimaud/SDV_CC_Donation_Tracking/blob/e5ed99e0ac758887671af96e1287791773259baa/file.js#L42-L46) takes three values(room, bundle, item) and returns an Item object. 