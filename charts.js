let tempChart = document.getElementById("tempChart").getContext('2d');
console.log(tempChart + "teststetetstst");
let pressureChart = document.getElementById("pressureChart").getContext('2d');
let O3Chart = document.getElementById("O3Chart").getContext('2d');
let PM1Chart = document.getElementById("PM1Chart").getContext('2d');

var chartLabels = [];
var chartDataTemp = [];
var chartDataPressure = [];
var chartDataO3 = [];
var chartDataPM1 = [];

getData();
setTimeout(createChart, 1000, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
setTimeout(createChart, 1000, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
setTimeout(createChart, 1000, chartLabels, chartDataPressure, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
setTimeout(createChart, 1000, chartLabels, chartDataPressure, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');

setInterval(function(){
    setTimeout(createChart, 1000, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
setTimeout(createChart, 1000, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
setTimeout(createChart, 1000, chartLabels, chartDataPressure, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
setTimeout(createChart, 1000, chartLabels, chartDataPressure, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');
    getData()
}, 5*1000);

function getData() {
    
    chartLabels = [];
    chartDataTemp = [];
    chartDataPressure = [];
    chartDataO3 = [];
    chartDataPM1 = []
    d3.json("http://localhost:8080/Controller?action=returnLast24hData", function (data) {
        console.log(data)
        data.forEach(function (d) {
            chartLabels.push(d.time);
            chartDataTemp.push(d.so2);
            chartDataPressure.push(d.no2);
            chartDataO3.push(d.o3);
            chartDataPM1.push(d.pm10);
        })
    })
}

function createChart(chartLabels, chartData, chart, label, backgroundcolor, beginAtZero, borderColor) {
    let LineChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: label,
                data: chartData,
                backgroundColor: backgroundcolor,
                pointRadius: 0,
                borderColor: borderColor
        }]
        },
        options: {
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