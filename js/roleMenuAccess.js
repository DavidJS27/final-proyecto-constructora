
function initRoleBasedAccess() {
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        
        window.location.href = "error.html";
        return;
    }

    
    if(currentUser.permisos.length === 0) {
        configureMenuByRole(currentUser.rol);
        
        checkPagePermission(currentUser.rol);
    } else {
        customMenuConfiguration(currentUser.permisos);
        customPagePermission(currentUser.permisos)
    }
}


function configureMenuByRole(role) {
    
    const menuFinanzas = document.getElementById("collapseFinanzas");
    const menuObras = document.getElementById("collapseObras");
    const menuMantenimiento = document.getElementById("collapseMantenimiento");
    
    
    const linkFinanzas = document.querySelector('a[data-bs-target="#collapseFinanzas"]');
    const linkObras = document.querySelector('a[data-bs-target="#collapseObras"]');
    const linkMantenimiento = document.querySelector('a[data-bs-target="#collapseMantenimiento"]');
    
    
    if (menuFinanzas) menuFinanzas.classList.remove('show');
    if (menuObras) menuObras.classList.remove('show');
    if (menuMantenimiento) menuMantenimiento.classList.remove('show');
    
    
    switch (role) {
        case 'administrador':
            
            break;
            
        case 'gerente':
            
            hideMenuItems('.admin-only');
            break;
            
        case 'contador':
            
            if (linkObras) linkObras.style.display = 'none';
            if (linkMantenimiento) linkMantenimiento.style.display = 'none';
            
            if (menuFinanzas) menuFinanzas.classList.add('show');
            break;
            
        case 'jefe_obra':
            
            if (linkFinanzas) linkFinanzas.style.display = 'none';
            if (linkMantenimiento) linkMantenimiento.style.display = 'none';
            
            if (menuObras) menuObras.classList.add('show');
            break;
            
        case 'codificador':
            
            if (linkFinanzas) linkFinanzas.style.display = 'none';
            if (linkObras) linkObras.style.display = 'none';
            
            hideMenuItems('.not-for-codifier');
            
            if (menuMantenimiento) menuMantenimiento.classList.add('show');
            if (linkMantenimiento) linkMantenimiento.style.display = 'block';
            break;
            
        case 'obrero':
            
            if (linkFinanzas) linkFinanzas.style.display = 'none';
            if (linkObras) linkObras.style.display = 'none';
            if (linkMantenimiento) linkMantenimiento.style.display = 'none';
            break;
            
        default:
            
            if (linkFinanzas) linkFinanzas.style.display = 'none';
            if (linkObras) linkObras.style.display = 'none';
            if (linkMantenimiento) linkMantenimiento.style.display = 'none';
    }
}


function customMenuConfiguration(permisos) {
    const pages = ['dashboard', 'usuarios', 'clientes', 'proveedores', 'materiales', 
                    'facturas-proveedores', 'facturas-clientes', 'pagos-proveedores', 
                    'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros',
                    'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                    'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'];

    const administracionModule = ['usuarios', 'clientes', 'proveedores', 'materiales'];
    const finanzasModule = ['facturas-proveedores', 'facturas-clientes', 'pagos-proveedores', 'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros'];
    const obrasModule = ['mantenimiento-obras', 'asignar-materiales', 'control-existencias', 'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'];

    
    const linkFinanzas = document.querySelector('a[data-bs-target="#collapseFinanzas"]');
    const linkObras = document.querySelector('a[data-bs-target="#collapseObras"]');
    const linkMantenimiento = document.querySelector('a[data-bs-target="#collapseMantenimiento"]');

    let flagFinanzas = false;
    let flagObras = false;

    if(!permisos.some(permiso => administracionModule.includes(permiso))) {
       linkMantenimiento.style.display = 'none';
       document.getElementById('administracion').style.display = 'none';
    } 

    if(!permisos.some(permiso => finanzasModule.includes(permiso))) {
        linkFinanzas.style.display = 'none';
        flagFinanzas = true;
    }

    if(!permisos.some(permiso => obrasModule.includes(permiso))) {
        linkObras.style.display = 'none';
        flagObras = true;
    }

    if(flagFinanzas && flagObras) {
        document.getElementById('modulos').style.display = 'none';
    }

    const principalElement = document.getElementById('principal');
    if(!permisos.includes('dashboard') && principalElement) {
        principalElement.style.display = 'none';
    }

    const notAllowed = pages.filter(elem => !permisos.includes(elem));

    notAllowed.forEach(elem => {
        const element = document.getElementById(elem);
        if (element) {
            element.style.display = 'none';
        }
    });
}


function hideMenuItems(selector) {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        item.style.display = 'none';
    });
}


function checkPagePermission(role) {
    
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().split('.')[0];
    
    
    const allowedPages = {
        administrador: ['dashboard', 'usuarios', 'clientes', 'proveedores', 'materiales', 
                        'facturas-proveedores', 'mantenimiento-facturas', 'facturas-clientes', 'mantenimiento-facturas-clientes', 'pagos-proveedores', 
                        'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros', 'historial-movimientos',
                        'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                        'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'],
        
        gerente: ['dashboard', 'clientes', 'proveedores', 'materiales', 
                 'facturas-proveedores', 'mantenimiento-facturas', 'mantenimiento-facturas-clientes','facturas-clientes', 'pagos-proveedores', 
                 'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros', 'historial-movimientos',
                 'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                 'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'],
        
        contador: ['dashboard', 'facturas-proveedores', 'mantenimiento-facturas', 'facturas-clientes', 'mantenimiento-facturas-clientes', 'pagos-proveedores', 
                  'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros', 'historial-movimientos'],
        
        jefe_obra: ['dashboard', 'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                   'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'],
        
        codificador: ['dashboard', 'clientes', 'proveedores', 'materiales'],
        
        obrero: ['dashboard']
    };
    
    
    const globalAllowedPages = ['menu', 'error', '', 'login'];
    
    
    if (pageName && !globalAllowedPages.includes(pageName)) {
        const pagesForRole = allowedPages[role] || [];
        
        if (!pagesForRole.includes(pageName)) {
            
            
            
                window.location.href = "error.html";
            
        }
    }
}

function customPagePermission(permisos) {
    const pages = ['dashboard', 'usuarios', 'clientes', 'proveedores', 'materiales', 
                    'facturas-proveedores', 'facturas-clientes','mantenimiento-facturas-clientes', 'pagos-proveedores',
                    'historial-',
                    'cobros-clientes', 'adelantos-anticipos', 'costos-obra', 'reportes-financieros',
                    'mantenimiento-obras', 'asignar-materiales', 'control-existencias',
                    'movimientos-materiales', 'traslado-materiales', 'registro-perdidas'];
                        
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop().split('.')[0];

    const notAllowed = pages.filter(elem => !permisos.includes(elem));

    if(notAllowed.includes(pageName)) {
        
        
        
            window.location.href = "error.html";
        
    }
}


document.addEventListener('DOMContentLoaded', initRoleBasedAccess);
