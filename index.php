<?php
// Set your return content type
header('Content-type: text/html');
$bob ="index.php?godmode=yes";
foreach($_GET as $key=>$valeur) { $bob .= '&' . $key . '='. $valeur; }
echo $bob;
// Website url to open
$daurl = 'http://138.195.76.136/'. $bob;

// Get that website's content
$handle = fopen($daurl, "r");

// If there is something, read and return
if ($handle) {
    while (!feof($handle)) {
        $buffer = fgets($handle, 4096);
        echo $buffer;
    }
    fclose($handle);
}
?>
