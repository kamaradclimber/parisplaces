import java.io.FileOutputStream;
import java.io.PrintStream;
import java.sql.*;

import org.eclipse.persistence.platform.database.H2Platform;
import org.h2.command.dml.Select;
import org.h2.tools.*;

public class Test {
    public static void main(String[] args) throws Exception {
    	
    	
    	CsvConnector conn = new CsvConnector();
    	
    	int[] arr = {1,2,4};
    	String[] type = {"Pigeonnier"};
    	conn.getLocations(arr, type) ;  	
    	
    	
    
    }
}
