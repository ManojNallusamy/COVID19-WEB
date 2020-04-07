var mongoose= require("mongoose");

var dailydataSchema = new mongoose.Schema({
    date: String,
    dailyrecovered: Number,
    dailydeaths: Number,
    dailyconfirmed: Number,
    recovered: Number,
    deaths: Number,
    confirmed: Number
});

module.exports = mongoose.model("dailydata",dailydataSchema);