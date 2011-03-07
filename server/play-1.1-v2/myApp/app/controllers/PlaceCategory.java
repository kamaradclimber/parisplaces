package controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;

public class PlaceCategory {

	String value;
	String id;
	ArrayList<PlaceCategory> subCategories;
	
	public PlaceCategory(String aValue)
	{
		value=aValue;
	}
	
	public PlaceCategory(String id, String aValue)
	{
		value=aValue;
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

			if (typeOfLocation.contains(value))
				result.addAll(getAllLeaf());
			else{
				for (PlaceCategory cat : subCategories)
				{
					result.addAll(cat.findSubCategories(typeOfLocation));
				}
			}
			
		return result;	
	}

}
