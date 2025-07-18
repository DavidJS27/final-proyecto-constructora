const DashboardConfig = {
    version: '1.0.0',
    debug: false,
    autoRefresh: {
        enabled: true,
        intervalMinutes: 5
    },
    
    
    charts: {
        colors: {
            primary: '#007bff',
            secondary: '#28a745',
            warning: '#ffc107',
            danger: '#dc3545',
            info: '#17a2b8',
            success: '#28a745'
        },
        
        
        costosPorObra: {
            type: 'bar',
            responsive: true,
            maintainAspectRatio: false,
            height: 400
        },
        
        estadoObras: {
            type: 'doughnut',
            responsive: true,
            maintainAspectRatio: false,
            height: 400
        }
    },
    
    
    table: {
        pageLength: 10,
        responsive: true,
        language: 'es-ES',
        buttons: ['excel', 'pdf', 'print'],
        order: [[0, 'asc']]
    },
    
    
    filters: {
        defaultDateRange: 'currentYear',
        autoApply: false
    },
    
    
    alerts: {
        enabled: true,
        thresholds: {
            lowStock: 10,
            highCost: 1000000,
            delayedProjects: 30 
        }
    },
    
    
    notifications: {
        enabled: true,
        position: 'top-right',
        timeout: 5000
    },
    
    
    format: {
        currency: {
            locale: 'es-PY',
            currency: 'PYG',
            minimumFractionDigits: 0
        },
        date: {
            locale: 'es-PY',
            format: 'DD/MM/YYYY'
        }
    },
    
    
    dataLoading: {
        retryAttempts: 3,
        retryDelay: 1000,
        showLoader: true
    },
    
    
    export: {
        formats: ['xlsx', 'pdf'],
        filename: 'dashboard-reporte'
    }
};


function getDashboardConfig(key) {
    return key ? DashboardConfig[key] : DashboardConfig;
}


function updateDashboardConfig(key, value) {
    if (key && DashboardConfig.hasOwnProperty(key)) {
        DashboardConfig[key] = value;
        return true;
    }
    return false;
}


function resetDashboardConfig() {
    
    location.reload();
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardConfig;
}

