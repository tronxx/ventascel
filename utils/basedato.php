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
     if($accion_z == "buscar_un_cliente") {
         busca_un_cliente();
     }
     if($accion_z == "buscar_un_cliente_x_codigo") {
        busca_un_cliente_x_codigo();
    }
    if($accion_z == "buscar_recargas_cliente") {
        busca_recargas_cliente();
    }
    if($accion_z == "buscar_recargas_fechas_tienda") {
        busca_recargas_fecha_tienda();
    }
}

if(isset($_POST['modo'])) {
    $accion_z = $_POST['modo'];
    echo $accion_z;
    if($accion_z == "tienda_agregar") {
        agregar_tienda();
    }
    if($accion_z == "tienda_modificar") {
        modificar_tienda();
    }
    if($accion_z == "tienda_eliminar") {
        eliminar_tienda();
    }
    if($accion_z == "cliente_agregar") {
        agregar_cliente();
    }
    if($accion_z == "cliente_modificar") {
        modificar_cliente();
    }
    if($accion_z == "recarga_agregar") {
        agregar_recarga();
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
    $codtda_z = mysqli_real_escape_string($conn, $codtda_z);

    $sql_z = "SELECT * FROM clientes where tienda='".$codtda_z."'  order by codigo";
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

function busca_un_cliente() {
    $idcliente_z = $_GET['idcliente'];
    $numidcte_z = intval ($idcliente_z);

    $conn = conecta_db();
    $sql_z = "SELECT * FROM clientes where idcliente = " . $numidcte_z;
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

function busca_un_cliente_x_codigo() {
    $codcli_z = $_GET['codigo'];
    $conn = conecta_db();

    $codigo_z   = mysqli_real_escape_string($conn, $codcli_z);
    $sql_z = "SELECT * FROM clientes where codigo = '" . $codigo_z . "'";
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

function busca_recargas_cliente() {
    $idcliente_z = $_GET['idcliente'];
    $numidcte_z = intval ($idcliente_z);

    $conn = conecta_db();
    $sql_z = "SELECT * FROM recargas where idcliente = " . $numidcte_z;
    $sql_z = $sql_z . " order by fecha";
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

function agregar_cliente() {
    $nombre_z = "";
    $codigo_z = "";
    $telefono_z = "";
    $tienda_z   = "";
    $recargas_z = 4;
    $fecha_z = "2020-01-01";
    $usadas_z = 0;
    $response_z = 0;
    
    if(isset($_POST['codigo']))   { $codigo_z    =  $_POST['codigo'];   }
    if(isset($_POST['nombre']))   { $nombre_z    =  $_POST['nombre'];   }
    if(isset($_POST['telefono'])) { $telefono_z  =  $_POST['telefono']; }
    if(isset($_POST['tienda']))   { $tienda_z    =  $_POST['tienda']; }
    $codigo_z = strtoupper($codigo_z);
    $nombre_z = strtoupper($nombre_z);
    $telefono_z = strtoupper($telefono_z);
    $tienda_z = strtoupper($tienda_z);
    $fecha_z = "20" . substr($codigo_z,2,2). "-".
        substr($codigo_z,4,2). "-".
        substr($codigo_z,6,2);
    $conn = conecta_db();
    $codigo_z   = mysqli_real_escape_string($conn, $codigo_z);
    $nombre_z   = mysqli_real_escape_string($conn, $nombre_z);
    $telefono_z = mysqli_real_escape_string($conn, $telefono_z);
    $tienda_z   = mysqli_real_escape_string($conn, $tienda_z);

    //echo "Codigo" . $codigo_z . "<br>" .
    //    "Nombre". $nombre_z . "<br>" .
    //    "Telefono". $telefono_z  . "<br>" .
    //    "Fecha". $fecha_z  . "<br>" .
    //    "Tienda.". $tienda_z . "<br>";

    $sql_z = "insert into clientes (codigo, nombre, fecha, tienda, telefono, recargas, usadas, status)";
    $sql_z = $sql_z . "  select * from (";
    $sql_z = $sql_z . " select  '". $codigo_z . "'";
    $sql_z = $sql_z . ",'" . $nombre_z . "'";
    $sql_z = $sql_z . ",'" . $fecha_z . "'";
    $sql_z = $sql_z . ",'" . $tienda_z . "'";
    $sql_z = $sql_z . ",'" . $telefono_z . "'";
    $sql_z = $sql_z . "," . $recargas_z;
    $sql_z = $sql_z . "," . $usadas_z;
    $sql_z = $sql_z . "," . "'A' ) as tmp ";
    $sql_z = $sql_z . "where not exists (select codigo from clientes where codigo = '" . $codigo_z . "' )";

    //echo "<br>" . $sql_z . "<br>";
    if (mysqli_query($conn, $sql_z)) {
        $response_z = 200;
    } else {
        $response_z = 403;
    }
    $conn->close();
    http_response_code($response_z);
    
}

function modificar_cliente() {
    $nombre_z = "";
    $codigo_z = "";
    $telefono_z = "";
    $tienda_z   = "";
    $recargas_z = 4;
    $fecha_z = "2020-01-01";
    $usadas_z = 0;
    $response_z = 0;
    
    if(isset($_POST['codigo']))   { $codigo_z    =  $_POST['codigo'];   }
    if(isset($_POST['nombre']))   { $nombre_z    =  $_POST['nombre'];   }
    if(isset($_POST['telefono'])) { $telefono_z  =  $_POST['telefono']; }
    if(isset($_POST['tienda']))   { $tienda_z    =  $_POST['tienda']; }
    $codigo_z = strtoupper($codigo_z);
    $nombre_z = strtoupper($nombre_z);
    $telefono_z = strtoupper($telefono_z);
    $tienda_z = strtoupper($tienda_z);
    $conn = conecta_db();
    $codigo_z   = mysqli_real_escape_string($conn, $codigo_z);
    $nombre_z   = mysqli_real_escape_string($conn, $nombre_z);
    $telefono_z = mysqli_real_escape_string($conn, $telefono_z);
    $tienda_z   = mysqli_real_escape_string($conn, $tienda_z);

    //echo "Codigo" . $codigo_z . "<br>" .
    //    "Nombre". $nombre_z . "<br>" .
    //    "Telefono". $telefono_z  . "<br>" .
    //    "Fecha". $fecha_z  . "<br>" .
    //    "Tienda.". $tienda_z . "<br>";

    $sql_z = "update clientes set nombre='" . $nombre_z . "'";
    $sql_z = $sql_z . "," . "telefono = '" . $telefono_z . "'" ;
    $sql_z = $sql_z . " where  codigo = '" . $codigo_z . "' ";

    if (mysqli_query($conn, $sql_z)) {
        $response_z = 200;
    } else {
        $response_z = 403;
    }
    $conn->close();
    http_response_code($response_z);
    
}

function agregar_recarga() {
    $idcliente_z = 0;
    $telefono_z = "";
    $importe_z   = 0;
    $tienda_z = 0;
    $usuario_z = 0;
    $fecha_z = "2020-01-01";
    
    if(isset($_POST['idcliente'])) { $idcliente_z =  $_POST['idcliente'];   }
    if(isset($_POST['telefono']))  { $telefono_z  =  $_POST['telefono']; }
    if(isset($_POST['tienda']))    { $tienda_z    =  $_POST['tienda']; }
    if(isset($_POST['importe']))   { $importe_z   =  $_POST['importe']; }
    if(isset($_POST['fecha']))     { $fecha_z     =  $_POST['fecha']; }
    if(isset($_POST['usuario']))   { $usuario_z   =  $_POST['usuario']; }
    $tienda_z = strtoupper($tienda_z);
    $conn = conecta_db();
    $telefono_z = mysqli_real_escape_string($conn, $telefono_z);
    $tienda_z   = mysqli_real_escape_string($conn, $tienda_z);
    $usuario_z   = mysqli_real_escape_string($conn, $usuario_z);

    //echo "Codigo" . $codigo_z . "<br>" .
    //    "Nombre". $nombre_z . "<br>" .
    //    "Telefono". $telefono_z  . "<br>" .
    //    "Fecha". $fecha_z  . "<br>" .
    //    "Tienda.". $tienda_z . "<br>";
    $sql_z = "select idtienda from tiendas where codigo='" . $tienda_z . "'";
    //echo $sql_z;
    $result   = mysqli_query($conn, $sql_z);
    $row = $result->fetch_assoc();
    $idtienda_z = $row['idtienda'];
    $sql_z = "select idusuario from usuarios where email='" . $usuario_z . "'";
    echo $sql_z;
    $result   = mysqli_query($conn, $sql_z);
    $row = $result->fetch_assoc();
    $idusuario_z = $row['idusuario'];

    $sql_z = "insert into recargas (idcliente,	idtienda,	";
    $sql_z = $sql_z . "fecha,	telefono,	importe,	usuario	)";
    $sql_z = $sql_z . "values (";
    $sql_z = $sql_z . $idcliente_z . ",";
    $sql_z = $sql_z . $idtienda_z . ",";
    $sql_z = $sql_z . "'" . $fecha_z . "',";
    $sql_z = $sql_z . "'" . $telefono_z . "',";
    $sql_z = $sql_z . $importe_z . ",";
    $sql_z = $sql_z . $idusuario_z;
    $sql_z = $sql_z . ")";
    //echo "<br>" . $sql_z;


    $sql2_z = "update clientes set usadas = usadas + 1 ";
    $sql2_z = $sql2_z . " where idcliente = " . $idcliente_z;
    //echo "<br>" . $sql2_z;

    //mysqli_begin_transaction($conn, MYSQLI_TRANS_START_READ_ONLY);

    if (mysqli_query($conn, $sql_z)) {
        $response_z = 200;
    } else {
        $response_z = 403;
    }
    if (mysqli_query($conn, $sql2_z)) {
        $response_z = 200;
    } else {
        $response_z = 403;
    }
    //mysqli_commit($conn);
    $conn->close();
    http_response_code($response_z);    
}

function busca_recargas_fecha_tienda() {
    $codtda_z   = $_GET['tienda'];
    $fechaini_z = $_GET['fechaini'];
    $fechafin_z = $_GET['fechafin'];

    $conn = conecta_db();
    $codtda_z   = mysqli_real_escape_string($conn, $codtda_z);
    $fechaini_z = mysqli_real_escape_string($conn, $fechaini_z);
    $fechafin_z = mysqli_real_escape_string($conn, $fechafin_z);
    $sql_z = "select idrecarga, a.idtienda, 
      a.idcliente, a.fecha, a.telefono, a.importe,
      b.codigo as codtda, c.codigo, c.nombre
      from recargas a 
      join tiendas b on a.idtienda = b.idtienda
      join clientes c on a.idcliente = c.idcliente";
    $sql_z = $sql_z . " where a.fecha between ";
    $sql_z = $sql_z . " '" . $fechaini_z . "' and ";
    $sql_z = $sql_z . " '" . $fechafin_z . "' and ";
    $sql_z = $sql_z . " b.codigo = '" . $codtda_z .  "' ";
    $sql_z = $sql_z . " order by codtda, a.fecha, c.codigo";
    //echo $sql_z;

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
