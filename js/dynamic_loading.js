
function parsing(xml, displayPopularOnly, isFacebox,callback) {
	var ref ="";
	if (isFacebox) { ref = "#facebox " ; }
        $(ref+ "#places").html("");
        $(ref+ "#places").append("<h4>Lieux</h4>");
$(xml).find("placeCategories").children().each(function() {
   //traitement des placesCategory niveau 1
   //
    if ($(this).attr('popular')=="true" || !displayPopularOnly ) {
        if ($(this).children().size() > 0 ) {
            //si il a des enfants
            $(ref+"#places").append(
                "<div class=\"category\" >"+
                "<h5><input onClick=\"checkAll1(this)\" type='checkbox' class='Checkall' />" +
                $(this).attr("label") +
                "</h5>"+
                "<ul><div id=\"typ" + 
                $(this).attr("id") + 
                "\"> </div>");

            var id = "#"+"typ" + $(this).attr("id");
            var compteur = 0;
            $(this).children().each(function() {
                compteur++;
                if (compteur <5 || isFacebox) {
                //on traite chacun des enfants

                $(ref+id).append("<li>"+
                    "<input type=\"checkbox\" id=\"typ"+ $(this).attr('id')   + "\" ><span onClick=\"clickNear(this)\" >" + 
                    $(this).attr("label") 
                    + "</span></li>");
                }
            })
            $(ref+"#places").append("</ul></div>");
        } else { 
            //si il na pas d'enfant et qu'il n'est pas un enfant 
           // $("#message").append("<p>noeud normal"+  $(this).attr("label")   + "</p>");

        }
    }
})
callback();
}

function checkAll1(t) {
    //cette fonction coche toutes les sous cases d'une méta catégorie
        var checked_status= t.checked;	
        var parentInput= t;
        var h5= t.parentNode;
        var htmlObj=h5.nextSibling;
        while(htmlObj!=null) {
            htmlObj= h5.nextSibling;
            while (htmlObj.nodeType==3){htmlObj=htmlObj.nextSibling;}
            if(htmlObj.tagName.toLowerCase()=='ul') {
                var li= htmlObj.getElementsByTagName('li');
                var c=li.length;
                var i=0;
                for (i=0;i<c;i++) {
                    var input= li[i].firstChild;
                    input.checked=checked_status;
                }
                break;	
            }
        }		
}


    function clickNear(t) {   
        //cette fonction permet que le clic sur un texte déclenche le clic sur la box associée
            var span= t;
            var li = span.parentNode;
            var input = li.firstChild;
            if(input.checked){
                input.checked=false;
            }
            else{
                input.checked=true;
            }	
    };


function getXml(displayPopularOnly,callback, isFacebox) {
    $.ajax({  // ajax
        type: "GET",
        dataType: "xml",
        url: "static_places_categories.xml", // url de la page à charger
        cache: false, // pas de mise en cache
        success:function(xml){
            parsing(xml, displayPopularOnly,isFacebox, callback);
        },
        error:function(XMLHttpRequest, textStatus, errorThrows){ 
                  displayMessage("le chargement du xml statique ne marche pas");
                  dynamic_loaded = true; //pour que ca ne bloque pas tout le reste
              }
    });

}


function getDynamicXml(displayPopularOnly, callback,isFacebox) {
    var data ="destination=getPlaceCategories";
    $.ajax({  // ajax
        type: "GET",
        dataType: "xml",
        data: data,
        url: "connecteur.php", // url de la page à charger
        cache: false, // pas de mise en cache
        success:function(xml){
            parsing(xml, displayPopularOnly,isFacebox, callback);
        },
        error:function(XMLHttpRequest, textStatus, errorThrows){ 
                  displayMessage("le chargement du xml dynamique ne marche pas");
                  dynamic_loaded = true; //pour que ca ne bloque pas tout le reste
              }
    });
}





