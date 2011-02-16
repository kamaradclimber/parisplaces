package controllers;

import java.util.ArrayList;
import java.util.Arrays;
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
			//c'est une feuille
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
	
	public Collection< String> findSubCategories(Collection<String> typeOfLocation)
	{
		Collection<String> result = new HashSet<String>();

			if (typeOfLocation.contains(name))
				result.addAll(getAllLeaf());
			else{
				for (Categories cat : this)
				{
					result.addAll(cat.findSubCategories(typeOfLocation));
				}
			}
			
		return result;	
	}

}
