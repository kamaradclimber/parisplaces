package jobs;
import java.sql.SQLException;
import java.util.ArrayList;


import controllers.CsvConnector;
import controllers.DataSource;
import controllers.Liste_equipements_de_proximite_2011;


public class ListDataSource {

	private static ArrayList<DataSource> list;
	
	public ListDataSource() {
		list = new ArrayList<DataSource>();
		try {
			Liste_equipements_de_proximite_2011 csv = new Liste_equipements_de_proximite_2011();
			list.add(csv);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

	public static void setList(ArrayList<DataSource> list) {
		ListDataSource.list = list;
	}

	public static ArrayList<DataSource> getList() {
		return list;
	}
}
