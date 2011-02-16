package jobs;
import java.sql.SQLException;
import java.util.ArrayList;


import controllers.CsvConnector;
import controllers.DataSource;


public class ListDataSource {

	static ArrayList<DataSource> list;
	
	public ListDataSource() {
		list = new ArrayList<DataSource>();
		try {
			CsvConnector csv = new CsvConnector("Liste_equipements_de_proximite_2011.csv");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
