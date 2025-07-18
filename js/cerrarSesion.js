
function cerrarSesion() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
    return false; 
}
