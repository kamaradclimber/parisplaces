
function checkSelect(){
    //parcourt les checboxes et teste si elle sont cochées ou non
    // on renvoit dans le format demandé par le serveur :  district=1,2,5,... (du type category=list)
    form = document.all("filter_zone");
    inputs = form.getElementsByTagName("input");
    arguments="";

    $districts_list	= "";
    $type_list	= "";

    for(i=0 ; i<inputs.length ; i++){
        if(inputs[i].type=="checkbox") {
            if (inputs[i].checked) {
                $firstLetters = inputs[i].name.substr(0,3); //on teste le type de la checkbox
                switch ($firstLetters) {
                    case "arr" :
                        $districts_list += inputs[i].name.substring(3,inputs[i].name.length) +",";
                        break;
                    case "typ":
                        $type_list      += inputs[i].name.substring(3,inputs[i].name.length) +",";
                        break;
                }
            } else {
                //do nothing since the checkbox isnt checked	
            }
        }
    }
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





var bob = '<?xml version="1.0" encoding="utf-8" ?><places> <place id=”897ff56a2”> <name>Bibliothèque François Mitterrand</name> <address>1 boulevard Pasteur, Paris</address> <coords>874.93879098</coords> </place> <place id=”89ds56”> <name>Mes grands parents</name> <address>76 rue Notre Dame des Champs, Paris</address> <coords>874.93879098</coords> </place> <place id="8493843dd89"> <name>Un endroit sympa</name><address> Ile de la Cité, Paris</address>  </place>  </places>';

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


function afficher(donnees){ // pour remplacer le contenu du div contenu
    $("#contenu").empty(); // on vide le div
    $("#results_zone").empty(); // on vide le div

    // on stocke la parité pour pouvoir faire un affichage plus elegant	
    var even = 0;
    var class;

    // parcours du xml
    $(bob).find('place').each(  function() {
        even = (even +1) % 2;
        class = "result ";                                              //permet de rendre les résultats bouncable 
        if (even == 0 ) { class += "even"; } else { class += "odd"; }   //permet de rendre l'affichage plus élégant
        var id = $(this).attr('id');
        var name = $(this).find('name').text();
        var  address = $(this).find('address').text();

        // construction du html à afficher pour cette adresse.
        var html = "<h4>" + name + "</h4>";
        html += "<p>"+  address + "</p>";
        //affichage du html dans la bonne zone
        $('<div class="'+class +'" id="place_' + id + '" value="' + address  + '" name="address"></div>').html(html).appendTo('#results_zone');
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
    if (result == null) { alert('not found'); }
}

$(document).ready(function(){ 	// le document est chargé
    $("input").click(function(){ 	// on selectionne tous les liens et on définit une action quand on clique dessus
        page="connecteur.php"; // on recuperer l' adresse du lien
        data = checkSelect();
        $.ajax({  // ajax
            type: "GET",
            dataType: "xml",
            data: data,
            url: page, // url de la page à charger
            cache: false, // pas de mise en cache
            success:function(result){ // si la requête est un succès
                afficher(result);
            },
            error:function(XMLHttpRequest, textStatus, errorThrows){ // erreur durant la requete
                      alert("Argh Something is not good\n (don't kill the messenger !)");

                  }
        });
        return true; // on laisse la case cochée
    });

    makeThemBouncable();

});
