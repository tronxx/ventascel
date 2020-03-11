$(document).ready(function(){
    var usuario_z = checa_sesion();
    if( usuario_z.usuario == null) {
        window.location="../login/login.html";
    }
    var modo_z = getParameterByName('accion');
    crear_formulario_clientes();
    registrarapp();
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(usuario_z.usuario, usuario_z.pwd)
   .then(function(user){
       console.log("Usuario ingresado");
       if (modo_z == "modificar") {
           $('#edt_codigo').prop('disabled', true);
           carga_cliente();
        }
        if (modo_z == "eliminar") {
            $('#edt_codigo').prop('disabled', true);
            $('#edt_nombre').prop('disabled', true);
            $('#edt_telefono').prop('disabled', true);
            $('#edt_recargas').prop('disabled', true);
            $("#lbl_titulo").text("Seguro de Eliminar este Cliente ?");
            $("#lbl_titulo").addClass('label label-danger');
            carga_cliente();
         }
 
    }).catch(function(){
       console.log("Usuario Incorrecto. Intente de Nuevo");
   });

}
)

$('#btn_aceptar').click(function(){
    var email_z = "tronxx@gmail.com";
    var pwd_z = "master";
    console.log ("Voy a agregar_cliente");
    agregar_modificar_eliminar_cliente();
});

function agregar_modificar_eliminar_cliente(){
    var codigo_z = $("#edt_codigo").val();
    var nombre_z = $("#edt_nombre").val();
    var tel_z  = $("#edt_telefono").val();
    var recargas_z  = $("#edt_recargas").val();
    var nuevocliente_z = {
        "codigo":codigo_z,
        "nombre":nombre_z,
        "telefono":tel_z,
        "recargas":recargas_z,
        "usadas":0
    }
    var modo_z = getParameterByName('accion');
    const db = firebase.database();
    const misclientes = db.ref("clientes/" + codigo_z);
    if(modo_z == "agregar") {
        misclientes.set(nuevocliente_z)
        .then(result => {
            alert('Exito', 'Cliente Agregado');
            window.location="../clientes/clientes.html";
        })
        .catch( error => {
            console.log("Error :");
            console.log(error);
                alert( 'Error - ' + error.message);
        });
    
    }
    if(modo_z == "modificar") {
        misclientes.update(nuevocliente_z)
        .then(result => {
            alert('Exito', 'Cliente Agregado');
            window.location="../clientes/clientes.html";
        })
        .catch( error => {
            console.log("Error :");
            console.log(error);
                alert( 'Error - ' + error.message);
        });
    
    }
    if(modo_z == "eliminar") {
        misclientes.set(null)
        .then(result => {
            alert('Exito', 'Cliente Eliminado');
            window.location="../clientes/clientes.html";
        })
        .catch( error => {
            console.log("Error :");
            console.log(error);
                alert( 'Error - ' + error.message);
        });
    }

}

function crear_formulario_clientes(){
    var row_z;
    var campo_z = {
        "idcampo":"edt_codigo",
        "label":"Codigo",
        "tipo":"text",
        "name":"codigo",
        "placeholder":"Codigo"
    }
    row_z = "<tr>" + input_en_row(campo_z) + "<tr>";
    $("#tbl_edicion_cliente").append(row_z);
    campo_z = {
        "idcampo":"edt_nombre",
        "label":"Nombre",
        "tipo":"text",
        "name":"nombre",
        "placeholder":"Nombre"
    }
    row_z = "<tr>" + input_en_row(campo_z) + "<tr>";
    $("#tbl_edicion_cliente").append(row_z);
    campo_z = {
        "idcampo":"edt_telefono",
        "label":"Telefono",
        "tipo":"text",
        "name":"telefono",
        "placeholder":"Telefono"
    }
    row_z = "<tr>" + input_en_row(campo_z) + "<tr>";
    $("#tbl_edicion_cliente").append(row_z);
    campo_z = {
        "idcampo":"edt_recargas",
        "label":"Recargas",
        "tipo":"number",
        "name":"recargas",
        "placeholder":"Recargas"
    }
    row_z = "<tr>" + input_en_row(campo_z) + "<tr>";
    $("#tbl_edicion_cliente").append(row_z);

}

function carga_cliente() {
    var idcliente_z = getParameterByName('idcliente');
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
        $("#edt_recargas").val(dd_z.recargas);
    }
    ) ;
}


