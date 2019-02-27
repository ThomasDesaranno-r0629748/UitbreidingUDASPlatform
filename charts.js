let tempChart = document.getElementById("tempChart").getContext('2d');
let pressureChart = document.getElementById("pressureChart").getContext('2d');
let O3Chart = document.getElementById("O3Chart").getContext('2d');
let PM1Chart = document.getElementById("PM1Chart").getContext('2d');
var chartLabels = [];
var chartDataTemp = [];
var chartDataPressure = [];
var chartDataO3 = [];
var chartDataPM1 = [];

function getData(id) {
    chartLabels = [];
    chartDataTemp = [];
    chartDataPressure = [];
    chartDataO3 = [];
    chartDataPM1 = []
    d3.json("dummyData24h.json", function (data) {
        data.forEach(function (d) {
            if (d.deviceId == id) {
                chartLabels.push(d.time);
                chartDataTemp.push(d.so2);
                chartDataPressure.push(d.no2);
                chartDataO3.push(d.o3);
                chartDataPM1.push(d.pm10);
            }
        })

    })
}

function getDataLink(id, link, labelFormat) {
    chartLabels = [];
    chartDataTemp = [];
    chartDataPressure = [];
    chartDataO3 = [];
    chartDataPM1 = []
    d3.json(link, function (data) {
        data.forEach(function (d) {
            if (d.deviceId == id) {
                if(labelFormat == "24h"){
                    chartLabels.push(d.time);
                }
                if(labelFormat == "week"){
                    chartLabels.push(d.date);
                }
                if(labelFormat == "month"){
                    chartLabels.push(d.date);
                }
                if(labelFormat == "2Days"){
                    var time = d.time;
                    var date = d.date.substr(5,10);
                    chartLabels.push(date + " " + time);
                }
                chartDataTemp.push(d.so2);
                chartDataPressure.push(d.no2);
                chartDataO3.push(d.o3);
                chartDataPM1.push(d.pm10);
            }
        })
        if(labelFormat != "24h") chartLabels.reverse()
    })
}

function createSpecificChartLink(id, link, labelFormat) {
    if (id == 0) {
        chartLabels = [];
        chartDataTemp = [];
        chartDataPressure = [];
        chartDataO3 = [];
        chartDataPM1 = []
    }
    if (id != 0) {
        getDataLink(id, link, labelFormat);
    }
    setTimeout(createChart, 1000, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
    setTimeout(createChart, 1000, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
    setTimeout(createChart, 1000, chartLabels, chartDataO3, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
    setTimeout(createChart, 1000, chartLabels, chartDataPM1, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');
}

function createSpecificChart(id) {
    if (id == 0) {
        chartLabels = [];
        chartDataTemp = [];
        chartDataPressure = [];
        chartDataO3 = [];
        chartDataPM1 = []
    }
    if (id != 0) {
        getData(id);
    }
    setTimeout(createChart, 1000, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
    setTimeout(createChart, 1000, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
    setTimeout(createChart, 1000, chartLabels, chartDataO3, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
    setTimeout(createChart, 1000, chartLabels, chartDataPM1, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');
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
            responsive: true,
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