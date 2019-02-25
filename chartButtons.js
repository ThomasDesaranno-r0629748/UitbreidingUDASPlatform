var last24hButton = document.getElementById("24hChart");
var lastWeekButton = document.getElementById("weekChart");
var lastMonthButton = document.getElementById("monthChart");
var lastYearButton = document.getElementById("yearChart");


var selectedChart = "24h";
var localid = 0

last24hButton.onclick = function(){
    last24hButton.style.backgroundColor = "#13abc4";
    last24hButton.style.color = "#fff";
    lastWeekButton.style.backgroundColor = "#fff";
    lastWeekButton.style.color = "#13abc4";
    lastMonthButton.style.backgroundColor = "#fff";
    lastMonthButton.style.color = "#13abc4";
    lastYearButton.style.backgroundColor = "#fff";
    lastYearButton.style.color = "#13abc4";
    createSpecificChart(id);
    selectedChart = "24h";
}

lastWeekButton.onclick = function(){
    lastWeekButton.style.backgroundColor = "#13abc4";
    lastWeekButton.style.color = "#fff";
    last24hButton.style.backgroundColor = "#fff";
    last24hButton.style.color = "#13abc4";
    lastMonthButton.style.backgroundColor = "#fff";
    lastMonthButton.style.color = "#13abc4";
    lastYearButton.style.backgroundColor = "#fff";
    lastYearButton.style.color = "#13abc4";
    selectedChart = "week";
    chartButtons(localid);
    
}

lastMonthButton.onclick = function(){
    lastMonthButton.style.backgroundColor = "#13abc4";
    lastMonthButton.style.color = "#fff";
    last24hButton.style.backgroundColor = "#fff";
    last24hButton.style.color = "#13abc4";
    lastWeekButton.style.backgroundColor = "#fff";
    lastWeekButton.style.color = "#13abc4";
    lastYearButton.style.backgroundColor = "#fff";
    lastYearButton.style.color = "#13abc4";
    selectedChart = "month";
    chartButtons(localid);
    
}

lastYearButton.onclick = function(){
    lastYearButton.style.backgroundColor = "#13abc4";
    lastYearButton.style.color = "#fff";
    last24hButton.style.backgroundColor = "#fff";
    last24hButton.style.color = "#13abc4";
    lastWeekButton.style.backgroundColor = "#fff";
    lastWeekButton.style.color = "#13abc4";
    lastMonthButton.style.backgroundColor = "#fff";
    lastMonthButton.style.color = "#13abc4";
    selectedChart = "year";
    chartButtons(localid);
    
}




function chartButtons(id){
    console.log(localid)
    localid = id;
    if(selectedChart == "24h"){
        createSpecificChart(id);
    } 
    if(selectedChart == "week"){
        createSpecificChartLink(id, "http://localhost:8080/Controller?action=returnWeekData", "week");
    } 
    if(selectedChart == "month") {
        createSpecificChartLink(id, "http://localhost:8080/Controller?action=returnWeekData", "month");
    } 
    if(selectedChart == "year") {
        createSpecificChartLink(id, "http://localhost:8080/Controller?action=returnWeekData", "year");
    }
        
}

