
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
            $(this).children().each(function() {
                //on traite chacun des enfants

                $(ref+id).append("<li>"+
                    "<input type=\"checkbox\" ><span onClick=\"clickNear(this)\" >" + 
                    $(this).attr("label") 
                    + "</span></li>");
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
            var span= t;
            var li = span.parent();
            var input = li.children()[0];
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
            alert("le chargement a fonctionné");
            parsing(xml, displayPopularOnly,isFacebox, callback);
        },
        error:function(XMLHttpRequest, textStatus, errorThrows){ 
                  alert("le chargement du xml dynamique ne marche pas");
                  dynamic_loaded = true; //pour que ca ne bloque pas tout le reste
              }
    });
}





/*                        <div class="category">
                          <h5><input type="checkbox" class="Checkall"/>Jeunesse</h5>
                          <ul>
                          <li><input type="checkbox"  /><span>Crèche collective</span></li>
                          <li><input type="checkbox"  /><span>Crèche familiale</span></li>
                          <li><input type="checkbox" /><span>Ecole élémentaire & annexes</span></li>
                          <li><input type="checkbox" /><span>Ecole maternelle & annexes</span></li>
                          <li><input type="checkbox" /><span>Ecole polyvalente</span></li>
                          </ul>
                          </div>
                          <div class="category">
                          <h5><input type="checkbox" class="Checkall"/>Sport</h5>
                          <ul>
                          <li><input type="checkbox" ><span>Aires sportives en accès libre</span></li>
                          <li><input type="checkbox" ><span>Gymnase</span></li>
                          <li><input type="checkbox" ><span>Piscine</span></li>
                          <li><input type="checkbox" ><span>Salle de sport</span></li>
                          <li><input type="checkbox" ><span>Terrain de Tennis</span></li>
                          </ul>
                          </div>
                          <div class="category">
                          <h5><input type="checkbox"  class="Checkall"/>Autres</h5>
                          <ul>
                          <li><input type="checkbox"/><span>Bibliothèque</span></li>
                          <li><input type="checkbox"/><span>Conservatoire</span></li>
                          <li><input type="checkbox"/><span>Espace vert</span></li>
                          <li><input type="checkbox"/><span>Mairie d’arrondissement</span></li>
                          <li><input type="checkbox"/><span>Pigeonnier</span></li>
                          </ul>
                          </div>


// */