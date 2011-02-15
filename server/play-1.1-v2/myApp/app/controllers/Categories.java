package controllers;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

public class Categories extends ArrayList<Categories> {

	String name;
	
	public Categories(String aName)
	{
		name=aName;
	}

	public Collection< String> getAllLeaf() {
		Collection<String> result = new HashSet<String>();
		if (this.size()==0){
			result.add(name);
		}
		else{
			for (Categories cat : this)
			{
				result.addAll(cat.getAllLeaf());
			}
		}
		return result;
	}
	
	public Collection< String> findSubCategories(String type)
	{
		if (name==type)
			return getAllLeaf();
		else{
			Collection<String> result = new HashSet<String>();
			for (Categories cat : this)
			{
				result.addAll(cat.findSubCategories(type));
			}
			return result;	
		}	
	}
	
	
}
