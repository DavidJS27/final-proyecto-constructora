const DashboardCardsConfig = {
    
    animations: {
        enabled: true,
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        staggerDelay: 150,
        counterDuration: 2000
    },

    
    colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        danger: '#e74c3c',
        warning: '#f39c12',
        info: '#1abc9c',
        purple: '#9b59b6',
        dark: '#34495e',
        light: '#ecf0f1',
        gray: '#95a5a6'
    },

    
    effects: {
        hover: {
            enabled: true,
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.2)'
        },
        click: {
            enabled: true,
            ripple: true,
            scale: 0.98
        },
        loading: {
            enabled: true,
            shimmer: true
        }
    },

    
    icons: {
        users: 'bi-people-fill',
        materials: 'bi-box-seam-fill',
        purchases: 'bi-cart-fill',
        projects: 'bi-building-fill',
        payments: 'bi-cash-coin',
        advances: 'bi-wallet-fill',
        obras: 'bi-building',
        clientes: 'bi-people',
        proveedores: 'bi-truck'
    },

    
    formats: {
        currency: {
            locale: 'es-PY',
            currency: 'PYG',
            symbol: 'Gs. ',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        },
        number: {
            locale: 'es-PY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        },
        percentage: {
            locale: 'es-PY',
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 1
        }
    },

    
    cards: {
        'total-users': {
            title: 'Total de Usuarios',
            icon: 'users',
            color: 'primary',
            format: 'number',
            showTrend: true,
            showChange: true,
            refreshInterval: 60000 
        },
        'total-materials': {
            title: 'Materiales en Stock',
            icon: 'materials',
            color: 'secondary',
            format: 'number',
            showTrend: true,
            showChange: true,
            refreshInterval: 30000 
        },
        'total-purchases': {
            title: 'Compras este mes',
            icon: 'purchases',
            color: 'warning',
            format: 'currency',
            showTrend: true,
            showChange: true,
            refreshInterval: 60000
        },
        'total-projects': {
            title: 'Obras en progreso',
            icon: 'projects',
            color: 'danger',
            format: 'currency',
            showTrend: true,
            showChange: true,
            refreshInterval: 120000 
        },
        'total-payments': {
            title: 'Cobros a clientes',
            icon: 'payments',
            color: 'info',
            format: 'currency',
            showTrend: true,
            showChange: true,
            showProgress: true,
            refreshInterval: 60000
        },
        'total-advances': {
            title: 'Anticipos recibidos',
            icon: 'advances',
            color: 'purple',
            format: 'currency',
            showTrend: true,
            showChange: true,
            refreshInterval: 120000
        }
    },

    
    notifications: {
        enabled: true,
        position: 'top-right',
        duration: 5000,
        types: {
            success: {
                class: 'alertify-success',
                icon: 'bi-check-circle'
            },
            error: {
                class: 'alertify-error',
                icon: 'bi-exclamation-circle'
            },
            warning: {
                class: 'alertify-warning',
                icon: 'bi-exclamation-triangle'
            },
            info: {
                class: 'alertify-info',
                icon: 'bi-info-circle'
            }
        }
    },

    
    responsive: {
        breakpoints: {
            xs: 480,
            sm: 768,
            md: 1024,
            lg: 1400
        },
        grid: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4
        }
    },

    
    accessibility: {
        enabled: true,
        focusOutline: '2px solid var(--primary-color)',
        ariaLabels: {
            'total-users': 'Tarjeta de estadísticas de usuarios totales',
            'total-materials': 'Tarjeta de estadísticas de materiales en stock',
            'total-purchases': 'Tarjeta de estadísticas de compras del mes',
            'total-projects': 'Tarjeta de estadísticas de obras en progreso',
            'total-payments': 'Tarjeta de estadísticas de cobros a clientes',
            'total-advances': 'Tarjeta de estadísticas de anticipos recibidos'
        }
    },

    
    dataUpdate: {
        enabled: true,
        interval: 30000, 
        retryAttempts: 3,
        retryDelay: 5000,
        showLoadingIndicator: true,
        pauseOnHidden: true
    },

    
    metrics: {
        enabled: true,
        trackClicks: true,
        trackHovers: true,
        trackUpdates: true,
        trackErrors: true
    },

    
    themes: {
        light: {
            cardBackground: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            textColor: '#1e293b',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            shadowColor: 'rgba(0, 0, 0, 0.12)'
        },
        dark: {
            cardBackground: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
            textColor: '#f7fafc',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
    },

    
    debug: {
        enabled: false,
        logLevel: 'info', 
        showPerformance: false,
        showEvents: false
    }
};


function getCardConfig(cardId) {
    return DashboardCardsConfig.cards[cardId] || {};
}


function getColorConfig(colorName) {
    return DashboardCardsConfig.colors[colorName] || DashboardCardsConfig.colors.primary;
}


function getFormatConfig(formatType) {
    return DashboardCardsConfig.formats[formatType] || DashboardCardsConfig.formats.number;
}


function updateConfig(path, value) {
    const keys = path.split('.');
    let current = DashboardCardsConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
}


function getResponsiveConfig() {
    const width = window.innerWidth;
    const breakpoints = DashboardCardsConfig.responsive.breakpoints;
    
    if (width < breakpoints.xs) return 'xs';
    if (width < breakpoints.sm) return 'sm';
    if (width < breakpoints.md) return 'md';
    return 'lg';
}


function applyTheme(themeName) {
    const theme = DashboardCardsConfig.themes[themeName];
    if (!theme) return;
    
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });
}


function debugLog(level, message, data = null) {
    if (!DashboardCardsConfig.debug.enabled) return;
    
    const levels = ['debug', 'info', 'warn', 'error'];
    const configLevel = levels.indexOf(DashboardCardsConfig.debug.logLevel);
    const currentLevel = levels.indexOf(level);
    
    if (currentLevel >= configLevel) {
        console[level](`[Dashboard Cards] ${message}`, data);
    }
}


if (typeof window !== 'undefined') {
    window.DashboardCardsConfig = DashboardCardsConfig;
    window.getCardConfig = getCardConfig;
    window.getColorConfig = getColorConfig;
    window.getFormatConfig = getFormatConfig;
    window.updateConfig = updateConfig;
    window.getResponsiveConfig = getResponsiveConfig;
    window.applyTheme = applyTheme;
    window.debugLog = debugLog;
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DashboardCardsConfig,
        getCardConfig,
        getColorConfig,
        getFormatConfig,
        updateConfig,
        getResponsiveConfig,
        applyTheme,
        debugLog
    };
}

