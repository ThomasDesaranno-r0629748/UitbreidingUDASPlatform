let tempChart = document.getElementById("tempChart").getContext('2d');

var chartLabels = [];
var chartDataTemp = [];

d3.json("charttestdata.json", function (data) {
    data.forEach(function (d) {
        chartLabels.push(d.time);
        chartDataTemp.push(d.temperature);
    })
})

setTimeout(createChart, 1000, chartLabels, chartDataTemp);

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
                yAxis: [{
                    stacked: true
        }]
            }
        }
    })
}