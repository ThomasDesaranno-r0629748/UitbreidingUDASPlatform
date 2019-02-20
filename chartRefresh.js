
var lastDataCall = "http://localhost:8080/Controller?action=returnLastData";
var lastData = "";

document.addEventListener("DOMContentLoaded", function(){
  setInterval(function() {
      console.log("pulling");
    d3.json("http://localhost:8080/Controller?action=returnLastData", function (data) {
        console.log("Data "+data)
        lastData = data;
    });
}, 10 * 1000); 
});


function actualLastData(){
  return lastData;  
};