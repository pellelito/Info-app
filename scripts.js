var Weather  = "";
var Geo = {};
//  Hämtar plats ifrån HTML5
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(success, error);
} else {
alert('Geolocation is not supported'); // Hanterar fel
}
function error() {
//alert("That's weird! We couldn't find you!"); //  Hanterar ej defenierade fel
}
function success(position) {
    Geo.lat = position.coords.latitude;
    Geo.lng = position.coords.longitude;

    displayWeather(Geo.lat, Geo.lng);
}

function displayWeather(lat, lng)
{
     // var key = '491c7653412532b53f822d087e1bdd26';
    var Weather = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/491c7653412532b53f822d087e1bdd26/" + lat + "," + lng ; //Kallar upp Dark Sky
    var location = "https://eu1.locationiq.com/v1/reverse.php?key=ca9050a76a4af5&lat=" + lat + "&lon=" + lng + "&format=json";

    // Hämtar väderinfo i en array
    $.getJSON([Weather], function(forecast) {
    // console.log(forecast);
    // Ställer in valda värden på HTML sidan
        $('#temp').text(((forecast.currently.apparentTemperature - 32)/1.8).toFixed(1));
        $('#wind').text(forecast.currently.windSpeed);
    });
    $.getJSON([location], function(loc){
        $('#location').text(loc.display_name);
    });
}

$( function() {
    $( "#searchBox" ).autocomplete({
        minLength: 3,
        source: function(request, response){
            var loc = "https://us1.locationiq.com/v1/search.php?key=ca9050a76a4af5&q=" + request.term + "&format=json";
            var displayName = new Array();
            displayName.length = 0;
            var i = 0;
            //alert("pre-ajax");
            $.ajax({
                type: 'GET',
                url: loc,
                dataType: 'json',
                success: function(data){

                    for (var i = 0; i < data.length; i++){
                        displayName.push(data[i].display_name);
                    }
                    response(displayName);
                },
                error: function(jqXhr, textStatus, errorThrown){
                    displayName.push("No Results");
                    response(displayName);
                }
                
            });          
        }    
    });
} );


$("document").ready(function(){
    $("#find").click(function(){
        $.getJSON(["https://us1.locationiq.com/v1/search.php?key=ca9050a76a4af5&q=" + $("#searchBox").val() + "&format=json"], function(data){
            displayWeather(data[0].lat, data[0].lon);
            malmoe();
        });
    });
});
var choice = "";
var result = "";

function malmoe(){
    choice = document.getElementById('searchBox').value; 
    result = choice.slice(0, 5);
    if (result =="Malmö"){
        // alert(result);
        fetch('./data.json')
        .then(response => {
        return response.json()
        })
        .then(data => {
        document.getElementById('malmo').innerHTML = "Kolla in dessa krogar i Malmö: <br>"+ data.best + '<br>' + data.notBest + '<br>' +data.notWorst + '<br>' +data.worst;
        })
        .catch(err => {
    // Do something for an error here
            alert("Fel, fel fel")
  })
        }
}