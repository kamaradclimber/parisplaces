package controllers;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Properties;

import models.Place;

public class Liste_equipements_de_proximite_2011 extends CsvConnector {

	public Liste_equipements_de_proximite_2011()
			throws SQLException {
		super("data/Liste_equipements_de_proximite_2011.csv");
		super.hierarchy = new Categories("Ecole Maternelle");				
		}

	@Override
	public void configure() {
		// TODO Auto-generated method stub
		super.configure();
	}

	@Override
	public String districtName(int district) {
		return "MAIRIE DU  "  +district+"E";
	}

	@Override
	public ArrayList<Place> generateLocation(ResultSet rs) throws SQLException {
		ArrayList<Place> places = new ArrayList<Place>();
		Place currentPlace;
		while (rs.next()){
			//System.out.println("place:"+rs.getString(1)+"/"+rs.getString(2)+"/"+rs.getString(3)+"/"+rs.getString(4)+"/"+rs.getString(5)+"/"+rs.getString(6)+"/"+rs.getString(7));
			if (rs.getString(1)==null) continue;
			String dis = rs.getString(1).substring(11, rs.getString(1).length()-2 );
			int district;
			if (dis.length()==0) 
				district = 1;
			else
				district = Integer.parseInt(dis);
			currentPlace = new Place(rs.getString(3), district, rs.getString(2), rs.getString(3), rs.getInt(4), rs.getInt(6), rs.getString(7));
			places.add(currentPlace);
			System.out.println(currentPlace);
		}
		return places;
	}
	
	

}
