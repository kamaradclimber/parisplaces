
    function checkSelect(){
        //parcourt les checboxes et teste si elle sont cochées ou non
	// on renvoit dans le format demandé par johan :  district=1,2,5,... (du type category=list)
                    form = document.all("criteres");
                    inputs = form.getElementsByTagName("input");
                    arguments="";

			$districts_list	= "";
			$type_list	= "";
			
					
			for(i=0 ; i<inputs.length ; i++){
				if(inputs[i].type=="checkbox"){
					if (inputs[i].checked) {
						$firstLetters = inputs[i].name.substr(0,3);
						switch ($firstLetters) {
							case "arr" :
								$districts_list += inputs[i].name.substring(3,inputs[i].name.length) +",";
								break;
							case "typ":
								$type_list += inputs[i].name.substring(3,inputs[i].name.length-1) +",";
								break;
						}
					} else {
						//do nothing since the checkbox isnt checked	
					}
				}
			}
			if ($districts_list.length>0) { $districts_list = $districts_list.slice(0,-1); }
			if ($type_list.length>0) { $type_list = $type_list.slice(0,-1); }
			//return "district=" + $districts_list +"&" + $type_list;
			return "district=" + $districts_list;
    }




$(document).ready(function(){ 	// le document est chargée
   $("input").click(function(){ 	// on selectionne tous les liens et on définit une action quand on clique dessus
	   page="connecteur.php"; // on recuperer l' adresse du lien
       data = checkSelect();
	$.ajax({  // ajax
        type: "GET",
        data: data,
		url: page, // url de la page à charger
		cache: false, // pas de mise en cache
		success:function(html){ // si la requête est un succès
			afficher(html);	    // on execute la fonction afficher(donnees)
		},
		error:function(XMLHttpRequest, textStatus, errorThrows){ // erreur durant la requete
            alert("Argh Something is not so good\n (don't kill the messenger !)");

		}
	});
	return true; // on laisse la case cochée
   });
});

function afficher(donnees){ // pour remplacer le contenu du div contenu
	$("#contenu").empty(); // on vide le div
    for( var i in donnees.getElementsByTagName("to")) {
        $("#contenu").append(donnees.getElementsByTagName("to")[i].childNodes[0].nodeValue);
    }
}
