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
day=updatetime.getDate();
mnth=updatetime.getMonth();
var month=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
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
},1000*60*10);
// var st,dt;
// var mn=[],ans=0;
// dailydata.find({},(err,res)=>{
//     res.forEach((daily)=>{
//         mn.push(Number(daily['confirmed']))
//         // console.log(daily['confirmed']);
//     })
//     for(i=1;i<mn.length;i++)
//     {
//         ans+=mn[i]/mn[i-1];
//         console.log((mn[i])/mn[i-1]);
//     }
//     console.log("mean="+ans/(mn.length-1));
// })
var dailyarr=[],mean=0;
app.get("/",(req,res)=>{
    if(!st || !dt)
    {
        mean=0;
        dailyarr=[]
        // console.log("hohoooo");
        statewise.find({},(err,statedata)=>{
            dailydata.find({},(err,daily)=>{
                st=statedata;
                daily.sort((a,b)=>{ 
                    return new Date(a["date"])- new Date(b["date"]); 
                   }) 
                dt=daily;   
                daily.forEach((res)=>{
                    dailyarr.push(res['confirmed']);
                })
                for(i=dailyarr.length-10;i<dailyarr.length;i++)
                {
                    mean+=dailyarr[i]/dailyarr[i-1];
                }
                mean=mean/10;
                console.log(mean);
                res.render("index",{mean: mean,statedata: statedata, daily: JSON.stringify(daily),time: [updatetime,day,month[mnth]]});
            });
        });
    }
    if(st && dt)
    {
        res.render("index",{mean: mean,statedata: st, daily: JSON.stringify(dt),time: [updatetime,day,month[mnth]]});
    }

    ///////////
    // var url ="https://api.covid19india.org/data.json";
    // request(url, function (error, response, body) {
    //     if(error)
    //     {
    //         console.log("Unable to retrieve data from india DB.");
    //     }
    //     else
    //     {
    //         var statedata = body;
    //         request("https://bing.com/covid/data",(error,response,body)=>{
    //             if(error)
    //             {
    //                 console.log("Unable to retrieve from bing.");
    //             }
    //             else
    //             {
    //                 console.log(body);
    //                 // res.render("index",{statedata:statedata , global:JSON.parse(body) });
    //             }
    //         });
    //     }
    // });
    ///////////
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
  port = 4001;
}    
app.listen(port,()=>{
    console.log("Covid App Server Started!!!");
})    