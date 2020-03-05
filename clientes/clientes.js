$(document).ready(function(){
    var usuario_z = checa_sesion();
    if( usuario_z == null) {
        window.location="../login/login.html";
    }
    registrarapp();
    encender_apagar_botones ("InVisible");
    var email_z = "tronxx@gmail.com";
    var pwd_z = "master";
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email_z, pwd_z)
   .then(function(user){
       console.log("Usuario ingresado");
       console.log ("Voy a Buscar los Clientes");
       carga_clientes();
   }).catch(function(){
       console.log("Usuario Incorrecto. Intente de Nuevo");
   });
}
)

$('#btn_agregar').click(function(){
    var idcliente = -1;
    //url_z = "edicion_vendedor.html?idvendedor="+idvendedor+"&modo=buscar";
    url_z = "edicion_cliente.html?accion=agregar";
    $(location).attr('href',url_z);
});

$('#tbl_clientes').on('click','tr td', function(evt){
    var target,idvendedor,valorSeleccionado;
    var idbtn_z;
    target = $(event.target);
    valorSeleccionado = target.text();
    idcliente_z = target.parent().data('idcliente');
    idbtn_z = "chk_" + idcliente_z;
    oldidcliente_z = $("#idcliente_sel").val();
    if(oldidcliente_z != -1) {
        $("#chk_" + oldidcliente_z).attr('src','../imgs/vacio.png');
    }
    oldrowsel_z = $("#row_sel").val();
    rowIndex = $(this).parent().index();
    encender_apagar_botones("Visible");
    $("#idcliente_sel").val(idcliente_z);
    $("#row_sel").val(rowIndex);
    $("#chk_" + idcliente_z).attr('src','../imgs/checked.png');
    console.log("uid:", idcliente_z);
});

$('#btn_modificar').click(function(){
    var idcliente_z = $("#idcliente_sel").val();
    var  data_z = {
        "idcliente": idcliente_z,
        "accion": "modificar_ok"
    }
    url_z = "edicion_cliente.html?idcliente="+idcliente_z+"&accion=modificar";
    $(location).attr('href',url_z);

});

function encender_apagar_botones (modo_z){
    if (modo_z == "Visible") {
        $("#btn_modificar").show();
        $("#btn_eliminar").show();
    }
    if (modo_z == "InVisible") {
        $("#btn_modificar").hide();
        $("#btn_eliminar").hide();
    }

};

$('#btn_eliminar').click(function(){
    var idcliente_z = $("#idcliente_sel").val();
    var  data_z = {
        "idcliente": idcliente_z,
        "accion": "eliminar_ok"
    }
    url_z = "edicion_cliente.html?idcliente="+idcliente_z+"&accion=eliminar";
    $(location).attr('href',url_z);
});

function carga_clientes(){
    const db = firebase.database();
    const misclientes = db.ref("clientes");
    misclientes.orderByChild("codigo").once("value")
    .then (function (snapshot) {
        snapshot.forEach ( function(childSnapshot){
            var d = childSnapshot.val(); 
            var uid_z = childSnapshot.key; 
            var row_z = "<tr data-idcliente='" +  uid_z + "'>";
            row_z = row_z + "<td>" +  d.codigo + "</td>";
            row_z = row_z + "<td>" +  d.nombre + "</td>";
            row_z = row_z + "<td>" +  d.telefono + "</td>";
            var idcheck_z = "chk_" + uid_z;
            row_z = row_z + "<td> <img width=40px; src=\"../imgs/vacio.png\" id=\"" + idcheck_z + "\" >" + "</td>";
            row_z = row_z + "</tr>";
            $("#tbl_clientes tbody").append(row_z);

        }

        )
    }
    ) ;
};
