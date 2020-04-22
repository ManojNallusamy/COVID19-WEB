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
var global = require("./models/global");
//load india data
//load district data
var districtdata
request("https://api.covid19india.org/v2/state_district_wise.json",(error,response,body)=>{
    if(!error && response.statusCode == 200)
    {
        districtdata = body;
    }
})
var loadstatewise = require("./seeds");
var updatetime = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
updatetime = new Date(updatetime);
updatetime = updatetime.toLocaleTimeString();
// loadstatewise();
// var job = cron.job('0 10 * * * *',()=>{
//     updatetime =  new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
//     updatetime = new Date(updatetime);
//     updatetime = updatetime.toLocaleTimeString();
//     loadstatewise();
// },null,true,'Asia/Calcutta');
// job.start();
var st,dt;
setTimeout(()=>{
    updatetime =  new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    updatetime = new Date(updatetime);
    updatetime = updatetime.toLocaleTimeString();
    loadstatewise();
    st=undefined;
    dt=undefined;
},1000*60*5);
// var st,dt;
app.get("/",(req,res)=>{
    if(!st || !dt)
    {
        console.log("hohoooo");
        statewise.find({},(err,statedata)=>{
            dailydata.find({},(err,daily)=>{
                st=statedata;
                dt=daily;
                // console.log(daily);
                res.render("index",{statedata: statedata, daily: JSON.stringify(daily),time: updatetime});
            });
        });
    }
    if(st && dt)
    {
        res.render("index",{statedata: st, daily: JSON.stringify(dt),time: updatetime});
    }
});   

app.get("/global",(req,res)=>{
    // global.find({},(err,globaldata)=>{
    //     res.render("global",{global: globaldata});  
    // })
    res.render("global");
})


app.get("/district",(req,res)=>{
    res.render("district",{data:JSON.parse(districtdata)});
    // console.log(JSON.parse(districtdata));
})
app.get("/info",(req,res)=>{
    res.render("info");
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}    
app.listen(port,()=>{
    console.log("Covid App Server Started!!!");
})    