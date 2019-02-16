         //make the icons
         //red
         var sensorIconRed = L.icon({
             iconUrl: 'redsensor.png'
             , shadowUrl: 'images/redRadial.png'
             , shadowAnchor: [100, 100]
             , shadowSize: [200, 200]
             , iconSize: [40, 30], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to 
         });
         var sensorIconRedSmall = L.icon({
             iconUrl: 'redsensor.png'
             , shadowUrl: 'images/redRadial.png'
             , shadowAnchor: [300, 300]
             , shadowSize: [600, 600]
             , iconSize: [40, 30], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to 
         });
         //red
         var sensorIconyellow = L.icon({
             iconUrl: 'yellowsensor.png'
             , shadowUrl: 'images/yellowRadial.png'
             , shadowAnchor: [100, 100]
             , shadowSize: [200, 200]
             , iconSize: [60, 40], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to 
         });
         var sensorIconYellowSmall = L.icon({
             iconUrl: 'yellowsensor.png'
             , shadowUrl: 'images/yellowRadial.png'
             , shadowAnchor: [300, 300]
             , shadowSize: [600, 600]
             , iconSize: [40, 30], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to 
         });
         var sensorIconorange = L.icon({
             iconUrl: 'orangesensor.png'
             , shadowUrl: 'images/orangeRadial.png'
             , shadowAnchor: [100, 100]
             , shadowSize: [200, 200]
             , iconSize: [60, 40], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to 
         });
         var sensorIconOrangeSmall = L.icon({
             iconUrl: 'orangesensor.png'
             , shadowUrl: 'images/orangeRadial.png'
             , shadowAnchor: [300, 300]
             , shadowSize: [600, 600]
             , iconSize: [40, 30], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to 
         });
         var sensorIconblue = L.icon({
             iconUrl: 'bluesensor.png'
             , iconSize: [60, 40], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to 
         });
         var sensorIcongreenyellow = L.icon({
             iconUrl: 'greenyellowsensor.png'
             , iconSize: [60, 40], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to
         });
         var sensorIconlightgreen = L.icon({
             iconUrl: 'lightgreensensor.png'
             , shadowUrl: 'images/greenRadial.png'
             , shadowAnchor: [100, 100]
             , shadowSize: [200, 200]
             , iconSize: [60, 40], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to
         });
         var sensorIconGreenSmall = L.icon({
             iconUrl: 'lightgreensensor.png'
             , shadowUrl: 'images/greenRadial.png'
             , shadowAnchor: [300, 300]
             , shadowSize: [600, 600]
             , iconSize: [40, 30], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to 
         });
         var sensorIconlightblue = L.icon({
             iconUrl: 'lightbluesensor.png'
             , iconSize: [60, 40], // size of the icon
             iconAnchor: [30, 20], // point of the icon which will correspond to
         });

/*var sensorIconlightgreen = L.icon({
             iconUrl: 'images/circleGreen.png'
             , shadowUrl: 'images/greenRadial.png'
             , shadowAnchor: [90, 99]
             , shadowSize: [200, 200]
             , iconSize: [30, 30], // size of the icon
             iconAnchor: [15, 15], // point of the icon which will correspond to
         });
         var sensorIconGreenSmall = L.icon({
             iconUrl: 'images/circleGreen.png'
             , shadowUrl: 'images/greenRadial.png'
             , shadowAnchor: [280, 300]
             , shadowSize: [600, 600]
             , iconSize: [40, 40], // size of the icon
             iconAnchor: [20, 20], // point of the icon which will correspond to 
         });*/




         // initialize the map
         var map = L.map('map');
         // load a tile layer
         mapLink = '<a href="http://www.esri.com/">Esri</a>';
         wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
         var Satelite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
             attribution: '&copy; ' + mapLink + ', ' + wholink
             , maxZoom: 19
         , })
         var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
             attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
             , minZoom: 1
             , maxZoom: 19
         }).addTo(map);
         var OWM_API_KEY = '3361df6687a5458ad0f9e3556c666018';
         var clouds = L.OWM.clouds({
             opacity: 0.8
             , legendImagePath: '/NT2.png'
             , appId: OWM_API_KEY
         });
         var cloudscls = L.OWM.cloudsClassic({
             opacity: 0.5
             , appId: OWM_API_KEY
         });
         var precipitation = L.OWM.precipitation({
             opacity: 0.5
             , appId: OWM_API_KEY
         });
         var precipitationcls = L.OWM.precipitationClassic({
             opacity: 0.5
             , appId: OWM_API_KEY
         });
         var rain = L.OWM.rain({
             opacity: 0.5
             , appId: OWM_API_KEY
         });
         var raincls = L.OWM.rainClassic({
             opacity: 0.5
             , appId: OWM_API_KEY
         });
         var snow = L.OWM.snow({
             opacity: 0.5
             , appId: OWM_API_KEY
         });
         var pressure = L.OWM.pressure({
             opacity: 0.4
             , appId: OWM_API_KEY
         });
         var pressurecntr = L.OWM.pressureContour({
             opacity: 0.5
             , appId: OWM_API_KEY
         });
         var temp = L.OWM.temperature({
             opacity: 0.5
             , appId: OWM_API_KEY
         });
         var wind = L.OWM.wind({
             opacity: 0.5
             , appId: OWM_API_KEY
         });
         var baseMaps = {
             "Streets": Wikimedia
             , "Satelite": Satelite
         };
         var overlayMaps = {
             "Clouds": clouds
             , "Clouds classic": cloudscls
             , "Precipitation": precipitation
             , "Precipitation classic": precipitationcls
             , "Rain": rain
             , "Rain Classic": raincls
             , "Snow": snow
             , "Pressure": pressure
             , "Pressure contour": pressurecntr
             , "Temperature": temp
             , "Wind": wind
         };
         L.control.layers(baseMaps, overlayMaps).addTo(map);
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
             var shadowSize = Math.pow((zoom * 10),zoom/15);
             console.log(shadowSize);
             if (temperature >= 0 && temperature < 50) {
                 var icon = L.icon({
                     iconUrl: 'lightgreensensor.png',
                     shadowUrl: 'images/greenRadial.png',
                     shadowAnchor: [shadowSize/2, shadowSize/2],
                     shadowSize: [shadowSize,shadowSize],
                     iconSize: [iconSize*1.2, iconSize], // size of the icon
                     iconAnchor: [iconSize/2, iconSize/2], // point of the icon which will correspond to 
                 });
                 return icon;
             }
             if (temperature >= 50 && temperature < 100) {
                 var icon = L.icon({
                     iconUrl: 'yellowsensor.png',
                     shadowUrl: 'images/yellowRadial.png',
                     shadowAnchor: [shadowSize/2, shadowSize/2],
                     shadowSize: [shadowSize,shadowSize],
                     iconSize: [iconSize*1.2, iconSize], // size of the icon
                     iconAnchor: [iconSize/2, iconSize/2], // point of the icon which will correspond to 
                 });
                 return icon;
             } 
             if (temperature >= 10 && temperature < 200){
                 var icon = L.icon({
                     iconUrl: 'orangesensor.png',
                     shadowUrl: 'images/orangeRadial.png',
                     shadowAnchor: [shadowSize/2, shadowSize/2],
                     shadowSize: [shadowSize,shadowSize],
                     iconSize: [iconSize*1.2, iconSize], // size of the icon
                     iconAnchor: [iconSize/2, iconSize/2], // point of the icon which will correspond to 
                 });
                 return icon;
             }
             if (temperature >= 200) {
                 var icon = L.icon({
                     iconUrl: 'redsensor.png',
                     shadowUrl: 'images/redRadial.png',
                     shadowAnchor: [shadowSize/2, shadowSize/2],
                     shadowSize: [shadowSize,shadowSize],
                     iconSize: [iconSize*1.2, iconSize], // size of the icon
                     iconAnchor: [iconSize/2, iconSize/2], // point of the icon which will correspond to 
                 });
                 return icon;
             }
         }




