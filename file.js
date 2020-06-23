



fetch('rooms.json')
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
    }
        // Read the response as json.
        return response.json();
    })
    .then(function(responseAsJson) {
      // Do stuff with the JSON
        console.log(responseAsJson);
    })
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
    });