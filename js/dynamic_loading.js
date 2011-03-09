function parsing(xml) {


}


function getXml() {
    $.ajax({  // ajax
        type: "GET",
        dataType: "xml",
        url: "static_places_categories.xml", // url de la page à charger
        cache: false, // pas de mise en cache
        success:function(results){
            alert("le chargement a fonctionné");
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
