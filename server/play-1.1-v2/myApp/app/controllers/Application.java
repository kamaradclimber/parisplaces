package controllers;

import play.*;
import play.mvc.*;

import java.sql.SQLException;
import java.util.*;

import jobs.ListDataSource;

import models.*;

public class Application extends Controller {

    public static void index() {
        render();
    }

    public static void error400() {
    	render();
    }
    
    public static void getAppropriatePlaces() {
    	String typesOfPlaces ="";
    	String districts="";
    	String offset="";
    	String limit="";
    	
    	if (request.params._contains("district")) {
    		districts = request.params.get("district");
    	}
    	
    	
    	if (request.params._contains("type")) {
    		typesOfPlaces = request.params.get("type");
    	}
    
    	
    	if (request.params._contains("offset")) {
    		offset = request.params.get("offset");
    	}
    	
    	if (request.params._contains("limit")) {
    		limit = request.params.get("limit");
    	}
    	
    	
    	else typesOfPlaces = "";
    	
    	/* On vérifie la validité des paramètres */
    	
    	String regexDistricts = "([0-9]|,)*";
    	String regexPlaces = "([a-z]|[A-Z]|,)*";
    	
    	if ((!districts.matches(regexDistricts) || !typesOfPlaces.matches(regexPlaces))) {
    		response.status = 400;
    		Application.error400();
    		return;
    	}
    	
    	String[] nonFormattedDistricts = districts.split(",");
    	int[] formattedDistricts = new int[nonFormattedDistricts.length];
    	for (int i=0;i<nonFormattedDistricts.length;i++) {
    		if (!nonFormattedDistricts[i].equals("")) {
    			formattedDistricts[i] = Integer.parseInt(nonFormattedDistricts[i]);
    		}
    	}
    	
    	
		
    	

    	/*
    	Place one = new Place("ma maison", 5, "rue Raynouard",75016);
    	Place two = new Place("ma garçonière", 10, "rue de Seine",75006);
    	places[0] = one;
    	places[1] = two;
    	*/
    	//connector.getLocations(formattedDistricts, formattedTypes);

    	//CsvConnector connector = new CsvConnector();
    	ArrayList<Place> places;// 

    	String[] formattedTypes = typesOfPlaces.split(",");
    	
 
    	Place one = new Place("Grégoire est un alcolo", 5, "rue Raynouard",75016);
    	Place two = new Place("Damien est un homo", 10, "rue de Seine",75006);
    	
    	
    	
    	ArrayList<DataSource> list = ListDataSource.getList();
    	try {
   		DataSource connector = new Liste_equipements_de_proximite_2011();
    		places = connector.getLocations(formattedDistricts, formattedTypes);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
  		
    		try {
				places = list.get(0).getLocations(formattedDistricts, formattedTypes);
			} catch (SQLException e1) {
				places = new ArrayList<Place>();
				places.add(one);
				places.add(two);
				e1.printStackTrace();
			}
		
			e.printStackTrace();
		}
    	 
		
    	//TODO : appeler toutes les DataSouce static instanciés à l'allumage du serveur et merger tous les résultats
    	
    	//TODO : gérer le offset
    	
    	renderArgs.put("places",places);
    	renderArgs.put("limit", limit);
    	renderArgs.put("offset",offset);
    	render();
    	
    }
}