const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const config = require("./config/config")
const distanceHelper = require("./helpers/distanceHelper")

const GooglePlaces = require("googleplaces");

const portNumber = 8080
const htmlPath = __dirname + "/frontend/html/"

const places = new GooglePlaces(config.placesApi.apiKey, config.placesApi.outputFormat);

//set up app in current directory
app.use("/js", express.static(__dirname + "/frontend/js"));
app.use("/resources", express.static(__dirname + "/frontend/resources"));
app.use("/css", express.static(__dirname + "/frontend/css"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css/"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res){
	res.sendFile(htmlPath + "index.html");
});

app.get("/category-swipe-screen", (req, res) => {
    res.sendFile(htmlPath + "category-swipe-screen.html")
})

app.get("/matches-screen", (req, res) => {
    res.sendFile(htmlPath + "matches-screen.html")
})

app.get("/places-swipe-screen", (req, res) => {
    res.sendFile(htmlPath + "places-swipe-screen.html")
});

app.post("/distance-between", (req, res) => {
    res.json({distance: distanceBetween(req.body.pointA, req.body.pointB)});
})

app.post("/places-between", (req, res) => {
    let pointA = req.body.pointA;
    let pointB = req.body.pointB;
    let parameters = distanceHelper.parameters(pointA, pointB)

    places.placeSearch(parameters, (err, result) =>{
        res.json(result);
    });
})


app.listen(portNumber, function () {
  	console.log("Server started");
});
