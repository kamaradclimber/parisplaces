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
		super.typeColumnName = ;
		super.districtColumnName = "S_guest";
		}

	@Override
	public void configure() {
		// TODO Auto-generated method stub
		super.configure();
	}

	@Override
	public String districtName(int district) {
		String name = "MAIRIE DU  "  +district+"E";
		if (district ==1) name +="R";
		return name;
	}

	@Override
	public ArrayList<Place> generateLocation(ResultSet rs) throws SQLException {
		ArrayList<Place> places = new ArrayList<Place>();
		Place currentPlace;
		String description;
		String type;
		String voie;
		while (rs.next()){
			System.out.println("place:"+rs.getString(1)+"/"+rs.getString(2)+"/"+rs.getString(3)+"/"+rs.getString(4)+"/"+rs.getString(5)+"/"+rs.getString(6)+"/"+rs.getString(7));
			if (rs.getString(1)==null) continue;
			String dis = rs.getString(1).substring(10, rs.getString(1).length()-1 );
			int district;
			try{
				district = Integer.parseInt(dis);
			}catch (NumberFormatException e) {
				district = 1;
			}
			description = rs.getString(3);
			if (description != null) description = description.replace("&", "et");
			type = rs.getString(2);
			if (type != null) type = type.replace("&", "et");
			voie = rs.getString(7);
			if (voie != null) voie = voie.replace("&", "et");
			//TODO: pas ici qu'il faut remplacer, et de plus d'autres caractères interdits
			currentPlace = new Place(description, district, type, description, rs.getInt(4), rs.getInt(6), voie);
			places.add(currentPlace);
			System.out.println(currentPlace);
		}
		return places;
	}
	
	

}
