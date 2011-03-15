package controllers;

import java.sql.SQLException;
import java.util.ArrayList;

import models.Place;
import models.PlaceCategory;

public abstract class DataSource {

	//configFile = "config.xml";
    
	public ArrayList<PlaceCategory> categories;
	
	public DataSource()
	{
		
	}
	
	abstract public ArrayList<Place> getLocations(ArrayList<Integer> districts, String[]  typeOfLocation) throws SQLException;
	
	abstract public void configure();
	//initialise hierarchy
}
