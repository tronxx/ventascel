
$(document).ready( function(){
    var usuario_z = checa_sesion();
    if( usuario_z == null) {
      window.location="login/login.html";
    } else {
        alert("Usuario[" + usuario_z + "]");
      window.location="main/main.html";
    }
});
