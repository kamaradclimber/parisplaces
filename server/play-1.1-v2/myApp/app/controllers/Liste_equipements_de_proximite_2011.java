package controllers;

import java.sql.SQLException;

public class Liste_equipements_de_proximite_2011 extends CsvConnector {

	public Liste_equipements_de_proximite_2011()
			throws SQLException {
		super("data/Liste_equipements_de_proximite_2011.csv");
		}

}
