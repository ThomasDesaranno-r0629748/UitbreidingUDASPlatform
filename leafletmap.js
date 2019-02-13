// initialize the map
var map = L.map('map').setView([50.8798438, 4.7005176], 13);

// load a tile layer
var Wikimedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    minZoom: 1,
    maxZoom: 19
}).addTo(map);

function colorPick(temperature) {
    if (temperature < 10) return 'lightblue';
    if (temperature >= 10 && temperature <= 12) return 'yellow';
    if (temperature > 12 && temperature < 15) return 'orange';
    if (temperature > 15) return 'red';
}

//Add data to map
d3.json("lastMesuraments.json", function (data) {
    data.forEach(function (d) {
        console.log(d.id);
        d.lat = +d.lat;
        d.lon = +d.lon;
        console.log(d.lat);
        console.log(d.lon);
        //L.marker([d.lat, d.lon], {icon: greenIcon}).addTo(mymap);
        var circle = L.circle([d.lat, d.lon], {
            color: colorPick(d.temperature),
            fillColor: colorPick(d.temperature),
            fillOpacity: 0.8,
            radius: 120,
            stroke: false
        }).addTo(map);
        circle.bindPopup("temperature:" + d.temperature + "°C");
    });

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