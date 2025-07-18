class FinanzasIntegracion {
    constructor() {
        this.storageKeys = {
            adelantos: "adelantosProveedores",
            anticipos: "anticipos",
            movimientos: "movimientosFinancieros"
        };
    }

    
    aplicarAdelantosAlPago(idProveedor, montoPago) {
        try {
            let adelantos = JSON.parse(localStorage.getItem(this.storageKeys.adelantos)) || [];
            let adelantosPendientes = adelantos.filter(a =>
                a.idProveedor == idProveedor &&
                a.estadoAdelanto === 'pendiente' &&
                a.montoAdelanto > 0
            );

            let montoConAdelanto = 0;
            let montoRestante = montoPago;
            let adelantosAplicados = [];

            adelantosPendientes.forEach(adelanto => {
                if (montoRestante <= 0) return;
                
                let aplicar = Math.min(adelanto.montoAdelanto, montoRestante);
                adelanto.montoAdelanto -= aplicar;
                montoConAdelanto += aplicar;
                montoRestante -= aplicar;
                
                adelantosAplicados.push({
                    idAdelanto: adelanto.idAdelanto,
                    montoAplicado: aplicar
                });

                if (adelanto.montoAdelanto === 0) {
                    adelanto.estadoAdelanto = 'aplicado';
                }
            });

            
            localStorage.setItem(this.storageKeys.adelantos, JSON.stringify(adelantos));

            
            this.registrarMovimiento({
                tipo: 'aplicacion_adelanto',
                idProveedor: idProveedor,
                montoTotal: montoPago,
                montoAplicado: montoConAdelanto,
                adelantosAplicados: adelantosAplicados,
                fecha: new Date().toISOString(),
                descripcion: `Aplicación de adelantos por ₲ ${this.formatoNumero(montoConAdelanto)} en pago a proveedor`
            });

            return {
                pagadoConAdelanto: montoConAdelanto,
                pagadoEnEfectivo: montoRestante,
                adelantosAplicados: adelantosAplicados,
                success: true
            };

        } catch (error) {
            console.error("Error al aplicar adelantos al pago:", error);
            return {
                pagadoConAdelanto: 0,
                pagadoEnEfectivo: montoPago,
                adelantosAplicados: [],
                success: false,
                error: error.message
            };
        }
    }

    
    obtenerAnticiposCliente(idCliente) {
        try {
            const anticipos = JSON.parse(localStorage.getItem(this.storageKeys.anticipos)) || [];
            return anticipos.filter(a => a.idCliente == idCliente && a.montoAnticipo > 0);
        } catch (error) {
            console.error("Error al obtener anticipos del cliente:", error);
            return [];
        }
    }

    
    aplicarAnticiposAFactura(idCliente, montoFactura, idObra = null) {
        try {
            let anticipos = JSON.parse(localStorage.getItem(this.storageKeys.anticipos)) || [];
            let anticiposDisponibles = anticipos.filter(a => 
                a.idCliente == idCliente && 
                a.montoAnticipo > 0 &&
                (idObra ? a.idObra == idObra : true)
            );
            
            let montoConAnticipo = 0;
            let montoRestante = montoFactura;
            let anticiposAplicados = [];

            anticiposDisponibles.forEach(anticipo => {
                if (montoRestante <= 0) return;
                
                let aplicar = Math.min(anticipo.montoAnticipo, montoRestante);
                anticipo.montoAnticipo -= aplicar;
                montoConAnticipo += aplicar;
                montoRestante -= aplicar;

                anticiposAplicados.push({
                    idAnticipo: anticipo.idAnticipo,
                    montoAplicado: aplicar
                });
            });

            
            localStorage.setItem(this.storageKeys.anticipos, JSON.stringify(anticipos));

            
            this.registrarMovimiento({
                tipo: 'aplicacion_anticipo',
                idCliente: idCliente,
                idObra: idObra,
                montoFactura: montoFactura,
                montoAplicado: montoConAnticipo,
                anticiposAplicados: anticiposAplicados,
                fecha: new Date().toISOString(),
                descripción: `Aplicación de anticipos por ₲ ${this.formatoNumero(montoConAnticipo)} en factura`
            });

            return {
                aplicadoConAnticipo: montoConAnticipo,
                montoRestante: montoRestante,
                anticiposAplicados: anticiposAplicados,
                success: true
            };

        } catch (error) {
            console.error("Error al aplicar anticipos a factura:", error);
            return {
                aplicadoConAnticipo: 0,
                montoRestante: montoFactura,
                anticiposAplicados: [],
                success: false,
                error: error.message
            };
        }
    }

    
    obtenerResumenFinanciero() {
        try {
            const adelantos = JSON.parse(localStorage.getItem(this.storageKeys.adelantos)) || [];
            const anticipos = JSON.parse(localStorage.getItem(this.storageKeys.anticipos)) || [];

            const totalAdelantosPendientes = adelantos
                .filter(a => a.estadoAdelanto === 'pendiente')
                .reduce((sum, a) => sum + a.montoAdelanto, 0);

            const totalAdelantosAplicados = adelantos
                .filter(a => a.estadoAdelanto === 'aplicado')
                .reduce((sum, a) => sum + (a.montoOriginal || a.montoAdelanto), 0);

            const totalAnticiposDisponibles = anticipos
                .reduce((sum, a) => sum + a.montoAnticipo, 0);

            const totalAnticiposRecibidos = anticipos
                .reduce((sum, a) => sum + (a.montoOriginal || a.montoAnticipo), 0);

            return {
                adelantos: {
                    pendientes: totalAdelantosPendientes,
                    aplicados: totalAdelantosAplicados,
                    total: totalAdelantosPendientes + totalAdelantosAplicados,
                    cantidad: adelantos.length
                },
                anticipos: {
                    disponibles: totalAnticiposDisponibles,
                    recibidos: totalAnticiposRecibidos,
                    cantidad: anticipos.length
                },
                flujoEfectivo: {
                    salida: totalAdelantosPendientes, 
                    entrada: totalAnticiposDisponibles 
                }
            };
        } catch (error) {
            console.error("Error al obtener resumen financiero:", error);
            return {
                adelantos: { pendientes: 0, aplicados: 0, total: 0, cantidad: 0 },
                anticipos: { disponibles: 0, recibidos: 0, cantidad: 0 },
                flujoEfectivo: { salida: 0, entrada: 0 }
            };
        }
    }

    
    registrarMovimiento(movimiento) {
        try {
            const movimientos = JSON.parse(localStorage.getItem(this.storageKeys.movimientos)) || [];
            
            
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            movimiento.id = Date.now() + Math.random(); 
            movimiento.usuario = currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : 'Sistema';
            movimiento.fechaRegistro = new Date().toISOString();
            
            movimientos.push(movimiento);
            localStorage.setItem(this.storageKeys.movimientos, JSON.stringify(movimientos));
            
        } catch (error) {
            console.error("Error al registrar movimiento financiero:", error);
        }
    }

    
    obtenerHistorialMovimientos(filtros = {}) {
        try {
            const movimientos = JSON.parse(localStorage.getItem(this.storageKeys.movimientos)) || [];
            
            return movimientos.filter(movimiento => {
                if (filtros.tipo && movimiento.tipo !== filtros.tipo) return false;
                if (filtros.fechaDesde && movimiento.fecha < filtros.fechaDesde) return false;
                if (filtros.fechaHasta && movimiento.fecha > filtros.fechaHasta) return false;
                if (filtros.idProveedor && movimiento.idProveedor !== filtros.idProveedor) return false;
                if (filtros.idCliente && movimiento.idCliente !== filtros.idCliente) return false;
                return true;
            }).sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));
            
        } catch (error) {
            console.error("Error al obtener historial de movimientos:", error);
            return [];
        }
    }

    
    formatoNumero(numero) {
        return new Intl.NumberFormat('es-PY', {
            maximumFractionDigits: 0
        }).format(numero);
    }

    
    validarAdelantosProveedor(idProveedor) {
        try {
            const adelantos = JSON.parse(localStorage.getItem(this.storageKeys.adelantos)) || [];
            const adelantosProveedor = adelantos.filter(a => a.idProveedor == idProveedor);
            
            const pendientes = adelantosProveedor.filter(a => a.estadoAdelanto === 'pendiente');
            const totalPendiente = pendientes.reduce((sum, a) => sum + a.montoAdelanto, 0);
            
            return {
                tieneAdelantosPendientes: pendientes.length > 0,
                cantidadPendientes: pendientes.length,
                montoPendiente: totalPendiente,
                adelantosPendientes: pendientes
            };
        } catch (error) {
            console.error("Error al validar adelantos del proveedor:", error);
            return {
                tieneAdelantosPendientes: false,
                cantidadPendientes: 0,
                montoPendiente: 0,
                adelantosPendientes: []
            };
        }
    }

    
    validarAnticiposCliente(idCliente) {
        try {
            const anticipos = JSON.parse(localStorage.getItem(this.storageKeys.anticipos)) || [];
            const anticiposCliente = anticipos.filter(a => a.idCliente == idCliente);
            
            const disponibles = anticiposCliente.filter(a => a.montoAnticipo > 0);
            const totalDisponible = disponibles.reduce((sum, a) => sum + a.montoAnticipo, 0);
            
            return {
                tieneAnticiposDisponibles: disponibles.length > 0,
                cantidadDisponibles: disponibles.length,
                montoDisponible: totalDisponible,
                anticiposDisponibles: disponibles
            };
        } catch (error) {
            console.error("Error al validar anticipos del cliente:", error);
            return {
                tieneAnticiposDisponibles: false,
                cantidadDisponibles: 0,
                montoDisponible: 0,
                anticiposDisponibles: []
            };
        }
    }
}


window.FinanzasIntegracion = new FinanzasIntegracion();


if (typeof module !== 'undefined' && module.exports) {
    module.exports = FinanzasIntegracion;
}

