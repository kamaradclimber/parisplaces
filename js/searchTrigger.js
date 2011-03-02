//Cette fonction est appel� quand l'utilisateur clique sur "Rechercher" dans la boite de dialogue
function dialogBoxFiltersManager(){
	var checkedFilters = []; 
	var nonCheckedFilters = [];
	
	//R�partir les filtres coch�s et les filtres non coch�s dans les tableaux correspondants
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
	
	//Concat�ner le tableau des filtres non-coch�s au tableau des filtres coch�s
	var totalFilters = checkedFilters.concat(nonCheckedFilters);
	
	//Changer la page principale lorsque l'�v�nement se termine
	changeHomePageFilters(totalFilters);
	$(document).trigger('close.facebox');

    reactToClickOnForm();	
	highlightZones();
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
		highlightZones();
	});	
}


