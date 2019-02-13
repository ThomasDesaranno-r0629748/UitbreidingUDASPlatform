// initialize the map
var map = L.map('map');

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
        }).addTo(map);
        circle.bindPopup("temperature:" + d.temperature + "°C");
    });
    map.setView([mapLat/amountData, mapLon/amountData], 13)
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
      // create the control container with a particular class name
      // ** you can add the image to the div as a background image using css
      var container = L.DomUtil.create('div', 'my-custom-control');

      // ... initialize other DOM elements, add listeners, etc.
      return container;
    }
});

map.addControl(new MyControl());