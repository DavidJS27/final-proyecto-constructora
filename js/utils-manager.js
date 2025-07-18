
class UtilsManager {
    constructor() {
        this.configuracion = {
            moneda: 'PYG',
            locale: 'es-PY',
            formatoFecha: 'dd/MM/yyyy'
        };
    }

    
    formatearMoneda(valor, incluirSimbolo = true) {
        if (valor === null || valor === undefined || isNaN(valor)) return '₲ 0';
        
        const opciones = {
            style: incluirSimbolo ? 'currency' : 'decimal',
            currency: this.configuracion.moneda,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        };

        return new Intl.NumberFormat(this.configuracion.locale, opciones).format(valor);
    }

    
    formatearNumero(valor) {
        if (valor === null || valor === undefined || isNaN(valor)) return '0';
        return new Intl.NumberFormat(this.configuracion.locale).format(valor);
    }

    
    formatearFecha(fecha, formato = null) {
        if (!fecha) return '';
        
        const fechaObj = new Date(fecha);
        if (isNaN(fechaObj.getTime())) return '';

        const opciones = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };

        return fechaObj.toLocaleDateString(this.configuracion.locale, opciones);
    }

    
    validarDatosObra(datos) {
        const errores = [];

        if (!datos.nombre || datos.nombre.trim() === '') {
            errores.push('El nombre de la obra es requerido');
        }

        if (!datos.cliente || datos.cliente.trim() === '') {
            errores.push('El cliente es requerido');
        }

        if (!datos.materiales || datos.materiales < 0) {
            errores.push('El costo de materiales debe ser un número positivo');
        }

        if (!datos.manoObra || datos.manoObra < 0) {
            errores.push('El costo de mano de obra debe ser un número positivo');
        }

        if (!datos.otrosCostos || datos.otrosCostos < 0) {
            errores.push('Los otros costos deben ser un número positivo');
        }

        return errores;
    }

    
    calcularEstadisticas(datos) {
        if (!Array.isArray(datos) || datos.length === 0) {
            return {
                total: 0,
                promedio: 0,
                maximo: 0,
                minimo: 0,
                mediana: 0,
                desviacionEstandar: 0
            };
        }

        const valores = datos.map(item => item.total || 0);
        const total = valores.reduce((sum, val) => sum + val, 0);
        const promedio = total / valores.length;
        const maximo = Math.max(...valores);
        const minimo = Math.min(...valores);

        
        const valoresOrdenados = [...valores].sort((a, b) => a - b);
        const mediana = valoresOrdenados.length % 2 === 0
            ? (valoresOrdenados[valoresOrdenados.length / 2 - 1] + valoresOrdenados[valoresOrdenados.length / 2]) / 2
            : valoresOrdenados[Math.floor(valoresOrdenados.length / 2)];

        
        const varianza = valores.reduce((sum, val) => sum + Math.pow(val - promedio, 2), 0) / valores.length;
        const desviacionEstandar = Math.sqrt(varianza);

        return {
            total,
            promedio,
            maximo,
            minimo,
            mediana,
            desviacionEstandar
        };
    }

    
    generarColores(cantidad) {
        const colores = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
        ];

        if (cantidad <= colores.length) {
            return colores.slice(0, cantidad);
        }

        
        const coloresAdicionales = [];
        for (let i = colores.length; i < cantidad; i++) {
            coloresAdicionales.push(this.generarColorAleatorio());
        }

        return [...colores, ...coloresAdicionales];
    }

    generarColorAleatorio() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    
    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    
    manejarError(error, contexto = '') {
        console.error(`Error en ${contexto}:`, error);
        
        let mensaje = 'Ha ocurrido un error inesperado';
        if (error.message) {
            mensaje = error.message;
        } else if (typeof error === 'string') {
            mensaje = error;
        }

        this.mostrarNotificacion(mensaje, 'error');
    }

    
    mostrarNotificacion(mensaje, tipo = 'info', duracion = 3000) {
        if (typeof alertify !== 'undefined') {
            switch (tipo) {
                case 'success':
                    alertify.success(mensaje);
                    break;
                case 'error':
                    alertify.error(mensaje);
                    break;
                case 'warning':
                    alertify.warning(mensaje);
                    break;
                default:
                    alertify.message(mensaje);
            }
        } else {
            
            console.log(`${tipo.toUpperCase()}: ${mensaje}`);
        }
    }

    
    exportarACSV(datos, nombreArchivo = 'costos-obra.csv') {
        if (!datos || !Array.isArray(datos) || datos.length === 0) {
            this.mostrarNotificacion('No hay datos para exportar', 'warning');
            return;
        }

        const headers = Object.keys(datos[0]);
        const csvContent = [
            headers.join(','),
            ...datos.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', nombreArchivo);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    
    guardarEnLocal(clave, datos) {
        try {
            localStorage.setItem(clave, JSON.stringify(datos));
        } catch (error) {
            this.manejarError(error, 'guardar en localStorage');
        }
    }

    obtenerDeLocal(clave) {
        try {
            const datos = localStorage.getItem(clave);
            return datos ? JSON.parse(datos) : null;
        } catch (error) {
            this.manejarError(error, 'obtener de localStorage');
            return null;
        }
    }

    eliminarDeLocal(clave) {
        try {
            localStorage.removeItem(clave);
        } catch (error) {
            this.manejarError(error, 'eliminar de localStorage');
        }
    }

    
    obtenerParametroURL(nombre) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    }

    actualizarParametroURL(nombre, valor) {
        const url = new URL(window.location);
        url.searchParams.set(nombre, valor);
        window.history.replaceState({}, '', url);
    }

    
    validarFormulario(formulario) {
        const campos = formulario.querySelectorAll('input, select, textarea');
        let esValido = true;

        campos.forEach(campo => {
            if (campo.hasAttribute('required') && !campo.value.trim()) {
                this.marcarCampoInvalido(campo);
                esValido = false;
            } else {
                this.marcarCampoValido(campo);
            }
        });

        return esValido;
    }

    marcarCampoInvalido(campo) {
        campo.classList.add('is-invalid');
        campo.classList.remove('is-valid');
    }

    marcarCampoValido(campo) {
        campo.classList.add('is-valid');
        campo.classList.remove('is-invalid');
    }
}


window.UtilsManager = UtilsManager;
window.utils = new UtilsManager();

