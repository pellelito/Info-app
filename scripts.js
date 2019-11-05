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
		// Hämtar väderinfo i en array
		$.getJSON([Weather], function(forecast) {
    	// console.log(forecast);
    	// Ställer in valda värden på HTML sidan
         $('#location').text(forecast.latitude +", " + forecast.longitude);
    	$('#temp').text(forecast.currently.apparentTemperature);
		$('#wind').text(forecast.currently.windSpeed);
});
}