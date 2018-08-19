//*************************************************************
//Between You and Me
//places-swipe-screen.js
//Comes up with nearby places of interest for user to swipe on
//*************************************************************

window.onload = init;

var matchedCategories = [];
var matchedPlaces = [];

// all of these arrays are placeholders, they should be populated from a database
var myCategories = [
    {
        name: 'Restaurants',
        imgLocation: 'resources/categories/restaurants.png'
    },
    {
        name: 'Entertainment',
        imgLocation: 'resources/categories/entertainment.png'
    }
];

var theirCategories = [
    {
        name: 'Restaurants',
        imgLocation: 'resources/categories/restaurants.png'
    },
    {
        name: 'Night Life',
        imgLocation: 'resources/categories/night-life.png'
    }
];

var myPlaces = [
    {
        name: 'Sushi Restaurant',
        category: 'Restaurants',
        imgLocation: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/2007feb-sushi-odaiba-manytypes.jpg'
    },
    {
        name: 'Cinemark',
        category: 'Entertainment',
        imgLocation: 'https://s3-media1.fl.yelpcdn.com/bphoto/tj0ESMvnoJSqWBKbNZybmg/ls.jpg'
    }
];

var theirPlaces = [
    {
        name: "Pig's Eye Pub",
        category: 'Nightlife',
        imgLocation: 'https://igx.4sqi.net/img/general/600x600/1067748_4GqCfwDeCclX1HFOBXQiw-EE5s0qVn7sYR-e4d67Vxs.jpg'
    },
    {
        name: 'Sushi Restaurant',
        category: 'Restaurants',
        imgLocation: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/2007feb-sushi-odaiba-manytypes.jpg'
    },
];

function init() {

    document.querySelector('#home-button').addEventListener('click', function() {
        window.location.href = "index.html";
    });

    // determine which categories you both swiped
    myCategories.forEach(function(myCat) {
        theirCategories.forEach(function(theirCat) {
            if (myCat.name == theirCat.name) {
                matchedCategories.push(myCat);
            }
        });
    });

    // determine which places you both swiped
    myPlaces.forEach(function(myPlace) {
        theirPlaces.forEach(function(theirPlace) {
            if (myPlace.name == theirPlace.name) {
                matchedPlaces.push(myPlace);
            }
        });
    });

    // create tables
    var categoryTable = document.createElement('table');
    var placesTable = document.createElement('table');

    categoryTable.innerHTML = '<tr><th>Matched Categories:</th></tr>';
    matchedCategories.forEach(function(cat) {
        var row = categoryTable.insertRow();
        var cell = row.insertCell();
        cell.innerHTML = cat.name;
    });

    placesTable.innerHTML = '<tr><th>Matched Places:</th></tr>';
    matchedPlaces.forEach(function(place) {
        var row = placesTable.insertRow();
        var cell = row.insertCell();
        cell.innerHTML = place.name;
    });

    var container = document.querySelector('#container');
    container.appendChild(categoryTable);
    container.appendChild(placesTable);
}