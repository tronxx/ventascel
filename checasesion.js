function checa_sesion (){
    usuario_z = sessionStorage.getItem('usuario');
    pwd_z = sessionStorage.getItem('pwd');
    var credenciales_z = {
        "usuario":usuario_z,
        "pwd": pwd_z
    }
    return (credenciales_z);
}

