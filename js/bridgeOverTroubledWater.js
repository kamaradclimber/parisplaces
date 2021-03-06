//these variables are meant to get where we are in the pagination
var currentOffset =0;
var currentLimit =10;

//list of the word not to capitalize
//mainly common words like le, las, les, du 

var commonWords= {"rue":1,
    "du":1, 
    "la":1,
    "les":1,
    "des":1,
    "place":1,
    "boulevard":1,
    "rues":1,
    "rue":1,
    "bd":1,
    "place":1,
    "sentier":1,
    "chemin":1,
    "de":1
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
    //parcourt les checkboxes et teste si elle sont cochées ou non
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
					   $type_list += input.id.substring(3,input.id.length) +",";
						break;
                }
		}	
	});	

    //suppression de la dernière virgule pour les arrondissements et les types de lieu
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
    //makes all the marker be able to react on the mouse hovering on the associated address
    ////this function is pure side effects and take all the currently displayed addresses
    $("div.result").mouseenter(function() { //start bouncing if mouse enter the address zone
        var marker = findAssociatedMarker($(this).attr('value'));
        toggleBounce(marker);
    }).mouseleave(function() { //stop bouncing if mouse leave the address zone 
        var marker = findAssociatedMarker($(this).attr('value'));
        toggleBounce(marker);
    });

}


function afficher(donnees){ 
    $("#results_zone").empty(); // l'affichage des données 

    // on stocke la parité pour pouvoir faire un affichage plus elegant	
    var even = 0;
    var class;
    //we dont want to display more than currentLimitItems, even if the server does not work as expected (else the geocoder is the bottleneck of the application)
    var i=0;
    //Total number of results (useful for pagination)
    var resultsNumber;

    // parcours du xml
    $(donnees).find('place').each(function(){
        even = (even +1) % 2;
        class = "result ";                                              //permet de rendre les résultats bouncable 
        if (even == 0) { class += "even"; } else { class += "odd"; }   //permet de rendre l'affichage plus élégant
        if (i<currentLimit) {
            var id = $(this).attr('id');
            var name = $(this).find('name').text();
            var  address = $(this).find('address').text();

            //on nettoie le nom en essayant d'enlever l'addresse du nom si elle y est
            name = cleanifyer(name,address);
            var  category = $(this).find('category').text();

            // construction du html à afficher pour cette adresse. tout en essayant de régler la capitalisation
            var html = "<h4>" + properCap(name) + "</h4>";
            html += "<p>"+  properCap(address) + "</p>";
            //affichage du html dans la bonne zone
            $('<div class="'+class +'" id="place_' + id + '" value="' + address  + '" name="address" category="' + category + '"></div>').html(html).appendTo('#results_zone');
        }
        i = i+1;
    } );
    
    resultsNumber = $(donnees).find('places').attr('total');
    
    // ajout des addresses, les rends réactives au survol de souris puis ajout de la pagination
    addAddressesOnTheMap();
    makeThemBouncable();
    addPagination(resultsNumber);
    makeMapScrollable();
}


