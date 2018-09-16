const mongoose = require("mongoose");

let dateSchema = mongoose.Schema({
    user1: String,
    user2: String,
    location: [number],
    street: String,
    city: String,
    state: String,
    zip: String,
    category: String,
    name: String,
    date: Date
})

module.exports = mongoose.model("Date", dateSchema)