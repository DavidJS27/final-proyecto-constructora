
window.USAR_COSTOS_MANAGER = true; 


function inicializarSistemaCostos() {
    
    if (typeof datos === 'function') {
        datos();
    }

    if (window.USAR_COSTOS_MANAGER) {
        
        console.log('Inicializando CostosObraManager...');
        window.costosManager = new CostosObraManager();
        
        
        document.querySelector('#aplicarFiltros')?.addEventListener('click', () => {
            window.costosManager.aplicarFiltros();
        });
        
    } else {
        
        console.log('Usando implementación original...');
        cargarCostosObra();
    }
}


function cambiarImplementacion(usarNueva = true) {
    window.USAR_COSTOS_MANAGER = usarNueva;
    
    
    if ($.fn.DataTable.isDataTable("#tablaCostosObra")) {
        $('#tablaCostosObra').DataTable().destroy();
    }
    document.querySelector("#tablaCostosObra tbody").innerHTML = '';
    
    
    inicializarSistemaCostos();
    
    alertify.success(`Cambiado a ${usarNueva ? 'nueva' : 'original'} implementación`);
}


document.addEventListener('DOMContentLoaded', function() {
    inicializarSistemaCostos();
    
    
    setTimeout(actualizarDashboard, 500);
    
    
    document.getElementById('filtroRangoCosto')?.addEventListener('change', aplicarFiltros);
    document.getElementById('filtroCliente')?.addEventListener('change', aplicarFiltros);
    document.getElementById('ordenarPor')?.addEventListener('change', aplicarFiltros);
});


function crearBotonCambioImplementacion() {
    const boton = document.createElement('button');
    boton.className = 'btn btn-secondary btn-sm ms-2';
    boton.innerHTML = '<i class="bi bi-arrow-repeat"></i> Cambiar Implementación';
    boton.onclick = () => cambiarImplementacion(!window.USAR_COSTOS_MANAGER);
    
    const header = document.querySelector('.card-header');
    if (header) {
        header.appendChild(boton);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setTimeout(crearBotonCambioImplementacion, 1000);
});

