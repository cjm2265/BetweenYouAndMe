const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const passport = require("passport");
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt");

const config = require("./config/config")
const distanceHelper = require("./helpers/distanceHelper")
const searchQueryFormatter = require("./helpers/searchAddressHelper")

const GooglePlaces = require("googleplaces");

const portNumber = 8080
const htmlPath = __dirname + "/frontend/html/"
const serverSecret = "betweenUnMe"

const mongoose = require("mongoose");
mongoose.connect(config.mongoAddress)

const places = new GooglePlaces(config.placesApi.apiKey, config.placesApi.outputFormat);

//set up app in current directory
app.use("/js", express.static(__dirname + "/frontend/js"));
app.use("/resources", express.static(__dirname + "/frontend/resources"));
app.use("/css", express.static(__dirname + "/frontend/css"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css/"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const authenticate = expressJwt({secret: serverSecret})

require("./database/passport")(passport);

app.get("/", function (req, res) {
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
    res.json({ distance: distanceBetween(req.body.pointA, req.body.pointB) });
})

app.post("/places-between", (req, res) => {
    let pointA = req.body.pointA;
    let pointB = req.body.pointB;
    let parameters = distanceHelper.parameters(pointA, pointB)

    places.placeSearch(parameters, (err, result) => {
        res.json(result);
    });
})

app.post("/signup", (req, res, next) => {
    passport.authenticate("local-signup", (err, user, info) => {
        if (err)
            return res.status(500).send(err);
        if (user)
            res.json({ message: "success" });
        else
            res.json(info);
    })(req, res, next)
})

app.post("/getUser", (req, res, next) => {
    passport.authenticate("local-login", (err, user, info) => {
        if (err)
            return res.status(500).send(err);
        if (user)
            res.json(user);
        else
            res.json(info);
    })(req, res, next);
});

app.post("/getToken", (req, res, next) => {
    passport.authenticate("local-login", (err, user, info) => {
        if (err)
            return res.status(500).send(err);
        if (user){
            generateToken(req, user, () => {
                res.json({token: req.token})
            })
        }
        else
            res.json(info);
    })(req, res, next);
});

app.post("/isAuthenticated", authenticate, (req, res) => {
    if(req.user)
        res.send(true);
    else
        res.send(false);
})

app.get("/searchAddress", (req, res) => {
    try{
        let query = searchQueryFormatter(req.query);
        places.placeSearch(query, (err, response) => {
            if(err)
                res.status(500).json({message: err.message});
            else
                res.json(response)
        });
    } catch(err){
        res.status(400).json({message: err.message})
    }
});

var generateToken = (req, user, next) => {
    req.token = jwt.sign({
        id: user.id,
    }, serverSecret);
    next();
}

app.listen(portNumber, function () {
    console.log("Server started");
});
