let tempChart = document.getElementById("tempChart").getContext('2d');
let pressureChart = document.getElementById("pressureChart").getContext('2d');
let O3Chart = document.getElementById("O3Chart").getContext('2d');
let PM1Chart = document.getElementById("PM1Chart").getContext('2d');

var chartLabels = [];
var chartDataTemp = [];
var chartDataPressure = [];
var chartDataO3 = [];
var chartDataPM1 = [];

d3.json("MetingenSensor10.json", function (data) {
    data.forEach(function (d) {
        chartLabels.push(d.time);
        chartDataTemp.push(d.s1);
        chartDataPressure.push(d.s2);
        chartDataO3.push(d.s3);
        chartDataPM1.push(d.s4);
    })
})

setTimeout(createChart, 500, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
setTimeout(createChart, 500, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
setTimeout(createChart, 500, chartLabels, chartDataPressure, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
setTimeout(createChart, 500, chartLabels, chartDataPressure, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');

function createChart(chartLabels, chartData, chart, label, backgroundcolor, beginAtZero, borderColor) {
    let LineChart = new Chart(chart, {
        type: 'line'
        , data: {
            labels: chartLabels
            , datasets: [{
                label: label
                , data: chartData
                , backgroundColor: backgroundcolor
                , pointRadius: 0
                , borderColor: borderColor
        }]
        }
        , options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: beginAtZero
                    }
                }
                ]
            }
        }
    })
}