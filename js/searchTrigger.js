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
    console.log("on entre dans le filter amanager");
	var checkedJeunesseFilters = []; 
	var nonCheckedJeunesseFilters = [];
	var checkedSportFilters = []; 
	var nonCheckedSportFilters = [];
	var checkedAutreFilters = []; 
	var nonCheckedAutreFilters = [];
	//RŽpartir les filtres cochŽs et les filtres non cochŽs dans les tableaux correspondants

    //on va parcourir les cases cochées, déterminer les méta catégories qui ont des enfants cochées et mettre tout ca dans un bel objet
    //ensuite on essaiera de les afficher
    //


    var displayed = new Array();
    var head2cat = new Array();
    $("#facebox #places .Checkall").each(function() { //on a donc uniquement les méta catégories
        var input = $(this);
        var header = $(input).parent().html();
        var div_cat = $(input).parent().siblings("ul").html(); //le code complet il faudrait le vider
        head2cat[header] = div_cat;
        displayed[header] = new Array();
        //console.log(header);
        //console.log(div_cat);
        $(input).parent().siblings("ul").children().each(function() {
            $(this).children("li").each(function(){
                var inp = $(this).children("input");
                if ($(inp).is(':checked')  ) {
                    //alors il faut l'ajouter à ceux qui seront affichés
			        // inp.setAttribute('checked',true);//il faudrait peut etre cocher lelement du DOM comme dans lancienne fonction mais je nen suis pas sur
                    displayed[header].push($(this).html());
                
                
                } else {
                    //on fait rien du tout pour le moment
                    //on pourrait stocker quand meme les autres pour completer si les colonnes sont petites
                }
                //console.log($(this));
            })
        })
            

    }); 

    for( var header in head2cat) {
        console.log(header);
        console.log(head2cat[header]);
        for (var i =0; i<displayed[header].length; i++) {
            console.log("   "+ displayed[header][i]);
        }
    }



/*
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

//*/

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
