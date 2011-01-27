import java.io.FileOutputStream;
import java.io.PrintStream;
import java.sql.*;

import org.eclipse.persistence.platform.database.H2Platform;
import org.h2.command.dml.Select;
import org.h2.tools.*;

public class Test {
    public static void main(String[] args) throws Exception {
    	
    	
    	Class.forName("org.h2.Driver");
        Connection connection = DriverManager.
            getConnection("jdbc:h2:~/test", "sa", "");
        
    	PreparedStatement ps = connection.prepareStatement( "SELECT * FROM CSVREAD('data/Liste_equipements_de_proximite_2011.csv',NULL, 'ISO-8859-1', ';')" );

    	ResultSet rs = ps.executeQuery();
    	
    	
    	
    	

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
        
        System.out.println();
        rs.close();
        
        connection.close();
    }
}
