function parsing(xml) {

alert("ok");
        $("#places").html("");
        $("#places").append("<h4>Lieux</h4>");
$(xml).find("placeCategories").children().each(function() {
   //traitement des placesCategory niveau 1
   //
    if ($(this).children().size() > 0 ) {
        //si il a des enfants
        $("#places").append("<div class=\"category\" >");
        $("#places").append("<h5><input type=\"checkbox\" class=\"Checkall\"/>");
        $("#places").append($(this).attr("label"));
        $("#places").append("</h5>");
        $("#places").append("<ul>");
        $("#places").append("<div id=\"" + $(this).attr("id") + "\"> </div>");

        var id = "#"+ $(this).attr("id");
        alert(id);
    $(this).children().each(function() {
        //on traite chacun des enfants

        $(id).append("<li>");
        $(id ).append("<input type=\"checkbox\" ><span>" + $(this).attr("label") + "</span></li>");
    })
        $("#places").append("</ul></div>");

    } else { 
        //si il na pas  
        $("#message").append("<p>noeud normal"+  $(this).attr("label")   + "</p>");

    }
})

alert("ok");

}


function getXml() {
    $.ajax({  // ajax
        type: "GET",
        dataType: "xml",
        url: "static_places_categories.xml", // url de la page à charger
        cache: false, // pas de mise en cache
        success:function(xml){
            alert("le chargement a fonctionné");
            parsing(xml);
        },
        error:function(XMLHttpRequest, textStatus, errorThrows){ 
            alert("le chargement du xml statique ne marche pas");
        }
    });

}


function getDynamicXml() {

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
