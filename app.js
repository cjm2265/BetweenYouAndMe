const express = require("express");
const app = express();
var bodyParser = require('body-parser');

var portNumber = 8080
var htmlPath = __dirname + "/frontend/html/"

//set up app in current directory
app.use("/js", express.static(__dirname + "/frontend/js"));
app.use("/resources", express.static(__dirname + "/frontend/resources"));
app.use("/css", express.static(__dirname + "/frontend/css"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css/"))
app.use(bodyParser.urlencoded({ extended: false }));

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
})


app.listen(portNumber, function () {
  	console.log("Server started");
});