function colorPickSmall(temperature) {
             if (temperature >= 0 && temperature < 50) return sensorIconGreenSmall;
             if (temperature >= 50 && temperature < 100) return sensorIconYellowSmall;
             if (temperature >= 10 && temperature < 200) return sensorIconOrangeSmall;
             if (temperature >= 200) return sensorIconRedSmall;
         }
         //Temperature clustergroup
         var markersTemp = L.layerGroup();
         var markerHumidity = L.layerGroup();
         var markerRadial = L.layerGroup();
         var clicked = false;
         //Add data to map and set view
         d3.json("SensorLocaties.json", function (data) {
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
                         icon: colorPick(20)
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
                 map.setView([mapLat / amountData, mapLon / amountData], 14);
             })
         
         
             //Adjust icon size on zoom
         
         function adjustIcon() {
             var currentZoom = map.getZoom();
             console.log(currentZoom);
             /*if (currentZoom >= 16) {
                 markersTemp.eachLayer(function (d) {
                     d.setIcon(colorPickSmall(20));
                 });
             }
             if (currentZoom < 16) {
                 markersTemp.eachLayer(function (d) {
                     d.setIcon(colorPick(20));
                 });
             }*/
            markersTemp.eachLayer(function(d){
                d.setIcon(iconPicker(20, currentZoom));
            });
            /*myMarker.setRadius(currentZoom);*/
         }
         map.on('zoomend', adjustIcon);


         //Clickable map popups
         var popup = L.po
         var popup = L.popup();

         function onMapClick(e) {
             popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map);
             document.getElementById("chartCollection").style.visibility = "hidden";
         }
         map.on('click', onMapClick);
         //Change to humidity
         /*document.getElementById("changeSetting").onclick = function () {
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
         }*/
         //Graph popup
         function onCircleClick(obj) {
             document.getElementById("chartCollection").style.visibility = "visible";
             var id;
             d3.json("LaatsteMetingen.json", function (data) {
                 data.forEach(function (d) {
                     console.log(d);
                     if (d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng) {
                         document.getElementById("sensorName").innerHTML = d.id;
                         id = d.id;
                     }
                 })
             });
             d3.json("LaatsteMetingen.json", function (data) {
                 data.forEach(function (d) {
                     if (d.Deviceid == 10) { /*Nog te veranderen*/
                         if (d.s1 != null) {
                             document.getElementById("SO2").innerHTML = d.s1 + " ug/m3";
                         }
                         if (d.s2 != null) {
                             document.getElementById("NO2").innerHTML = d.s2 + " ug/m3";
                         }
                         if (d.s3 != null) {
                             document.getElementById("O3").innerHTML = d.s3 + " ug/m3";
                         }
                         if (d.s4 != null) {
                             document.getElementById("PM1").innerHTML = d.s4 + " ug/m3";
                         }
                     }
                 })
             })
         }
         //Close chart collection
         document.getElementById("closeChartCollection").onclick = function () {
             document.getElementById("chartCollection").style.visibility = "hidden";
         }