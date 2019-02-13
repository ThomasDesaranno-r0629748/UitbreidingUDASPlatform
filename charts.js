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

function createChart(chartLabels, chartData){
    let tempLineChart = new Chart(tempChart, {
    type:'line',
    data:{
        labels: chartLabels,
        datasets:[{
            label: 'Temperature',
            data: chartData,
            backgroundColor: 'yellow'
        }]
    }
})
}