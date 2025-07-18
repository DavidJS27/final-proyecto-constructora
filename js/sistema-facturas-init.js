function inicializarSistemaFacturas() {
    console.log('Inicializando sistema de facturas...');
    
    
    if (!verificarDependencias()) {
        console.error('Faltan dependencias necesarias');
        return false;
    }
    
    
    if (!window.facturaManager) {
        window.facturaManager = new MantenimientoFacturasManager();
        console.log('Manager de facturas creado');
    }
    
    
    if (!window.exportarDetalle) {
        window.exportarDetalle = () => {
            if (window.facturaManager) {
                window.facturaManager.mostrarOpcionesExportacion();
            } else {
                console.error('Manager de facturas no disponible');
                alertify.error('Error: Sistema de exportación no disponible. Por favor, recargue la página.');
            }
        };
        console.log('Función exportarDetalle configurada');
    }
    
    console.log('Sistema de facturas inicializado correctamente');
    return true;
}


function verificarDependencias() {
    const dependencias = [
        { nombre: 'jQuery', objeto: window.$ },
        { nombre: 'Bootstrap', objeto: window.bootstrap },
        { nombre: 'DataTables', objeto: window.$.fn.DataTable },
        { nombre: 'Alertify', objeto: window.alertify },
        { nombre: 'XLSX', objeto: window.XLSX },
        { nombre: 'jsPDF', objeto: window.jspdf }
    ];
    
    let todasPresentes = true;
    
    dependencias.forEach(dep => {
        if (!dep.objeto) {
            console.error(`Dependencia faltante: ${dep.nombre}`);
            todasPresentes = false;
        } else {
            console.log(`✓ ${dep.nombre} disponible`);
        }
    });
    
    return todasPresentes;
}


function debugSistemaFacturas() {
    console.log('=== DEBUG SISTEMA FACTURAS ===');
    
    
    if (window.facturaManager) {
        console.log('✓ Manager disponible');
        window.facturaManager.verificarEstado();
    } else {
        console.log('✗ Manager no disponible');
    }
    
    
    if (window.exportarDetalle) {
        console.log('✓ Función exportarDetalle disponible');
    } else {
        console.log('✗ Función exportarDetalle no disponible');
    }
    
    
    const facturas = localStorage.getItem('facturasPrueba');
    if (facturas) {
        const datos = JSON.parse(facturas);
        console.log(`✓ Datos de prueba disponibles: ${datos.length} facturas`);
    } else {
        console.log('✗ No hay datos de prueba');
    }
}


function probarExportacionConDatos() {
    console.log('Probando exportación con datos de prueba...');
    
    
    const facturas = localStorage.getItem('facturasPrueba');
    if (!facturas) {
        console.error('No hay datos de prueba disponibles');
        return;
    }
    
    const datos = JSON.parse(facturas);
    const primeraFactura = datos[0];
    
    if (!primeraFactura) {
        console.error('No se encontró primera factura');
        return;
    }
    
    console.log('Usando factura de prueba:', primeraFactura);
    
    
    if (window.facturaManager) {
        window.facturaManager.establecerFacturaSeleccionada(primeraFactura);
        
        
        window.facturaManager.mostrarOpcionesExportacion();
    } else {
        console.error('Manager no disponible');
    }
}


function repararSistemaFacturas() {
    console.log('Reparando sistema de facturas...');
    
    
    if (window.facturaManager) {
        delete window.facturaManager;
    }
    
    if (window.exportarDetalle) {
        delete window.exportarDetalle;
    }
    
    
    setTimeout(() => {
        inicializarSistemaFacturas();
        console.log('Sistema reparado');
    }, 100);
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando sistema...');
    
    
    setTimeout(() => {
        inicializarSistemaFacturas();
        
        
        debugSistemaFacturas();
        
        
        window.debugSistemaFacturas = debugSistemaFacturas;
        window.probarExportacionConDatos = probarExportacionConDatos;
        window.repararSistemaFacturas = repararSistemaFacturas;
        
    }, 500);
});


setInterval(() => {
    if (window.facturaManager && !window.exportarDetalle) {
        console.warn('Sistema necesita reparación');
        repararSistemaFacturas();
    }
}, 2000);

console.log('Inicializador del sistema de facturas cargado');

