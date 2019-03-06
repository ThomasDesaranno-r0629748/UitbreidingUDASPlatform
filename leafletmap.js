////////////////////////////////////////////////
////////////////VARIABLES////////////////
////////////////////////////////////////////////
// initialize the map
var map = L.map('map');
// load a tile layer
mapLink = '<a href="http://www.esri.com/">Esri</a>';
wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
var Satelite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; ' + mapLink + ', ' + wholink,
    maxZoom: 19,
})
var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    minZoom: 1,
    maxZoom: 19
}).addTo(map);
//API key
var OWM_API_KEY = '3361df6687a5458ad0f9e3556c666018';
//Overlay  maps
var clouds = L.OWM.clouds({
    opacity: 0.8,
    legendImagePath: '/NT2.png',
    appId: OWM_API_KEY
});
var rain = L.OWM.rain({
    opacity: 0.5,
    appId: OWM_API_KEY
});

var snow = L.OWM.snow({
    opacity: 0.5,
    appId: OWM_API_KEY
});

var pressurecntr = L.OWM.pressureContour({
    opacity: 0.5,
    appId: OWM_API_KEY
});
var temp = L.OWM.temperature({
    opacity: 0.5,
    appId: OWM_API_KEY
});
var wind = L.OWM.wind({
    opacity: 0.5,
    appId: OWM_API_KEY
});
var baseMaps = {
    "Streets": Wikimedia,
    "Satelite": Satelite
};
var overlayMaps = {
    "Clouds": clouds,
    "Rain": rain,
    "Snow": snow,
    "Pressure contour": pressurecntr,
    "Temperature": temp,
    "Wind": wind
};
//Add overlays to map
L.control.layers(baseMaps, overlayMaps).addTo(map);
//Markers clustergroups
var markersTemp = L.layerGroup();
var markerHumidity = L.layerGroup();
var markerRadial = L.layerGroup();
//Add searchbar to map
var controlSearch = new L.Control.Search({
    position: 'topright',
    layer: markersTemp,
    initial: false,
    zoom: 18,
    marker: false
});
map.addControl(controlSearch);
//Current city displayed
var cityname = "stad";
//Current chemicals displayed
var displaystate = "SO2";
//Clickable map popups
var popup = L.po
var popup = L.popup();
//Varaibles for compare charts
var comparegraphs = 0;
var id = 0;
//List with sensors to compare
var ssensor = [];
//Boolean to check if sensor is already clicked
var selected = false;
//Boolean to check if we are comparing sensors or not
var compare = false;
//Graphs
let tempChart2 = document.getElementById("tempChart2").getContext('2d');
let pressureChart2 = document.getElementById("pressureChart2").getContext('2d');
let O3Chart2 = document.getElementById("O3Chart2").getContext('2d');
let PM1Chart2 = document.getElementById("PM1Chart2").getContext('2d');
//Lists with data for the compare charts
var idList = [];
var labelList = [];
var chartSO2List = [];
var chartNO2List = [];
var chartO3List = [];
var chartPM10List = [];
var colorList = ["#ff3434", "#00a80d", "#34d8ff", "#c834ff", "#0000e3"];
var labelsList = [];
//Compare sensors butonns
var last24hCButton = document.getElementById("24hChartC");
var lastWeekCButton = document.getElementById("weekChartC");
var lastMonthCButton = document.getElementById("monthChartC");
var lastYearCButton = document.getElementById("2DaysChartC");
var choosebutton = document.getElementById("choosedates");
//Says what button is selected to display right data
var selectedCompareChart = "24h";
//ChartCollection charts
let tempChart = document.getElementById("tempChart").getContext('2d');
let pressureChart = document.getElementById("pressureChart").getContext('2d');
let O3Chart = document.getElementById("O3Chart").getContext('2d');
let PM1Chart = document.getElementById("PM1Chart").getContext('2d');
//Chartcollection lists
var chartLabels = [];
var chartDataTemp = [];
var chartDataPressure = [];
var chartDataO3 = [];
var chartDataPM1 = [];
//Chartcollection buttons
var last24hButton = document.getElementById("24hChart");
var lastWeekButton = document.getElementById("weekChart");
var lastMonthButton = document.getElementById("monthChart");
var lastYearButton = document.getElementById("2DaysChart");
//Chartcollection selected button
var selectedChart = "24h";
var localid = 0


////////////////////////////////////////////////
////////////////EXECUTABLE CODE////////////////
////////////////////////////////////////////////
/*
////////////////
On document load
////////////////
*/
document.addEventListener("DOMContentLoaded", function () {
    lastMomentDataPull(0);
});
/*
/////////////////////////////////////
Places the sensor on their locations
/////////////////////////////////////
*/
//JSON file that contains the sensor names, longitude, latitude and it's device id
d3.json("SensorLocaties.json", function (data) {
    var longem = 0;
    var latgem = 0;
    var mapLat = 0;
    var mapLon = 0;
    var amountData = 0;
    data.forEach(function (d) {
        d.lat = +d.lat;
        d.lon = +d.lon;
        mapLat = mapLat + d.lat;
        mapLon = mapLon + d.lon;
        amountData++;
        var sensor = L.marker([d.lat, d.lon], {
            title: d.naam,
            icon: iconPicker(d.s1, 14, 38, 59, 80) //Standaardwaarden SO2
        });
        sensor.bindPopup("Locatie: " + d.naam);
        sensor.on('click', onCircleClick, d);
        markersTemp.addLayer(sensor);
    });
    markerRadial.addTo(map);
    markersTemp.addTo(map);
    longem = mapLon / amountData;
    latgem = mapLat / amountData;
    getCurrentLocation(latgem, longem);
    map.setView([mapLat / amountData, mapLon / amountData], 14);
})
/*
////////////////////////////////////////////////////////////////////////////////
Changes currently displayed chemical and gives changeDust buttons a function
////////////////////////////////////////////////////////////////////////////////
*/
document.getElementById("changePM10").onclick = function () {
    document.getElementById("displayeddust").innerHTML = "PM10";
    displaystate = "PM10";
    adjustIcon();
}
document.getElementById("changeO3").onclick = function () {
    document.getElementById("displayeddust").innerHTML = "O3";
    displaystate = "O3";
    adjustIcon();
}
document.getElementById("changeSO2").onclick = function () {
    document.getElementById("displayeddust").innerHTML = "SO2";
    displaystate = "SO2";
    adjustIcon();
}
document.getElementById("changeNO2").onclick = function () {
    document.getElementById("displayeddust").innerHTML = "NO2";
    displaystate = "NO2";
    adjustIcon();
}
/*
//////////////////////
Close chart collection
//////////////////////
*/
document.getElementById("closeChartCollection").onclick = function () {
    document.getElementById("chartCollection").style.visibility = "hidden";
}
/*
////////////////////////////
Close compare chart screen
////////////////////////////
*/
document.getElementById("closecompare").onclick = function () {
    compare = false;
    document.getElementById("comparePart").style.visibility = "hidden";
    document.getElementById("comparePart").style.display = "none";
    document.getElementById("compare").style.visibility = "visible";
    document.getElementById("map").style.height = "100%";
    document.getElementById("legendCollection").style.bottom = "5%";
}
/*
//////////////////////////////////////////////
Sets functions for eacht compare charts button
//////////////////////////////////////////////
*/
last24hCButton.onclick = function () {
    last24hCButton.style.backgroundColor = "#13abc4";
    last24hCButton.style.color = "#fff";
    lastWeekCButton.style.backgroundColor = "#fff";
    lastWeekCButton.style.color = "#13abc4";
    lastMonthCButton.style.backgroundColor = "#fff";
    lastMonthCButton.style.color = "#13abc4";
    lastYearCButton.style.backgroundColor = "#fff";
    lastYearCButton.style.color = "#13abc4";
    selectedCompareChart = "24h";
    chartCompareButtons();
}
lastWeekCButton.onclick = function () {
    lastWeekCButton.style.backgroundColor = "#13abc4";
    lastWeekCButton.style.color = "#fff";
    last24hCButton.style.backgroundColor = "#fff";
    last24hCButton.style.color = "#13abc4";
    lastMonthCButton.style.backgroundColor = "#fff";
    lastMonthCButton.style.color = "#13abc4";
    lastYearCButton.style.backgroundColor = "#fff";
    lastYearCButton.style.color = "#13abc4";
    selectedCompareChart = "week";
    chartCompareButtons();
}
lastMonthCButton.onclick = function () {
    lastMonthCButton.style.backgroundColor = "#13abc4";
    lastMonthCButton.style.color = "#fff";
    last24hCButton.style.backgroundColor = "#fff";
    last24hCButton.style.color = "#13abc4";
    lastWeekCButton.style.backgroundColor = "#fff";
    lastWeekCButton.style.color = "#13abc4";
    lastYearCButton.style.backgroundColor = "#fff";
    lastYearCButton.style.color = "#13abc4";
    selectedCompareChart = "month";
    chartCompareButtons();
}
lastYearCButton.onclick = function () {
    lastYearCButton.style.backgroundColor = "#13abc4";
    lastYearCButton.style.color = "#fff";
    last24hCButton.style.backgroundColor = "#fff";
    last24hCButton.style.color = "#13abc4";
    lastWeekCButton.style.backgroundColor = "#fff";
    lastWeekCButton.style.color = "#13abc4";
    lastMonthCButton.style.backgroundColor = "#fff";
    lastMonthCButton.style.color = "#13abc4";
    selectedCompareChart = "2Days";
    chartCompareButtons();
}

choosebutton.onclick = function () {
    lastYearCButton.style.backgroundColor = "#13abc4";
    lastYearCButton.style.color = "#fff";
    last24hCButton.style.backgroundColor = "#fff";
    last24hCButton.style.color = "#13abc4";
    lastWeekCButton.style.backgroundColor = "#fff";
    lastWeekCButton.style.color = "#13abc4";
    lastMonthCButton.style.backgroundColor = "#fff";
    lastMonthCButton.style.color = "#13abc4";
    selectedCompareChart = "choose";
    chartCompareButtons();
}
//Refresh map data
setInterval(function () {
    adjustIcon();
}, 5 * 1000)

/*
////////////////////////////////////////////////
Sets functions for eacht chartcollection button
////////////////////////////////////////////////
*/
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
    selectedChart = "2Days";
    chartButtons(localid);
    
}


/////////////////////////////////////////////////////////////////
////////////////////////////FUNCTIONS////////////////////////////
/////////////////////////////////////////////////////////////////

/*
////////////////////////////////////////////////////////////////////////////////
Pick the right icon for each value, set zoom and set set values for chemical
////////////////////////////////////////////////////////////////////////////////
*/
function iconPicker(temperature, zoom, good, moderate, bad) {
    var iconSize = zoom + 10;
    var shadowSize = Math.pow((zoom * 10), zoom / (30 - (zoom - zoom / 10))) + 50;
    if (temperature == "" || temperature == null || temperature < 0) {
        var icon = L.icon({
            iconUrl: 'images/blacksensor.png',
            iconSize: [iconSize * 1.2, iconSize], // size of the icon
            iconAnchor: [iconSize / 2, iconSize / 2], // point of the icon which will correspond to 
        });
        return icon;
    }
    if (temperature >= 0 && temperature < good) {
        var icon = L.icon({
            iconUrl: 'images/sensors/greensensor.png',
            shadowUrl: 'images/greenRadial.png',
            shadowAnchor: [shadowSize / 2.11, shadowSize / 2],
            shadowSize: [shadowSize, shadowSize],
            iconSize: [iconSize * 1.2, iconSize], // size of the icon
            iconAnchor: [iconSize / 2, iconSize / 2], // point of the icon which will correspond to 
        });
        return icon;
    }
    if (temperature >= good && temperature < moderate) {
        var icon = L.icon({
            iconUrl: 'images/sensors/yellowsensor.png',
            shadowUrl: 'images/yellowRadial.png',
            shadowAnchor: [shadowSize / 2, shadowSize / 2],
            shadowSize: [shadowSize, shadowSize],
            iconSize: [iconSize * 1.2, iconSize], // size of the icon
            iconAnchor: [iconSize / 2, iconSize / 2], // point of the icon which will correspond to 
        });
        return icon;
    }
    if (temperature >= moderate && temperature < bad) {
        var icon = L.icon({
            iconUrl: 'images/sensors/orangesensor.png',
            shadowUrl: 'images/orangeRadial.png',
            shadowAnchor: [shadowSize / 2, shadowSize / 2],
            shadowSize: [shadowSize, shadowSize],
            iconSize: [iconSize * 1.2, iconSize], // size of the icon
            iconAnchor: [iconSize / 2, iconSize / 2], // point of the icon which will correspond to 
        });
        return icon;
    }
    if (temperature >= bad) {
        var icon = L.icon({
            iconUrl: 'images/sensors/redsensor.png',
            shadowUrl: 'images/redRadial.png',
            shadowAnchor: [shadowSize / 2, shadowSize / 2],
            shadowSize: [shadowSize, shadowSize],
            iconSize: [iconSize * 1.2, iconSize], // size of the icon
            iconAnchor: [iconSize / 2, iconSize / 2], // point of the icon which will correspond to 
        });
        return icon;
    }
}
/*
////////////////////////////////////////////////
Pull the last measured data for given sensor
////////////////////////////////////////////////
*/
function lastMomentDataPull(id) {
    //Fill in right API link for last measured data for each sensor
    d3.json("dummyData.json", function (data) {
        var idInPull = false;
        data.forEach(function (d) {
            if (d.deviceId == id) {
                idInPull = true;
                document.getElementById("lastDate").innerHTML = d.date;
                document.getElementById("lastTime").innerHTML = d.time;
                if (d.so2 != null) {
                    document.getElementById("SO2").innerHTML = d.so2 + " ug/m3";
                }
                if (d.no2 != null) {
                    document.getElementById("NO2").innerHTML = d.no2 + " ug/m3";
                }
                if (d.o3 != null) {
                    document.getElementById("O3").innerHTML = d.o3 + " ug/m3";
                }
                if (d.pm10 != null) {
                    document.getElementById("PM1").innerHTML = d.pm10 + " ug/m3";
                }
            }
        })
        if (!idInPull) {
            document.getElementById("SO2").innerHTML = "NA";
            document.getElementById("NO2").innerHTML = "NA";
            document.getElementById("O3").innerHTML = "NA";
            document.getElementById("PM1").innerHTML = "NA";
            document.getElementById("lastDate").innerHTML = "NA";
            document.getElementById("lastTime").innerHTML = "NA";
        }
    })
}

/*
////////////////////////////////////////////////////////////////
Sets the general location of the sensors (usually a city)
////////////////////////////////////////////////////////////////
*/
function getCurrentLocation(latitude, longitude) {
    fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + OWM_API_KEY).then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            cityname = data.name;
            document.getElementById("locationCity").innerHTML = cityname;
        }).catch(function () {
            // catch any errors
        });
}

/*
/////////////////////////////////////////////////
Adjusts icons size when zoomed out or zoomed in
/////////////////////////////////////////////////
*/
function adjustIcon() {
    var currentZoom = map.getZoom();
    //JSON file that contains the sensor names, longitude, latitude and it's device id
    d3.json("SensorLocaties.json", function (data) {
        data.forEach(function (sensord) {
            markersTemp.eachLayer(function (d) {
                if (d._latlng.lat == sensord.lat && d._latlng.lng == sensord.lon) {
                    //Fill in API link that returns last measurament for each sensor
                    d3.json("dummyData.json", function (metingd) {
                        metingd.forEach(function (meting) {
                            if (sensord.Deviceid == meting.deviceId && displaystate == "SO2") {
                                //Values can be adjusted to whatever fits best for you
                                d.setIcon(iconPicker(meting.so2, currentZoom, 38, 59, 80));
                            }
                            if (sensord.Deviceid == meting.deviceId && displaystate == "NO2") {
                                //Values can be adjusted to whatever fits best for you
                                d.setIcon(iconPicker(meting.no2, currentZoom, 80, 180, 122));
                            }
                            if (sensord.Deviceid == meting.deviceId && displaystate == "O3") {
                                //Values can be adjusted to whatever fits best for you
                                d.setIcon(iconPicker(meting.o3, currentZoom, 17, 20, 24));
                            }
                            if (sensord.Deviceid == meting.deviceId && displaystate == "PM10") {
                                //Values can be adjusted to whatever fits best for you
                                d.setIcon(iconPicker(meting.pm10, currentZoom, 50, 75, 100)); //NOG VERANDEREN
                            }
                        })
                    })
                }
            });
        });
    });
}
map.on('zoomend', adjustIcon);

/*
//////////////////////////////////////////////////////////////////
When clicked on map, set visibility from chartcollection to hidden
//////////////////////////////////////////////////////////////////
*/
function onMapClick(e) {
    document.getElementById("chartCollection").style.visibility = "hidden";
}
map.on('click', onMapClick);
/*
///////////////////////////////////////////
When icon is clicked, execute this function
///////////////////////////////////////////
*/
function onCircleClick(obj) {
    //Set current measuraments to "Loading"
    document.getElementById("SO2").innerHTML = "Loading";
    document.getElementById("NO2").innerHTML = "Loading";
    document.getElementById("O3").innerHTML = "Loading";
    document.getElementById("PM1").innerHTML = "Loading";
    document.getElementById("lastDate").innerHTML = "Loading";
    document.getElementById("lastTime").innerHTML = "Loading";
    //Creates empty chart
    createSpecificChart(0);
    //Execute if we are not comparing charts
    if (compare == false) {
        document.getElementById("chartCollection").style.visibility = "visible";
        //Select correct id for clicked icon
        //JSON file that contains the sensor names, longitude, latitude and it's device id
        d3.json("SensorLocaties.json", function (data) {
            data.forEach(function (d) {
                if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                    document.getElementById("sensorName").innerHTML = d.naam;
                    id = d.Deviceid;
                }
            })
            //Pull right data for given id and add to chartcollection
            lastMomentDataPull(id);
            chartButtons(id);
        });
        //Refresh last measuraments every 10 seconds
        setInterval(function () {
            lastMomentDataPull(id);
        }, 10 * 1000);
    }
    //Execute if we are comparing charts
    if (compare == true) {
        document.getElementById("comparePart").style.display = "contents";
        comparegraphs += 1;
        //Add clicked sensor to sensorlist and display on compare screen
        //JSON file that contains the sensor names, longitude, latitude and it's device id
        d3.json("SensorLocaties.json", function (data) {
            data.forEach(function (d) {
                if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                    document.getElementById("sensorName").innerHTML = d.naam;
                    id = d.Deviceid;
                    idList.push(d.Deviceid);
                    selectedSensors(d.naam);
                }
            })
            //Pull latest data for given id
            lastMomentDataPull(id);
        });
    }
}

/*
///////////////////////////////////////////
Function to create compare graphs
///////////////////////////////////////////
*/
function selectedSensors(naam) {
    //Sets max compareable sensors to 5
    if (ssensor.length >= 5) {
        return window.alert("maximum 5 sensors to be selected");
    }
    selected = false;
    //Checks if clicked sensor is already selected
    ssensor.forEach(function (s) {
        if (" " + naam + " " == s) {
            selected = true;
            return window.alert("sensor already selected");
        }
    })
    //Create graphs for each clicked sensor
    if (selected == false) {
        ssensor.push(" " + naam + " ");
        labelList.push(naam);
        setsensornames();
        chartCompareButtons();
        setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
        setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
        setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
        setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);
    }
}
/*
/////////////////////////////////////////////////
Gives color to each clicked sensor when comparing
/////////////////////////////////////////////////
*/
function setsensornames() {
    var l = ssensor.length;
    var n = 1;
    ssensor.forEach(function (v) {
        var sensor = document.getElementById("selectedsensor" + n);
        sensor.style.display = "block";
        document.getElementById("sesensor" + n).innerHTML = v;
        if (n == 1) {
            sensor.style.backgroundColor = "#ff3434";
        } else if (n == 2) {
            sensor.style.backgroundColor = "#00bc0f";
        } else if (n == 3) {
            sensor.style.backgroundColor = "#34d8ff";
        } else if (n == 4) {
            sensor.style.backgroundColor = "#c834ff";
        } else if (n == 5) {
            sensor.style.backgroundColor = "#0000e3";
        }
        n++;
    })
}
/*
///////////////////////////////////////////////////////////
Removes sensor from compare sensors list (executed in HTML)
///////////////////////////////////////////////////////////
*/
function remove(num) {
    var n = 1;
    document.getElementById("selectedsensor" + ssensor.length).style.display = "none";
    document.getElementById("sesensor" + ssensor.length).innerHTML = "no";
    ssensor.splice(num - 1, 1);
    setsensornames();
    chartSO2List = [];
    chartNO2List = [];
    chartO3List = [];
    chartPM10List = [];
    labelsList = [];
    idList.splice(num - 1, 1);
    console.log(idList)
    chartCompareButtons();
    /*   setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
       setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
       setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
       setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);*/
}
/*
///////////////////////////////////////////////
Set compare screen to visible and create charts
///////////////////////////////////////////////
*/
function comparePage() {
    compare = true;
    document.getElementById("comparePart").style.visibility = "visible";
    document.getElementById("comparePart").style.display = "contents";
    document.getElementById("compare").style.visibility = "hidden";
    document.getElementById("map").style.height = "50%";
    document.getElementById("legendCollection").style.bottom = "52%";
    document.getElementById("chartCollection").style.visibility = "hidden";
    chartCompareButtons();
    setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
    setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
    setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
    setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);
}
/*
/////////////////////////////////////////////////////////////
Add data for specific id from specific link to comparecharts
/////////////////////////////////////////////////////////////
*/
//Uses the API link for respective format given in labelformat 
//(example: link=www.localhost/24hData.com, labelformat=24h)
function addDataId(link, labelFormat, startdate, enddate) {
    var chartLabelsId = [];
    var chartDataTempId = [];
    var chartDataPressureId = [];
    var chartDataO3Id = [];
    var chartDataPM1Id = [];
    d3.json(link, function (data) {
        if (idList.length != 0) {
            for (i = 0; i < idList.length; i++) {
                var idFromList = idList[i];
                //var cho to check if the set dates button was pressed
                var cho = false;
                data.forEach(function (d) {
                    if (d.deviceId == idFromList) {
                        if (labelFormat == "24h") {
                            chartLabelsId.push(d.time);
                        }
                        if (labelFormat == "week") {
                            chartLabelsId.push(d.date);
                        }
                        if (labelFormat == "month") {
                            chartLabelsId.push(d.date);
                        }
                        if (labelFormat == "2Days") {
                            var time = d.time;
                            var date = d.date.substr(5, 10);
                            chartLabelsId.push(date + " " + time);
                        }
                        if (labelFormat == "choose") {
                            cho = true;
                            var dat = d.date + " " + d.time;
                            var dats = new Date(dat);

                            console.log(startdate + "start");
                            console.log(enddate + "end");
                            console.log(dats);
                            //check in all the dates for the dates that are in the chosen values
                            if (dats.getTime() >= startdate.getTime()) {
                                if (dats.getTime() <= enddate.getTime()) {
                                    var time = d.time;
                                    var date = d.date.substr(5, 10);
                                    chartLabelsId.push(date + " " + time);
                                    chartDataTempId.push(d.so2);
                                    chartDataPressureId.push(d.no2);
                                    chartDataO3Id.push(d.o3);
                                    chartDataPM1Id.push(d.pm10);
                                }
                            }
                        }
                        if (choo == false) {
                            console.log("whhuuuu");
                            chartDataTempId.push(d.so2);
                            chartDataPressureId.push(d.no2);
                            chartDataO3Id.push(d.o3);
                            chartDataPM1Id.push(d.pm10);
                        }
                    }
                })
                if (labelFormat != "24h") {
                    chartLabelsId.reverse();
                }
                chartSO2List.push(chartDataTempId);
                chartNO2List.push(chartDataPressureId);
                chartO3List.push(chartDataO3Id);
                chartPM10List.push(chartDataPM1Id);
                labelsList = chartLabelsId;
                chartLabelsId = [];
                chartDataTempId = [];
                chartDataPressureId = [];
                chartDataO3Id = [];
                chartDataPM1Id = [];
                setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
                setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
                setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
                setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);
                console.log("end");
            }
        } else {
            setTimeout(createChartCompare, 0, labelsList, chartSO2List, tempChart2, labelList, true, colorList);
            setTimeout(createChartCompare, 0, labelsList, chartNO2List, pressureChart2, labelList, true, colorList);
            setTimeout(createChartCompare, 0, labelsList, chartO3List, O3Chart2, labelList, true, colorList);
            setTimeout(createChartCompare, 0, labelsList, chartPM10List, PM1Chart2, labelList, true, colorList);
        }
    })

}
/*
//////////////////////////////////////////
Creates a compare chart with given sensors
//////////////////////////////////////////
*/
function createChartCompare(chartLabels, chartData, chart, labelList, beginAtZero, borderColor) {
    var dangerLine = [];
    var mediumLine = [];
    var goodLine = [];
    for (i = 0; i < chartLabels.length; i++) {
        if (chart == tempChart2) {
            dangerLine.push(100);
            mediumLine.push(59);
            goodLine.push(38);
        }
        if (chart == pressureChart2) {
            dangerLine.push(200);
            mediumLine.push(122);
            goodLine.push(80);
        }
        if (chart == O3Chart2) {
            dangerLine.push(100);
            mediumLine.push(20);
            goodLine.push(17);
        }
        if (chart == PM1Chart2) {
            dangerLine.push(100);
            mediumLine.push(75);
            goodLine.push(50);
        }

    }
    let LineChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                    data: chartData[0],
                    pointRadius: 0,
                    borderColor: borderColor[0],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                    }
                         , {
                    data: chartData[1],
                    pointRadius: 0,
                    borderColor: borderColor[1],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                    },

                {
                    data: chartData[2],
                    pointRadius: 0,
                    borderColor: borderColor[2],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                     }
                         , {
                    data: chartData[3],
                    pointRadius: 0,
                    borderColor: borderColor[3],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                    }
                         , {
                    data: chartData[4],
                    pointRadius: 0,
                    borderColor: borderColor[4],
                    backgroundColor: "rgba(255, 255, 255, 0)"
                    }
                                , {
                    data: goodLine,
                    pointRadius: 0,
                    borderColor: "rgba(38, 255, 0, 0.48)",
                    backgroundColor: "rgba(0, 255, 38, 0.83)"
                    }, {
                    data: mediumLine,
                    pointRadius: 0,
                    borderColor: "rgba(226, 255, 0, 0.71)",
                    backgroundColor: "rgba(206, 255, 0, 0.92)"
                    },
                {
                    data: dangerLine,
                    pointRadius: 0,
                    borderColor: "rgba(195, 0, 0, 0.22)",
                    backgroundColor: "rgba(255, 0, 0, 0.51)"
                    }
                        ]
        },
        options: {
            legend: {
                display: false
            },
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
/*
////////////////////////////////////////////////////
Fills charts with right data with addDataId function
////////////////////////////////////////////////////
*/
function chartCompareButtons() {
    chartSO2List = [];
    chartNO2List = [];
    chartO3List = [];
    chartPM10List = [];
    labelsList = [];
    if (selectedCompareChart == "24h") {
        //Fill in the rigth API link to return the last 24h data for all sensors
        addDataId("dummyData24h.json", "24h", null);
    }
    if (selectedCompareChart == "week") {
        //Fill in the rigth API link to return the last week data for all sensors
        addDataId("dummyData.json", "week", null);
    }
    if (selectedCompareChart == "month") {
        //Fill in the rigth API link to return the last month data for all sensors
        addDataId("http://localhost:8080/Controller?action=returnWeekData", "month", null);
    }
    if (selectedCompareChart == "2Days") {
        //Fill in the rigth API link to return the last 2 days data for all sensors
        addDataId("dummyData2Days.json", "2Days", null);
    }
    if (selectedCompareChart == "choose") {
        var startDate = new Date(document.getElementById('startDate').value + " " + document.getElementById('startTime').value);
            var endDate = new Date(document.getElementById('endDate').value + " " + document.getElementById('endTime').value);
        //Fill in the right API key with all the data
            addDataId("dummyData.json", "choose", startDate, endDate);
    }
}

///////////////////////////////////////////////////////
// set the standard values for the set dates buttons
///////////////////////////////////////////////////////
var date = new Date();
var currentDate = date.toISOString().slice(0, 10);
var currentTime = date.getHours() + ':' + date.getMinutes();

document.getElementById('startDate').value = currentDate;
document.getElementById('startTime').value = currentTime;
document.getElementById('endDate').value = currentDate;
document.getElementById('endTime').value = currentTime;


/*
////////////////////////////////////////////////////
Get data for chartcollection charts
////////////////////////////////////////////////////
*/
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
/*
////////////////////////////////////////////////////
Get data for chartcollection charts with link
////////////////////////////////////////////////////
*/
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
/*
//////////////////////////////////////////////////////
Create specific chart given id, link, and labelformat
//////////////////////////////////////////////////////
*/
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
    setTimeout(createChart, 100, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
    setTimeout(createChart, 100, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
    setTimeout(createChart, 100, chartLabels, chartDataO3, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
    setTimeout(createChart, 100, chartLabels, chartDataPM1, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');
}
/*
/////////////////////////////////////
Create specific chart given sensor id
/////////////////////////////////////
*/
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
    setTimeout(createChart, 100, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
    setTimeout(createChart, 100, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
    setTimeout(createChart, 100, chartLabels, chartDataO3, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
    setTimeout(createChart, 100, chartLabels, chartDataPM1, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');
}
/*
//////////////////////////////////////////////////////
Create basic chart given labels, data, canvas and name
//////////////////////////////////////////////////////
*/
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

/*
//////////////////////////////////////////////////////
Creates right chartCollection chart given id 
//////////////////////////////////////////////////////
*/
function chartButtons(id){
    localid = id;
    if(selectedChart == "24h"){
        createSpecificChart(id);
    } 
    if(selectedChart == "week"){
        createSpecificChartLink(id, "dummyData.json", "week");
    } 
    if(selectedChart == "month") {
        createSpecificChartLink(id, "http://localhost:8080/Controller?action=returnWeekData", "month");
    } 
    if(selectedChart == "2Days") {
        createSpecificChartLink(id, "dummyData2Days.json", "2Days");
    }
        
}
