$(document).ready(function(){
    var usuario_z = checa_sesion();
    if( usuario_z == null) {
        window.location="../login/login.html";
    }
    registrarapp();
}
)

$('#btn_aceptar').click(function(){
    var email_z = "tronxx@gmail.com";
    var pwd_z = "master";
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email_z, pwd_z)
   .then(function(user){
       console.log("Usuario ingresado");
       console.log ("Voy a agregar_cliente");
       agregar_cliente();
   }).catch(function(){
       console.log("Usuario Incorrecto. Intente de Nuevo");
   });
   
});

function agregar_cliente(){
    var codigo_z = $("#edt_codigo").val();
    var nombre_z = $("#edt_nombre").val();
    var tel_z  = $("#edt_telefono").val();
    var nuevocliente_z = {
        "codigo":codigo_z,
        "nombre":nombre_z,
        "telefono":tel_z
    }
    const db = firebase.database();
    const misclientes = db.ref("clientes/" + codigo_z);
    misclientes.set(nuevocliente_z)
    .then(result => {
        alert('Exito', 'Cliente Agregado');
        window.location="../clientes/clientes.html";
    })
    .catch( error => {
            alert( 'Error - ' + error.message);
    });

}
