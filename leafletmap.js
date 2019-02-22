         var sliderControl = null;

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
         var OWM_API_KEY = '3361df6687a5458ad0f9e3556c666018';
         var clouds = L.OWM.clouds({
             opacity: 0.8,
             legendImagePath: '/NT2.png',
             appId: OWM_API_KEY
         });
         var cloudscls = L.OWM.cloudsClassic({
             opacity: 0.5,
             appId: OWM_API_KEY
         });
         var precipitation = L.OWM.precipitation({
             opacity: 0.5,
             appId: OWM_API_KEY
         });
         var precipitationcls = L.OWM.precipitationClassic({
             opacity: 0.5,
             appId: OWM_API_KEY
         });
         var rain = L.OWM.rain({
             opacity: 0.5,
             appId: OWM_API_KEY
         });
         var raincls = L.OWM.rainClassic({
             opacity: 0.5,
             appId: OWM_API_KEY
         });
         var snow = L.OWM.snow({
             opacity: 0.5,
             appId: OWM_API_KEY
         });
         var pressure = L.OWM.pressure({
             opacity: 0.4,
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
             "Clouds classic": cloudscls,
             "Precipitation": precipitation,
             "Precipitation classic": precipitationcls,
             "Rain": rain,
             "Rain Classic": raincls,
             "Snow": snow,
             "Pressure": pressure,
             "Pressure contour": pressurecntr,
             "Temperature": temp,
             "Wind": wind
         };
         L.control.layers(baseMaps, overlayMaps).addTo(map);

         //On document load
         document.addEventListener("DOMContentLoaded", function () {
             lastMomentDataPull(0);
         });

         //Pick icon
         function colorPick(temperature) {
             if (temperature >= 0 && temperature < 50) return sensorIconlightgreen;
             if (temperature >= 50 && temperature < 100) return sensorIconyellow;
             if (temperature >= 10 && temperature < 200) return sensorIconorange;
             if (temperature >= 200) return sensorIconRed;
         }


         //Pick right icon
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
                     iconUrl: 'lightgreensensor.png',
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
                     iconUrl: 'yellowsensor.png',
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
                     iconUrl: 'orangesensor.png',
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
                     iconUrl: 'redsensor.png',
                     shadowUrl: 'images/redRadial.png',
                     shadowAnchor: [shadowSize / 2, shadowSize / 2],
                     shadowSize: [shadowSize, shadowSize],
                     iconSize: [iconSize * 1.2, iconSize], // size of the icon
                     iconAnchor: [iconSize / 2, iconSize / 2], // point of the icon which will correspond to 
                 });
                 return icon;
             }
         }

         //Pull data van laatste dag laatset moment
         function lastMomentDataPull(id) {
             d3.json("http://localhost:8080/Controller?action=returnLastData", function (data) {
                 var idInPull = false;
                 data.forEach(function (d) {
                     if (d.deviceId == id) {
                         idInPull = true;
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
                     document.getElementById("SO2").innerHTML = "NA ug/m3";
                     document.getElementById("NO2").innerHTML = "NA ug/m3";
                     document.getElementById("O3").innerHTML = "NA ug/m3";
                     document.getElementById("PM1").innerHTML = "NA ug/m3";
                 }
             })
         }

         //Temperature clustergroup
         var markersTemp = L.layerGroup();
         var markerHumidity = L.layerGroup();
         var markerRadial = L.layerGroup();
         var clicked = false;
         //Add data to map and set view
         var longem = 0;
         var latgem = 0;
         d3.json("SensorLocaties.json", function (data) {
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

         $.getJSON("points.json", function (json) {
             var testlayer = L.geoJson(json),
                 sliderControl = L.control.sliderControl({
                     position: "bottomright",
                     layer: testlayer
                 });

             var sliderControl = L.control.sliderControl({
                 layer: testlayer,
                 follow: true,
                 range: true
             });
             map.addControl(sliderControl);
             sliderControl.startSlider();
         })

         var controlSearch = new L.Control.Search({
             position: 'topright',
             layer: markersTemp,
             initial: false,
             zoom: 18,
             marker: false
         });
         map.addControl(controlSearch);

         var cityname = "stad";

         function getCurrentLocation(latitude, longitude) {
             fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + OWM_API_KEY)
                 .then(function (resp) {
                     return resp.json()
                 }) // Convert data to json
                 .then(function (data) {
                     cityname = data.name;
                     document.getElementById("locationCity").innerHTML = cityname;

                 })
                 .catch(function () {
                     // catch any errors
                 });
         }
         var displaystate = "SO2";

         function displayedDust(id) {
             if ("changeSO2" == id) {
                 displaystate = "SO2";
                 document.getElementById("displayeddust").innerHTML = "SO2";
                 return adjustIcon();
             }
             if ("changeNO2" == id) {
                 displaystate = "NO2";
                 document.getElementById("displayeddust").innerHTML = "NO2";
                 return adjustIcon();
             }
             if ("changeO3" == id) {
                 displaystate = "O3";
                 document.getElementById("displayeddust").innerHTML = "O3";
                 return adjustIcon();
             }
             if ("changePM10" == id) {
                 return document.getElementById("displayeddust").innerHTML = "PM10";
             } else {
                 document.getElementById("displayeddust").innerHTML = "ERROR - nothing";
                 return adjustIcon();
             }
         }

        //Change Dust buttons
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


         //Adjust icon size on zoom
         function adjustIcon() {
             var currentZoom = map.getZoom();


             d3.json("SensorLocaties.json", function (data) {
                 data.forEach(function (sensord) {
                     markersTemp.eachLayer(function (d) {
                         if (d._latlng.lat == sensord.lat && d._latlng.lng == sensord.lon) {
                             d3.json("http://localhost:8080/Controller?action=returnLastData", function (metingd) {
                                 metingd.forEach(function (meting) {
                                     if (sensord.Deviceid == meting.deviceId && displaystate == "SO2") {
                                         console.log(meting.so2);
                                         d.setIcon(iconPicker(meting.so2, currentZoom, 38, 59, 80));
                                     }
                                     if (sensord.Deviceid == meting.deviceId && displaystate == "NO2") {
                                         console.log(meting.no2);
                                         d.setIcon(iconPicker(meting.no2, currentZoom, 80, 180, 122));
                                     }
                                     if (sensord.Deviceid == meting.deviceId && displaystate == "O3") {
                                         console.log(meting.o3);
                                         d.setIcon(iconPicker(meting.o3, currentZoom, 17, 20, 24));
                                     }
                                     if (sensord.Deviceid == meting.deviceId && displaystate == "PM10") {
                                         console.log(meting.pm10);
                                         d.setIcon(iconPicker(meting.pm10, currentZoom, 10, 75, 100)); //NOG VERANDEREN
                                     }
                                 })
                             })
                         }

                     });
                 });
             });
         }
         map.on('zoomend', adjustIcon);


         //Clickable map popups
         var popup = L.po
         var popup = L.popup();

         function onMapClick(e) {
             document.getElementById("chartCollection").style.visibility = "hidden";
             document.getElementById("history").style.visibility = "hidden";
             document.getElementById("chartHistory").style.visibility = "hidden";
         }
         map.on('click', onMapClick);
         //Graph popup

         var comparegraphs = 0;
         var id = 0;

         function onCircleClick(obj) {
             document.getElementById("SO2").innerHTML = "Loading";
             document.getElementById("NO2").innerHTML = "Loading";
             document.getElementById("O3").innerHTML = "Loading";
             document.getElementById("PM1").innerHTML = "Loading";
             createSpecificChart(0);
             if (compare == false) {
                 console.log("clicktest");
                 document.getElementById("history").style.visibility = "visible";
                 document.getElementById("chartCollection").style.visibility = "visible";
                 document.getElementById("chartCollection").style.top = "17%";
                 d3.json("SensorLocaties.json", function (data) {
                     var name = "";
                     data.forEach(function (d) {
                         if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                             document.getElementById("sensorName").innerHTML = d.naam;
                             id = d.Deviceid;
                             name = d.naam;
                         }
                         if(name == "VanCaenegemlaan"){
                             id = 1011;
                         }

                     })
                     console.log("id is " + id);
                     lastMomentDataPull(id);
                     createSpecificChart(id);
                 });
                 
                 setInterval(function () {
                     lastMomentDataPull(id);
                     createSpecificChart(id);
                 }, 10 * 1000);

             }
             if (compare == true) {
                 console.log("comparchats");
                 document.getElementById("comparePart").style.display = "contents";
                 //                 if (comparegraphs == 0){
                 //                     document.getElementById("chartCollection2").style.right = "70%";
                 //                 }
                 //                 if (comparegraphs == 1){
                 //                     document.getElementById("chartCollection2").style.right = "40%";
                 //                 }
                 //                  if (comparegraphs == 2){
                 //                     document.getElementById("chartCollection2").style.right = "10%";
                 //                 }
                 comparegraphs += 1;
                 console.log(comparegraphs);
                 document.getElementById("chartCollection").style.top = "58%";
                 d3.json("SensorLocaties.json", function (data) {
                     data.forEach(function (d) {
                         if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                             document.getElementById("sensorName").innerHTML = d.naam;
                             id = d.Deviceid;
                         }
                         console.log("id is " + id);
                     })
                 });
                 setInterval(function () {
                     lastMomentDataPull(id);
                     createSpecificChart(id);
                 }, 10 * 1000);

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

                 d3.json("http://localhost:8080/Controller?action=returnLast24hData", function (data) {
                     console.log(data)
                     data.forEach(function (d) {
                         chartLabels2.push(d.time);
                         chartDataTemp2.push(d.so2);
                         chartDataPressure2.push(d.no2);
                         chartDataO32.push(d.o3);
                         chartDataPM12.push(d.pm10);
                     })
                 })

                 console.log(chartDataO32 + "chuze");

                 setTimeout(createChart, 500, chartLabels2, chartDataTemp2, tempChart2, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
                 setTimeout(createChart, 500, chartLabels2, chartDataPressure2, pressureChart2, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
                 setTimeout(createChart, 500, chartLabels2, chartDataPressure2, O3Chart2, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
                 setTimeout(createChart, 500, chartLabels2, chartDataPressure2, PM1Chart2, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');


             }
             

         }
         //Close chart collection
         document.getElementById("closeChartCollection").onclick = function () {

             document.getElementById("chartCollection").style.visibility = "hidden";
             document.getElementById("chartHistory").style.visibility = "hidden";
             document.getElementById("history").style.visibility = "hidden";
         }
         //Open history
         document.getElementById("history").onclick = function () {


             document.getElementById("chartHistory").style.visibility = "visible";
             document.getElementById("history").style.visibility = "hidden";
         }

         //close history
         document.getElementById("closeChartHistory").onclick = function () {

             document.getElementById("chartHistory").style.visibility = "hidden";
             document.getElementById("history").style.visibility = "visible";
         }
         var compare = false;

  //Close compare
         document.getElementById("closecompare").onclick = function () {
             compare = false;
             document.getElementById("comparePart").style.visibility = "hidden";
             document.getElementById("comparePart").style.display = "none";
             document.getElementById("compare").style.visibility = "visible";
             document.getElementById("map").style.height = "100%";
             document.getElementById("legendCollection").style.bottom = "5%";

             
         }

         // compare sensors
         function comparePage() {
             console.log("tget");
             //window.location = 'comparePage.html';
             compare = true;
             document.getElementById("comparePart").style.visibility = "visible";
             document.getElementById("comparePart").style.display = "contents";
             document.getElementById("compare").style.visibility = "hidden";
             document.getElementById("map").style.height = "50%";
             document.getElementById("legendCollection").style.bottom = "52%";
             document.getElementById("chartHistory").style.visibility = "hidden";
             document.getElementById("chartCollection").style.visibility = "hidden";
             document.getElementById("history").style.visibility = "hidden";


             let tempChart = document.getElementById("tempChart2").getContext('2d');
             console.log(tempChart + "teststetetstst");
             let pressureChart = document.getElementById("pressureChart2").getContext('2d');
             let O3Chart = document.getElementById("O3Chart2").getContext('2d');
             let PM1Chart = document.getElementById("PM1Chart2").getContext('2d');

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

             setInterval(function () {
                 setTimeout(createChart, 1000, chartLabels, chartDataTemp, tempChart, 'SO2', 'rgba(255, 255, 0, 0.58)', true, '#989800');
                 setTimeout(createChart, 1000, chartLabels, chartDataPressure, pressureChart, 'NO2', 'rgba(255, 0, 0, 0.58)', true, '#980000');
                 setTimeout(createChart, 1000, chartLabels, chartDataPressure, O3Chart, 'O3', 'rgba(0, 255, 10, 0.58)', true, '#009806');
                 setTimeout(createChart, 1000, chartLabels, chartDataPressure, PM1Chart, 'PM1', 'rgba(0, 245, 255, 0.58)', true, '#009298');
                 getData()
             }, 5 * 1000);

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
         }

         // make comparegraphs


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
