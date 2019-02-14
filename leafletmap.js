// initialize the map
var map = L.map('map');

// load a tile layer
    mapLink ='<a href="http://www.esri.com/">Esri</a>';
        wholink='i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
       var Satelite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; '+mapLink+', '+wholink,
            maxZoom: 19,
            })

var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    minZoom: 1,
    maxZoom: 19
}).addTo(map);

	var OWM_API_KEY = '3361df6687a5458ad0f9e3556c666018';

	var clouds = L.OWM.clouds({opacity: 0.8, legendImagePath: '/NT2.png', appId: OWM_API_KEY});
	var cloudscls = L.OWM.cloudsClassic({opacity: 0.5, appId: OWM_API_KEY});
	var precipitation = L.OWM.precipitation( {opacity: 0.5, appId: OWM_API_KEY} );
	var precipitationcls = L.OWM.precipitationClassic({opacity: 0.5, appId: OWM_API_KEY});
	var rain = L.OWM.rain({opacity: 0.5, appId: OWM_API_KEY});
	var raincls = L.OWM.rainClassic({opacity: 0.5, appId: OWM_API_KEY});
	var snow = L.OWM.snow({opacity: 0.5, appId: OWM_API_KEY});
	var pressure = L.OWM.pressure({opacity: 0.4, appId: OWM_API_KEY});
	var pressurecntr = L.OWM.pressureContour({opacity: 0.5, appId: OWM_API_KEY});
	var temp = L.OWM.temperature({opacity: 0.5, appId: OWM_API_KEY});
	var wind = L.OWM.wind({opacity: 0.5, appId: OWM_API_KEY});

var baseMaps = {
    "Streets": Wikimedia,
    "Satelite": Satelite
};

var overlayMaps = {
    "Clouds" : clouds,
    "Clouds classic" : cloudscls,
    "Precipitation" : precipitation,
    "Precipitation classic" : precipitationcls,
    "Rain" : rain,
    "Rain Classic": raincls,
    "Snow" : snow,
    "Pressure" : pressure,
    "Pressure contour" : pressurecntr,
    "Temperature" : temp,
    "Wind" : wind
};

L.control.layers(baseMaps,overlayMaps).addTo(map);

//Pick color
function colorPick(temperature) {
    if (temperature < -10) return 'blue';
    if (temperature >= -10 && temperature < 0) return 'lightblue';
    if (temperature >= 0 && temperature < 10) return 'lightgreen';
    if (temperature >= 10 && temperature < 12) return 'green';
    if (temperature >= 12 && temperature < 15) return 'yellow';
    if (temperature >= 15 && temperature < 20) return 'orange';
    if (temperature > 20) return 'red';
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

        //L.marker([d.lat, d.lon], {icon: greenIcon}).addTo(mymap);
        var circle = L.circle([d.lat, d.lon], {
            color: colorPick(d.temperature),
            fillColor: colorPick(d.temperature),
            fillOpacity: 0.8,
            radius: 120,
            stroke: false
        });
        circle.bindPopup("temperature:" + d.temperature + "°C");
        circle.on('click', onCircleClick, d);
        markersTemp.addLayer(circle);
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
document.getElementById("changeSetting").onclick = function (){
    if(clicked){
        markersTemp.addTo(map);
        clicked = false;
        document.getElementById("changeSetting").innerHTML = "Humidity";
        document.getElementById("legend").style.backgroundImage = 'url(images/TempColor.PNG)';
    } else {
        map.removeLayer(markersTemp);
        clicked = true;
        document.getElementById("changeSetting").innerHTML = "Temperature";
        document.getElementById("legend").style.backgroundImage = 'linear-gradient(-90deg, blue, lightblue)';
    }
    document.getElementById("chartCollection").style.visibility="hidden";
}

//Graph popup
function onCircleClick(obj){
    document.getElementById("chartCollection").style.visibility="visible";
    var id = 0;
    d3.json("lastMesuraments.json", function (data) {
    data.forEach(function (d) {
        if(d.lat == obj.sourceTarget._latlng.lat && d.lon == obj.sourceTarget._latlng.lng){
            document.getElementById("sensorName").innerHTML = d.id;
            id = d.id;
        }
    })
});
    
    d3.json("charttestdata.json", function (data){
        data.forEach(function(d){
            if(d.id == id){
            document.getElementById("humidityD").innerHTML = d.humidity;
            document.getElementById("temperatureD").innerHTML = d.temperature;
            document.getElementById("pressureD").innerHTML = d.pressure;
            } else {
                document.getElementById("humidityD").innerHTML = "N/A";
            document.getElementById("temperatureD").innerHTML = "N/A";
            document.getElementById("pressureD").innerHTML = "N/A";
            }
        })
    })
}

//Close chart collection
document.getElementById("closeChartCollection").onclick = function(){
    document.getElementById("chartCollection").style.visibility="hidden";
    
    
}