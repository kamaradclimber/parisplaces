//Cette fonction est appelée quand l'utilisateur clique sur "Rechercher" dans la boite de dialogue
function dialogBoxFiltersManager(){
	var checkedFilters = []; 
	var nonCheckedFilters = [];
	$("#districts-dialog-box li").each(function(){
		var li = $(this);
		var input = li.children()[0];
		if(input.checked){
			//On coche l'élément du DOM 'input'
			input.setAttribute('checked',true);
			checkedFilters.push(li);
		}
		else{
			nonCheckedFilters.push(li);
		}	
	});	
	
	var totalFilters = checkedFilters.concat(nonCheckedFilters);
	
	//Changer la page principale lorsque l'évènement se termine
	changeHomePageFilters(totalFilters);
    alert(checkSelect());
	$(document).trigger('close.facebox');
}

function changeHomePageFilters(totalFilters){
	var filterListHTML ='';
	for(i=0;i<6;i++) {
		filterListHTML += '<li>'+totalFilters[i].html()+'</li>'; 
	}
	for(i=7, c = totalFilters.length;i<c; i++){
		filterListHTML += '<li style="display:none;">'+totalFilters[i].html()+'</li>'; 
	}
	
	$("#districts form").html(filterListHTML);
}


