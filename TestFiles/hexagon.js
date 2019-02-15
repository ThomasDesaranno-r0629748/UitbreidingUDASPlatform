var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

d3.queue()
    .defer(d3.json, "belgium.topojson")
    .await(ready)

//Projectie maken
var projection = d3.geoAlbers()
    .center([-0.4, 50.44])
    .rotate([-4.668, 0])
    .parallels([51.64, 49.34])
    .scale(12000)
    .translate([width / 2, height / 2]);

/*.translate([ width / 1.5, height / 0.72])
    .scale(650)*/

var path = d3.geoPath()
    .projection(projection)

const zoom = d3.zoom()
    .scaleExtent([1, 40])
    .translateExtent([[0,0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

var g = svg.append("g");

function ready(error, data){
    console.log(data)
    var arrondissementen = topojson.feature(data, data.objects.BEL_adm2).features
    console.log(arrondissementen)
    
    g.selectAll("path")
        .data(arrondissementen)
        .enter().append("path")
        .attr("class", "arrond")
        .attr("d", path)
        .call(zoom)
    

    
}

function zoomed(){
  g.attr("transform", d3.event.transform);
}   
