let tempChart = document.getElementById("tempChart").getContext('2d');
let pressureChart = document.getElementById("pressureChart").getContext('2d');

var chartLabels = [];
var chartDataTemp = [];
var chartDataPressure = [];

d3.json("charttestdata.json", function (data) {
    data.forEach(function (d) {
        chartLabels.push(d.time);
        chartDataTemp.push(d.temperature);
        chartDataPressure.push(d.pressure);
    })
})

setTimeout(createChart, 1000, chartLabels, chartDataTemp, tempChart, 'Temperature', 'rgba(255, 255, 0, 0.58)', true, '#989800');
setTimeout(createChart, 1000, chartLabels, chartDataPressure, pressureChart, 'Pressure', 'rgba(255, 0, 0, 0.58)', false, '#980000');

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