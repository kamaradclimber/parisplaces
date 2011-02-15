package controllers;

import java.lang.reflect.Array;
import java.sql.SQLException;

import models.Place;

public abstract class DataSource {

	String file;
	Categories hierarchy;
	
	abstract public Place[] getLocations(int[] districts, String[]  typeOfLocation) throws SQLException;
	
	
}
