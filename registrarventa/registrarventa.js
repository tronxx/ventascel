var usuario_z = localStorage.getItem('usuario');
var tienda_z = localStorage.getItem('tienda_venta_codigo');

$(document).ready(function(){
    usuario_z = checa_sesion();
    if( usuario_z.usuario == null) {
        window.location="../login/login.html";
    }
    var modo_z = getParameterByName('accion');
    crear_formulario_clientes();
    encender_apagar_botones ("InVisible");
    registrarapp();
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(usuario_z.usuario, usuario_z.pwd)
   .then(function(user){
       console.log("Usuario ingresado");
       console.log(tienda_z);
    }).catch(function(){
       console.log("Usuario Incorrecto. Intente de Nuevo");
       window.location="../login/login.html";
   });

}
)

function crear_formulario_clientes() {
    var row_z;
    var campo_z = {
        "idcampo":"edt_codigo",
        "label":"Codigo",
        "tipo":"text",
        "name":"codigo",
        "placeholder":"Codigo"
    }
    row_z = input_en_row(campo_z) 
    row_z += "<button id=\"btn_buscacliente\" class= ";

}

$('#btn_buscarcliente').click(function(){
    carga_cliente();
});

function carga_cliente() {
    var codcli_z = $("#edt_codigo").val();
    var url_z = '../utils/basedato.php?accion=buscar_un_cliente_x_codigo&codigo=' + codcli_z;

    $.getJSON(url_z).done(function (result){
        for(var ii_z=0; ii_z<result.length; ii_z++)
        {
            $("#edt_codigo").val(result[ii_z]["codigo"]);
            $("#edt_nombre").val(result[ii_z]["nombre"]);
            $("#edt_telefono").val(result[ii_z]["telefono"]);
            $("#edt_recargas").val(result[ii_z]["recargas"]);
            $("#idcliente_sel").val(result[ii_z]["idcliente"]);
            $("#recargastotal").val(result[ii_z]["recargas"]); 
        }
        carga_tabla_recargas();
    });

}

function xcarga_cliente() {
    var idcliente_z = $("#edt_codigo").val();
    console.log("idcliente:", idcliente_z);
    const db = firebase.database();
    const misclientes = db.ref("clientes/"+idcliente_z);
    misclientes.orderByChild("codigo").once("value")
    .then (function (snapshot) {
        var dd_z = snapshot.val();
        console.log("Cliente Encontrado", dd_z);
        $("#edt_codigo").val(dd_z.codigo);
        $("#edt_nombre").val(dd_z.nombre);
        $("#edt_telefono").val(dd_z.telefono);
        $("#idcliente_sel").val(idcliente_z);
        $("#recargastotal").val(dd_z.recargas);
        $("#edt_recargas").val(dd_z.recargas);
        carga_tabla_recargas();
    }
    );
}

function carga_tabla_recargas() {
    var idcliente_z = $("#idcliente_sel").val();
    var recargasusadas_z = 0;
    var recargastotal_z = $("#recargastotal").val();
    var misrows_z="";
    $("#div_tbl_recargas").empty();
    console.log("idcliente:", idcliente_z);
    var tabla_z = "<table id=\"tbl_recargas\" border=\"1\" class=\"table table-hover\" >";
    tabla_z += "<thead><tr>";
    tabla_z += "<th>Fecha</th>";
    tabla_z += "<th>Telefono</th>";
    tabla_z += "<th>Importe</th>";
    tabla_z += "<th></th>";
    tabla_z += "</tr></thead>";
    tabla_z += "<tbody>";

    var url_z = '../utils/basedato.php?accion=buscar_recargas_cliente&idcliente=' + idcliente_z;

    $.getJSON(url_z).done(function (result){
        for(var ii_z=0; ii_z<result.length; ii_z++)
        {
            var idrecarga_z = result[ii_z]["idrecarga"]
            var row_z = "<tr data-idrecarga='" +  idrecarga_z + "'>";
            row_z = row_z + "<td>" + result[ii_z]["fecha"]  + "</td>";
            row_z = row_z + "<td>" + result[ii_z]["telefono"]  + "</td>";
            row_z = row_z + "<td>" + result[ii_z]["importe"]  + "</td>";
            var idcheck_z = "chk_" + idrecarga_z;
            row_z = row_z + "<td> <img width=40px; src=\"../imgs/vacio.png\" id=\"" + idcheck_z + "\" >" + "</td>";
            row_z = row_z + "</tr>";
            misrows_z += row_z;
            recargasusadas_z += 1;
        }
        tabla_z += misrows_z;
        tabla_z += "</tbody></table>";
        $("#div_tbl_recargas").append(tabla_z);
        $("#recargasusadas").val(recargasusadas_z);
    });
    if(recargasusadas_z < recargastotal_z ) {
        encender_apagar_botones ("Visible");
    } else {
        encender_apagar_botones ("InVisible");
        
    }
}

