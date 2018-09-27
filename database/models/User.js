const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs")

let userSchema = mongoose.Schema({
    profile_id: String,
    name : String,
    password: String,
    homeStreet: String,
    homeCity: String,
    homeState: String,
    homeZip: String,
    homeLatitude: Number,
    homeLongitude: Number,
    email: String,
    pictures: [Buffer]
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);