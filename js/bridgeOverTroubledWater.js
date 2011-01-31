
    function checkSelect(){
        //parcourt les checboxes et teste si elle sont cochées ou non
                    form = document.all("criteres");
                    inputs = form.getElementsByTagName("input");
                    arguments="";
                    for(i=0 ; i<inputs.length ; i++){
                        if(inputs[i].type=="checkbox"){
                            arguments += inputs[i].name + "=" + inputs[i].checked + "&";
                        }
                    }
			if (inputs.length>0) { arguments = arguments.slice(0,-1); }
                    return arguments;
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
	$("#contenu").append(donnees); // on met dans le div le résultat de la requete ajax
}
