//Cette fonction est appelée quand l'utilisateur clique sur "Rechercher" dans la boite de dialogue
function dialogBoxFiltersManager(){
	var checkedFilters = []; 
	$("#districts-dialog-box li").each(function(){
		//Obtenir la balise input à afficher coché sur la balise principale
		var input = $(this).children()[0];
		if(input.checked){
			var li = $(this);
			//On coche l'élément du DOM 'input'
			li.children()[0].setAttribute('checked',true);
			checkedFilters.push(li);
		}	
	});	
	
	//Changer la page principale lorsque l'évènement se termine
	changeHomePageFilters(checkedFilters);
    alert(checkSelect());
	$(document).trigger('close.facebox');
}

function changeHomePageFilters(checkedFilters){
	var remainingFiltersHTML = "";
	var existing2 = [];
	$("#districts form li").each(function(){
		existing2.push("<li>"+ $(this).html()+ "</li>");
	})
		
	for(i=0;i<6;i++) {
		if(i<checkedFilters.length){
			remainingFiltersHTML += '<li>'+checkedFilters[i].html()+'</li>'; 
		}
		else{
			remainingFiltersHTML += existing2[i-checkedFilters.length];
		}
	}
	
	$("#districts form").html(remainingFiltersHTML);

	/*$("#results_zone input").each(function() {
		$(this).attr('checked', 'checked');
	});
	*/	
}


