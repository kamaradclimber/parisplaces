package controllers;

import java.sql.SQLException;

public class Liste_equipements_de_proximite_2011 extends CsvConnector {

	public Liste_equipements_de_proximite_2011()
			throws SQLException {
		super("data/Liste_equipements_de_proximite_2011.csv");
		
		}

	@Override
	public void configure() {
		// TODO Auto-generated method stub
		super.configure();
	}

	@Override
	public String districtName(int district) {
		return "'MAIRIE DU  "  +district+"E";
	}
	
	

}
