var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

d3.queue()
    .defer(d3.json, "belgium.topojson")
    .await(ready)

//Projectie maken
var projection = d3.geoMercator()
    .translate([ width / 2, height / 2])

var path = d3.geoPath()
    .projection(projection)


function ready(error, data){
    console.log(data)
    var arrondissementen = topojson.feature(data, data.objects.BEL_adm2).features
    console.log(arrondissementen)
    
    svg.append("g")
        .selectAll("path")
        .data(arrondissementen)
        .enter().append("path")
        .attr("class", "arrond")
        .attr("d", path)
    
    
    svg.call(zoom)
        .all(zoom.event);
    
}