var express = require("express"),
    app=express(),
    request = require("request"),
    mongoose= require("mongoose")
    cron=require('cron');


app.set("view engine","ejs");
app.use(express.static("public"));

//DB connect
// mongoose.connect("mongodb://localhost:27017/covid_app",{useNewUrlParser: true , useUnifiedTopology: true});
mongoose.connect("mongodb+srv://manoj:newpassword@covidcluster-gze5o.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true , useUnifiedTopology: true});

var statewise = require("./models/statewise");
var dailydata = require("./models/dailydata");

//load india data
var loadstatewise = require("./seeds");
var job = cron.job('0 20 * * *',()=>{
    loadstatewise();
},null,true,'Asia/Calcutta');
job.start();
app.get("/",(req,res)=>{
    statewise.find({},(err,statedata)=>{
        dailydata.find({},(err,daily)=>{
            res.render("index",{statedata: statedata, daily: JSON.stringify(daily)});
        });
    });
});   
    
app.listen(3000,()=>{
    console.log("Covid App Server Started!!!");
})    