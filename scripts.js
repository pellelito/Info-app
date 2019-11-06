var Weather  =""
var Geo={};
//  Hämtar plats ifrån HTML5
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(success,error);
}
else {
alert('Geolocation is not supported'); // Hanterar fel
}
function error() {
alert("That's weird! We couldn't find you!"); //  Hanterar ej defenierade fel
}
function success(position) {
      Geo.lat = position.coords.latitude;
      Geo.lng = position.coords.longitude;
  
     	 // var key = '491c7653412532b53f822d087e1bdd26';
		var Weather = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/491c7653412532b53f822d087e1bdd26/" + Geo.lat + "," + Geo.lng ; //Kallar upp Dark Sky
        var location = "https://eu1.locationiq.com/v1/reverse.php?key=ca9050a76a4af5&lat=" + Geo.lat + "&lon=" + Geo.lng + "&format=json";
        
    // Hämtar väderinfo i en array
		$.getJSON([Weather], function(forecast) {
    	// console.log(forecast);
    	// Ställer in valda värden på HTML sidan
            
            //$('#location').text(forecast.latitude +", " + forecast.longitude);
            $.getJSON([location], function(loc){
                $('#location').text(loc.address.county);
            });
            //
            //$('#location').text(loc.place_id);
            
            $('#temp').text((forecast.currently.apparentTemperature - 32)/1.8);
            $('#wind').text(forecast.currently.windSpeed);
});
}