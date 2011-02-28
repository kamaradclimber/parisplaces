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
    //ajout des adresses sur la carte
    map = new google.maps.Map(document.getElementById("map"), myOptions);	
    addAddressesOnTheMap();
	
					
	arGeo = new Array();
	for (i=1; i<=20; i++) {
		geoXml = new geoXML3.parser({
			map: map,
			singleInfoWindow: true,
			zoom: false
			});
		geoXml.parse('kml/'+i+'.kml');
		arGeo.push(geoXml);
		}
		
	$(".caseArr").click(function(){
		hilightZones();
	});
}

function addAddressesOnTheMap() {
    // get the addresses displayed in the  <div id="results_zone"> 
    // and then add each point as a marker on the map

    //clear the previous marker
    places.forEach( function(marker) { marker.setMap(null); });
    places = new Array();
    var marker;
    var address;
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
    fitTheMap();
    //add the marker on the map
    marker.setMap(map);

}

function toggleBounce(marker) {
    if (marker ==null) {
    //it's mean the marker has not been found in the array of marker, so 2 cases :
    //  - we have a pretty nice bug : too bad
    //  - the whole thing is not fully loaded yet
    //
    //in both case we silently fail but do nothing that can alert the user
    return;
    }
    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}




function highlight(marker) {

    var addresses = $("results_zone");
    for(i=0; i<document.getElementsByName("address").length; i++) {
        if (document.getElementsByName("address")[i].getAttribute("value")== marker.address ) {
            document.getElementsByName("address")[i].setAttribute("class", "odd");
        } else {
            document.getElementsByName("address")[i].setAttribute("class", "even");
        }
    }
}

function fitTheMap() {
    var sw =  new google.maps.LatLng(48.8574, 2.3478);
    var ne =  new google.maps.LatLng(48.8575, 2.3479);
    var bounds = new google.maps.LatLngBounds(sw,ne);

    for(i=0;i<places.length;i++) { 
        //alert(bounds);
         bounds = bounds.extend(places[i].getPosition());
    };
    //map.fitBounds(bounds); 
    map.panToBounds(bounds); 
}


function hilightZones()
{
	for(i=1; i<=20; i ++)
	{
		//window.setTimeout(hilightZones,50);

		arGeo[i-1].hideDocument();
		if(document.getElementById('arr'+i) != null && document.getElementById('arr'+i).checked) 
		{
			arGeo[i-1].showDocument(); 
		}
	}
}


//load the map when the page is loading
google.maps.event.addDomListener(window, 'load', initialize);





