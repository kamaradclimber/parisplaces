<?php
// Set the return content type
header('Content-type: application/xhtml+xml');
$test_mode = false;





//Set the page to connect with.
$bob ="places.xml" . "?";  //default value
if ($_GET['destination']) {
    //we could avoid these switch and put directly the value associated to destination as the beginning of the url but it would be a flaw
    if ($_GET['destination'] == 'getPlaces') {
        $bob = "places.xml?";
    } else if  ($_GET['destination'] == 'getPlaceCategories') {
        $bob = "getplacecategories.xml?";
    } else {
        $bob = "places.xml?";
    }
}

// get the arguments to pass to these page
foreach($_GET as $key=>$valeur) { 
    if ($key != '_' and $key != 'destination')
    	$bob = $bob . $key . '='.$valeur . '&amp;' ; 
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
?>
