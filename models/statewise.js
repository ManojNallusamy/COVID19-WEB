var mongoose= require("mongoose");

var statewiseShcema = new mongoose.Schema({
    dailyrecovered: Number,
    dailydeaths: Number,
    dailytotal: Number,
    name: String,
    active: Number,
    recovered: Number,
    deaths: Number,
    total: Number
});

module.exports = mongoose.model("statewise",statewiseShcema);