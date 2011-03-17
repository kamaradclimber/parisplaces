//Cette fonction est appelé quand l'utilisateur clique sur "Rechercher" dans la boite de dialogue des arrondissements
function dialogBoxFiltersManager(callback){

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
    callback();

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
	
function dialogBoxCategoryFiltersManager(callback){
    console.log("on entre dans le filter amanager");

    //on va parcourir les cases cochées, déterminer les méta catégories qui ont des enfants cochées et mettre tout ca dans un bel objet
    //ensuite on essaiera de les afficher
    //


    var displayed = new Array();
    var head2cat = new Array();
    $("#facebox #places .Checkall").each(function() { //on a donc uniquement les méta catégories
        var input = $(this);
        var header = $(input).parent().html();
        var div_cat = $(input).parent().parent().children("ul").html();        //le code complet il faudrait le vider
        var firstPar = div_cat.indexOf("\"",0);
        var sndPar   = div_cat.indexOf("\"",firstPar+1);
        div_cat = div_cat.substring(firstPar+1, sndPar);
        //alert(div_cat);
        head2cat[header] = div_cat;
        displayed[header] = new Array();
        //console.log(header);
        //console.log(div_cat);
        $(input).parent().siblings("ul").children().each(function() {
            $(this).children("li").each(function(){
                var inp = $(this).children("input");
                if ($(inp).is(':checked')  ) {
                    //alors il faut l'ajouter à ceux qui seront affichés
			        inp.attr('checked',true);//il faudrait peut etre cocher lelement du DOM comme dans lancienne fonction mais je nen suis pas sur
                    displayed[header].push(  $(this).html() ) ;
                
                
                } else {
                    //on fait rien du tout pour le moment
                    //on pourrait stocker quand meme les autres pour completer si les colonnes sont petites
                }
                //console.log($(this));
            })
        })
    }); 

    changeHomePageCategoryFilters(head2cat, displayed);

    callback();
    reactToClickOnForm();	
	highlightZones();
}

function changeHomePageCategoryFilters(head2cat, displayed){

        $("#filter_zone #places").html("");
        $("#filter_zone #places").append("<h4>Lieux</h4>");

    for( var header in head2cat) {
        if (displayed[header].length >0) {
        $("#filter_zone #places").append("<div class=\"category\"><h5>" + header+ "</h5><ul><div id=\""+ head2cat[header]+ "\">");
        for (var i =0; i<displayed[header].length; i++) {
            $("#filter_zone #places #"+head2cat[header]).append("<li>"+ displayed[header][i] + "</li>");
            console.log(displayed[header][i]);
        }
        $("#filter_zone #places #" + head2cat[header] + " li input").attr('checked', true);
        $("#filter_zone #places").append("</div>" + "</ul>"+ "</div>");
        }
    }
    
	
}
