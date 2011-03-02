//Cette fonction est appel� quand l'utilisateur clique sur "Rechercher" dans la boite de dialogue
function dialogBoxFiltersManager(){
	var checkedFilters = []; 
	var nonCheckedFilters = [];
	
	$("#districts-dialog-box li").each(function(){
		var li = $(this);
		var input = li.children()[0];
		var zoneNumber = $(this).attr('name');
		zoneNumber = zoneNumber.substr(3);	
		if(input.checked){
			//On coche l'�l�ment du DOM 'input'
			input.setAttribute('checked',true);
			checkedFilters.push(li);
			input.setAttribute('id','arr'+zoneNumber);		
		}
		else{
			nonCheckedFilters.push(li);
			input.setAttribute('id','arr'+zoneNumber);	
		}

		
	});	
	
	var totalFilters = checkedFilters.concat(nonCheckedFilters);
	
	//Changer la page principale lorsque l'�v�nement se termine
	changeHomePageFilters(totalFilters);
    var data = checkSelect();
    getPlaces(data);
	$(document).trigger('close.facebox');
	
	hilightZones();
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
    $("input").click(function(){ 	// on selectionne tous les liens et on d�finit une action quand on clique dessus
        reactToClickOnForm();
    });
	
	$(".caseArr, .caseAr").click(function(){
		hilightZones();
	});	
}


