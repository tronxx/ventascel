<?php
  //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Credentials: true');
  header('content-type: application/json; charset=utf-8');
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require ("dbconfig.php") ;

if(isset($_GET['accion'])) {
     $accion_z = $_GET['accion'];
     if($accion_z == "buscar_tiendas") {
         busca_tiendas();
     }
     if($accion_z == "buscar_tienda") {
         busca_tienda();
     }
     if($accion_z == "buscar_clientes") {
         busca_clientes();
     }
}

if(isset($_POST['modo'])) {
    $accion_z = $_POST['modo'];
    if($accion_z == "tienda_agregar") {
        agregar_tienda();
    }
    if($accion_z == "tienda_modificar") {
        modificar_tienda();
    }
    if($accion_z == "tienda_eliminar") {
        eliminar_tienda();
    }
     
}

// ->Aqui es el Fin del PHP

function busca_tiendas() {
    $conn = conecta_db();
    $sql_z = "SELECT * FROM tiendas  order by codigo";
    $result = $conn->query($sql_z);
    $myArray = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $myArray[] = $row;
        }
    }
    echo json_encode($myArray);
    $conn->close();
}

function busca_tienda() {
    $idtienda_z = $_GET['idtienda'];
    $numidtda_z = intval ($idtienda_z);

    $conn = conecta_db();
    $sql_z = "SELECT * FROM tiendas where idtienda = " . $numidtda_z;
    $result = $conn->query($sql_z);
    $myArray = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $myArray[] = $row;
        }
    }
    echo json_encode($myArray);
    $conn->close();
}

function agregar_tienda() {
    $nombre_z = "";
    $codigo_z = "";
    $response_z = 0;
    if(isset($_POST['codigo']))   { $codigo_z  =  $_POST['codigo'];   }
    if(isset($_POST['nombre']))   { $nombre_z  =  $_POST['nombre'];   }
    $codigo_z = strtoupper($codigo_z);
    $nombre_z = strtoupper($nombre_z);

    $conn = conecta_db();
    $codigo_z = mysqli_real_escape_string($conn, $codigo_z);
    $nombre_z = mysqli_real_escape_string($conn, $nombre_z);

    $sql_z = "insert into tiendas (codigo, nombre, status) 
         select * from (select  '". $codigo_z . "','" . $nombre_z . "', 'A' ) as tmp
         where not exists (select codigo from tiendas where codigo = '" . $codigo_z . "' )";
    if (mysqli_query($conn, $sql_z)) {
        $response_z = 200;
    } else {
        $response_z = 403;
    }
    $conn->close();
    http_response_code($response_z);
}

function modificar_tienda() {
    $nombre_z = "";
    $codigo_z = "";
    $response_z = 0;
    $idtienda_z = 0;
    if(isset($_POST['idtienda'])) { $idtienda_z  =  $_POST['idtienda']; }
    if(isset($_POST['codigo']))   { $codigo_z    =  $_POST['codigo'];   }
    if(isset($_POST['nombre']))   { $nombre_z    =  $_POST['nombre'];   }
    $codigo_z = strtoupper($codigo_z);
    $nombre_z = strtoupper($nombre_z);
    $numidtda_z = intval ($idtienda_z);
    $conn = conecta_db();
    $codigo_z = mysqli_real_escape_string($conn, $codigo_z);
    $nombre_z = mysqli_real_escape_string($conn, $nombre_z);

    $sql_z = "update tiendas set nombre = '". $nombre_z . "' where idtienda=". $numidtda_z;
    if (mysqli_query($conn, $sql_z)) {
        $response_z = 200;
    } else {
        $response_z = 403;
    }
    $conn->close();
    http_response_code($response_z);
}

function eliminar_tienda() {
    $response_z = 0;
    $idtienda_z = 0;
    if(isset($_POST['idtienda'])) { $idtienda_z  =  $_POST['idtienda']; }
    $numidtda_z = intval ($idtienda_z);
    $conn = conecta_db();
    
    $sql_z = "delete from tiendas where idtienda=". $numidtda_z;
    if (mysqli_query($conn, $sql_z)) {
        $response_z = 200;
    } else {
        $response_z = 403;
    }
    $conn->close();
    http_response_code($response_z);
}



function busca_clientes() {
    $codtda_z = "";
    if (isset($_GET['codtda'])) $codtda_z = $_GET['codtda'];
    
    $conn = conecta_db();
    $sql_z = "SELECT * FROM clientes where tienda='".$codtda_z."'  order by codigo";
    $codtda_z = mysqli_real_escape_string($conn, $codtda_z);
    $result = $conn->query($sql_z);
    $myArray = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $myArray[] = $row;
        }
    }
    echo json_encode($myArray);
    $conn->close();
}


?>
