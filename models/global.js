var mongoose= require("mongoose");

var globalSchema = new mongoose.Schema({
    dailyrecovered: Number,
    dailydeaths: Number,
    dailytotal: Number,
    name: String,
    active: Number,
    recovered: Number,
    deaths: Number,
    total: Number
});

module.exports = mongoose.model("global",globalSchema);