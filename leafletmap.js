// initialize the map
var map = L.map('map');

// load a tile layer
var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    minZoom: 1,
    maxZoom: 19
}).addTo(map);

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

//Legend
var MyControl = L.Control.extend({
    options: {
        position: 'bottomleft'
    },
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'my-custom-control');
        return container;
    }
});

map.addControl(new MyControl());

//Change to humidity
document.getElementById("changeSetting").onclick = function (){
    if(clicked){
        markersTemp.addTo(map);
        clicked = false;
        document.getElementById("changeSetting").innerHTML = "Humidity";
    } else {
        map.removeLayer(markersTemp);
        clicked = true;
        document.getElementById("changeSetting").innerHTML = "Temperature";
    }
}

