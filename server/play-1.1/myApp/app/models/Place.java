package models;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Place {
	
	int arrondissement;
	String typeDePlace;
	String designation;
	int AP_num;
	int AP_cp;
	String AP_voie;
	
	public Place(int ar) {
		arrondissement = ar;
	}
	
	public Place(int ar, String type, String des, int num, int cp, String voie)
	{
		arrondissement=ar;
		typeDePlace=type;
		designation=des;
		AP_num=num;
		AP_cp=cp;
		AP_voie=voie;
	}

}
