console.log("testchart");
let tempChart2 = document.getElementById("tempChart2").getContext('2d');
console.log(tempChart2 + "whuuutnfeosdfj");
let pressureChart2 = document.getElementById("pressureChart2").getContext('2d');
let O3Chart2 = document.getElementById("O3Chart2").getContext('2d');
let PM1Chart2 = document.getElementById("PM1Chart2").getContext('2d');

var chartLabels2 = [];
var chartDataTemp2 = [];
var chartDataPressure2 = [];
var chartDataO32 = [];
var chartDataPM12 = [];

d3.json("MetingenSensor10.json", function (data) {
    data.forEach(function (d) {
        chartLabels.push(d.time);
        chartDataTemp.push(d.s1);
        chartDataPressure.push(d.s2);
        chartDataO3.push(d.s3);
        chartDataPM1.push(d.s4);
    })
})

setTimeout(createChart, 500, chartLabels2, chartDataTemp2, tempChart2, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
setTimeout(createChart, 500, chartLabels2, chartDataPressure2, pressureChart2, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
setTimeout(createChart, 500, chartLabels2, chartDataPressure2, O3Chart2, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
setTimeout(createChart, 500, chartLabels2, chartDataPressure2, PM1Chart2, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');

function createChart(chartLabels2, chartData, chart, label, backgroundcolor, beginAtZero, borderColor) {
    let LineChart = new Chart(chart, {
        type: 'line'
        , data: {
            labels: chartLabels2
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