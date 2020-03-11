
registrarapp();
const auth = firebase.auth();
auth.signOut();
window.localStorage.clear();

$("#btn_login").on("click",  e=>{
   email_z = $("#login").val();
   pwd_z = $("#password").val();
   auth.signInWithEmailAndPassword(email_z, pwd_z)
   .then(function(user){
       alert("Usuario ingresado");
       sessionStorage.setItem('usuario', email_z);
       sessionStorage.setItem('pwd', pwd_z);
       var ts = new Date();
       window.localStorage.setItem('timestamp', ts.toISOString());
       window.location="../main/main.html";
   }).catch(function(){
       alert("Usuario Incorrecto. Intente de Nuevo");
       window.localStorage.clear();
   });
}
);
