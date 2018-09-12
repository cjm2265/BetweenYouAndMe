//*************************************************************
//Between You and Me
//places-swipe-screen.js
//Comes up with nearby places of interest for user to swipe on
//*************************************************************

window.onload = init;

var imageContainer;
var placesIndex = 0;
var myPlaces = [];

// This will need to be retrieved from the server. This is just a placeholder.
var myCategories = [
    {
        name: 'Restaurants',
        imgLocation: 'resources/categories/restaurants.png'
    },
    {
        name: 'Entertainment',
        imgLocation: 'resources/categories/entertainment.png'
    },
    {
        name: 'Night Life',
        imgLocation: 'resources/categories/night-life.png'
    }
];

// also a placeholder
var places = [
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
    {
        name: 'Cinemark',
        category: 'Entertainment',
        imgLocation: 'https://s3-media1.fl.yelpcdn.com/bphoto/tj0ESMvnoJSqWBKbNZybmg/ls.jpg'
    }
];

function init() {
    document.querySelector('#yes-button').addEventListener('click', swipeRight);
    document.querySelector('#no-button').addEventListener('click', checkforNextPlace);
    document.querySelector('#home-button').addEventListener('click', function() {
        window.location.href = "/index";
    });

    imageContainer = document.querySelector('#container');

    var firstPlaceImage = document.createElement('img');
    firstPlaceImage.src = places[placesIndex].imgLocation;
    firstPlaceImage.alt = 'place: ' + places[placesIndex].name;

    imageContainer.appendChild(firstPlaceImage);
}

function swipeRight() {
    myPlaces.push(places[placesIndex]);
    checkforNextPlace();
}

function checkforNextPlace() {
    if (placesIndex < places.length - 1) {
        placesIndex++;

        var newImage = document.createElement('img');
        newImage.src = places[placesIndex].imgLocation;
        newImage.alt = 'place: ' + places[placesIndex].name;
        imageContainer.replaceChild(newImage, imageContainer.childNodes[0]);
    } else {
        window.location.href = '/matches-screen';
    }
}