package models;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Place {
	
	String name;
	int arrondissement;
	String typeDePlace;
	String designation;
	int AP_num;
	int AP_cp;
	String AP_voie;
	
	public Place(int ar) {
		arrondissement = ar;
	}
	
	
	
	public Place(String aName,int AP_num,String AP_voie, int AP_cp) {
		name = aName;
		this.AP_num = AP_num;
		this.AP_voie = AP_voie;
		this.AP_cp = AP_cp;
	}
	
	public Place(String aName, int ar, String type, String des, int num, int cp, String voie)
	{
		name = aName;
		arrondissement=ar;
		typeDePlace=type;
		designation=des;
		AP_num=num;
		AP_cp=cp;
		AP_voie=voie;
	}

	public String getAddress() {
		String answer = AP_num+" "+AP_voie+" "+AP_cp;
		return answer;
	}
	
	public String getName() {
		return name;
	}
	
}
