
function cerrarSesion() {
    alertify.confirm("Nombre del sistema", "¿Quieres cerrar la sesión del usuario?",
        function(){
            localStorage.removeItem("nomUsuario"); 
            window.location.href = "index.html"; 
        },
        function(){
            
        }
    ).set('labels', {ok:'Sí', cancel:'No'}).set('transition', 'slide');
}

