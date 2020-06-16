var mongoose    = require("mongoose");

var placeSchema = new mongoose.Schema ({
    name: String,
    image: String,
    description: String,
    visited: Boolean,
    bucket_list: Boolean,
    date: String
});

module.exports = mongoose.model("Place", placeSchema); 