function findAssociatedMarker(address) {
    //finds the marker displayed on the map corresponding to the address 
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

function getPlaces(requestArguments){
	page="connecteur.php"; // on recuperer l' adresse du lien
    $.ajax({  // ajax
        type: "GET",
        dataType: "xml",
        data: requestArguments,
        url: page, // url de la page à charger
        cache: false, // pas de mise en cache
        success:function(results){
            //si la requete est un succès alors on affiche les resultats, on supprime le message d'erreur eventuellement affiché et on surpprime aussi licone de chargement
            displayMessage("");
            afficher(results);
            notLoading();
        },
        error:function(XMLHttpRequest, textStatus, errorThrows){ 
                  // erreur durant la requete donne lieu à un message dérreur et suppression de l ícone de chargement pour ne pas donner de faux espoir à l'utilisateur
                  // pour le moment il ne se passe rien d'autre, on _pourrait_ relancer une autre requete
                  displayMessage("Argh Communication with server has failed\n (don't kill the messenger !)");
                  notLoading();
        }
    });
}

function addPagination(resultsNumber) {
    
    $('#pagination').html("");
    pagesNumber = Math.ceil(resultsNumber/currentLimit);
    
    function loopPagination(start,end){
        for(var i=start; i<end;i++){
            $("<a/>")
                .append(i+1)
                .attr("href","#results_title")
                .attr("id",i)
                .click(function(event){
                    pageClicked = $(this).attr("id")
                    currentOffset = pageClicked*currentLimit;
                    getResults(currentOffset,currentLimit);
                })
                .appendTo('#pagination');
        } 
    }
    
    if(pagesNumber<10){
        loopPagination(0,pagesNumber);
    }
    else{
        currentPage = currentOffset/currentLimit;
        if(currentPage<5){
            loopPagination(0,9);            
        }
        else if(pagesNumber-currentPage>5){
            loopPagination(currentPage-5,currentPage+5);
        }
        else{
            loopPagination(currentPage-5,pagesNumber);
        }
    }
}

function requestConstructor(offset, limit) {
    //construit la requete et vérifie au passage que les arguments ont bien été donnés.
    data = checkSelect();
    if (offset != null) {data += "&offset="+offset;}
    if (limit != null) {data += "&limit="+limit;}
    data+="&destination=getPlaces";
    return data;
}

function getResults(offset, limit) {
    //fonction qui va chercher les résultats.
    //commence par mettre en chargement, puis construit une requete et enfin l'exécute
    data = requestConstructor(offset,limit);
    if (data.indexOf("district",0) >= 0 || data.indexOf("type",0) >=0) { 
		loading();
        getPlaces(data);
    } else {
        // la liste des arrondissements est entièrement décochée => on ne fait rien
        $("#results_zone").html("<p style=\"padding-left:13px; text-align:center;\">Aucune recherche jusqu'à maintenant.</p>");
        $('#pagination').html("");
        places.forEach(function(marker) { marker.setMap(null); });
        places = new Array();
        makeMapNotScrollable();
    }
}

function reactToClickOnForm() {
    //porte bien son nom !
    currentLimit = 10;
    currentOffset = 0;
    getResults(currentOffset,currentLimit);
    return true; // on laisse la case cochée
}


function reactToClickOnText(span){
	var li = span.parent();
		var input = li.children()[0];	
		if(input.checked){
		    input.checked=false;
			reactToClickOnForm();
			highlightZones();
		}
		else{
			input.checked=true;
			reactToClickOnForm();
			highlightZones();
		}
}

$(document).ready(function(){ 	// le document est chargé
    // on selectionne tous les liens et on définit une action quand on clique dessus
    $("input").click(function(){ 	// on selectionne tous les liens et on définit une action quand on clique dessus
        reactToClickOnForm();
    });

	// Pour checker les checkbox en cliquant sur le texte associé
 $("li span").click(function(){
		var span= $(this);
		reactToClickOnText(span);
	});
     
	 //check All
  $(".category h5 input").click(function(){
		var checked_status= this.checked;	
		var parentInput= this;
		var h5= this.parentNode;
		var htmlObj=h5.nextSibling;
		while(htmlObj!=null)
		{
			htmlObj= h5.nextSibling;
			while (htmlObj.nodeType==3){htmlObj=htmlObj.nextSibling;}
			if(htmlObj.tagName.toLowerCase()=='ul')
			{
				var li= htmlObj.getElementsByTagName('li');
				var c=li.length;
				var i=0;
				for (i=0;i<c;i++)
				{
					var input= li[i].firstChild;
					input.checked=checked_status;
				}
				reactToClickOnForm();
				break;	
			}
		}		
	}
	);	
   makeThemBouncable();
});




//toutes les fonctions qui permettent le nettoyage des resultats
//
//
//
function intersection(str1, str2) {
    //test if there is an intersection like:
    //STRING1111strin
    //     G1111strinGHGHG
    var l1 = str1.length;
    var l2 = str2.length;
    for (var start=0; start<l1;start++) {
        //$("#message").append(str1.substring(start, l1) + "    ");
        //$("#message").append(str2.substr(0,l1-start) + "<br> ");
        if (str1.substring(start, l1) == str2.substr(0,l1-start))
        { 
            //alert('ok');
            return start;
        }
    }
    return -1;
}

function cleanifyer(name,address) {
    //try to suppress the address contained in the name if it is !

    var i = intersection(name,address);
    //alert(name + i);
    if (i == -1) return name;
    return name.substring(0,i-1);



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
