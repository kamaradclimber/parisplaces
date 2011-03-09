package controllers;

import java.lang.reflect.Array;
import java.sql.SQLException;
import java.util.ArrayList;

import models.Place;

public abstract class DataSource {

	//configFile = "config.xml";
    
	PlaceCategory hierarchy;
	
	public DataSource()
	{
		
	}
	
	abstract public ArrayList<Place> getLocations(ArrayList<Integer> districts, String[]  typeOfLocation) throws SQLException;
	
	abstract public void configure();
	//initialise hierarchy
}
