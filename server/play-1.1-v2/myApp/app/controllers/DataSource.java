package controllers;

import java.lang.reflect.Array;
import java.sql.SQLException;

import models.Place;

public abstract class DataSource {

	//configFile = "config.xml";
    
	Categories hierarchy;
	
	public DataSource()
	{
		
	}
	
	abstract public Place[] getLocations(int[] districts, String[]  typeOfLocation) throws SQLException;
	
	abstract public void configure();
	//initialise hierarchy
}
