package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {
        render();
    }

    public static void error400() {
    	render();
    }
    
    public static void getAppropriatePlaces(String arr, String placeCategories) {
    	String typesOfPlaces;
    	String districts;
    	
    	if (request.params._contains("district")) {
    		districts = request.params.get("district");
    	}
    	else districts = "";
    	
    	if (request.params._contains("type")) {
    		typesOfPlaces = request.params.get("type");
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
    		formattedDistricts[i] = Integer.parseInt(nonFormattedDistricts[i]);
    	}
    	
    	String[] formattedTypes = typesOfPlaces.split(",");
    	
    	render();
    	
    }
}