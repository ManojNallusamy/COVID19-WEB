var mongoose= require("mongoose");

var statewiseShcema = new mongoose.Schema({
    name: String,
    active: Number,
    recovered: Number,
    deaths: Number,
    total: Number
});

module.exports = mongoose.model("statewise",statewiseShcema);