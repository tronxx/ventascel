$(document).ready(function(){
    var usuario_z = checa_sesion();
    if( usuario_z.usuario == null) {
        window.location="../login/login.html";
    }
    registrarapp();
    encender_apagar_botones ("InVisible");
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(usuario_z.usuario, usuario_z.pwd)
   .then(function(user){
       console.log("Usuario ingresado");
       console.log ("Voy a Buscar los Clientes");
       carga_tiendas();
   }).catch(function(){
       console.log("Usuario Incorrecto. Intente de Nuevo");
   });
}
)

$('#btn_agregar').click(function(){
  $("#accion_seleccionada").val("agregar");
  cargar_formulario_tiendas();
});

// -- Funcion que checa si hacen click en la Tabla de Tiendas

$('#tbl_tiendas').on('click','tr td', function(evt){
    var target,idvendedor,valorSeleccionado;
    var idbtn_z;
    target = $(event.target);
    valorSeleccionado = target.text();
    idtienda_z = target.parent().data('idtienda');
    idbtn_z = "chk_" + idtienda_z;
    oldidtienda_z = $("#idtienda_sel").val();
    if(oldidtienda_z != -1) {
        $("#chk_" + oldidtienda_z).attr('src','../imgs/vacio.png');
    }
    oldrowsel_z = $("#row_sel").val();
    rowIndex = $(this).parent().index();
    encender_apagar_botones("Visible");
    $("#idtienda_sel").val(idtienda_z);
    $("#row_sel").val(rowIndex);
    $("#chk_" + idtienda_z).attr('src','../imgs/checked.png');
    console.log("uid:", idtienda_z);
});

$('#btn_modificar').click(function(){
    $("#accion_seleccionada").val("modificar");
    carga_tienda();
    cargar_formulario_tiendas();
});

function encender_apagar_botones (modo_z){
    if (modo_z == "Visible") {
        $("#btn_modificar").show();
        $("#btn_eliminar").show();
        $("#btn_seltda").show();
    }
    if (modo_z == "InVisible") {
        $("#btn_modificar").hide();
        $("#btn_eliminar").hide();
        $("#btn_seltda").hide();
    }

};

$('#btn_eliminar').click(function(){
    $("#accion_seleccionada").val("eliminar");
    carga_tienda();
    $("#myModalLabel").text="Seguro de Eliminar esta Tienda ?"
    cargar_formulario_tiendas();
});

function carga_tiendas(){
    const db = firebase.database();
    const misclientes = db.ref("tiendas");
    misclientes.orderByChild("codigo").once("value")
    .then (function (snapshot) {
        snapshot.forEach ( function(childSnapshot){
            var d = childSnapshot.val(); 
            var uid_z = childSnapshot.key; 
            var row_z = "<tr data-idtienda='" +  uid_z + "'>";
            row_z = row_z + "<td>" +  d.codigo + "</td>";
            row_z = row_z + "<td>" +  d.nombre + "</td>";
            var idcheck_z = "chk_" + uid_z;
            row_z = row_z + "<td> <img width=40px; src=\"../imgs/vacio.png\" id=\"" + idcheck_z + "\" >" + "</td>";
            row_z = row_z + "</tr>";
            $("#tbl_tiendas tbody").append(row_z);

        });
    }
    ) ;
};

function cargar_formulario_tiendas(){
    $("#modal_frm_datos_tienda").modal("show");
}

function btn_aceptar_tienda(){
    var modo_z = $("#accion_seleccionada").val();
    var codigo_z = $("#edt_codigo").val();
    var nombre_z = $("#edt_nombre").val();
    var status_z = "A";
    var tienda_z = {
        "codigo":codigo_z,
        "nombre":nombre_z,
        "status":status_z
    }
    const db = firebase.database();
    const mistiendas_z = db.ref("tiendas/" + codigo_z);
    if(modo_z == "agregar") {
        mistiendas_z.set(tienda_z)
        .then(result => {
            alert('Exito', 'Tienda Agregada');
            window.location="./tiendas.html";
        })
        .catch( error => {
            console.log("Error :");
            console.log(error);
                alert( 'Error - ' + error.message);
        });
    
    }
    if(modo_z == "modificar") {
        mistiendas_z.update(tienda_z)
        .then(result => {
            alert('Exito', 'Tienda Modificada');
            window.location="./tiendas.html";
        })
        .catch( error => {
            console.log("Error :");
            console.log(error);
                alert( 'Error - ' + error.message);
        });
    
    }
    if(modo_z == "eliminar") {
        mistiendas_z.set(null)
        .then(result => {
            alert('Exito', 'Tienda Eliminada');
            window.location="./tiendas.html";
        })
        .catch( error => {
            console.log("Error :");
            console.log(error);
                alert( 'Error - ' + error.message);
        });
    
    }
    
    $('#btn_cerrar_modal').click();

}

function carga_tienda() {
    var idtienda_z = $("#idtienda_sel").val();
    console.log("idcliente:", idtienda_z);
    const db = firebase.database();
    const misclientes = db.ref("tiendas/"+idtienda_z);
    misclientes.orderByChild("codigo").once("value")
    .then (function (snapshot) {
        var dd_z = snapshot.val();
        console.log("Tienda Encontrado", dd_z);
        $("#edt_codigo").val(dd_z.codigo);
        $("#edt_nombre").val(dd_z.nombre);
    }
    ) ;
}

$('#btn_seltda').click(function(){
    seleccionar_tienda_para_venta();
});

function seleccionar_tienda_para_venta() {
    var idtienda_z = $("#idtienda_sel").val();
    const db = firebase.database();
    const misclientes = db.ref("tiendas/"+idtienda_z);
    misclientes.orderByChild("codigo").once("value")
    .then (function (snapshot) {
        var dd_z = snapshot.val();
        tiendavta_z = {
            "codigo": dd_z.codigo,
            "nombre": dd_z.nombre
        }
        localStorage.setItem('tienda_venta_codigo', dd_z.codigo);
        localStorage.setItem('tienda_venta_nombre', dd_z.nombre);
        localStorage.setItem('tienda_venta', tiendavta_z);
        window.alert("Se ha Seleccionado Esta Tienda para Venta:", dd_z.codigo);
    }
    ) ;
}

