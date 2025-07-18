class MantenimientoFacturasManager {
    constructor() {
        this.facturaSeleccionada = null;
        this.datosFactura = null;
        this.articulosFactura = [];
        this.inicializarEventos();
    }

    inicializarEventos() {
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.configurarEventos();
            });
        } else {
            this.configurarEventos();
        }
    }
    
    configurarEventos() {
        
        window.exportarDetalle = () => this.mostrarOpcionesExportacion();
        
        
        if (!window.facturaManager) {
            window.facturaManager = this;
        }
    }

    
    establecerFacturaSeleccionada(factura) {
        console.log('Estableciendo factura seleccionada:', factura);
        
        if (!factura) {
            console.error('Factura es null o undefined');
            return;
        }
        
        this.facturaSeleccionada = factura;
        this.datosFactura = factura;
        this.articulosFactura = factura.articulos || [];
        
        console.log('Factura establecida correctamente:', {
            id: this.facturaSeleccionada.id,
            numero: this.facturaSeleccionada.numero,
            articulos: this.articulosFactura.length
        });
    }

    
    verificarEstado() {
        const estado = {
            tieneFactura: !!this.facturaSeleccionada,
            datosFactura: this.facturaSeleccionada,
            cantidadArticulos: this.articulosFactura.length,
            funcionExportarDisponible: typeof window.exportarDetalle === 'function'
        };
        
        console.log('Estado del manager:', estado);
        return estado;
    }

    
    validarDatosFactura() {
        const errores = [];
        const advertencias = [];

        if (!this.facturaSeleccionada) {
            errores.push('No hay factura seleccionada');
            return { valida: false, errores, advertencias };
        }

        
        if (!this.facturaSeleccionada.id && !this.facturaSeleccionada.numero) {
            errores.push('La factura debe tener un ID o número');
        }

        if (!this.facturaSeleccionada.fecha) {
            advertencias.push('Fecha de factura no disponible');
        }

        if (!this.facturaSeleccionada.total && this.facturaSeleccionada.total !== 0) {
            advertencias.push('Total de factura no disponible');
        }

        
        if (!this.articulosFactura || this.articulosFactura.length === 0) {
            advertencias.push('No hay artículos en la factura');
        } else {
            
            this.articulosFactura.forEach((articulo, index) => {
                if (!articulo.descripcion && !articulo.codigo) {
                    advertencias.push(`Artículo ${index + 1}: falta descripción o código`);
                }
            });
        }

        return {
            valida: errores.length === 0,
            errores,
            advertencias
        };
    }
    
    mostrarOpcionesExportacion() {
        console.log('Intentando mostrar opciones de exportación...');
        
        
        this.verificarEstado();
        
        
        if (!this.facturaSeleccionada) {
            console.warn('No hay factura seleccionada, intentando recuperar...');
            
            
            if (window.facturaSeleccionada) {
                console.log('Recuperando factura desde variable global...');
                this.establecerFacturaSeleccionada(window.facturaSeleccionada);
            } else {
                console.error('No se pudo recuperar la factura');
                alertify.error("No hay factura seleccionada para exportar. Por favor, cierre este modal y seleccione una factura nuevamente.");
                return;
            }
        }
        
        
        if (!this.facturaSeleccionada) {
            console.error('Factura sigue sin estar disponible');
            alertify.error("Error: No se pudo cargar la información de la factura. Por favor, intente nuevamente.");
            return;
        }

        
        if (!this.facturaSeleccionada.id && !this.facturaSeleccionada.numero) {
            console.error('Factura no tiene ID ni número válidos');
            alertify.error("Error: La factura seleccionada no tiene información válida.");
            return;
        }

        console.log('Factura encontrada, mostrando modal...', this.facturaSeleccionada.id || this.facturaSeleccionada.numero);

        
        const modalHtml = `
            <div class="modal fade" id="modalExportarDetalle" tabindex="-1" aria-labelledby="modalExportarDetalleLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title" id="modalExportarDetalleLabel">
                                <i class="bi bi-download me-2"></i>Exportar Detalle de Factura
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <div class="card h-100">
                                        <div class="card-body text-center">
                                            <button class="btn btn-success btn-lg w-100 mb-3" onclick="window.facturaManager.exportarDetalleExcel()">
                                                <i class="bi bi-file-earmark-excel display-4 d-block mb-2"></i>
                                                <div class="fw-bold">Exportar a Excel</div>
                                                <small class="text-muted">Archivo Excel (.xlsx)</small>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card h-100">
                                        <div class="card-body text-center">
                                            <button class="btn btn-danger btn-lg w-100 mb-3" onclick="window.facturaManager.exportarDetallePDF()">
                                                <i class="bi bi-file-earmark-pdf display-4 d-block mb-2"></i>
                                                <div class="fw-bold">Exportar a PDF</div>
                                                <small class="text-muted">Documento PDF</small>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card h-100">
                                        <div class="card-body text-center">
                                            <button class="btn btn-info btn-lg w-100 mb-3" onclick="window.facturaManager.exportarDetalleImprimir()">
                                                <i class="bi bi-printer display-4 d-block mb-2"></i>
                                                <div class="fw-bold">Imprimir</div>
                                                <small class="text-muted">Enviar directamente a impresora</small>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        
        const existingModal = document.getElementById('modalExportarDetalle');
        if (existingModal) {
            existingModal.remove();
        }

        
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        
        const modal = new bootstrap.Modal(document.getElementById('modalExportarDetalle'));
        modal.show();
    }

    
    exportarDetalleExcel() {
        if (!this.facturaSeleccionada) {
            alertify.error("No hay factura seleccionada para exportar.");
            return;
        }

        
        const validacion = this.validarDatosFactura();
        if (!validacion.valida) {
            alertify.error(`Error en datos de factura: ${validacion.errores.join(', ')}`);
            return;
        }

        
        if (validacion.advertencias.length > 0) {
            console.warn('Advertencias en exportación:', validacion.advertencias);
        }

        try {
            
            const esFacturaCliente = this.facturaSeleccionada.cliente || !this.facturaSeleccionada.proveedor;
            const tipoFactura = esFacturaCliente ? 'CLIENTE' : 'PROVEEDOR';
            const nombreEntidad = esFacturaCliente ? 
                (this.facturaSeleccionada.cliente || this.facturaSeleccionada.proveedor || '-') : 
                (this.facturaSeleccionada.proveedor || '-');

            
            const wb = XLSX.utils.book_new();
            
            
            const datosFactura = [
                [`DETALLE DE FACTURA DE ${tipoFactura}`],
                [''],
                ['Fecha de Generación:', new Date().toLocaleDateString('es-PY')],
                ['Hora de Generación:', new Date().toLocaleTimeString('es-PY')],
                [''],
                ['INFORMACIÓN DE LA FACTURA'],
                ['ID Factura:', this.facturaSeleccionada.id || '-'],
                ['Fecha:', this.facturaSeleccionada.fecha || '-'],
                ['Número de Factura:', this.facturaSeleccionada.numero || '-'],
                ['Condición:', this.facturaSeleccionada.condicion || '-'],
                [''],
                [`INFORMACIÓN DEL ${tipoFactura}`],
                ['RUC/CI:', this.facturaSeleccionada.ruc || '-'],
                ['Nombre/Razón Social:', nombreEntidad],
                [''],
                ['ARTÍCULOS DE LA FACTURA'],
                ['Item', 'Código', 'Descripción', 'IVA', 'Cantidad', 'Precio Unitario', 'Subtotal']
            ];

            
            this.articulosFactura.forEach((articulo, index) => {
                datosFactura.push([
                    index + 1,
                    articulo.codigo || '-',
                    articulo.descripcion || '-',
                    articulo.iva || '-',
                    articulo.cantidad || 0,
                    this.formatearMoneda(articulo.precio_unitario || 0),
                    this.formatearMoneda(articulo.subtotal || 0)
                ]);
            });

            
            datosFactura.push(['']);
            datosFactura.push(['LIQUIDACIÓN DE IVA']);
            datosFactura.push(['Gravado 5%:', this.formatearMoneda(this.facturaSeleccionada.gravado_5 || 0)]);
            datosFactura.push(['Gravado 10%:', this.formatearMoneda(this.facturaSeleccionada.gravado_10 || 0)]);
            datosFactura.push(['Exento:', this.formatearMoneda(this.facturaSeleccionada.exento || 0)]);
            datosFactura.push(['IVA 5%:', this.formatearMoneda(this.facturaSeleccionada.iva_5 || 0)]);
            datosFactura.push(['IVA 10%:', this.formatearMoneda(this.facturaSeleccionada.iva_10 || 0)]);
            datosFactura.push(['Total IVA:', this.formatearMoneda(this.facturaSeleccionada.total_iva || 0)]);
            datosFactura.push(['']);
            datosFactura.push(['TOTAL FACTURA:', this.formatearMoneda(this.facturaSeleccionada.total || 0)]);
            datosFactura.push(['Estado:', this.facturaSeleccionada.estado || '-']);
            datosFactura.push(['Saldo Pendiente:', this.formatearMoneda(this.facturaSeleccionada.saldo || 0)]);

            
            const ws = XLSX.utils.aoa_to_sheet(datosFactura);
            
            
            const range = XLSX.utils.decode_range(ws['!ref']);
            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cell_address = XLSX.utils.encode_cell({c: C, r: R});
                    if (!ws[cell_address]) continue;
                    
                    
                    if (R === 0 || R === 5 || R === 11 || R === 15) {
                        ws[cell_address].s = {
                            font: { bold: true, sz: 12 },
                            fill: { fgColor: { rgb: "CCCCCC" } }
                        };
                    }
                }
            }

            
            XLSX.utils.book_append_sheet(wb, ws, "Detalle Factura");

            
            const nombreArchivo = `detalle_factura_${this.facturaSeleccionada.numero || this.facturaSeleccionada.id}_${new Date().toISOString().split('T')[0]}.xlsx`;

            
            XLSX.writeFile(wb, nombreArchivo);

            
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalExportarDetalle'));
            if (modal) modal.hide();

            alertify.success("Detalle de factura exportado exitosamente a Excel.");

        } catch (error) {
            console.error('Error al exportar Excel:', error);
            alertify.error("Error al exportar el archivo: " + error.message);
        }
    }

    
    exportarDetallePDF() {
        if (!this.facturaSeleccionada) {
            alertify.error("No hay factura seleccionada para exportar.");
            return;
        }

        
        const validacion = this.validarDatosFactura();
        if (!validacion.valida) {
            alertify.error(`Error en datos de factura: ${validacion.errores.join(', ')}`);
            return;
        }

        try {
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            
            let yPosition = 20;
            const pageWidth = doc.internal.pageSize.width;
            const margin = 20;

            
            const esFacturaCliente = this.facturaSeleccionada.cliente || !this.facturaSeleccionada.proveedor;
            const tipoFactura = esFacturaCliente ? 'CLIENTE' : 'PROVEEDOR';
            const nombreEntidad = esFacturaCliente ? 
                (this.facturaSeleccionada.cliente || this.facturaSeleccionada.proveedor || '-') : 
                (this.facturaSeleccionada.proveedor || '-');

            
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text(`DETALLE DE FACTURA DE ${tipoFactura}`, pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 20;

            
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('INFORMACIÓN DE LA FACTURA', margin, yPosition);
            yPosition += 10;

            doc.setFont(undefined, 'normal');
            doc.text(`ID Factura: ${this.facturaSeleccionada.id || '-'}`, margin, yPosition);
            yPosition += 7;
            doc.text(`Fecha: ${this.facturaSeleccionada.fecha || '-'}`, margin, yPosition);
            yPosition += 7;
            doc.text(`Número de Factura: ${this.facturaSeleccionada.numero || '-'}`, margin, yPosition);
            yPosition += 7;
            doc.text(`Condición: ${this.facturaSeleccionada.condicion || '-'}`, margin, yPosition);
            yPosition += 15;

            
            doc.setFont(undefined, 'bold');
            doc.text(`INFORMACIÓN DEL ${tipoFactura}`, margin, yPosition);
            yPosition += 10;

            doc.setFont(undefined, 'normal');
            doc.text(`RUC/CI: ${this.facturaSeleccionada.ruc || '-'}`, margin, yPosition);
            yPosition += 7;
            doc.text(`Nombre/Razón Social: ${nombreEntidad}`, margin, yPosition);
            yPosition += 15;

            
            doc.setFont(undefined, 'bold');
            doc.text('ARTÍCULOS DE LA FACTURA', margin, yPosition);
            yPosition += 10;

            
            if (this.articulosFactura.length > 0 && doc.autoTable) {
                const headers = ['Item', 'Código', 'Descripción', 'IVA', 'Cantidad', 'Precio Unit.', 'Subtotal'];
                const data = this.articulosFactura.map((articulo, index) => [
                    (index + 1).toString(),
                    articulo.codigo || '-',
                    articulo.descripcion || '-',
                    articulo.iva || '-',
                    articulo.cantidad?.toString() || '0',
                    this.formatearMoneda(articulo.precio_unitario || 0),
                    this.formatearMoneda(articulo.subtotal || 0)
                ]);

                doc.autoTable({
                    head: [headers],
                    body: data,
                    startY: yPosition,
                    theme: 'grid',
                    styles: {
                        fontSize: 8,
                        cellPadding: 2
                    },
                    headStyles: {
                        fillColor: [41, 128, 185],
                        textColor: 255,
                        fontStyle: 'bold'
                    },
                    columnStyles: {
                        0: { halign: 'center', cellWidth: 15 },
                        1: { halign: 'center', cellWidth: 20 },
                        2: { halign: 'left', cellWidth: 40 },
                        3: { halign: 'center', cellWidth: 15 },
                        4: { halign: 'center', cellWidth: 20 },
                        5: { halign: 'right', cellWidth: 25 },
                        6: { halign: 'right', cellWidth: 25 }
                    }
                });

                yPosition = doc.lastAutoTable.finalY + 15;
            } else {
                
                doc.setFont(undefined, 'normal');
                this.articulosFactura.forEach((articulo, index) => {
                    const texto = `${index + 1}. ${articulo.descripcion || '-'} - Cant: ${articulo.cantidad || 0} - ${this.formatearMoneda(articulo.subtotal || 0)}`;
                    doc.text(texto, margin, yPosition);
                    yPosition += 7;
                });
                yPosition += 10;
            }

            
            doc.setFont(undefined, 'bold');
            doc.text('LIQUIDACIÓN DE IVA', margin, yPosition);
            yPosition += 10;

            doc.setFont(undefined, 'normal');
            doc.text(`Gravado 5%: ${this.formatearMoneda(this.facturaSeleccionada.gravado_5 || 0)}`, margin, yPosition);
            yPosition += 7;
            doc.text(`Gravado 10%: ${this.formatearMoneda(this.facturaSeleccionada.gravado_10 || 0)}`, margin, yPosition);
            yPosition += 7;
            doc.text(`Exento: ${this.formatearMoneda(this.facturaSeleccionada.exento || 0)}`, margin, yPosition);
            yPosition += 7;
            doc.text(`IVA 5%: ${this.formatearMoneda(this.facturaSeleccionada.iva_5 || 0)}`, margin, yPosition);
            yPosition += 7;
            doc.text(`IVA 10%: ${this.formatearMoneda(this.facturaSeleccionada.iva_10 || 0)}`, margin, yPosition);
            yPosition += 7;
            doc.text(`Total IVA: ${this.formatearMoneda(this.facturaSeleccionada.total_iva || 0)}`, margin, yPosition);
            yPosition += 15;

            
            doc.setFont(undefined, 'bold');
            doc.setFontSize(14);
            doc.text(`TOTAL FACTURA: ${this.formatearMoneda(this.facturaSeleccionada.total || 0)}`, margin, yPosition);
            yPosition += 10;

            doc.setFontSize(12);
            doc.text(`Estado: ${this.facturaSeleccionada.estado || '-'}`, margin, yPosition);
            yPosition += 7;
            doc.text(`Saldo Pendiente: ${this.formatearMoneda(this.facturaSeleccionada.saldo || 0)}`, margin, yPosition);

            
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.text(`Página ${i} de ${pageCount}`, pageWidth - margin, doc.internal.pageSize.height - 10, { align: 'right' });
                doc.text(`Generado el ${new Date().toLocaleDateString('es-PY')} a las ${new Date().toLocaleTimeString('es-PY')}`, margin, doc.internal.pageSize.height - 10);
            }

            
            const nombreArchivo = `detalle_factura_${this.facturaSeleccionada.numero || this.facturaSeleccionada.id}_${new Date().toISOString().split('T')[0]}.pdf`;

            
            doc.save(nombreArchivo);

            
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalExportarDetalle'));
            if (modal) modal.hide();

            alertify.success("Detalle de factura exportado exitosamente a PDF.");

        } catch (error) {
            console.error('Error al exportar PDF:', error);
            alertify.error("Error al exportar el archivo: " + error.message);
        }
    }

    
    exportarDetalleImprimir() {
        if (!this.facturaSeleccionada) {
            alertify.error("No hay factura seleccionada para exportar.");
            return;
        }

        
        const validacion = this.validarDatosFactura();
        if (!validacion.valida) {
            alertify.error(`Error en datos de factura: ${validacion.errores.join(', ')}`);
            return;
        }

        try {
            
            const esFacturaCliente = this.facturaSeleccionada.cliente || !this.facturaSeleccionada.proveedor;
            const tipoFactura = esFacturaCliente ? 'CLIENTE' : 'PROVEEDOR';
            const nombreEntidad = esFacturaCliente ? 
                (this.facturaSeleccionada.cliente || this.facturaSeleccionada.proveedor || '-') : 
                (this.facturaSeleccionada.proveedor || '-');

            const ventanaImpresion = window.open('', '_blank');
            let htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Detalle de Factura ${this.facturaSeleccionada.numero || this.facturaSeleccionada.id}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .section { margin-bottom: 20px; }
                        .section h3 { background-color: #f0f0f0; padding: 10px; margin: 0; border: 1px solid #ddd; }
                        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        .info-table td { padding: 8px; border: 1px solid #ddd; }
                        .info-table td:first-child { font-weight: bold; background-color: #f9f9f9; width: 30%; }
                        .articles-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        .articles-table th, .articles-table td { padding: 8px; border: 1px solid #ddd; text-align: left; }
                        .articles-table th { background-color: #f0f0f0; font-weight: bold; }
                        .text-right { text-align: right; }
                        .text-center { text-align: center; }
                        .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
                        @media print {
                            body { margin: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>DETALLE DE FACTURA DE ${tipoFactura}</h1>
                        <p>Generado el ${new Date().toLocaleDateString('es-PY')} a las ${new Date().toLocaleTimeString('es-PY')}</p>
                    </div>

                    <div class="section">
                        <h3>INFORMACIÓN DE LA FACTURA</h3>
                        <table class="info-table">
                            <tr><td>ID Factura:</td><td>${this.facturaSeleccionada.id || '-'}</td></tr>
                            <tr><td>Fecha:</td><td>${this.facturaSeleccionada.fecha || '-'}</td></tr>
                            <tr><td>Número de Factura:</td><td>${this.facturaSeleccionada.numero || '-'}</td></tr>
                            <tr><td>Condición:</td><td>${this.facturaSeleccionada.condicion || '-'}</td></tr>
                        </table>
                    </div>

                    <div class="section">
                        <h3>INFORMACIÓN DEL ${tipoFactura}</h3>
                        <table class="info-table">
                            <tr><td>RUC/CI:</td><td>${this.facturaSeleccionada.ruc || '-'}</td></tr>
                            <tr><td>Nombre/Razón Social:</td><td>${nombreEntidad}</td></tr>
                        </table>
                    </div>

                    <div class="section">
                        <h3>ARTÍCULOS DE LA FACTURA</h3>
                        <table class="articles-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>IVA</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            this.articulosFactura.forEach((articulo, index) => {
                htmlContent += `
                    <tr>
                        <td class="text-center">${index + 1}</td>
                        <td>${articulo.codigo || '-'}</td>
                        <td>${articulo.descripcion || '-'}</td>
                        <td class="text-center">${articulo.iva || '-'}</td>
                        <td class="text-center">${articulo.cantidad || 0}</td>
                        <td class="text-right">${this.formatearMoneda(articulo.precio_unitario || 0)}</td>
                        <td class="text-right">${this.formatearMoneda(articulo.subtotal || 0)}</td>
                    </tr>
                `;
            });

            htmlContent += `
                            </tbody>
                        </table>
                    </div>

                    <div class="section">
                        <h3>LIQUIDACIÓN DE IVA</h3>
                        <table class="info-table">
                            <tr><td>Gravado 5%:</td><td class="text-right">${this.formatearMoneda(this.facturaSeleccionada.gravado_5 || 0)}</td></tr>
                            <tr><td>Gravado 10%:</td><td class="text-right">${this.formatearMoneda(this.facturaSeleccionada.gravado_10 || 0)}</td></tr>
                            <tr><td>Exento:</td><td class="text-right">${this.formatearMoneda(this.facturaSeleccionada.exento || 0)}</td></tr>
                            <tr><td>IVA 5%:</td><td class="text-right">${this.formatearMoneda(this.facturaSeleccionada.iva_5 || 0)}</td></tr>
                            <tr><td>IVA 10%:</td><td class="text-right">${this.formatearMoneda(this.facturaSeleccionada.iva_10 || 0)}</td></tr>
                            <tr><td>Total IVA:</td><td class="text-right">${this.formatearMoneda(this.facturaSeleccionada.total_iva || 0)}</td></tr>
                        </table>
                    </div>

                    <div class="section">
                        <div class="total">
                            TOTAL FACTURA: ${this.formatearMoneda(this.facturaSeleccionada.total || 0)}
                        </div>
                        <table class="info-table">
                            <tr><td>Estado:</td><td>${this.facturaSeleccionada.estado || '-'}</td></tr>
                            <tr><td>Saldo Pendiente:</td><td class="text-right">${this.formatearMoneda(this.facturaSeleccionada.saldo || 0)}</td></tr>
                        </table>
                    </div>

                    <div class="no-print" style="text-align: center; margin-top: 30px;">
                        <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; background-color: #007bff; color: white; border: none; cursor: pointer;">Imprimir</button>
                        <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; background-color: #6c757d; color: white; border: none; cursor: pointer; margin-left: 10px;">Cerrar</button>
                    </div>
                </body>
                </html>
            `;

            ventanaImpresion.document.write(htmlContent);
            ventanaImpresion.document.close();

            
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalExportarDetalle'));
            if (modal) modal.hide();

            alertify.success("Ventana de impresión abierta.");

        } catch (error) {
            console.error('Error al imprimir:', error);
            alertify.error("Error al generar la impresión: " + error.message);
        }
    }

    
    formatearMoneda(numero) {
        if (isNaN(numero) || numero === null || numero === undefined) {
            return '₲ 0';
        }
        
        return new Intl.NumberFormat('es-PY', {
            style: 'currency',
            currency: 'PYG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(numero);
    }
}


if (typeof window !== 'undefined') {
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.facturaManager = new MantenimientoFacturasManager();
            console.log('Manager de facturas inicializado correctamente');
        });
    } else {
        window.facturaManager = new MantenimientoFacturasManager();
        console.log('Manager de facturas inicializado correctamente');
    }
} else {
    console.warn('Window no está disponible');
}

