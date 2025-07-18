class CostosObraManager {
    constructor() {
        this.datos = [];
        this.datosOriginales = [];
        this.tabla = null;
        this.cache = new Map();
        this.obraActual = null; 
        this.filtros = {
            rangoCosto: '',
            cliente: '',
            ordenarPor: 'nombre'
        };
        this.estadisticas = {
            totalObras: 0,
            costoTotal: 0,
            costoPromedio: 0,
            obraMasCostosa: 0
        };
        
        
        if (window.USAR_COSTOS_MANAGER !== false) {
            this.init();
        }
    }

    init() {
        this.cargarEventos();
        this.cargarDatos();
        this.inicializarTabla();
        this.cargarClientes();
    }

    cargarEventos() {
        
        this.debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        };

        
        document.getElementById('filtroRangoCosto').addEventListener('change', 
            this.debounce(() => this.aplicarFiltros(), 300));
        document.getElementById('filtroCliente').addEventListener('change', 
            this.debounce(() => this.aplicarFiltros(), 300));
        document.getElementById('ordenarPor').addEventListener('change', 
            this.debounce(() => this.aplicarFiltros(), 300));

        
        document.getElementById('exportarExcel')?.addEventListener('click', () => this.exportarExcel());
        document.getElementById('exportarPDF')?.addEventListener('click', () => this.exportarPDF());
    }

    async cargarDatos() {
        try {
            this.mostrarLoader();
            
            
            const response = await this.cargarDatosReales();
            this.datos = response.datos;
            this.datosOriginales = [...this.datos];
            
            this.calcularEstadisticas();
            this.actualizarDashboard();
            this.actualizarTabla();
            
            
            await this.cargarClientes();
            
            this.ocultarLoader();
        } catch (error) {
            console.error('Error al cargar datos:', error);
            this.mostrarError('Error al cargar los datos de costos');
            this.ocultarLoader();
        }
    }

    async cargarDatosReales() {
        
        const obras = JSON.parse(localStorage.getItem("obras")) || [];
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        const comprasdetalle = JSON.parse(localStorage.getItem("comprasdetalle")) || [];
        const asignaciones = JSON.parse(localStorage.getItem("asignacionMaterialDetalle")) || [];
        const pagoManoObra = JSON.parse(localStorage.getItem("pagoManoObra")) || [];
        const materiales = JSON.parse(localStorage.getItem("materiales")) || [];

        
        const datosProcessados = obras.map(obra => {
            
            const cliente = clientes.find(c => String(c.idCliente) === String(obra.idCliente));
            const clienteNombre = cliente ? cliente.razonSocial : "Cliente no encontrado";

            
            const materialesObra = asignaciones.filter(a => String(a.idObra) === String(obra.idObra));
            let costoMateriales = 0;
            let detalleMateriales = [];

            materialesObra.forEach(asignacion => {
                
                let precioUnitario = 0;
                const compra = comprasdetalle.find(c => String(c.idmaterial) === String(asignacion.idMaterial));
                if (compra) {
                    precioUnitario = compra.preuni || 0;
                } else {
                    const material = materiales.find(m => String(m.idMaterial) === String(asignacion.idMaterial));
                    precioUnitario = material ? material.precio : 0;
                }

                const subtotal = precioUnitario * asignacion.cantidad;
                costoMateriales += subtotal;

                detalleMateriales.push({
                    desc: asignacion.descripcion || 'Material',
                    cantidad: asignacion.cantidad,
                    precio: precioUnitario,
                    subtotal: subtotal
                });
            });

            
            let costoManoObra = 0;
            let detalleManoObra = [];
            
            if (pagoManoObra.length > 0) {
                const manoObraObra = pagoManoObra.filter(p => String(p.idObra) === String(obra.idObra));
                manoObraObra.forEach(pago => {
                    costoManoObra += Number(pago.monto) || 0;
                    detalleManoObra.push({
                        desc: pago.descripcion || "Mano de Obra",
                        monto: Number(pago.monto) || 0,
                        fecha: pago.fecha || ''
                    });
                });
            }

            
            const otrosCostos = 0;
            const detalleOtros = [];

            
            const total = costoMateriales + costoManoObra + otrosCostos;

            return {
                id: obra.idObra,
                nombre: obra.nombre,
                cliente: clienteNombre,
                clienteId: obra.idCliente,
                materiales: costoMateriales,
                manoObra: costoManoObra,
                otrosCostos: otrosCostos,
                total: total,
                estado: obra.estado || 'En progreso',
                fechaInicio: obra.fechaInicio || '',
                fechaEstimada: obra.fechaFin || '',
                descripcion: obra.descripcion || '',
                detalleMateriales: detalleMateriales,
                detalleManoObra: detalleManoObra,
                detalleOtros: detalleOtros
            };
        });

        return {
            datos: datosProcessados
        };
    }

    async simularCargaDatos() {
        
        return await this.cargarDatosReales();
    }

    inicializarTabla() {
        this.tabla = $('#tablaCostosObra').DataTable({
            language: {
                url: 'dt/es-ES.js'
            },
            responsive: true,
            pageLength: 10,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excel',
                    text: '<i class="bi bi-file-excel"></i> Excel',
                    className: 'btn btn-success btn-sm'
                },
                {
                    extend: 'pdf',
                    text: '<i class="bi bi-file-pdf"></i> PDF',
                    className: 'btn btn-danger btn-sm'
                }
            ],
            columnDefs: [
                {
                    targets: [2, 3, 4, 5], 
                    render: (data, type, row) => {
                        if (type === 'display') {
                            return this.formatearMoneda(data);
                        }
                        return data;
                    }
                },
                {
                    targets: 6, 
                    orderable: false,
                    render: (data, type, row) => {
                        return `<button class="btn btn-info btn-sm btn-detail" 
                                       onclick="mostrarDetalle(${row.id})">
                                    <i class="bi bi-eye"></i> Ver Detalle
                                </button>`;
                    }
                }
            ],
            drawCallback: () => {
                
                $('#tablaCostosObra tbody tr').each((index, row) => {
                    const total = parseFloat($(row).find('td:eq(5)').text().replace(/[₲,]/g, ''));
                    this.aplicarEstiloFila(row, total);
                });
            }
        });
    }

    aplicarEstiloFila(row, total) {
        if (total < 10000000) {
            $(row).addClass('table-success');
        } else if (total < 50000000) {
            $(row).addClass('table-warning');
        } else {
            $(row).addClass('table-danger');
        }
    }

    calcularEstadisticas() {
        const totales = this.datos.reduce((acc, obra) => {
            acc.totalObras++;
            acc.costoTotal += obra.total;
            acc.obraMasCostosa = Math.max(acc.obraMasCostosa, obra.total);
            return acc;
        }, { totalObras: 0, costoTotal: 0, obraMasCostosa: 0 });

        this.estadisticas = {
            ...totales,
            costoPromedio: totales.totalObras > 0 ? totales.costoTotal / totales.totalObras : 0
        };
    }

    actualizarDashboard() {
        const elementos = [
            { id: 'totalObras', valor: this.estadisticas.totalObras },
            { id: 'costoTotal', valor: this.formatearMoneda(this.estadisticas.costoTotal) },
            { id: 'costoPromedio', valor: this.formatearMoneda(this.estadisticas.costoPromedio) },
            { id: 'obraMasCostosa', valor: this.formatearMoneda(this.estadisticas.obraMasCostosa) }
        ];

        elementos.forEach(elemento => {
            const el = document.getElementById(elemento.id);
            if (el) {
                this.animarContador(el, elemento.valor);
            }
        });
    }

    animarContador(elemento, valorFinal) {
        const isNumeric = typeof valorFinal === 'number';
        const valorInicial = isNumeric ? 0 : '₲ 0';
        const duracion = 1000;
        const pasos = 60;
        const incremento = isNumeric ? valorFinal / pasos : 0;
        
        let valorActual = 0;
        const intervalo = setInterval(() => {
            valorActual += incremento;
            if (valorActual >= (isNumeric ? valorFinal : pasos)) {
                clearInterval(intervalo);
                elemento.textContent = valorFinal;
            } else {
                elemento.textContent = isNumeric ? Math.round(valorActual) : this.formatearMoneda(valorActual);
            }
        }, duracion / pasos);
    }

    actualizarTabla() {
        console.log('📊 Actualizando tabla...');
        console.log('📊 Tabla existe:', !!this.tabla);
        console.log('📊 Datos para tabla:', this.datos.length);
        
        if (this.tabla) {
            this.tabla.clear();
            this.datos.forEach(obra => {
                this.tabla.row.add([
                    obra.nombre,
                    obra.cliente,
                    obra.materiales,
                    obra.manoObra,
                    obra.otrosCostos,
                    obra.total,
                    obra.id
                ]);
            });
            this.tabla.draw();
            console.log('✅ Tabla actualizada');
        } else {
            console.log('❌ Tabla no existe');
        }
    }

    async cargarClientes() {
        try {
            
            const clientesUnicos = [...new Set(this.datos.map(obra => obra.cliente))];
            const select = document.getElementById('filtroCliente');
            
            
            while (select.children.length > 1) {
                select.removeChild(select.lastChild);
            }
            
            
            clientesUnicos.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente;
                option.textContent = cliente;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        }
    }

    aplicarFiltros() {
        console.log('🔍 Aplicando filtros...');
        
        this.filtros.rangoCosto = document.getElementById('filtroRangoCosto').value;
        this.filtros.cliente = document.getElementById('filtroCliente').value;
        this.filtros.ordenarPor = document.getElementById('ordenarPor').value;

        console.log('📋 Filtros aplicados:', this.filtros);
        console.log('📊 Datos originales:', this.datosOriginales.length);

        let datosFiltrados = [...this.datosOriginales];

        
        if (this.filtros.rangoCosto) {
            datosFiltrados = datosFiltrados.filter(obra => {
                switch (this.filtros.rangoCosto) {
                    case 'bajo':
                        return obra.total < 10000000;
                    case 'medio':
                        return obra.total >= 10000000 && obra.total <= 50000000;
                    case 'alto':
                        return obra.total > 50000000;
                    default:
                        return true;
                }
            });
            console.log('💰 Después de filtro de costo:', datosFiltrados.length);
        }

        
        if (this.filtros.cliente) {
            datosFiltrados = datosFiltrados.filter(obra => obra.cliente === this.filtros.cliente);
            console.log('👤 Después de filtro de cliente:', datosFiltrados.length);
        }

        
        datosFiltrados.sort((a, b) => {
            switch (this.filtros.ordenarPor) {
                case 'nombre':
                    return a.nombre.localeCompare(b.nombre);
                case 'costo_desc':
                    return b.total - a.total;
                case 'costo_asc':
                    return a.total - b.total;
                case 'cliente':
                    return a.cliente.localeCompare(b.cliente);
                default:
                    return 0;
            }
        });

        console.log('📈 Después de ordenar:', datosFiltrados.length);

        this.datos = datosFiltrados;
        this.calcularEstadisticas();
        this.actualizarDashboard();
        this.actualizarTabla();
        
        console.log('✅ Filtros aplicados exitosamente');
    }

    mostrarDetalle(obraId) {
        console.log('🔍 Buscando obra con ID:', obraId);
        console.log('🔍 Datos originales disponibles:', this.datosOriginales.length);
        console.log('🔍 Primer dato:', this.datosOriginales[0]);
        
        
        let obra = this.datosOriginales.find(o => o.id === obraId);
        
        if (!obra) {
            
            obra = this.datosOriginales.find(o => String(o.id) === String(obraId));
        }
        
        if (!obra) {
            
            obra = this.datosOriginales.find(o => o.idObra === obraId);
        }
        
        if (!obra) {
            
            obra = this.datosOriginales.find(o => String(o.idObra) === String(obraId));
        }
        
        console.log('🔍 Obra encontrada:', obra);
        
        if (!obra) {
            console.log('❌ No se encontró la obra');
            alertify.error("No se encontraron detalles para esta obra.");
            return;
        }

        
        this.obraActual = obra;

        
        document.getElementById('infoGeneral').innerHTML = `
            <p><strong>Nombre:</strong> ${obra.nombre}</p>
            <p><strong>Cliente:</strong> ${obra.cliente}</p>
            <p><strong>Estado:</strong> <span class="badge bg-primary">${obra.estado}</span></p>
            <p><strong>Fecha Inicio:</strong> ${this.formatearFecha(obra.fechaInicio)}</p>
            <p><strong>Fecha Estimada:</strong> ${this.formatearFecha(obra.fechaEstimada)}</p>
            <p><strong>Descripción:</strong> ${obra.descripcion || 'Sin descripción'}</p>
        `;

        
        const total = obra.total;
        const porcentajeMateriales = total > 0 ? (obra.materiales / total * 100).toFixed(1) : 0;
        const porcentajeManoObra = total > 0 ? (obra.manoObra / total * 100).toFixed(1) : 0;
        const porcentajeOtros = total > 0 ? (obra.otrosCostos / total * 100).toFixed(1) : 0;

        document.getElementById('analisisCostos').innerHTML = `
            <div class="mb-3">
                <small class="text-muted">Materiales (${porcentajeMateriales}%)</small>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-success" style="width: ${porcentajeMateriales}%">
                        ${this.formatearMoneda(obra.materiales)}
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <small class="text-muted">Mano de Obra (${porcentajeManoObra}%)</small>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-warning" style="width: ${porcentajeManoObra}%">
                        ${this.formatearMoneda(obra.manoObra)}
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <small class="text-muted">Otros Costos (${porcentajeOtros}%)</small>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-info" style="width: ${porcentajeOtros}%">
                        ${this.formatearMoneda(obra.otrosCostos)}
                    </div>
                </div>
            </div>
            <div class="alert alert-success mt-3">
                <strong>Total General: ${this.formatearMoneda(total)}</strong>
            </div>
        `;

        
        let htmlMateriales = '';
        if (obra.detalleMateriales && obra.detalleMateriales.length > 0) {
            htmlMateriales = obra.detalleMateriales.map(m => `
                <tr>
                    <td>${m.desc}</td>
                    <td>${m.cantidad}</td>
                    <td>${this.formatearMoneda(m.precio)}</td>
                    <td>${this.formatearMoneda(m.subtotal)}</td>
                </tr>
            `).join('');
            htmlMateriales += `
                <tr class="table-success">
                    <td colspan="3" class="text-end fw-bold">Total Materiales</td>
                    <td class="fw-bold">${this.formatearMoneda(obra.materiales)}</td>
                </tr>
            `;
        } else {
            htmlMateriales = '<tr><td colspan="4" class="text-center">Sin materiales asignados</td></tr>';
        }
        document.getElementById('tablaMateriales').innerHTML = htmlMateriales;

        
        let htmlManoObra = '';
        if (obra.detalleManoObra && obra.detalleManoObra.length > 0) {
            htmlManoObra = obra.detalleManoObra.map(m => `
                <tr>
                    <td>${m.desc}</td>
                    <td>1</td>
                    <td>${this.formatearMoneda(m.monto)}</td>
                    <td>${this.formatearMoneda(m.monto)}</td>
                </tr>
            `).join('');
            htmlManoObra += `
                <tr class="table-warning">
                    <td colspan="3" class="text-end fw-bold">Total Mano de Obra</td>
                    <td class="fw-bold">${this.formatearMoneda(obra.manoObra)}</td>
                </tr>
            `;
        } else {
            htmlManoObra = '<tr><td colspan="4" class="text-center">Sin datos de mano de obra</td></tr>';
        }
        document.getElementById('tablaManoObra').innerHTML = htmlManoObra;

        
        let htmlOtros = '';
        if (obra.detalleOtros && obra.detalleOtros.length > 0) {
            htmlOtros = obra.detalleOtros.map(m => `
                <tr>
                    <td>${m.desc}</td>
                    <td>${m.fecha || 'N/A'}</td>
                    <td>${this.formatearMoneda(m.monto)}</td>
                </tr>
            `).join('');
            htmlOtros += `
                <tr class="table-info">
                    <td colspan="2" class="text-end fw-bold">Total Otros Costos</td>
                    <td class="fw-bold">${this.formatearMoneda(obra.otrosCostos)}</td>
                </tr>
            `;
        } else {
            htmlOtros = '<tr><td colspan="3" class="text-center">Sin otros gastos</td></tr>';
        }
        document.getElementById('tablaOtros').innerHTML = htmlOtros;

        
        this.crearGraficoDistribucion(obra);

        
        const modal = new bootstrap.Modal(document.getElementById('modalDetalleObra'));
        modal.show();
    }

    crearGraficoDistribucion(obra) {
        const contenedor = document.getElementById('graficoDistribucion');
        contenedor.innerHTML = ''; 

        const total = obra.total;
        if (total > 0) {
            const porcentajes = {
                materiales: ((obra.materiales / total) * 100).toFixed(1),
                manoObra: ((obra.manoObra / total) * 100).toFixed(1),
                otros: ((obra.otrosCostos / total) * 100).toFixed(1)
            };

            
            contenedor.innerHTML = `
                <div class="chart-fallback">
                    <div class="chart-item">
                        <div class="chart-color" style="background-color: #28a745;"></div>
                        <span>Materiales: ${porcentajes.materiales}% (${this.formatearMoneda(obra.materiales)})</span>
                    </div>
                    <div class="chart-item">
                        <div class="chart-color" style="background-color: #ffc107;"></div>
                        <span>Mano de Obra: ${porcentajes.manoObra}% (${this.formatearMoneda(obra.manoObra)})</span>
                    </div>
                    <div class="chart-item">
                        <div class="chart-color" style="background-color: #17a2b8;"></div>
                        <span>Otros: ${porcentajes.otros}% (${this.formatearMoneda(obra.otrosCostos)})</span>
                    </div>
                </div>
            `;
        } else {
            contenedor.innerHTML = '<p class="text-muted">No hay datos para mostrar</p>';
        }
    }

    formatearMoneda(valor) {
        if (valor === null || valor === undefined || isNaN(valor)) return '₲ 0';
        
        return '₲ ' + new Intl.NumberFormat('es-PY', {
            style: 'decimal',
            maximumFractionDigits: 0
        }).format(valor);
    }

    formatearFecha(fecha) {
        return new Date(fecha).toLocaleDateString('es-PY');
    }

    mostrarLoader() {
        
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loader);
    }

    ocultarLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.remove();
        }
    }

    mostrarError(mensaje) {
        alertify.error(mensaje);
    }

    exportarExcel() {
        if (this.tabla) {
            this.tabla.button('.buttons-excel').trigger();
        }
    }

    exportarPDF() {
        if (this.tabla) {
            this.tabla.button('.buttons-pdf').trigger();
        }
    }

    exportarDetalle() {
        console.log('Exportando detalle...');
        
        if (!this.obraActual) {
            alertify.error("No hay obra seleccionada para exportar.");
            return;
        }

        const obra = this.obraActual;
        
        
        const modalExport = document.createElement('div');
        modalExport.className = 'modal fade';
        modalExport.id = 'modalExportOptions';
        modalExport.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="bi bi-download me-2"></i>Exportar Detalle de Obra
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6 class="mb-3">Obra: ${obra.nombre}</h6>
                        <p class="text-muted mb-4">Selecciona el formato de exportación:</p>
                        <div class="d-grid gap-3">
                            <button class="btn btn-danger btn-lg" onclick="window.costosManager.exportarDetallePDF()">
                                <i class="bi bi-file-pdf me-2"></i>
                                <div>
                                    <div class="fw-bold">Exportar a PDF</div>
                                    <small class="text-muted">Documento completo con gráficos</small>
                                </div>
                            </button>
                            <button class="btn btn-info btn-lg" onclick="window.costosManager.exportarDetallePrint()">
                                <i class="bi bi-printer me-2"></i>
                                <div>
                                    <div class="fw-bold">Imprimir</div>
                                    <small class="text-muted">Enviar a impresora</small>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-1"></i>Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        
        document.body.appendChild(modalExport);
        
        
        const modal = new bootstrap.Modal(modalExport);
        modal.show();
        
        
        modalExport.addEventListener('hidden.bs.modal', function () {
            modalExport.remove();
        });
    }

    exportarDetalleExcel() {
        if (!this.obraActual) {
            alertify.error("No hay obra seleccionada para exportar.");
            return;
        }

        const obra = this.obraActual;
        
        try {
            
            const datosExcel = [];
            
            
            datosExcel.push(['DETALLE DE COSTOS DE OBRA - ' + obra.nombre]);
            datosExcel.push(['']);
            datosExcel.push(['Información General']);
            datosExcel.push(['Nombre:', obra.nombre]);
            datosExcel.push(['Cliente:', obra.cliente]);
            datosExcel.push(['Estado:', obra.estado]);
            datosExcel.push(['Fecha Inicio:', this.formatearFecha(obra.fechaInicio)]);
            datosExcel.push(['Fecha Estimada:', this.formatearFecha(obra.fechaEstimada)]);
            datosExcel.push(['Descripción:', obra.descripcion || 'Sin descripción']);
            datosExcel.push(['']);
            
            
            datosExcel.push(['Resumen de Costos']);
            datosExcel.push(['Materiales:', this.formatearMoneda(obra.materiales)]);
            datosExcel.push(['Mano de Obra:', this.formatearMoneda(obra.manoObra)]);
            datosExcel.push(['Otros Costos:', this.formatearMoneda(obra.otrosCostos)]);
            datosExcel.push(['TOTAL:', this.formatearMoneda(obra.total)]);
            datosExcel.push(['']);
            
            
            if (obra.detalleMateriales && obra.detalleMateriales.length > 0) {
                datosExcel.push(['Detalle de Materiales']);
                datosExcel.push(['Material', 'Cantidad', 'Precio Unitario', 'Subtotal']);
                obra.detalleMateriales.forEach(m => {
                    datosExcel.push([m.desc, m.cantidad, m.precio, m.subtotal]);
                });
                datosExcel.push(['TOTAL MATERIALES', '', '', obra.materiales]);
                datosExcel.push(['']);
            }
            
            
            if (obra.detalleManoObra && obra.detalleManoObra.length > 0) {
                datosExcel.push(['Detalle de Mano de Obra']);
                datosExcel.push(['Descripción', 'Cantidad', 'Precio Unitario', 'Subtotal']);
                obra.detalleManoObra.forEach(m => {
                    datosExcel.push([m.desc, 1, m.monto, m.monto]);
                });
                datosExcel.push(['TOTAL MANO DE OBRA', '', '', obra.manoObra]);
                datosExcel.push(['']);
            }
            
            
            if (obra.detalleOtros && obra.detalleOtros.length > 0) {
                datosExcel.push(['Otros Costos']);
                datosExcel.push(['Descripción', 'Fecha', 'Monto']);
                obra.detalleOtros.forEach(o => {
                    datosExcel.push([o.desc, o.fecha || 'N/A', o.monto]);
                });
                datosExcel.push(['TOTAL OTROS COSTOS', '', obra.otrosCostos]);
            }
            
            
            let csvContent = "data:text/csv;charset=utf-8,";
            datosExcel.forEach(row => {
                csvContent += row.join(",") + "\r\n";
            });
            
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            const nombreArchivo = `detalle_obra_${obra.nombre.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
            link.setAttribute("download", nombreArchivo);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalExportOptions'));
            if (modal) modal.hide();
            
            alertify.success("Archivo exportado exitosamente");
            
        } catch (error) {
            console.error('Error al exportar Excel:', error);
            alertify.error("Error al exportar el archivo: " + error.message);
        }
    }

    exportarDetallePDF() {
        if (!this.obraActual) {
            alertify.error("No hay obra seleccionada para exportar.");
            return;
        }

        const obra = this.obraActual;
        
        try {
            
            const docDefinition = {
                pageSize: 'A4',
                pageMargins: [40, 60, 40, 60],
                
                content: [
                    
                    {
                        text: '2A CONSTRUCTORA',
                        style: 'header',
                        alignment: 'center',
                        margin: [0, 0, 0, 10]
                    },
                    {
                        text: 'DETALLE DE COSTOS DE OBRA',
                        style: 'subheader',
                        alignment: 'center',
                        margin: [0, 0, 0, 20]
                    },
                    {
                        text: obra.nombre,
                        style: 'title',
                        alignment: 'center',
                        margin: [0, 0, 0, 20]
                    },
                    
                    
                    {
                        text: 'INFORMACIÓN GENERAL',
                        style: 'sectionHeader',
                        margin: [0, 20, 0, 10]
                    },
                    {
                        columns: [
                            {
                                width: '50%',
                                stack: [
                                    { text: `Cliente: ${obra.cliente}`, margin: [0, 5] },
                                    { text: `Estado: ${obra.estado}`, margin: [0, 5] },
                                    { text: `Fecha Inicio: ${this.formatearFecha(obra.fechaInicio)}`, margin: [0, 5] }
                                ]
                            },
                            {
                                width: '50%',
                                stack: [
                                    { text: `Fecha Estimada: ${this.formatearFecha(obra.fechaEstimada)}`, margin: [0, 5] },
                                    { text: `Descripción: ${obra.descripcion || 'Sin descripción'}`, margin: [0, 5] }
                                ]
                            }
                        ]
                    },
                    
                    
                    {
                        text: 'RESUMEN DE COSTOS',
                        style: 'sectionHeader',
                        margin: [0, 20, 0, 10]
                    },
                    {
                        table: {
                            widths: ['*', 'auto'],
                            body: [
                                [{ text: 'Concepto', style: 'tableHeader' }, { text: 'Monto', style: 'tableHeader' }],
                                ['Materiales', this.formatearMoneda(obra.materiales)],
                                ['Mano de Obra', this.formatearMoneda(obra.manoObra)],
                                ['Otros Costos', this.formatearMoneda(obra.otrosCostos)],
                                [{ text: 'TOTAL', style: 'tableTotal' }, { text: this.formatearMoneda(obra.total), style: 'tableTotal' }]
                            ]
                        },
                        layout: {
                            fillColor: function(rowIndex) {
                                return (rowIndex === 0) ? '#f0f0f0' : null;
                            }
                        }
                    }
                ],
                
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        color: '#333'
                    },
                    subheader: {
                        fontSize: 14,
                        bold: true,
                        color: '#666'
                    },
                    title: {
                        fontSize: 16,
                        bold: true,
                        color: '#000'
                    },
                    sectionHeader: {
                        fontSize: 12,
                        bold: true,
                        color: '#333',
                        decoration: 'underline'
                    },
                    tableHeader: {
                        bold: true,
                        fillColor: '#f0f0f0'
                    },
                    tableTotal: {
                        bold: true,
                        fillColor: '#e0e0e0'
                    }
                }
            };

            
            if (obra.detalleMateriales && obra.detalleMateriales.length > 0) {
                docDefinition.content.push(
                    {
                        text: 'DETALLE DE MATERIALES',
                        style: 'sectionHeader',
                        margin: [0, 20, 0, 10],
                        pageBreak: 'before'
                    },
                    {
                        table: {
                            widths: ['*', 'auto', 'auto', 'auto'],
                            body: [
                                [
                                    { text: 'Material', style: 'tableHeader' },
                                    { text: 'Cantidad', style: 'tableHeader' },
                                    { text: 'Precio Unit.', style: 'tableHeader' },
                                    { text: 'Subtotal', style: 'tableHeader' }
                                ],
                                ...obra.detalleMateriales.map(m => [
                                    m.desc,
                                    m.cantidad.toString(),
                                    this.formatearMoneda(m.precio),
                                    this.formatearMoneda(m.subtotal)
                                ]),
                                [
                                    { text: 'TOTAL MATERIALES', style: 'tableTotal', colSpan: 3 },
                                    {},
                                    {},
                                    { text: this.formatearMoneda(obra.materiales), style: 'tableTotal' }
                                ]
                            ]
                        },
                        layout: {
                            fillColor: function(rowIndex) {
                                return (rowIndex === 0) ? '#f0f0f0' : null;
                            }
                        }
                    }
                );
            }

            
            if (obra.detalleManoObra && obra.detalleManoObra.length > 0) {
                docDefinition.content.push(
                    {
                        text: 'DETALLE DE MANO DE OBRA',
                        style: 'sectionHeader',
                        margin: [0, 20, 0, 10]
                    },
                    {
                        table: {
                            widths: ['*', 'auto', 'auto', 'auto'],
                            body: [
                                [
                                    { text: 'Descripción', style: 'tableHeader' },
                                    { text: 'Cantidad', style: 'tableHeader' },
                                    { text: 'Precio Unit.', style: 'tableHeader' },
                                    { text: 'Subtotal', style: 'tableHeader' }
                                ],
                                ...obra.detalleManoObra.map(m => [
                                    m.desc,
                                    '1',
                                    this.formatearMoneda(m.monto),
                                    this.formatearMoneda(m.monto)
                                ]),
                                [
                                    { text: 'TOTAL MANO DE OBRA', style: 'tableTotal', colSpan: 3 },
                                    {},
                                    {},
                                    { text: this.formatearMoneda(obra.manoObra), style: 'tableTotal' }
                                ]
                            ]
                        },
                        layout: {
                            fillColor: function(rowIndex) {
                                return (rowIndex === 0) ? '#f0f0f0' : null;
                            }
                        }
                    }
                );
            }

            
            if (obra.detalleOtros && obra.detalleOtros.length > 0) {
                docDefinition.content.push(
                    {
                        text: 'OTROS COSTOS',
                        style: 'sectionHeader',
                        margin: [0, 20, 0, 10]
                    },
                    {
                        table: {
                            widths: ['*', 'auto', 'auto'],
                            body: [
                                [
                                    { text: 'Descripción', style: 'tableHeader' },
                                    { text: 'Fecha', style: 'tableHeader' },
                                    { text: 'Monto', style: 'tableHeader' }
                                ],
                                ...obra.detalleOtros.map(o => [
                                    o.desc,
                                    o.fecha || 'N/A',
                                    this.formatearMoneda(o.monto)
                                ]),
                                [
                                    { text: 'TOTAL OTROS COSTOS', style: 'tableTotal', colSpan: 2 },
                                    {},
                                    { text: this.formatearMoneda(obra.otrosCostos), style: 'tableTotal' }
                                ]
                            ]
                        },
                        layout: {
                            fillColor: function(rowIndex) {
                                return (rowIndex === 0) ? '#f0f0f0' : null;
                            }
                        }
                    }
                );
            }

            
            docDefinition.content.push(
                {
                    text: `Generado el: ${new Date().toLocaleDateString('es-PY')} a las ${new Date().toLocaleTimeString('es-PY')}`,
                    style: 'footer',
                    margin: [0, 30, 0, 0],
                    alignment: 'center'
                }
            );

            
            docDefinition.styles.footer = {
                fontSize: 10,
                color: '#666',
                italics: true
            };

            
            const nombreArchivo = `detalle_obra_${obra.nombre.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
            
            pdfMake.createPdf(docDefinition).download(nombreArchivo);

            
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalExportOptions'));
            if (modal) modal.hide();

            alertify.success("PDF generado exitosamente");

        } catch (error) {
            console.error('Error al generar PDF:', error);
            alertify.error("Error al generar el PDF: " + error.message);
        }
    }

    exportarDetallePrint() {
        if (!this.obraActual) {
            alertify.error("No hay obra seleccionada para exportar.");
            return;
        }

        const obra = this.obraActual;
        
        
        const contenidoHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Detalle de Obra - ${obra.nombre}</title>
                <style>
                    @page { 
                        size: A4; 
                        margin: 2cm; 
                    }
                    body { 
                        font-family: Arial, sans-serif; 
                        font-size: 12px;
                        line-height: 1.4;
                        color: #333;
                    }
                    .header { 
                        text-align: center; 
                        margin-bottom: 30px; 
                        border-bottom: 2px solid #333;
                        padding-bottom: 10px;
                    }
                    .header h1 { 
                        margin: 0;
                        font-size: 18px;
                        color: #333;
                    }
                    .header h2 { 
                        margin: 5px 0;
                        font-size: 16px;
                        color: #666;
                    }
                    .section { 
                        margin-bottom: 25px; 
                        page-break-inside: avoid;
                    }
                    .section h3 { 
                        color: #333; 
                        border-bottom: 1px solid #ddd; 
                        padding-bottom: 5px;
                        margin-bottom: 15px;
                        font-size: 14px;
                    }
                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin-top: 10px;
                        font-size: 11px;
                    }
                    th, td { 
                        border: 1px solid #ddd; 
                        padding: 6px; 
                        text-align: left; 
                    }
                    th { 
                        background-color: #f8f9fa; 
                        font-weight: bold;
                    }
                    .total-row { 
                        background-color: #e9ecef; 
                        font-weight: bold; 
                    }
                    .info-grid { 
                        display: grid; 
                        grid-template-columns: 1fr 1fr; 
                        gap: 15px; 
                        margin-bottom: 15px;
                    }
                    .info-item { 
                        padding: 3px 0; 
                    }
                    .info-label { 
                        font-weight: bold; 
                        color: #555;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        font-size: 10px;
                        color: #666;
                        border-top: 1px solid #ddd;
                        padding-top: 10px;
                    }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>2A CONSTRUCTORA</h1>
                    <h2>DETALLE DE COSTOS DE OBRA</h2>
                    <h2>${obra.nombre}</h2>
                </div>
                
                <div class="section">
                    <h3>Información General</h3>
                    <div class="info-grid">
                        <div>
                            <div class="info-item">
                                <span class="info-label">Cliente:</span> ${obra.cliente}
                            </div>
                            <div class="info-item">
                                <span class="info-label">Estado:</span> ${obra.estado}
                            </div>
                            <div class="info-item">
                                <span class="info-label">Fecha Inicio:</span> ${this.formatearFecha(obra.fechaInicio)}
                            </div>
                        </div>
                        <div>
                            <div class="info-item">
                                <span class="info-label">Fecha Estimada:</span> ${this.formatearFecha(obra.fechaEstimada)}
                            </div>
                            <div class="info-item">
                                <span class="info-label">Descripción:</span> ${obra.descripcion || 'Sin descripción'}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h3>Resumen de Costos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Concepto</th>
                                <th style="text-align: right;">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Materiales</td>
                                <td style="text-align: right;">${this.formatearMoneda(obra.materiales)}</td>
                            </tr>
                            <tr>
                                <td>Mano de Obra</td>
                                <td style="text-align: right;">${this.formatearMoneda(obra.manoObra)}</td>
                            </tr>
                            <tr>
                                <td>Otros Costos</td>
                                <td style="text-align: right;">${this.formatearMoneda(obra.otrosCostos)}</td>
                            </tr>
                            <tr class="total-row">
                                <td><strong>TOTAL</strong></td>
                                <td style="text-align: right;"><strong>${this.formatearMoneda(obra.total)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                ${obra.detalleMateriales && obra.detalleMateriales.length > 0 ? `
                <div class="section">
                    <h3>Detalle de Materiales</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th style="text-align: center;">Cantidad</th>
                                <th style="text-align: right;">Precio Unitario</th>
                                <th style="text-align: right;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${obra.detalleMateriales.map(m => `
                                <tr>
                                    <td>${m.desc}</td>
                                    <td style="text-align: center;">${m.cantidad}</td>
                                    <td style="text-align: right;">${this.formatearMoneda(m.precio)}</td>
                                    <td style="text-align: right;">${this.formatearMoneda(m.subtotal)}</td>
                                </tr>
                            `).join('')}
                            <tr class="total-row">
                                <td colspan="3"><strong>TOTAL MATERIALES</strong></td>
                                <td style="text-align: right;"><strong>${this.formatearMoneda(obra.materiales)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                ` : ''}
                
                ${obra.detalleManoObra && obra.detalleManoObra.length > 0 ? `
                <div class="section">
                    <h3>Detalle de Mano de Obra</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th style="text-align: center;">Cantidad</th>
                                <th style="text-align: right;">Precio Unitario</th>
                                <th style="text-align: right;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${obra.detalleManoObra.map(m => `
                                <tr>
                                    <td>${m.desc}</td>
                                    <td style="text-align: center;">1</td>
                                    <td style="text-align: right;">${this.formatearMoneda(m.monto)}</td>
                                    <td style="text-align: right;">${this.formatearMoneda(m.monto)}</td>
                                </tr>
                            `).join('')}
                            <tr class="total-row">
                                <td colspan="3"><strong>TOTAL MANO DE OBRA</strong></td>
                                <td style="text-align: right;"><strong>${this.formatearMoneda(obra.manoObra)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                ` : ''}
                
                ${obra.detalleOtros && obra.detalleOtros.length > 0 ? `
                <div class="section">
                    <h3>Otros Costos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th style="text-align: center;">Fecha</th>
                                <th style="text-align: right;">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${obra.detalleOtros.map(o => `
                                <tr>
                                    <td>${o.desc}</td>
                                    <td style="text-align: center;">${o.fecha || 'N/A'}</td>
                                    <td style="text-align: right;">${this.formatearMoneda(o.monto)}</td>
                                </tr>
                            `).join('')}
                            <tr class="total-row">
                                <td colspan="2"><strong>TOTAL OTROS COSTOS</strong></td>
                                <td style="text-align: right;"><strong>${this.formatearMoneda(obra.otrosCostos)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                ` : ''}
                
                <div class="footer">
                    <p>Generado el: ${new Date().toLocaleDateString('es-PY')} a las ${new Date().toLocaleTimeString('es-PY')}</p>
                    <p>2A Constructora - Sistema de Gestión de Costos</p>
                </div>
            </body>
            </html>
        `;
        
        try {
            
            const ventanaImpresion = window.open('', '_blank', 'width=800,height=600');
            ventanaImpresion.document.write(contenidoHTML);
            ventanaImpresion.document.close();
            
            
            ventanaImpresion.onload = function() {
                setTimeout(() => {
                    ventanaImpresion.print();
                    
                    ventanaImpresion.onafterprint = function() {
                        ventanaImpresion.close();
                    };
                }, 500);
            };
            
            
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalExportOptions'));
            if (modal) modal.hide();
            
            alertify.success("Preparando documento para impresión...");
            
        } catch (error) {
            console.error('Error al imprimir:', error);
            alertify.error("Error al preparar la impresión: " + error.message);
        }
    }
}





function aplicarFiltros() {
    console.log('🔧 Función global aplicarFiltros llamada');
    console.log('🔧 window.costosManager existe:', !!window.costosManager);
    if (window.costosManager) {
        console.log('🔧 Llamando a costosManager.aplicarFiltros()');
        window.costosManager.aplicarFiltros();
    } else {
        console.log('❌ costosManager no existe');
    }
}

function exportarExcel() {
    console.log('🔧 Función global exportarExcel llamada');
    if (window.costosManager) {
        window.costosManager.exportarExcel();
    } else {
        console.log('❌ costosManager no existe');
    }
}

function exportarPDF() {
    console.log('🔧 Función global exportarPDF llamada');
    if (window.costosManager) {
        window.costosManager.exportarPDF();
    } else {
        console.log('❌ costosManager no existe');
    }
}

function exportarDetalle() {
    console.log('🔧 Función global exportarDetalle llamada');
    if (window.costosManager) {
        window.costosManager.exportarDetalle();
    } else {
        console.log('❌ costosManager no existe');
        
        if (typeof window.exportarDetalleOriginal === 'function') {
            window.exportarDetalleOriginal();
        } else {
            alertify.error("No hay función de exportación disponible");
        }
    }
}

function mostrarDetalle(obraId) {
    console.log('🔧 Función global mostrarDetalle llamada con ID:', obraId);
    if (window.costosManager) {
        window.costosManager.mostrarDetalle(obraId);
    } else {
        console.log('❌ costosManager no existe');
    }
}

