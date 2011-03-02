//these variables are meant to get where we are in the pagination
var currentOffset =0;
var currentLimit = 5;

//list of the word not to capitalize
//mainly common words like le, las, les, du 

var commonWords= {"rue":1,
    "du":1, 
    "la":1,
    "les":1,
    "des":1,
    "place":1,
    "boulevard":1,
    "rues":1
};



function displayMessage(string) {
    $("#message").empty(); // on vide le div
    $("#message").html(string);
    
}

function loading() {
    $("#results_zone_loading").show();
    $("#results_zone_notloading").hide();
}
function notLoading() {
    $("#results_zone_notloading").show();
    $("#results_zone_loading").hide();
}

function checkSelect(){
    //parcourt les checboxes et teste si elle sont cochées ou non
    // on renvoit dans le format demandé par le serveur :  district=1,2,5,... (du type category=list)
    $districts_list	= "";
    $type_list	= "";
	$("#filter_zone li").each(function(){
		var input = $(this).children()[0];
		if(input.checked){
                $firstLetters = input.id.substr(0,3); //on teste le type de la checkbox
                switch ($firstLetters) {
                    case "arr" :
                        $districts_list += input.id.substring(3,input.id.length) +",";
                        break;
                    case "typ":
                        $type_list      += input.id.substring(3,input.id.length) +",";
                        break;
                }
		}	
	});	
    arguments="";


    if ($districts_list.length>0) { $districts_list = $districts_list.slice(0,-1); }
    if ($type_list.length>0) { $type_list = $type_list.slice(0,-1); }
    //construct the url
    var url = "";
    if ($districts_list.length>0) { url += "district="+ $districts_list + "&"; }
    if ($type_list.length>0) { url += "type="+ $type_list + "&"; }

    //remove the trailing &
    if (url.length>0) { url = url.slice(0,-1); }
    return url;
}






function makeThemBouncable() {
    //makes the marker be able to react on the mouse hovering on the associated address
    $("div.result").mouseenter(function() { //start bouncing if mouse enter the address zone
        var marker = findAssociatedMarker($(this).attr('value'));
        toggleBounce(marker);
    }).mouseleave(function() { //stop bouncing if mouse leave the address zone 
        var marker = findAssociatedMarker($(this).attr('value'));
        toggleBounce(marker);
    });

}


function afficher(donnees){ 
    $("#results_zone").empty(); // on vide le div


    // on stocke la parité pour pouvoir faire un affichage plus elegant	
    var even = 0;
    var class;

    //we dont want to display more than currentLimitItems, even if the server does not work as expected (else the geocoder is the bottleneck of the application)
    var i=0;

    // parcours du xml
    $(donnees).find('place').each(  function() {
        even = (even +1) % 2;
        class = "result ";                                              //permet de rendre les résultats bouncable 
        if (even == 0 ) { class += "even"; } else { class += "odd"; }   //permet de rendre l'affichage plus élégant
        if (i<currentLimit) {
            var id = $(this).attr('id');
            var name = $(this).find('name').text();
            var  address = $(this).find('address').text();

            name = cleanifyer(name,address);
            var  category = $(this).find('category').text();

            // construction du html à afficher pour cette adresse.
            var html = "<h4>" + properCap(name) + "</h4>";
            html += "<p>"+  properCap(address) + "</p>";
            //affichage du html dans la bonne zone
            $('<div class="'+class +'" id="place_' + id + '" value="' + address  + '" name="address" category="' + category + '"></div>').html(html).appendTo('#results_zone');
        }
        i = i+1;
    } );


    addAddressesOnTheMap();
    makeThemBouncable();
}


function findAssociatedMarker(address) {
    //find the marker displayed on the map corresponding to the address 

    var result;
    for(i=0; i<places.length;i++) {
        if ( places[i].address == address) {
            result = places[i];
            return result;
        }
    }
    if (result == null) {
        //previously we alert but this leads to an error if we try to over a result too soon
        //so we silently fail
        return null;
    }
}

function getPlaces(data){
    page="connecteur.php"; // on recuperer l' adresse du lien
    displayMessage(data);
    $.ajax({  // ajax
        type: "GET",
        dataType: "html",
        data: data,
        url: page, // url de la page à charger
        cache: false, // pas de mise en cache
        success:function(result){ // si la requête est un succès
            displayMessage("");
            afficher(result);
            notLoading();
            addPagination();
        },
        error:function(XMLHttpRequest, textStatus, errorThrows){ // erreur durant la requete
                  displayMessage("Argh Something is not good\n (don't kill the messenger !)");

              }
    });
}

function addPagination() {
    $('#pagination').html("");
    if (currentOffset > 0) {
        $('#pagination').append('<div id="prev"><a>Precedent</a><div>');
        $('#prev a').click(function() {
            currentOffset = Math.max(currentOffset - currentLimit,0);
            getResults(currentOffset,currentLimit);
        });
    }
    $('#pagination').append('<div id="next"><a>Suivant</a><div>');
    $('#next a').click(function() {
        currentOffset += currentLimit;
        getResults(currentOffset,currentLimit);
    });

}

function requestConstructor(offset, limit) {
    //construit la requete et vérfiie au passage que les arguments ont bien été donnés.
    data = checkSelect();
    if (offset != null) {data += "&offset="+offset;}
    if (limit != null) {data += "&limit="+limit;}
    return data;
}

function getResults(offset, limit) {
    //fonction qui va chercher les résultats.
    //commence par mettre en chargement, puis construit une requete et enfin l'exécute
    loading();
    data = requestConstructor(offset,limit);
    getPlaces(data);
}

function reactToClickOnForm() {
        currentLimit = 5;
        currentOffset = 0;
        getResults(currentOffset,currentLimit);
        return true; // on laisse la case cochée
}


// Pour checker les checkbox en cliquant sur le texte associé


$(document).ready(function(){ 	// le document est chargé
    addPagination();
    $("input").click(function(){ 	// on selectionne tous les liens et on définit une action quand on clique dessus
        reactToClickOnForm();
    });

 $("li span").click(function(){
		var span= $(this);
		var li = span.parent();
		var input = li.children()[0];	
		if(input.checked){
		    input.checked=false;
		}
		else{
			input.checked=true;
			currentLimit = 5;
			currentOffset = 0;
			getResults(currentOffset,currentLimit);
		return true;
		}	
	});
    
   makeThemBouncable();

});

function cleanifyer(name,address) {
   //try to suppress the address contained in the name if it is !

    var cleanadd = address.substr(0,address.length-6);
    if (name.substr(name.length - cleanadd.length ,  cleanadd.length) == cleanadd)
    {
            name = name.substr(0, cleanadd.length);
    }
   return name; 
}


function properCap(str) {
    //var string = str.toLowerCase();
    //return string.charAt(0).toUpperCase() + string.slice(1);
    val = str;
    newVal = '';
    val = val.split(' ');
    for(var c=0; c < val.length; c++) {
        var upp = val[c].toLowerCase();
        if (!( upp in commonWords)) {
            newVal += upp.charAt(0).toUpperCase() + upp.slice(1) + ' ';
        } else {
            newVal += upp+ ' ';
        }
    }
    return newVal;
}
