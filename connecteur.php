<?php
// Set your return content type
header('Content-type: text/html');
$bob ="place.php?";
foreach($_GET as $key=>$valeur) { $bob .= $key . '='. $valeur . '&'; }
// Website url to open
//if (count($_GET)>0) $bob = substr($bob,0, count($bob)-1);
$daurl = 'http://138.195.76.136/'. $bob;
//$daurl = 'http://www.google.com';
// Get that website's content
echo "retour du server distant :<br/> Pour le moment seulement les parametres d'appel mais bientot du xml<br/>";

$handle = fopen($daurl, "r");

// If there is something, read and return
if ($handle) {
    while (!feof($handle)) {
        $buffer = fgets($handle, 4096);
        echo $buffer;
    }
    fclose($handle);
} // */
?>
