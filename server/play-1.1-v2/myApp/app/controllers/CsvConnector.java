package controllers;

import java.lang.reflect.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Hashtable;
import java.util.TreeSet;
import java.util.Vector;

import models.Place;

import org.h2.tools.Csv;


public abstract class CsvConnector extends DataSource{

	String file;
	static Connection connection;
	
	protected String districtColumnName;
	
	protected String typeColumnName;
	
	static {
		try {
			Class.forName("org.h2.Driver");
			connection = DriverManager.
			    getConnection("jdbc:h2:~/test", "sa", "");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

    
    public CsvConnector(String aFile) throws SQLException
    {
        
        file = aFile;
        typeColumnName = "type";
        districtColumnName = "arrondissement";
        configure();
    }
        
    @Override
    protected void finalize() throws Throwable {
    	// TODO souci: la connection sera fermée plusieurs fois ou pas du tout si il y a plusieurs instances de CSV.
    	connection.close();
    	super.finalize();
    }
    
    public ArrayList<Place> getLocations(int[] districts, String[]  typeOfLocation) throws SQLException
    {
    	
    	//Collection<String> types = consolidate( Arrays.asList(typeOfLocation));
    	Collection<String> types = hierarchy.findSubCategories(Arrays.asList(typeOfLocation));
    	
    	String request="SELECT * FROM CSVREAD('" + file + "',NULL, NULL, ';')";//WHERE "+districtColumnName+" IN (";
    	
//    	for (int district : districts)
//    	{
//    		request += districtName(district);
//    		if (district ==1) request +="R";
//    		request+= "',";
//    	}
//    	
//    	if (districts.length!=0)//we have a ',' in the end
//    		request = request.substring(0, request.length()-1);
//
//    	request += ") AND "+ typeColumnName +" IN (";
//    	//'S_gest' 'COLUMN1'
//    	for (String type : types)
//    	{
//    		request+="'"+type+"',";
//    	}
//
//    	if (types.size()!=0)//we have a ',' in the end
//    		request = request.substring(0, request.length()-1);
//
//    	request += ")";
    	System.out.println(request);
    	PreparedStatement ps = connection.prepareStatement( request );

    	ResultSet rs = ps.executeQuery();
    	
//        while (rs.next()) {
//            for (int i = 0; i < meta.getColumnCount(); i++) {
//            	meta.getColumnName(i);
//                System.out.println(
//                    meta.getColumnLabel(i + 1) + ": " +
//                    rs.getString(i + 1));
//            }
//    	}
//    	
    	return generateLocation(rs);
    }
    
    abstract public ArrayList<Place> generateLocation(ResultSet rs) throws SQLException ;

	public abstract String districtName(int district);
    
    
	public Collection<String> consolidate(Collection<String> types) 
    {
		
    	TreeSet<String> result = new TreeSet<String>();
    	
    	result.addAll(hierarchy.findSubCategories(types));
    	
    	return result;
    }
    
    public void printResults(ResultSet rs) throws SQLException
    {
    	ResultSetMetaData meta = rs.getMetaData();
        int j=0;
        while (rs.next()) {
        	j++;
        	System.out.println("id "+j);
            for (int i = 0; i < meta.getColumnCount(); i++) {
                System.out.println(
                    meta.getColumnLabel(i + 1) + ": " +
                    rs.getString(i + 1));
            }
            System.out.println();
        }
        
    }
    
    // cree l'objet consolidation à partir d'un fichier de config
    public void configure()
    //lie le fichier de config.
    {
    	
    }
		
	}
