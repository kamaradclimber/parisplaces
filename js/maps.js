var geocoder;
var map;

var places = new Array();

function initialize() {
    geocoder = new google.maps.Geocoder();
    var myLatlng = new google.maps.LatLng(48.8574, 2.3478);
    var myOptions = 
    {
zoom: 13,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    //ajout de la map sur la carte
    map = new google.maps.Map(document.getElementById("map"), myOptions);	
    updateAddresses();
}

function updateAddresses() {
    // get the addresses displayed in the  <div id="results_zone"> 
    // and then add each point as a marker on the map

    //clear the previous marker
    places.forEach( function(marker) { marker.setMap(null); });
    places = new Array();
    var marker;
    var address;
    var addresses = document.all("results_zone");
    for(i=0; i<document.getElementsByName("address").length; i++) {
        address = document.getElementsByName("address")[i].getAttribute("value");
        turnsItToMarker(address);
    }
}



function turnsItToMarker(address) {
    // create a marker linked to the postal address
    geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({ 
position: results[0].geometry.location,
});
            marker.address = address;

            putOnTheMap(marker);

            } else {
            alert("Geocode was not successful for the following reason: " + status);
            }
            });
}

function putOnTheMap(marker) {
    //makes the marker respond to mouse hovering 
    google.maps.event.addListener(marker, 'mouseover', function() {
            highlight(marker);
            });
    //add the marker in the set of marker currently displayed on the map
    places.push(marker);

    //add the marker on the map
    marker.setMap(map);

}

function toggleBounce(marker) {
    alert(marker.address);
    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
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





