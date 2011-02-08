var geocoder;
var map;

var places = new Array();

function initialize() {
	// initialisation de la carte et du géocoder (qui permet de de transformer les adresses postales en coord latLong)
	geocoder = new google.maps.Geocoder();
	var myLatlng = new google.maps.LatLng(48.8574, 2.3478);
	var myOptions = {
		zoom: 13,
      		center: myLatlng,
      		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	//ajout de la map sur la carte
	map = new google.maps.Map(document.getElementById("map"), myOptions);
}

function updateAddresses() {
	// get the addresses displayed in the  <div id="results_zone">
	// and then add each point as a marker on the map

	//clear the previous marker
	places.forEach( function(marker) { marker.setMap(null); } );
	places = new Array();

	//get the addreses and display then on the map
	var address;
	var addresses = document.all("results_zone");
	var marker;
	for(i=0; i<document.getElementsByName("address").length; i++) {
		address = document.getElementsByName("address")[i].getAttribute("value");
		marker = geoCodeAddress(address);
	
		// the marker is stored and added on the map
		places.push(marker);
		marker.setMap(map);
		
		// allows the marker to be hover 
		google.maps.event.addListener(marker, 'mouseover', function() { highlight(marker); });
	}
}



function geoCodeAddress(address) {
	// convert the postal address into a LatLong address and return a marker object
	geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var marker = new google.maps.Marker(
					//on prend le premier résultat (donc le plus pertinent)
					{ position: results[0].geometry.location } );
				marker.address = address;

				return marker;
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
}


function highlight(marker) {
	// highlight the address associated with the marker
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





