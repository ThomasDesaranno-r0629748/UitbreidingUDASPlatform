/*var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log("in functie");
        console.log(this.responseText);
    }
};

xmlhttp.open("GET", "test.php", true);
xmlhttp.send();*/


/*$(document).ready(function(){
    function showRoom(){
        $.ajax({
            type:"GET",
            url:"/test.php",
            data:{action:"showroom"},
            success:function(data){
                $("#content").html(data);
            }
        });
    }
    showRoom();
});*/


$.ajax({
    url: 'test.php',
    type: 'GET',
    data: {
        test: '1'
    },
    dataType: "php",

    success: function (data) {
        console.log(data);
    }
})