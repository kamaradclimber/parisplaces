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

	$(".caseArr, .caseAr").click(function(){
		highlightZones();
	});	
}

function addAddressesOnTheMap() {
    // get the addresses displayed in the  <div id="results_zone"> 
    // and then add each point as a marker on the map

    //clear the previous marker
    places.forEach(function(marker) { marker.setMap(null); });
    places = new Array();
    var marker;
    var address;
    var category;
    for(i=0; i<document.getElementsByName("address").length; i++) {
        address = document.getElementsByName("address")[i].getAttribute("value");
        category = document.getElementsByName("address")[i].getAttribute("category");
        turnsItToMarker(address, category, 0);
    }
}



function turnsItToMarker(address, category, nbtry) {
	var icoUrl = null;
	
	if(category != null)
	{
	if(category.search(/jardi/i) > -1 || category.search(/promena/i) > -1)
		icoUrl = "icos/arbre.png";
	if(category.search(/biblio/i) > -1)
		icoUrl = "icos/biblio.png";
	if(category.search(/ecole/i) > -1 || category.search(/crèche/i) > -1)
		icoUrl = "icos/ecole.png";
	if(category.search(/mairie/i) > -1)
		icoUrl = "icos/fr.png";
	if(category.search(/pigeo/i) > -1)
		icoUrl = "icos/pigeon.png";
	if(category.search(/piscin/i) > -1)
		icoUrl = "icos/piscine.png";
	if(category.search(/gymn/i) > -1)
		icoUrl = "icos/sport.png";
	if(category.search(/tennis/i) > -1)
		icoUrl = "icos/tennis.png";
	if(category.search(/conserva/i) > -1)
		icoUrl = "icos/violon.png";
	}
	
//maintenant on passe les demandes de marker par requete http se qui "en theorie, dapres la doc de google maps" permettre de faire plus de requete a la seconde
    var data = "destination=geocode&sensor=false&";

    data += "address=" + address.replace(" ", "+");

    $.ajax({  // ajax
        type: "GET",
        dataType: "json",
        data:data,
        url: "connecteur.php", // url de la page à charger
        cache: false, // pas de mise en cache
        success:function(results){ // si la requête est un succès
            //en cas du succès on affiche un marker
			var marker;
			if(icoUrl != null) {
             marker = new google.maps.Marker({ 
                position: new google.maps.LatLng(results.results[0].geometry.location.lat,
                                                 results.results[0].geometry.location.lng),
                    icon: icoUrl,
            });	

            } else {

             marker = new google.maps.Marker({ 
                position: new google.maps.LatLng(results.results[0].geometry.location.lat,
                                                 results.results[0].geometry.location.lng)
            });	

            }
            marker.address = address;

            putOnTheMap(marker);
        },
        error:function(JSonHttpRequest, textStatus, errorThrows){ // erreur durant la requete
                displayMessage("not working ....");
              }
    });
// */
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
            document.getElementsByName("address")[i].setAttribute("class", "trice");
        } else {
            if (i%2==0) document.getElementsByName("address")[i].setAttribute("class", "odd");
            if (i%2==1) document.getElementsByName("address")[i].setAttribute("class", "even");
        }
    }
}

function fitTheMap() {
    /*
    var sw =  new google.maps.LatLng(48.8574, 2.3478);
    var ne =  new google.maps.LatLng(48.8575, 2.3479);
    var bounds = new google.maps.LatLngBounds(sw,ne);

    for(i=0;i<places.length;i++) { 
        //alert(bounds);
         bounds = bounds.extend(places[i].getPosition());
         alert( places[i].getPosition());
    };
    //map.fitBounds(bounds); 
    map.panToBounds(bounds); 
    */
    //pour le moment cette fonction renvoit de temps en temps des zones fausses pour une raison bizarre
}

function fillZoneArrays()
{
	highlightedZones = new Array();
	for(i=1; i<=20; i ++)
	{
		if($('#arr'+i).is(':checked'))
		{
			highlightedZones.push(i);
		}
		if($('#ar'+i).length && $('#ar'+i).is(':checked'))
		{
			highlightedZones.push(i);
		}
	}
	highlightedZones = unique(highlightedZones);
	//alert(highlightedZones);
}

function dohighlightZones()
{
	fillZoneArrays();

	for(i=1; i<=20; i ++)
	{
		arGeo[i-1].hideDocument();
	}

	for (i=0;i<highlightedZones.length;i++)
	{
		arGeo[highlightedZones[i]-1].showDocument();
	}
}

$(document).ready(function () {
	setTimeout(highlightZones, 1000);
});

function highlightZones()
{
	dohighlightZones();
}

//load the map when the page is loading
google.maps.event.addDomListener(window, 'load', initialize);


function unique(ar) {
    var a = [];
    var l = ar.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (ar[i] === ar[j])
          j = ++i;
      }
      a.push(ar[i]);
    }
    return a;
  };




