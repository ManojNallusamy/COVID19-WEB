var request = require("request"),
    statewise = require("./models/statewise"),
    dailydata = require("./models/dailydata"),
    global = require("./models/global");

var districtdata ;
function loadData()
{
    //load india data
    var url ="https://api.covid19india.org/data.json";
    request(url, function (error, response, body) {
        if(error)
        {
            console.log("Unable to retrieve India state data");
        }
        else
        {
            var data = JSON.parse(body);
            // https://covid2019-api.herokuapp.com/v2/total
            request("https://api.thevirustracker.com/free-api?global=stats",(error,response,body)=>{
                if(error)
                {
                    console.log("Unable to retrieve global data.");
                }
                else
                {
                    var body = JSON.parse(body);
                    statewise.deleteMany({},(err)=>{
                        console.log("State db Cleared.");
                        statewise.create(
                            {
                                dailyrecovered: body["results"][0]['total_recovered'],
                                dailydeaths:body["results"][0]['total_new_deaths_today'],
                                dailytotal: body["results"][0]['total_new_cases_today'],
                                name: "Global",
                                active: body["results"][0]['total_active_cases'],
                                recovered: body["results"][0]['total_recovered'],
                                deaths: body["results"][0]['total_deaths'],
                                total: body["results"][0]['total_cases']
                            });
                        data["statewise"].forEach((state)=>{
                            statewise.create(
                                {
                                    dailyrecovered: state["deltarecovered"],
                                    dailydeaths:state["deltadeaths"],
                                    dailytotal: state["deltaconfirmed"],
                                    name: state["state"],
                                    active: state["active"],
                                    recovered: state["recovered"],
                                    deaths:state["deaths"],
                                    total: state["confirmed"]
                                });
                        }) 
                        console.log("State db Updated."); 
                    });
                }
            });
        }
    });
    //Load daily data
    request("https://api.covid19india.org/data.json",(error,response,body)=>{
        if(error)
        {
            console.log("Unable to retrieve daily data.");
        }
        else
        {
            var data = JSON.parse(body);
            dailydata.deleteMany({},(err)=>{
                console.log("DB2 cleared!!!");
                data.cases_time_series.forEach((daily)=>{
                    dailydata.create(
                        {
                            date: daily["date"],
                            dailyrecovered: daily["dailyrecovered"],
                            dailydeaths: daily["dailydeceased"],
                            dailyconfirmed: daily["dailyconfirmed"],
                            recovered: daily["totalrecovered"],
                            deaths: daily["totaldeceased"],
                            confirmed: daily["totalconfirmed"]
                        });
                });
                console.log("Daily data db Updated");
            });
        }
    });
}
module.exports = loadData;
