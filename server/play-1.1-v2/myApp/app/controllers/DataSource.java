package controllers;

import java.lang.reflect.Array;
import java.sql.SQLException;
import java.util.ArrayList;

import models.Place;

public abstract class DataSource {

	//configFile = "config.xml";
    
	Categories hierarchy;
	
	public DataSource()
	{
		
	}
	
	abstract public ArrayList<Place> getLocations(int[] districts, String[]  typeOfLocation) throws SQLException;
	
	abstract public void configure();
	//initialise hierarchy
}
