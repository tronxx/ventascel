function checa_sesion (){
    usuario_z = window.localStorage.getItem('usuario');
    console.log("usuario:", usuario_z);
    return (usuario_z);
}

