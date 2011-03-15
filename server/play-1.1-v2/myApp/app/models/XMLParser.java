package models;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jdom.*;
import org.jdom.input.SAXBuilder;
import controllers.Liste_equipements_de_proximite_2011;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Mike
 */
public class XMLParser {

    public static <T> T parse(String fileName, Class<T> targetClass) throws InstantiationException, IllegalAccessException, ClassNotFoundException, IOException, JDOMException {
        SAXBuilder sxb = new SAXBuilder();
        Document document = sxb.build(new File(fileName));
        return parse(document.getRootElement(), targetClass);
    }
    
    public static <T> T parse(Element element, Class<T> targetClass) throws InstantiationException, IllegalAccessException, ClassNotFoundException {
        if (targetClass == null) {
            targetClass = (Class<T>) Class.forName(element.getName());
        }
//        System.out.println("--------------------------------------------------------");
//        System.out.println("Parsing node for " + targetClass);
//        System.out.println("--------------------------------------------------------");
        T inst = targetClass.newInstance();
        Iterator attributesIt = element.getAttributes().iterator();
        while (attributesIt.hasNext()) {
            Attribute attr = (Attribute) attributesIt.next();
            try {
                Field f = targetClass.getField(attr.getName());
                f.set(inst, attr.getValue());
            } catch (NoSuchFieldException ex) {
                Logger.getLogger(XMLParser.class.getName()).log(Level.SEVERE, null, ex);
            } catch (SecurityException ex) {
                Logger.getLogger(XMLParser.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        Iterator childrenIt = element.getChildren().iterator();

        List listField = null;
        XmlChildren listAnnot = targetClass.getAnnotation(XmlChildren.class);
        if (listAnnot != null) {
            try {
                Object annotField = targetClass.getField(listAnnot.value()).get(inst);
                if (annotField instanceof List)
                    listField = (List) annotField;
            } catch (Exception ex) {}
        }
        if (listField == null && inst instanceof List) {
            listField = (List) inst;
        }

        if (listField != null) {
            /*Class itemClass;
            if (inst instanceof ParameterizedType)
                itemClass = (Class) ((ParameterizedType) inst).getActualTypeArguments()[0];
            else
                itemClass = targetClass = (Class<T>) Class.forName(child.getName());*/
            while (childrenIt.hasNext()) {
                Element child = (Element) childrenIt.next();
                //String className = child.getName().substring(0,1).toUpperCase() + child.getName().substring(1);
                String className = child.getName();
                listField.add(parse(child, Class.forName(className)));
            }
        } else {
            while (childrenIt.hasNext()) {
                try {
                    Element child = (Element) childrenIt.next();
                    Field f = targetClass.getField(child.getName());
                    if (f.getType() == String.class) {
                        f.set(inst, child.getText());
                    } else {
                        f.set(inst, parse(child, f.getType()));
                    }
                } catch (NoSuchFieldException ex) {
                    Logger.getLogger(XMLParser.class.getName()).log(Level.SEVERE, null, ex);
                } catch (SecurityException ex) {
                    Logger.getLogger(XMLParser.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        return inst;
    }
    
}
