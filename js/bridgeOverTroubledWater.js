
    function checkSelect(){
        //parcourt les checboxes et teste si elle sont ochees ou non
                    form = document.all("criteres");
                    inputs = form.getElementsByTagName("input");
                    arguments="";
                    for(i=0 ; i<inputs.length ; i++){
                        if(inputs[i].type=="checkbox"){
                            arguments += inputs[i].name + "=" + inputs[i].checked + "&";
                        }
                    }
                    return arguments;
                }


$(document).ready(function(){ 	// le document est chargÃ©
   $("input").click(function(){ 	// on selectionne tous les liens et on définit une action quand on clique dessus
	   page="index.php"; // on recuperer l' adresse du lien
       data = checkSelect() + "final=ok";
	$.ajax({  // ajax
        type: "GET",
        data: data,
		url: page, // url de la page à charger
		cache: false, // pas de mise en cache
		success:function(html){ // si la requÃªtÃ© est un succÃ¨s
			afficher(html);	    // on execute la fonction afficher(donnees)
		},
		error:function(XMLHttpRequest, textStatus, errorThrows){ // erreur durant la requete
            alert("Something went wrong");

		}
	});
	return true; // on laisse la case cochée
   });
});

function afficher(donnees){ // pour remplacer le contenu du div contenu
	$("#contenu").empty(); // on vide le div
	$("#contenu").append(donnees); // on met dans le div le résultat de la requete ajax
}
