//******************************************
//Between You and Me************************
//category-swipe-screen.js******************
//controls the sceen where the user ********
//swipes left/right on categories and places
//******************************************

window.onload = init;

var imageContainer;
var categoryIndex = 0;
var myCategories = []; // array of categories that user swiped right on

// array containing the different categories of dates
var categories = [
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

function init() {

    // listen for button clicks and send to necessary function
    document.querySelector('#yes-button').addEventListener('click', swipeRight);
    document.querySelector('#no-button').addEventListener('click', checkForNextCategory);

    imageContainer = document.querySelector('#container');

    var firstCategoryImg = document.createElement('img');
    firstCategoryImg.src = categories[0].imgLocation;
    firstCategoryImg.alt = 'Category: ' + categories[0].name;

    imageContainer.appendChild(firstCategoryImg);
}

// add the category to myCategories array
// see if there's another category
function swipeRight() {
    myCategories.push(categories[categoryIndex]);
    console.log(myCategories);
    checkForNextCategory();
}

// show next category if there is one, or go to the next page
function checkForNextCategory() {
    if (categoryIndex < categories.length - 1) {
        categoryIndex++;

        var newImage = document.createElement('img');
        newImage.src = categories[categoryIndex].imgLocation;
        newImage.alt = 'category: ' + categories[categoryIndex].name;
        imageContainer.replaceChild(newImage, imageContainer.childNodes[0]);
    } else {
        window.location.href = 'places-swipe-screen';
    }
}