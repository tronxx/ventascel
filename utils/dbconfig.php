<?php

function conecta_db() {
    $DBhost = "localhost";
    $DBuser = "root";
    $DBpass = "lux";
    $DBname = "ventasta";
    // echo "<hr>" . $DBhost ." - " . $DBuser . " - " . $DBpass . " - " . $DBname . " Estoy en Tron";
    // phpinfo();
    
    $DBcon = new mysqli($DBhost, $DBuser, $DBpass, $DBname);
     

    //echo "<hr> Ya pase mysqli_connect ";
    if (!$DBcon) {
          die('No pudo conectarse: ' . mysql_error());
    }    
    //echo "<hr> Fin de Conecta_db()<hr>";
    return ($DBcon);

}
?>
