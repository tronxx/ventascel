$(document).ready(function(){
    var usuario_z = checa_sesion();
    if( usuario_z == null) {
        window.location="../login/login.html";
    }
    encender_apagar_botones (InVisible);
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
    registrarapp();
    const db = firebase.database();
    const misclientes = db.child('clientes');
    const query = misclientes.orderByChlid('codigo');
    query.on('value', snap=> {
        
    });
    //var url = 'http://mdss1/www/cgi/cartera/busca_vnd.php';
    $.getJSON(url_z).done(function(result){
        for(var ii_z=0; ii_z<result.length; ii_z++)
        {
            var row_z = "<tr data-idvnd='" +  result[ii_z]["idvnd"] + "'>";
            row_z = row_z + "<td>" +  result[ii_z]["codigo"] + "</td>";
            row_z = row_z + "<td>" +  result[ii_z]["nombre"] + "</td>";
            var idcheck_z = "chk_" + result[ii_z]["idvnd"];
            row_z = row_z + "<td> <img width=40px; src=\"../imgs/vacio.png\" id=\"" + idcheck_z + "\" >" + "</td>";
            row_z = row_z + "</tr>";
            $("#tabla_vendedores tbody").append(row_z);
        }
    });    

};
