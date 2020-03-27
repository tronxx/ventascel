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

$('#btn_agregar').click(function(){
    $("#accion_seleccionada").val("agregar");
    $("#myModalLabel").text("Datos de la Tienda");
    cargar_formulario_tiendas();
});

$('#btn_modificar').click(function(){
    $("#accion_seleccionada").val("modificar");
    $("#myModalLabel").text("Datos de la Tienda");
    carga_tienda();
});

$('#btn_eliminar').click(function(){
    $("#accion_seleccionada").val("eliminar");
    $("#myModalLabel").text("Seguro de Eliminar esta Tienda ?");
    carga_tienda();
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

function carga_tiendas (){
    var url_z = '../utils/basedato.php?accion=buscar_tiendas';

    //var url = 'http://mdss1/www/cgi/cartera/busca_vnd.php';
    $.getJSON(url_z).done(function (result){
        console.log("Consulta Efectuada");
        for(var ii_z=0; ii_z<result.length; ii_z++)
        {
            var row_z = "<tr data-idtienda='" +  result[ii_z]["idtienda"] + "'>";
            row_z = row_z + "<td>" +  result[ii_z]["codigo"] + "</td>";
            row_z = row_z + "<td>" +  result[ii_z]["nombre"] + "</td>";
            var idcheck_z = "chk_" + result[ii_z]["idtienda"];
            row_z = row_z + "<td> <img width=40px; src=\"../imgs/vacio.png\" id=\"" + idcheck_z + "\" >" + "</td>";
            row_z = row_z + "</tr>";
            $("#tbl_tiendas tbody").append(row_z);
        }
    });

};


function cargar_formulario_tiendas(){
    $("#modal_frm_datos_tienda").modal("show");
}

function btn_aceptar_tienda(){
    console.log("Estoy en aceptar tienda");
    var modo_z = "tienda_" + $("#accion_seleccionada").val();
    var idtienda_z = $("#idtienda_sel").val();
    var codigo_z = $("#edt_codigo").val();
    var nombre_z = $("#edt_nombre").val();
    var status_z = "A";
    var data_z = {
        "idtienda":idtienda_z,
        "codigo":codigo_z,
        "nombre":nombre_z,
        "status":status_z,
        "modo":modo_z
    }
    console.log(modo_z);
    console.log(data_z);
    var url_z = '../utils/basedato.php';
    $.ajax({
        url:url_z,
        type:'POST',
        data:data_z
    })
    .then(function(d){
      alert("Aplicacion con Exito");
      //url = "http://localhost/www/programas/cartera/vendedores/vendedores.html";
      url_z = "../tiendas/tiendas.html";
      $(location).attr('href',url_z);

    }, function(razon){
      alert("Ha ocurrido un error, intente de nuevo");
    }
    );
    
    url_z = "../tiendas/tiendas.html";
    $(location).attr('href',url_z);
    
    $('#btn_cerrar_modal').click();

}

function carga_tienda() {
    var idtienda_z = $("#idtienda_sel").val();
    var url_z = '../utils/basedato.php?accion=buscar_tienda&idtienda=' + idtienda_z;
    console.log(url_z);

    $.getJSON(url_z).done(function (result){
        console.log("Consulta de Una tienda:");
        for(var ii_z=0; ii_z<result.length; ii_z++)
        {
            $("#edt_codigo").val(result[ii_z]["codigo"]);
            $("#edt_nombre").val(result[ii_z]["nombre"]);
        }
        cargar_formulario_tiendas();
    });

}

$('#btn_seltda').click(function(){
    seleccionar_tienda_para_venta();
});

function seleccionar_tienda_para_venta() {
    var idtienda_z = $("#idtienda_sel").val();
    var url_z = '../utils/basedato.php?accion=buscar_tienda&idtienda=' + idtienda_z;
    console.log(url_z);
    var codigo_z = "";
    var nombre_z = "";

    $.getJSON(url_z).done(function (result){
        console.log("1.-Consulta de Una tienda:");
        for(var ii_z=0; ii_z<result.length; ii_z++)
        {
            codigo_z = result[ii_z]["codigo"];
            nombre_z = result[ii_z]["nombre"];
        }
        
        var tiendavta_z = {
            "codigo": codigo_z,
            "nombre": nombre_z
        }
        localStorage.setItem('tienda_venta_codigo', codigo_z);
        localStorage.setItem('tienda_venta_nombre', nombre_z);
        localStorage.setItem('tienda_venta', tiendavta_z);
        window.alert("Selecciono Tienda para Venta:" + 
                     codigo_z + " " + nombre_z );
        
    });
}

