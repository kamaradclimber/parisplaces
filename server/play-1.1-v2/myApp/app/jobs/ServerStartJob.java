package jobs;
 
import java.util.ArrayList;

import controllers.DataSource;


import play.jobs.*;
 
@OnApplicationStart
public class ServerStartJob extends Job {
	
    public void doJob() {
    	ListDataSource listSources = new ListDataSource();
    	System.out.println("job executé");
    }

}