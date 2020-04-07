function drawChart() {
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
        rows.push(["",day["confirmed"],day["recovered"],day["deaths"]]);
    })
    data.addRows(rows);
    
    // Set chart options
    var options = {
        chart: {
            title: '    Daily Growth - INDIA',
            subtitle: 'Source: MOHFW'
        },   
        hAxis: {
            title: 'Time',         
        },
        vAxis: {
            title: 'Cases',        
        }, 
        colors: [
            'blue','green','red'
        ],
        'width':550,
        'height':300      
    };

    // Instantiate and draw the chart.
    var chart = new google.charts.Line(document.getElementById('chart'));
    chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChart);