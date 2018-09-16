const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    profile_id: String,
    token : String,
    name : String,
    homeStreet: String,
    homeCity: String,
    homeState: String,
    homeLatitude: Number,
    homeLongitude: Number,
    email: String,
});

module.exports = mongoose.model('User', userSchema);