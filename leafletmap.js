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
         function iconPicker(temperature, zoom) {
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
             if (temperature >= 0 && temperature < 50) {
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
             if (temperature >= 50 && temperature < 100) {
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
             if (temperature >= 100 && temperature < 200) {
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
             if (temperature >= 200) {
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
                 if(!idInPull){
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
                     icon: iconPicker(d.s1, 14)
                 });
                 /*var circle = L.circle([d.lat, d.lon], {
                     color: 'green',
                     fillColor: "green",
                     fillOpacity: 0.8,
                     radius: 20,
                     stroke: true,
                     className: "test"
                 });*/

                 sensor.bindPopup("Locatie: " + d.naam);
                 sensor.on('click', onCircleClick, d);
                 /*circle.bindPopup("Locatie: " + d.naam);
                     circle.on('click', onCircleClick, d);
                    markersTemp.addLayer(circle);*/
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


         //Adjust icon size on zoom

         function adjustIcon() {
             var currentZoom = map.getZoom();

             /*markersTemp.eachLayer(function (d) {
                 d.setIcon(iconPicker(-1, currentZoom));
             });*/

             d3.json("SensorLocaties.json", function (data) {
                 data.forEach(function (sensord) {
                     markersTemp.eachLayer(function (d) {
                         if (d._latlng.lat == sensord.lat && d._latlng.lng == sensord.lon) {
                             d3.json("LaatsteMetingen.json", function (metingd) {
                                 metingd.forEach(function (meting) {
                                     if (sensord.Deviceid == meting.Deviceid && displaystate == "SO2") {
                                         console.log(meting.s1);
                                         d.setIcon(iconPicker(meting.s1, currentZoom));
                                     }
                                     if (sensord.Deviceid == meting.Deviceid && displaystate == "NO2") {
                                         console.log(meting.s2);
                                         d.setIcon(iconPicker(meting.s2, currentZoom));
                                     }
                                     if (sensord.Deviceid == meting.Deviceid && displaystate == "O3") {
                                         console.log(meting.s3);
                                         d.setIcon(iconPicker(meting.s3, currentZoom));
                                     }
                                     if (sensord.Deviceid == meting.Deviceid && displaystate == "PM10") {
                                         console.log(meting.s4);
                                         d.setIcon(iconPicker(meting.s4, currentZoom));
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
             if (compare == false) {
                 console.log("clicktest");
                 document.getElementById("chartCollection").style.visibility = "visible";
                 document.getElementById("chartCollection").style.top = "13%";
                 document.getElementById("history").style.visibility = "visible";
                 
                 d3.json("SensorLocaties.json", function (data) {
                     data.forEach(function (d) {
                         if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                             document.getElementById("sensorName").innerHTML = d.naam;
                             id = d.Deviceid;
                         }
                         
                     })
                 });
                 setInterval(function () {
                     lastMomentDataPull(id);
                 }, 5 * 1000);

             } else {
                 console.log("comparchats");
                 comparegraphs += 1;
                 console.log(comparegraphs);
                 document.getElementById("chartCollection").style.visibility = "visible";
                 document.getElementById("chartCollection").style.top = "58%";
                 document.getElementById("history").style.visibility = "visible";
                 d3.json("SensorLocaties.json", function (data) {
                     data.forEach(function (d) {
                         if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                             document.getElementById("sensorName").innerHTML = d.naam;
                             id = d.Deviceid;
                         }
                         console.log("id is " + id);
                     })
                 });
                 setInterval(function (id) {
                     lastMomentDataPull(id);
                 }, 5 * 1000);


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

         // compare sensors
         function comparePage() {
             console.log("tget");
             //window.location = 'comparePage.html';
             compare = true;
             document.getElementById("comparePart").style.visibility = "visible";
             document.getElementById("compare").style.visibility = "hidden";
             document.getElementById("map").style.height = "50%";
             document.getElementById("legendCollection").style.bottom = "52%";
         }

         function closeCompare() {
             console.log("close");
             compare = false;
             document.getElementById("comparePart").style.visibility = "hidden";
             document.getElementById("compare").style.visibility = "visible";
             document.getElementById("map").style.height = "100%";
             document.getElementById("legendCollection").style.bottom = "5%";
             comparegraphs = 0;
         }