package models;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

@XmlChildren("subCategories")
public class PlaceCategory {

	public String value;
	public String id;
	public String label;
	public ArrayList<PlaceCategory> subCategories = new ArrayList<PlaceCategory>();
	
	public PlaceCategory(){}
	
	public PlaceCategory(String aValue)
	{
		value=aValue;
		subCategories = new ArrayList<PlaceCategory>();
	}
	
	public PlaceCategory(String id, String aValue)
	{
		this(aValue);
		this.id=id;
	}
 
	public Collection< String> getAllLeaf() {
		Collection<String> result = new HashSet<String>();
		if (subCategories.size()==0){
			//c'est une feuille
			result.add(value);
		}
		else{
			for (PlaceCategory cat : subCategories)
			{
				result.addAll(cat.getAllLeaf());
			}
		}
		return result;
	}
	
	public Collection< String> findSubCategories(Collection<String> typeOfLocation)
	{
		Collection<String> result = new HashSet<String>();

			if (typeOfLocation.contains(id))
				result.addAll(getAllLeaf());
			else{
				for (PlaceCategory cat : subCategories)
				{
					result.addAll(cat.findSubCategories(typeOfLocation));
				}
			}
			
		return result;	
	}

	@Override
	public String toString() {
		return "PlaceCategory [id=" + id + ", value=" + value + "]"
			+"	"+subCategories;
	}

	public String getValue() {
		return value;
	}

	public String getId() {
		return id;
	}

	public String getLabel() {
		return label;
	}

	public ArrayList<PlaceCategory> getSubCategories() {
		return subCategories;
	}
	
	
	
	
	

}
