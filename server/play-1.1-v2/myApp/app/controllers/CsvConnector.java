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
	protected String encoding = "NULL";
	protected String typeColumnName;
	
	//used to count the number of connections.
	static private int nbConnection = 0;
	
	static {
		
		
	}

    
    public CsvConnector(String aFile) throws SQLException
    {
        
        file = aFile;
        typeColumnName = "type";
        districtColumnName = "arrondissement";
        configure();
        if (nbConnection==0)
			try {
				Class.forName("org.h2.Driver");
				connection = DriverManager.
					getConnection("jdbc:h2:~/test", "sa", "");
				System.out.println("connection org.h2 etablie");
		        connection.setReadOnly(true);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        nbConnection++;
    }
        
    @Override
    protected void finalize() throws Throwable {
    	nbConnection --;
    	if (nbConnection ==0) connection.close();
    	super.finalize();
    }
    
    public ArrayList<Place> getLocations(ArrayList<Integer> districts, String[]  typeOfLocation) throws SQLException
    {
    	
    	//Collection<String> types = consolidate( Arrays.asList(typeOfLocation));
    	Collection<String> types = hierarchy.findSubCategories(Arrays.asList(typeOfLocation));
    	types.add("Promenade ouverte, mail planté, jardin, square");
    	String request="SELECT * FROM CSVREAD('" + file + "',NULL, '"+encoding+"', ';')";
    	
    	if (districts.size()>0 || types.size() >0)
    	{//then we add a WHERE condition
    		request += " WHERE ";
    		if (districts.size()>0)
    		{
    			request += districtColumnName+" IN (";
    	
    			for (int district : districts)
    			{
    				request += "'"+districtName(district)+"',";
    			}

    			if (districts.size()!=0)//we have a ',' in the end
    				request = request.substring(0, request.length()-1);

    			request += ")";
    		}
    	if (districts.size()>0 && types.size() >0)
    	{
    		request += "AND ";
    	}
    	
    	if (types.size()>0)
    	{
    		request += typeColumnName +" IN (";
    	
    		for (String type : types)
    		{
    			request+="'"+type+"',";
    		}

    		if (types.size()!=0)//we have a ',' in the end
    			request = request.substring(0, request.length()-1);

    		request += ")";
    	}
    	}
    	System.out.println("debut de la requete");
    	System.out.println(request);
    	System.out.println("fin de la requete");
    	PreparedStatement ps = connection.prepareStatement( request );

    	ResultSet rs = ps.executeQuery();
//    	System.out.println("affichage des resultat...");
//    	printResults(rs);
//    	System.out.println("fin d'affichage des resultat...");
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
