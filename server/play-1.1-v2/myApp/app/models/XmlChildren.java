/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package models;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 *
 * @author Mike
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface XmlChildren {
    String value();
}
