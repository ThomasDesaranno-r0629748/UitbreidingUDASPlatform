



let tempChart = document.getElementById("tempChart").getContext('2d');

var chartLabels = [];
var chartData = [];

d3.json("charttestdata.json", function (data) {
    data.forEach(function (d) {
        chartLabels.push(d.time);
        chartData.push(d.temperature);
    })
})
console.log(chartData);
console.log(chartLabels);
setTimeout(createChart, 1000, chartLabels, chartData);

function createChart(chartLabels, chartData) {
    let tempLineChart = new Chart(tempChart, {
        type: 'line'
        , data: {
            labels: chartLabels
            , datasets: [{
                label: 'Temperature'
                , data: chartData
                , backgroundColor: 'yellow'
        }]
        }
        , options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }
                ]
            }
        }
    })
}





/*//setup size of line chart
var margin = {
        top: 20
        , right: 20
        , bottom: 30
        , left: 50
    }
    , width = 600 - margin.left - margin.right
    , height = 400 - margin.top - margin.bottom;
//parse data from file
var parseDate = d3.time.format("%X").parse;
//set scales
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
//create axes
var xAxis = d3.svg.axis().scale(x).orient("bottem");
var yAxis = d3.svg.axis().scale(y).orient("left");
//construct the line using points from data
var line = d3.svg.line().x(function (d) {
    return x(d.time);
}).y(function (d) {
    return y(d.temperature);
});

var svg = d3.select(".linechart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("charttestdata.json", function (data) {
    data.forEach(function (d) {
        d.time = parseDate(d.time);
        d.temperature = +d.temperature;
    });
    x.domain(d3.extent(data, function (d) {
        return d.time;
    }));
    y.domain(d3.extent(data, function (d) {
        return d.temperature;
    }));
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
    svg.append("g").attr("class", "y axis").call(xAxis).append("text", "rotate(-90)").text("Temperature");
    svg.append("path").datum(data).attr("class", "line").attr("d", line);
});*/