$(window).on('load',function() {
    $("body").removeClass("preload");
  });
$(document).ready(function(){
    $('table').addClass('tablesorter');
    $('table').tablesorter({
        // theme: 'blue',
        headerTemplate: '{content}{icon}',
        widgets: ['zebra','columns']
    });
  });
function drawChart(chrtTitle,chrtName,colValues) {
    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();
    var daily = JSON.parse(document.querySelector("#json").textContent);
    // var daily = []  ;
    data.addColumn('string', 'Time');
    data.addColumn('number', 'Confirmed');
    data.addColumn('number', 'Recovered');
    data.addColumn('number', 'Deaths');
    rows=[];
    daily.forEach((day)=>{
        // if(day["date"].substring(0,2)=="15")
        // rows.push([day["date"].substring(0,2),Number(day["dailyconfirmed"])]);
        // else
        rows.push(["",day[colValues[0]],day[colValues[1]],day[colValues[2]]]);
    })
    data.addRows(rows);
    
    // Set chart options
    var options = {
        chart: {
            title: chrtTitle,
            subtitle: 'Source: MOHFW'
        },
           
        hAxis: {
            title: 'Time',         
        },
        vAxis: {
            title: 'Cases',        
        }, 
        colors: [   
            'rgb(0, 51, 102)','green','red'
        ],
        // legend: 'top',
        backgroundColor: 'whitesmoke'
        //  'width':auto,
        //  'height':60%      
    };

    // Instantiate and draw the chart.
    var chart = new google.charts.Line(document.getElementById(chrtName));
    chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(()=>{ drawChart('TOTAL CASES - INDIA','chart1',['confirmed','recovered','deaths'])});
    google.charts.setOnLoadCallback(()=>{ drawChart('DAILY CASES - INDIA','chart2',['dailyconfirmed','dailyrecovered','dailydeaths'])});