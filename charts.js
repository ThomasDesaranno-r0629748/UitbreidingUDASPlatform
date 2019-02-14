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

setTimeout(createChart, 1000, chartLabels, chartDataTemp, tempChart, 'Temperature', 'yellow', true);
setTimeout(createChart, 1000, chartLabels, chartDataPressure, pressureChart, 'Pressure', 'red', false);

function createChart(chartLabels, chartData, chart, label, backgroundcolor, beginAtZero) {
    let LineChart = new Chart(chart, {
        type: 'line'
        , data: {
            labels: chartLabels
            , datasets: [{
                label: label
                , data: chartData
                , backgroundColor: backgroundcolor
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