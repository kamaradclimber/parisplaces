import controllers.*;

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

import play.*;
import play.mvc.*;

import models.Place;
import models.PlaceCategory;

public class Liste_equipements_de_proximite_2011 extends CsvConnector {

	public Liste_equipements_de_proximite_2011()
			throws SQLException {
		super("data/Liste_equipements_de_proximite_2011.csv");
		this.categories = new ArrayList<PlaceCategory>();
		System.out.println("Hierarchy dans constructeur: "+categories);
		this.typeColumnName = "COLUMN1";
		this.districtColumnName = "S_gest";
		this.encoding = "ISO-8859-1";
		}

	@Override
	public void configure() {
		// TODO Auto-generated method stub
		super.configure();
	}

	@Override
	public String districtName(int district) {
		String name = "MAIRIE DU ";
		if (district<10) name+=" ";
		name+=district+"E";
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
			if (rs.getString(1)==null) continue;
			int district=0;
			if (rs.getString(1).endsWith("R"))
			{
				district = 1;
			}
			else
			{
			String dis = rs.getString(1).substring(10, rs.getString(1).length()-1 );
			
			try{
				//dis = " 3" or "13"
				district = Integer.parseInt(dis);
			}catch (NumberFormatException e) {
				//dis = " 3"
				dis = dis.substring(1);
				try {
					district = Integer.parseInt(dis);
				}
				catch (NumberFormatException e2) {
					e2.printStackTrace();
				}
			}
			}
			description = rs.getString(3);
			if (description != null) description = description.replace("&", "et");
			type = rs.getString(2);
			if (type != null) type = type.replace("&", "et");
			//TODO:remplacer par le ou les types correspondants
			voie = rs.getString(7);
			if (voie != null) voie = voie.replace("&", "et");
			//TODO: pas ici qu'il faut remplacer, et de plus d'autres caractères interdits
			currentPlace = new Place(description, district, type, description, rs.getInt(4), rs.getInt(6), voie);
			places.add(currentPlace);
			//System.out.println(currentPlace);
		}
		return places;
	}
	
	

}
