//Cette fonction est appelé quand l'utilisateur clique sur "Rechercher" dans la boite de dialogue des arrondissements
function dialogBoxFiltersManager(){

	var checkedFilters = []; 
	var nonCheckedFilters = [];
	
	//RŽpartir les filtres cochŽs et les filtres non cochŽs dans les tableaux correspondants
	$("#districts-dialog-box li").each(function(){
		var li = $(this);
		var input = li.children()[0];
		var zoneNumber = input.name;
		zoneNumber = zoneNumber.substr(3);	
		if(input.checked){
			//On coche l'élément du DOM 'input'
			input.setAttribute('checked',true);
			checkedFilters.push(li);
			input.setAttribute('id','arr'+zoneNumber);	
		}
		else{
			nonCheckedFilters.push(li);
			input.setAttribute('id','arr'+zoneNumber);	
		}
	});	
	
	//ConcatŽner le tableau des filtres non-cochŽs au tableau des filtres cochŽs
	var totalFilters = checkedFilters.concat(nonCheckedFilters);
	
	//Changer la page principale lorsque l'évènement se termine
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
    $("input").click(function(){ 	// on selectionne tous les liens et on définit une action quand on clique dessus
        reactToClickOnForm();
		});
		// Pour checker les checkbox en cliquant sur le texte associé
 $("li span").click(function(){
		var span= $(this);
		reactToClickOnText(span);
	});
	
	$(".caseArr, .caseAr").click(function(){
		highlightZones();
	});	
}

//Cette fonction est appelé quand l'utilisateur clique sur "Rechercher" dans la boite de dialogue des Catégories
	
function dialogBoxCategoryFiltersManager(){
	var checkedJeunesseFilters = []; 
	var nonCheckedJeunesseFilters = [];
	var checkedSportFilters = []; 
	var nonCheckedSportFilters = [];
	var checkedAutreFilters = []; 
	var nonCheckedAutreFilters = [];
	//RŽpartir les filtres cochŽs et les filtres non cochŽs dans les tableaux correspondants
	
	$(".JeunesseFacebox li").each(function(){
		var li = $(this);
		var input = li.children()[0];
		var categoryCode = input.name;
		categoryCode = categoryCode.substr(3);	
		if(input.checked){
			//On coche l'élément du DOM 'input'
			input.setAttribute('checked',true);
			checkedJeunesseFilters.push(li);
			input.setAttribute('name','jeu'+categoryCode);	
			}
		else{
			nonCheckedJeunesseFilters.push(li);
			input.setAttribute('name','jeu'+categoryCode);	
		}
	});	
	
	$(".SportFacebox li").each(function(){
		var li = $(this);
		var input = li.children()[0];
		var categoryCode = input.name;
		categoryCode = categoryCode.substr(3);	
		if(input.checked){
			//On coche l'élément du DOM 'input'
			input.setAttribute('checked',true);
			checkedSportFilters.push(li);
			input.setAttribute('name','spo'+categoryCode);	
		}
		else{
			nonCheckedSportFilters.push(li);
			input.setAttribute('name','spo'+categoryCode);	
		}
	});
	$(".AutresFacebox li").each(function(){
		var li = $(this);
		
		var input = li.children()[0];
		var categoryCode = input.name;
		categoryCode = categoryCode.substr(3);	
		if(input.checked){
			//On coche l'élément du DOM 'input'
			input.setAttribute('checked',true);
			checkedAutreFilters.push(li);
			input.setAttribute('name','aut'+categoryCode);	
		}
		else{
			nonCheckedAutreFilters.push(li);
			input.setAttribute('name','aut'+categoryCode);	
		}
	});		
	//ConcatŽner le tableau des filtres non-cochŽs au tableau des filtres cochŽs
	var totalJeunesseFilters = checkedJeunesseFilters.concat(nonCheckedJeunesseFilters);
	var i=0;
	for (i=0;i<totalJeunesseFilters.length;i++){
	//alert(totalJeunesseFilters[i].html());
	}
	var totalSportFilters = checkedSportFilters.concat(nonCheckedSportFilters);
	//alert(totalSportFilters.length);
	var totalAutreFilters = checkedAutreFilters.concat(nonCheckedAutreFilters);
	//alert(totalAutreFilters.length);
	//Changer la page principale lorsque l'évènement se termine
	changeHomePageCategoryFilters(totalJeunesseFilters,totalSportFilters,totalAutreFilters);
	$(document).trigger('close.facebox');

    reactToClickOnForm();	
	highlightZones();
}

function changeHomePageCategoryFilters(totalJeunesseFilters,totalSportFilters,totalAutreFilters){
	var filterListHTML ='';
	//gestion des lieux Jeunesse
	for(i=0;i<5;i++) {
		filterListHTML += '<li>'+totalJeunesseFilters[i].html()+'</li>'; 
	}
	for(i=6, c = totalJeunesseFilters.length;i<c; i++){
		filterListHTML += '<li style="display:none;">'+totalJeunesseFilters[i].html()+'</li>'; 
	}
	$(".Jeunesse").html(filterListHTML);
	
	
		//gestion des lieux Sport
	filterListHTML ='';
	for(i=0;i<5;i++) {
		filterListHTML += '<li>'+totalSportFilters[i].html()+'</li>'; 
	}
	for(i=6, c = totalSportFilters.length;i<c; i++){
		filterListHTML += '<li style="display:none;">'+totalSportFilters[i].html()+'</li>'; 
	}
	$(".Sport").html(filterListHTML);
	
		//gestion des lieux Autres
	filterListHTML ='';
	for(i=0;i<5;i++) {
		filterListHTML += '<li>'+totalAutreFilters[i].html()+'</li>'; 
	}
	for(i=6, c = totalAutreFilters.length;i<c; i++){
		filterListHTML += '<li style="display:none;">'+totalAutreFilters[i].html()+'</li>'; 
	}
	$(".Autres").html(filterListHTML);
    
	
    $("input").click(function(){ 	// on selectionne tous les liens et on définit une action quand on clique dessus
        reactToClickOnForm();
		});
		// Pour checker les checkbox en cliquant sur le texte associé
 $("li span").click(function(){
		var span= $(this);
		reactToClickOnText(span);
	});	
}
