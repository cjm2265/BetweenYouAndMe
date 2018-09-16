const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    profile_id: String,
    token : String,
    name : String,
    homeStreet: String,
    homeCity: String,
    homeState: String,
    homeZip: String,
    homeLatitude: Number,
    homeLongitude: Number,
    email: String,
    pictures: [Buffer]
});

module.exports = mongoose.model('User', userSchema);