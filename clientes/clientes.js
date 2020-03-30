var tienda_z = localStorage.getItem('tienda_venta');
var codtda_z = localStorage.getItem('tienda_venta_codigo');
var nomtda_z = localStorage.getItem('tienda_venta_nombre');


$(document).ready(function(){
    var usuario_z = checa_sesion();
    if( usuario_z.usuario == null) {
        window.location="../login/login.html";
    }
    registrarapp();
    encender_apagar_botones ("InVisible");
    var texto_z = "Clientes de : " + codtda_z + " " + nomtda_z;
    $("#head_card").text(texto_z);
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(usuario_z.usuario, usuario_z.pwd)
   .then(function(user){
       console.log("Usuario ingresado");
       console.log ("Voy a Buscar los Clientes");
       carga_clientes();
    }).catch(function(){
       console.log("Usuario Incorrecto. Intente de Nuevo");
   });
}
)

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


function carga_clientes (){
    var url_z = '../utils/basedato.php?accion=buscar_clientes&codtda=' + codtda_z;

    //var url = 'http://mdss1/www/cgi/cartera/busca_vnd.php';
    $.getJSON(url_z).done(function (result){
        console.log("Consulta Efectuada");
        for(var ii_z=0; ii_z<result.length; ii_z++)
        {
            var row_z = "<tr data-idcliente='" +  result[ii_z]["idcliente"] + "'>";
            row_z = row_z + "<td>" +  result[ii_z]["codigo"] + "</td>";
            row_z = row_z + "<td>" +  result[ii_z]["nombre"] + "</td>";
            row_z = row_z + "<td>" +  result[ii_z]["telefono"] + "</td>";
            row_z = row_z + "<td>" +  result[ii_z]["recargas"] + "</td>";
            row_z = row_z + "<td>" +  result[ii_z]["usadas"] + "</td>";
            var idcheck_z = "chk_" +  result[ii_z]["idcliente"];
            row_z = row_z + "<td> <img width=40px; src=\"../imgs/vacio.png\" id=\"" + idcheck_z + "\" >" + "</td>";
            row_z = row_z + "</tr>";
            $("#tbl_clientes tbody").append(row_z);
        }
    });

};



function xcarga_clientes(){
    console.log("Tienda:", codtda_z);
    const db = firebase.database();
    const misclientes = db.ref("clientes");
    misclientes.orderByChild("codigo").once("value")
    .then (function (snapshot) {
        snapshot.forEach ( function(childSnapshot){
            var dd_z = childSnapshot.val(); 
            var uid_z = childSnapshot.key; 
            var row_z = "<tr data-idcliente='" +  uid_z + "'>";
            row_z = row_z + "<td>" +  dd_z.codigo + "</td>";
            row_z = row_z + "<td>" +  dd_z.nombre + "</td>";
            row_z = row_z + "<td>" +  dd_z.telefono + "</td>";
            row_z = row_z + "<td>" +  dd_z.recargas + "</td>";
            row_z = row_z + "<td>" +  dd_z.usadas + "</td>";
            var idcheck_z = "chk_" + uid_z;
            row_z = row_z + "<td> <img width=40px; src=\"../imgs/vacio.png\" id=\"" + idcheck_z + "\" >" + "</td>";
            row_z = row_z + "</tr>";
            $("#tbl_clientes tbody").append(row_z);

        });
    }
    ) ;
};

function cargar_formulario_clientes(){
    $("#modal_frm_datos_cliente").modal("show");
}

$('#btn_agregar').click(function(){
    $("#accion_seleccionada").val("agregar");
    $("#myModalLabel").text("Datos del Cliente");
    cargar_formulario_clientes();
});

$('#btn_modificar').click(function(){
    $("#accion_seleccionada").val("modificar");
    $("#myModalLabel").text("Datos del Cliente");
    carga_cliente();
});

$('#btn_eliminar').click(function(){
    $("#accion_seleccionada").val("eliminar");
    $("#myModalLabel").text("Seguro de Eliminar este Cliente ?");
    carga_cliente();
});

function carga_cliente() {
    var idcliente_z = $("#idcliente_sel").val();
    var url_z = '../utils/basedato.php?accion=busca_un_cliente&idcliente=' + idcliente_z;
    console.log(url_z);

    $.getJSON(url_z).done(function (result){
        console.log("Consulta de Un Cliente:");
        for(var ii_z=0; ii_z<result.length; ii_z++)
        {
            $("#edt_codigo").val(result[ii_z]["codigo"]);
            $("#edt_nombre").val(result[ii_z]["nombre"]);
            $("#edt_telefono").val(result[ii_z]["telefono"]);
        }
        cargar_formulario_clientes();
    });

}

function btn_aceptar_cliente(){
    alert("Estoy en aceptar Cliente");
    
    var modo_z = "cliente_" + $("#accion_seleccionada").val();
    var idcliente_z = $("#idcliente_sel").val();
    var codigo_z = $("#edt_codigo").val();
    var nombre_z = $("#edt_nombre").val();
    var telefono_z = $("#edt_telefono").val();
    var recargas_z = 4;
    var status_z = "A";
    var data_z = {
        "idcliente":idcliente_z,
        "codigo":codigo_z,
        "nombre":nombre_z,
        "telefono":telefono_z,
        "recargas":recargas_z,
        "tienda": codtda_z,
        "status":status_z,
        "modo":modo_z
    }
    console.log(modo_z);
    console.log(data_z);
    var url_z = '../utils/basedato.php';
    alert("Voy a efectuar el post");
    $.ajax({
        url:url_z,
        type:'POST',
        data:data_z
    })
    .then(function(d){
      alert("Aplicacion con Exito");
      //url = "http://localhost/www/programas/cartera/vendedores/vendedores.html";
      url_z = "../clientes/clientes.html";
      $(xlocation).attr('href',url_z);

    }, function(razon){
      alert("Ha ocurrido un error, intente de nuevo");
    }
    );
    
    url_z = "../clientes/clientes.html";
    $(xlocation).attr('href',url_z);
    
    $('#btn_cerrar_modal').click();

}
