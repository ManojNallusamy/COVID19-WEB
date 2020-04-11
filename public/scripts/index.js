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
  var daily = JSON.parse(document.querySelector("#json").textContent);  
function drawChart(chrtTitle,chrtName,colValues) {
    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();
    
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
        legend: { position: 'bottom'},
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
        ]
        //  'width':auto,
        //  'height':60%      
    };

    // Instantiate and draw the chart.
    var chart = new google.charts.Line(document.getElementById(chrtName));
    chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(()=>{ drawChart('TOTAL CASES - INDIA','chart1',['confirmed','recovered','deaths'])});
    // google.charts.setOnLoadCallback(()=>{ drawChart('DAILY CASES - INDIA','chart2',['dailyconfirmed','dailyrecovered','dailydeaths'])});


    google.charts.setOnLoadCallback(barChart);
    function barChart() {
        rows=[['Time', 'Deaths', 'Recovered', 'Confirmed']];
        var ctr=0;
        daily.forEach((day)=>{
            if(day['date'] == "01 March ")
                ctr=1;
            if(ctr==0)
            return;    
            rows.push(["  ",day['dailydeaths'],day['dailyrecovered'],day['dailyconfirmed']]);
        })
        var data = google.visualization.arrayToDataTable(rows);

        var options = {  
          chart: {
            title: 'DAILY CASES - INDIA',
            subtitle: 'Data since March 1',
          },
        //   legend: { position: 'top', maxLines: 3 },
        isStacked: true,
          colors: [   
            'red'
            ],
            
        };

        var chart = new google.charts.Bar(document.getElementById('chart2'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }