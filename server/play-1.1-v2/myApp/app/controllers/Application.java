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
    
    public static void getPlaceCategories() {
    
    	render();
    }
    
    public static void getAppropriatePlaces() {
    	String typesOfPlaces ="";
    	String districts="";
    	String offset="";
    	String limit="";
    	
    	System.out.println("voici les parametres de la requete : ");
    	System.out.println("district : "+request.params.get("district"));	
    	System.out.println("offset : "+request.params.get("offset"));	
    	System.out.println("limit : "+request.params.get("limit"));	
    	
    	if (request.params._contains("district")) {
    		districts = request.params.get("district");
    	}
    	//else districts = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20";
    	
    	
    	if (request.params._contains("type")) {
    		typesOfPlaces = request.params.get("type");
    	}
    
    	
    	if (request.params._contains("offset")) {
    		offset = request.params.get("offset");
    	}
    	
    	if (request.params._contains("limit")) {
    		limit = request.params.get("limit");
    	}
    	
    	    	
    	/* On vérifie la validité des paramètres */
    	
    	String regexDistricts = "([0-9]|,)*"; //TODO : refuser les chiffres supérieurs à 20
    	String regexPlaces = "([a-z]|[A-Z]|,|_)*";
    	
    	if ((!districts.matches(regexDistricts) || !typesOfPlaces.matches(regexPlaces))) {
    		response.status = 400;
    		Application.error400();
    		return;
    	}
    	
    	/*
    	int[] formattedDistricts;
    	if (!districts.equals("")) {
    		String[] nonFormattedDistricts = districts.split(",");
	    	formattedDistricts = new int[nonFormattedDistricts.length];
	    	for (int i=0;i<nonFormattedDistricts.length;i++) {
	    		if (!nonFormattedDistricts[i].equals("")) {
	    			formattedDistricts[i] = Integer.parseInt(nonFormattedDistricts[i]);
	    		}
	    	}
    	}
   		else formattedDistricts = new int[0];
    	*/
    	
    	String[] nonFormattedDistricts = districts.split(",");
    	ArrayList<Integer> formattedDistricts = new ArrayList<Integer>();
    	for (int i=0;i<nonFormattedDistricts.length;i++) {
	    		if (!nonFormattedDistricts[i].equals("")) {
	    			formattedDistricts.add(Integer.parseInt(nonFormattedDistricts[i]));
	    		}
	    	}
    	
    	
    	String[] formattedTypes = typesOfPlaces.split(",");
    	System.out.println("------------------------------------");
    	System.out.println("typesOfPlaces= " + typesOfPlaces);
    	System.out.println("------------------------------------");
    	/* formattage des limit et offset */
    	System.out.println("------------------------------------");
    	System.out.println("formattedTypes= " + formattedTypes[0]);
    	System.out.println("------------------------------------");
    	int formattedLimit;
    	if (!limit.equals("")) formattedLimit = Integer.parseInt(limit);
    	else formattedLimit = Integer.MAX_VALUE;
    	System.out.println(formattedLimit);
    	
    	int formattedOffset;
    	if (!offset.equals("")) formattedOffset = Integer.parseInt(offset);
    	else formattedOffset = 0;
    	
    	/* appel des DataSoucre */
    	
    	ArrayList<Place> places = new ArrayList<Place>();
    	ArrayList<DataSource> list = ListDataSource.getList();
    	//Il faudrait traverser la list des datasources
    	/*
    	try {
    		places = list.get(0).getLocations(formattedDistricts, formattedTypes);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		*/
		try {
    		for (DataSource datasource : list) {
    			places.addAll(datasource.getLocations(formattedDistricts, formattedTypes));
    		}
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	
		/* On ne garde que le nombre de résultats correspondant à limit */
		int numberResults = places.size();
		if (formattedLimit == Integer.MAX_VALUE) formattedLimit = numberResults;
		ArrayList<Place> placesWithLimit = new ArrayList<Place>();
		int loopLimit = Math.min(formattedLimit+formattedOffset, places.size());
		for (int i=formattedOffset;i<loopLimit;i++) {
			placesWithLimit.add(places.get(i));
		}
		
    	//TODO : appeler toutes les DataSouce static instanciés à l'allumage du serveur et merger tous les résultats
    	
    	//TODO : gérer le offset
    	renderArgs.put("total",numberResults);
    	renderArgs.put("places",placesWithLimit);
    	renderArgs.put("limit", formattedLimit);
    	renderArgs.put("offset",formattedOffset);
    	render();
    	
    }
}