         //make the icons
         //red
         var sensorIconRed = L.icon({
             iconUrl: 'redsensor.png',
             iconSize: [40, 40], // size of the icon
             iconAnchor: [20, 20], // point of the icon which will correspond to 
         });
         //red
         var sensorIconyellow = L.icon({
             iconUrl: 'yellowsensor.png',
             iconSize: [40, 40], // size of the icon
             iconAnchor: [20, 20], // point of the icon which will correspond to 
         });
         var sensorIconorange = L.icon({
             iconUrl: 'orangesensor.png',
             iconSize: [40, 40], // size of the icon
             iconAnchor: [20, 20], // point of the icon which will correspond to 
         });
         var sensorIconblue = L.icon({
             iconUrl: 'bluesensor.png',
             iconSize: [40, 40], // size of the icon
             iconAnchor: [20, 20], // point of the icon which will correspond to 
         });
         var sensorIcongreenyellow = L.icon({
             iconUrl: 'greenyellowsensor.png',
             iconSize: [40, 40], // size of the icon
             iconAnchor: [20, 20], // point of the icon which will correspond to
         });
         var sensorIconlightgreen = L.icon({
             iconUrl: 'lightgreensensor.png',
             iconSize: [40, 40], // size of the icon
             iconAnchor: [20, 20], // point of the icon which will correspond to
         });
         var sensorIconlightblue = L.icon({
             iconUrl: 'lightbluesensor.png',
             iconSize: [40, 40], // size of the icon
             iconAnchor: [20, 20], // point of the icon which will correspond to
         });
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

         //Pick icon
         function colorPick(temperature) {
             if (temperature < -10) return sensorIconblue;
             if (temperature >= -10 && temperature < 0) return sensorIconlightblue;
             if (temperature >= 0 && temperature < 10) return sensorIconlightgreen;
             if (temperature >= 10 && temperature < 12) return sensorIcongreenyellow;
             if (temperature >= 12 && temperature < 15) return sensorIconyellow;
             if (temperature >= 15 && temperature < 20) return sensorIconorange;
             if (temperature > 20) return sensorIconRed;
         }

         //Temperature clustergroup
         var markersTemp = L.layerGroup();
         var markerHumidity = L.layerGroup();
         var clicked = false;

         //Add data to map and set view
         d3.json("lastMesuraments.json", function (data) {
             var mapLat = 0;
             var mapLon = 0;
             var amountData = 0;
             data.forEach(function (d) {
                 d.lat = +d.lat;
                 d.lon = +d.lon;
                 console.log(d.lat);
                 console.log(d.lon);

                 mapLat = mapLat + d.lat;
                 mapLon = mapLon + d.lon;
                 amountData++;
                 var sensor = L.marker([d.lat, d.lon], {
                     icon: colorPick(d.temperature)
                 });

                 sensor.addTo(map);
                 /*var circle = L.circle([d.lat, d.lon], {
                     color: colorPick(d.temperature),
                     fillColor: "red",
                     fillOpacity: 0.8,
                     radius: 220,
                     stroke: false,
                     style: {
                         opacity: 0.1,
                         fill: 'blue'
                     }
                 });
                 circle.addTo(map);*/

                 sensor.bindPopup("temperature:" + d.temperature + "°C");
                 sensor.on('click', onCircleClick, d);
                 markersTemp.addLayer(sensor);

             });
             markersTemp.addTo(map);
             map.setView([mapLat / amountData, mapLon / amountData], 13)
         })

         //Clickable map popups
         var popup = L.po
         var popup = L.popup();

         function onMapClick(e) {
             popup
                 .setLatLng(e.latlng)
                 .setContent("You clicked the map at " + e.latlng.toString())
                 .openOn(map);
         }

         map.on('click', onMapClick);

         //Change to humidity
         document.getElementById("changeSetting").onclick = function () {
             if (clicked) {
                 markersTemp.addTo(map);
                 clicked = false;
                 document.getElementById("changeSetting").innerHTML = "Humidity";
                 document.getElementById("legendContainer").style.backgroundImage = 'linear-gradient(to right, red,orange,yellow, #ffff53,#00c400, lightgreen,lightblue, blue)';
             } else {
                 map.removeLayer(markersTemp);
                 clicked = true;
                 document.getElementById("changeSetting").innerHTML = "Temperature";
                 document.getElementById("legendContainer").style.backgroundImage = 'linear-gradient(-90deg, blue, lightblue)';
             }
             document.getElementById("chartCollection").style.visibility = "hidden";
         }

         //Graph popup
         function onCircleClick(obj) {
             document.getElementById("chartCollection").style.visibility = "visible";
             var id;
             d3.json("lastMesuraments.json", function (data) {
                 data.forEach(function (d) {
                     if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                         document.getElementById("sensorName").innerHTML = d.id;
                         id = d.id;
                         console.log(id);
                     }
                 })
             });
             d3.json("lastMesuraments.json", function (data) {
                 data.forEach(function (d) {
                     if (d.id == id) {
                         if (d.humidity != "") {
                             document.getElementById("humidityD").innerHTML = d.humidity;
                         }
                         document.getElementById("temperatureD").innerHTML = d.temperature + "°C";
                         if (d.pressure != "" || d.pressure != undefined){
                             document.getElementById("pressureD").innerHTML = d.pressure;
                         }
                     }
                 })
             })
         }

         //Close chart collection
         document.getElementById("closeChartCollection").onclick = function () {
             document.getElementById("chartCollection").style.visibility = "hidden";


         }