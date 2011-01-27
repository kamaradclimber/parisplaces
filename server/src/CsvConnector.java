import java.lang.reflect.Array;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Hashtable;
import java.util.TreeSet;
import java.util.Vector;

import org.h2.tools.Csv;


public class CsvConnector {

	String file;
	static Connection connection;
	String configFile;
	
	Hashtable<String, Vector<String> > consolidationTable;
	
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

    
    public CsvConnector() throws SQLException
    {
        file = "data/Liste_equipements_de_proximite_2011.csv";
        configFile = "config/hierarchie.xml";
        setHierarchie();
    }
        
    public Array getLocations(String[] arrondissements, String[]  typeDeLieu) throws SQLException
    {
    	
    	Collection<String> types = consolidate( Arrays.asList(typeDeLieu));
 
    	
    	String requete;
    	
    	PreparedStatement ps = connection.prepareStatement( "SELECT * FROM CSVREAD('" + file + "',NULL, NULL, ';')" );

    	ps.executeQuery();
    	return null;
    }
    
    public Collection<String> consolidate(Collection<String> types) 
    {
    	TreeSet<String> result = new TreeSet<String>();
    	
    	for (String type : types)
    	{
    		if (result.contains(type)) 
    			result.addAll(consolidationTable.get(type));
    		else
    			result.add(type);
    	}
		return result;
    }
    
    // cree l'objet consolidation à partir d'un fichier de config
    public void setHierarchie()
    {
    	
    }
		
	}
