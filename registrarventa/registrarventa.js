$(document).ready(function(){
    var usuario_z = checa_sesion();
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
    var idcliente_z = $("#edt_codigo").val();
    var recargasusadas_z = 0;
    var recargastotal_z = $("#recargastotal").val();
    $("#div_tbl_recargas").empty();
    console.log("idcliente:", idcliente_z);
    var tabla_z = "<table id=\"tbl_recargas\" border=\"1\" class=\"table table-hover\" >";
    tabla_z += "<thead><tr><th>Fecha</th><th>Telefono</th><th>Importe</th><th></th></tr></thead>";
    tabla_z += "<tbody>";
    const db = firebase.database();
    const misclientes = db.ref("recargas/"+idcliente_z);
    misclientes.orderByChild("fecha").once("value")
    .then (function (snapshot) {
        var misrows_z = "";
        snapshot.forEach ( function(childSnapshot){
            var dd_z = childSnapshot.val(); 
            var uid_z = childSnapshot.key; 
            var row_z = "<tr data-idcliente='" +  uid_z + "'>";
            row_z = row_z + "<td>" +  dd_z.fecha + "</td>";
            row_z = row_z + "<td>" +  dd_z.telefono + "</td>";
            row_z = row_z + "<td>" +  dd_z.importe + "</td>";
            var idcheck_z = "chk_" + uid_z;
            row_z = row_z + "<td> <img width=40px; src=\"../imgs/vacio.png\" id=\"" + idcheck_z + "\" >" + "</td>";
            row_z = row_z + "</tr>";
            misrows_z += row_z;
            recargasusadas_z += 1;

        });
        tabla_z += misrows_z;
    }
    );
    tabla_z += "</tbody></table>";
    $("#div_tbl_recargas").append(tabla_z);
    $("#recargasusadas").val(recargasusadas_z);
    console.log("Recargas Total:", recargastotal_z, "Usadas:", recargasusadas_z)
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
   $("#modal_frm_registrar_venta").modal("show");
}

function btn_aceptar_recarga(){
    var idcliente_z = $("#idcliente_sel").val();
    var fecha_z = $("Edt_fecha").val();
    var telefono_z = $("#edt_telefono").val();
    var importe_z = 20;
    const db = firebase.database();
    const misrecargas = db.ref("recargas/"+idcliente_z);
    var nuevarecarga_z = {
        "codigo":idcliente_z,
        "telefono":telefono_z,
        "fecha":fecha_z,
        "importe":importe_z,
        "usuario":usuario_z
    }


}