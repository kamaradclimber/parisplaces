var geocoder;
var map;
function initialize() {
	geocoder = new google.maps.Geocoder();
	var myLatlng = new google.maps.LatLng(48.8574, 2.3478);
	var myOptions = {
zoom: 13,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map"), myOptions);	
	codeAddress("76 rue Notre Dame des Champs, Paris");
	var address;
	var addresses = document.all("results_zone");
	for(i=0; i<document.getElementsByName("address").length; i++) {
		address = document.getElementsByName("address")[i].getAttribute("value");
		codeAddress(address);
	}
}

function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
            map: map, 
            position: results[0].geometry.location
        });
	marker.address = address;
	google.maps.event.addListener(marker, 'mouseover', function() {
		highlight(marker);
  	});
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }


function highlight(marker) {

	var addresses = document.all("results_zone");
	for(i=0; i<document.getElementsByName("address").length; i++) {
		if (document.getElementsByName("address")[i].getAttribute("value")== marker.address ) {
				document.getElementsByName("address")[i].setAttribute("class", "odd");
		} else {
				document.getElementsByName("address")[i].setAttribute("class", "even");
		}
	}
}


google.maps.event.addDomListener(window, 'load', initialize);





