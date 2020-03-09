$(document).ready(function(){
    var usuario_z = checa_sesion();
    if( usuario_z.usuario == null) {
        window.location="../login/login.html";
    }
    registrarapp();
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(usuario_z.usuario, usuario_z.pwd)
   .then(function(user){
       console.log("Usuario ingresado");
       console.log ("Voy a Buscar los Clientes");
       carga_clientes();
   }).catch(function(){
       console.log("Usuario Incorrecto. Intente de Nuevo");
   });
   crear_formulario_clientes();
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