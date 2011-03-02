<?php
// Set the return content type
header('Content-type: application/xhtml+xml');
$test_mode = false;

if ($test_mode) {
    if (rand(0,1)) {
echo '<?xml version="1.0"?><places total="2193" limit="5" offset="">         <place>         <name>BIBLIO  DU LOUVRE</name>         <address>4 PLACE DU LOUVRE 75001</address>     </place>         <place>         <name>BIBLIOTHEQUE MUNICIPALE LA FONTAINE</name>         <address>91 RUE RAMBUTEAU 75001</address>     </place>         <place>         <name>ECOLE MATERNELLE 27 RUE LA SOURDIERE</name>         <address>27 RUE DE LA SOURDIERE 75001</address>     </place>         <place>         <name>ECOLE MATERNELLE 6 RUE SAINT-GERMAIN L\'AUXERROIS</name>         <address>6 RUE SAINT-GERMAIN L\'AUXERROIS 75001</address>     </place>         <place>         <name>ECOLE �L�MENTAIRE 11 RUE ARGENTEUIL</name>         <address>11 RUE D\' ARGENTEUIL 75001</address>     </place>         </places>';
    } else {
echo '<?xml version="1.0"?><places total="2193" limit="5" offset="">         <place>         <name>MUSEE  DU LOUVRE</name>         <address>4 PLACE DU LOUVRE 75001</address>     </place>         <place>         <name>BIBLIOTHEQUE MUNICIPALE LA FONTAINE</name>         <address>91 RUE RAMBUTEAU 75001</address>     </place>         <place>         <name>ECOLE MATERNELLE 27 RUE LA SOURDIERE</name>         <address>27 RUE DE LA SOURDIERE 75001</address>     </place>         <place>         <name>ECOLE MATERNELLE 6 RUE SAINT-GERMAIN L\'AUXERROIS</name>         <address>6 RUE SAINT-GERMAIN L\'AUXERROIS 75001</address>     </place>         <place>         <name>ECOLE �L�MENTAIRE 11 RUE ARGENTEUIL</name>         <address>11 RUE D\' ARGENTEUIL 75001</address>     </place>         </places>';
    }
}

if (!$test_mode) {
    //Set the page to connect with.
    $bob ="places" . "?";  //default value
    if (array_key_exists('destination', $_GET)) {
        //we could avoid these switch and put directly the value associated to destination as the beginning of the url but it would be a flaw
        if ($_GET['destination'] == 'getPlaces') {
            $bob = "places?";
        } else if  ($_GET['destination'] == 'getPlaceCategories') {
            $bob = "getplacecategories.xml?";
        } else {
            $bob = "places?";
        }
    }
    // get the arguments to pass to these page
    foreach($_GET as $key=>$valeur) {
if ($key != '_' and $key != 'destination') {
            $bob = $bob . $key . '='.$valeur . '&' ; 
        }
    }
    // this does not work, but i dont understand why
    //if (count($_GET)>0) $bob  = substr($bob,0, strlen($bob)-1); 
    // Website url to open
    $daurl = 'http://138.195.76.136/'. $bob;

    // Get that website's content
    $handle=null;
    if (!$test_mode) $handle = fopen($daurl, "r");

    // If there is something, read and return
    if ($handle) {
        while (!feof($handle)) {
            $buffer = fgets($handle, 4096);
            echo $buffer;
        }
        fclose($handle);
    } // */
}
?>
