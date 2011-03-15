package jobs;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import org.jdom.JDOMException;


import controllers.CsvConnector;
import controllers.DataSource;
import controllers.Liste_equipements_de_proximite_2011;
import models.*;

public class ListDataSource {

	private static ArrayList<DataSource> list;
	
	public ListDataSource() {
		list = new ArrayList<DataSource>();
		try {
			list = XMLParser.parse("myApp/app/config.xml", list.getClass());
			System.out.println("config parsé");
			System.out.println(list.get(0).categories);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
//		try {
//			Liste_equipements_de_proximite_2011 csv = new Liste_equipements_de_proximite_2011();
//			list.add(csv);
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		
	}

	public static void setList(ArrayList<DataSource> list) {
		ListDataSource.list = list;
	}

	public static ArrayList<DataSource> getList() {
		return list;
	}
}
