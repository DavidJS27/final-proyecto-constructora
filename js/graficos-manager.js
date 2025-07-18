
class GraficosManager {
    constructor() {
        this.colores = {
            materiales: '#28a745',
            manoObra: '#ffc107',
            otrosCostos: '#17a2b8',
            primary: '#007bff',
            success: '#28a745',
            warning: '#ffc107',
            danger: '#dc3545',
            info: '#17a2b8'
        };
    }

    crearGraficoDistribucion(datos, containerId) {
        const ctx = document.getElementById(containerId);
        if (!ctx) return null;

        const total = datos.materiales + datos.manoObra + datos.otrosCostos;
        const porcentajes = {
            materiales: ((datos.materiales / total) * 100).toFixed(1),
            manoObra: ((datos.manoObra / total) * 100).toFixed(1),
            otrosCostos: ((datos.otrosCostos / total) * 100).toFixed(1)
        };

        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Materiales', 'Mano de Obra', 'Otros Costos'],
                datasets: [{
                    data: [porcentajes.materiales, porcentajes.manoObra, porcentajes.otrosCostos],
                    backgroundColor: [
                        this.colores.materiales,
                        this.colores.manoObra,
                        this.colores.otrosCostos
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    crearGraficoComparativo(obras, containerId) {
        const ctx = document.getElementById(containerId);
        if (!ctx) return null;

        const labels = obras.map(obra => obra.nombre);
        const datosMateriales = obras.map(obra => obra.materiales);
        const datosManoObra = obras.map(obra => obra.manoObra);
        const datosOtrosCostos = obras.map(obra => obra.otrosCostos);

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Materiales',
                        data: datosMateriales,
                        backgroundColor: this.colores.materiales,
                        borderColor: this.colores.materiales,
                        borderWidth: 1
                    },
                    {
                        label: 'Mano de Obra',
                        data: datosManoObra,
                        backgroundColor: this.colores.manoObra,
                        borderColor: this.colores.manoObra,
                        borderWidth: 1
                    },
                    {
                        label: 'Otros Costos',
                        data: datosOtrosCostos,
                        backgroundColor: this.colores.otrosCostos,
                        borderColor: this.colores.otrosCostos,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₲ ' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ₲ ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    crearGraficoTendencia(datos, containerId) {
        const ctx = document.getElementById(containerId);
        if (!ctx) return null;

        const fechas = datos.map(item => item.fecha);
        const costos = datos.map(item => item.costo);

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: fechas,
                datasets: [{
                    label: 'Costo Total',
                    data: costos,
                    borderColor: this.colores.primary,
                    backgroundColor: this.colores.primary + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₲ ' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Costo: ₲ ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    destruirGrafico(grafico) {
        if (grafico) {
            grafico.destroy();
        }
    }
}


window.GraficosManager = GraficosManager;

