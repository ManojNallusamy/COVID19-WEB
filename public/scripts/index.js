$(window).on('load',function() {
    $("body").removeClass("preload");
  });
$(document).ready(function(){
    $('table').addClass('tablesorter');
    $('table').tablesorter({
        // theme: 'blue',
        headers: {
            // set initial sort order by column, this headers option setting overrides the sortInitialOrder option
            1: { sortInitialOrder: 'asc' }
          },
        headerTemplate: '{content}{icon}',
        widgets: ['zebra','columns']
    });
  });
  document.querySelector("#option1").addEventListener("click",()=>{
      $(".disptotal").removeClass("hide");
      $(".disptotal").removeClass("hide");
      $(".disp").addClass("hide");
      $(".disp").addClass("hide");
  })
  document.querySelector("#option2").addEventListener("click",()=>{
    $(".disp").removeClass("hide");
    $(".disp").removeClass("hide");
    $(".disptotal").addClass("hide");
    $(".disptotal").addClass("hide");
  })
//   $('.total').remove();
  var daily = JSON.parse(document.querySelector("#json").textContent);  
  // daily.sort((a,b)=>{ 
  //     return new Date(a["date"])- new Date(b["date"]); 
  //    }) 
function drawChart(chrtTitle,chrtName,colValues) {
    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();
    
    // var daily = []  ;
    data.addColumn('string', '');
    data.addColumn('number', 'Cnfrmd');
    data.addColumn('number', 'Rcvrd');
    data.addColumn('number', 'Death');
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
            title: '',         
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
        rows=[['', 'Death', 'Rcvrd', 'Cnfrmd']];
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
          legend: { position: 'top', alignment: 'start' },
        //   legend: { position: 'top', maxLines: 3 },
        isStacked: true,
          colors: [   
            'red'
            ],
            
        };

        var chart = new google.charts.Bar(document.getElementById('chart2'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }

    //
    // var isOutOfViewport = function (elem) {

        // Get element's bounding
    //     var bounding = elem.getBoundingClientRect();
    
    //     // Check if it's out of the viewport on each side
    //     var out = {};
    //     out.top = bounding.top < 0;
    //     out.left = bounding.left < 0;
    //     out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
    //     out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
    //     out.any = out.top || out.left || out.bottom || out.right;
    //     out.all = out.top && out.left && out.bottom && out.right;
    
    //     return out;
    
    // };
    // var tbl = document.querySelector("table");
    // if(isOutOfViewport(tbl).right)
    // {
    //     document.querySelector("#rvd").textContent = "Rcvrd";
    // }

        