$('#btn_registrarventa').click(function(){
    var clientesel_z = $("#idcliente_sel").val();
    var recargastotal_z = $("#recargastotal").val();
    var recargasusadas_z = $("#recargasusadas").val();
    var errores_z = 0;
    if(clientesel_z == -1) {
        window.alert("No ha seleccionado ningun cliente");
        errores_z +=  1;
        return;
    }
    if(recargasusadas_z >= recargastotal_z ) {
        window.alert("Ya alcanzo el maximo de recargas para este cliente");
        errores_z +=  1;
        return;
    }
    if (errores_z == 0 ) {
        cargar_formulario_venta();
    }
});

function encender_apagar_botones (modo_z){
    if (modo_z == "Visible") {
        $("#btn_registrarventa").show();
    }
    if (modo_z == "InVisible") {
        $("#btn_registrarventa").hide();
    }

};

function cargar_formulario_venta(){
    var hoy_z = new Date();
    var aa_z = hoy_z.getFullYear();
    var mm_z = 100 + hoy_z.getMonth() + 1;
    var dd_z = 100 + hoy_z.getDate();

    var strfecha_z = aa_z + "-" + mm_z.toString().substr(1,2) + "-" + dd_z.toString().substr(1,2);
    console.log(strfecha_z);
    var telefono_z = $("#edt_telefono").val();
    console.log("Telefono:", telefono_z);
    $( "#edt_fecha" ).val(strfecha_z);
    $("#edt_telrecarga").val(telefono_z);
    $("#modal_frm_registrar_venta").modal("show");
}

function btn_aceptar_recarga(){
    var idcliente_z = $("#idcliente_sel").val();
    var fecha2_z = $("#edt_fecha").val();
    var fecha_z = fecha2_z.substr(6,4) + "-" + fecha2_z.substr(3,2) + "-" + fecha2_z.substr(1,2);
    var telrecarga_z = $("#edt_telrecarga").val();
    var importe_z = 20;
    var nomuser_z = usuario_z.usuario;
    console.log(tienda_z);

    var nuevarecarga_z = {
        "idcliente":idcliente_z,
        "tienda":tienda_z,
        "telefono":telrecarga_z,
        "fecha":fecha2_z,
        "importe":importe_z,
        "usuario":nomuser_z,
        "modo":"recarga_agregar"
    }
    console.log(nuevarecarga_z);
    var url_z = '../utils/basedato.php';
    
    $.ajax({
        url:url_z,
        type:'POST',
        data:nuevarecarga_z
    })
    .then(function(d){
      alert("Aplicacion con Exito");
      //url = "http://localhost/www/programas/cartera/vendedores/vendedores.html";
      url_z = "../registrarventa/registrarventa.html";
      carga_tabla_recargas();
    }
    );
    carga_tabla_recargas();
    $('#btn_cerrar_modal').click();
}
