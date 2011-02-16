package jobs;
import java.sql.SQLException;
import java.util.ArrayList;


import controllers.CsvConnector;
import controllers.DataSource;
import controllers.Liste_equipements_de_proximite_2011;


public class ListDataSource {

	static ArrayList<DataSource> list;
	
	public ListDataSource() {
		list = new ArrayList<DataSource>();
		try {
			CsvConnector csv = new Liste_equipements_de_proximite_2011();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
