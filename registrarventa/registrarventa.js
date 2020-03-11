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
        carga_tabla_recargas();
    }
    );
}

function carga_tabla_recargas() {
    var idcliente_z = $("#edt_codigo").val();
    $("#recargastotal").val(0);
    console.log("idcliente:", idcliente_z);
    const db = firebase.database();
    const misclientes = db.ref("recargas/"+idcliente_z);
    misclientes.orderByChild("fecha").once("value")
    .then (function (snapshot) {
        var misrows_z = "";
        var tabla_z = "<table id=\"tbl_recargas\" border=\"1\">" ;
        tabla_z += "<thead><tr><th>Fecha</td><td>Telefono</td><td>Importe</td></tr></thead>";
        table_z += "<tbody>";
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

        });
        tabla_z += misrows_z;
        tabla_z += "</tbody></table>";
        $("#tbl_clientes tbody").append(row_z);

    }
    );
}
