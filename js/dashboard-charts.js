
class DashboardCharts {
    constructor() {
        if (typeof Chart === 'undefined') {
            throw new Error('Chart.js no está disponible. Asegúrate de que esté cargado antes de inicializar DashboardCharts.');
        }
        
        this.charts = {};
        this.config = getDashboardConfig('charts');
    }

    
    createCostosChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) {
            console.error(`Canvas con ID ${canvasId} no encontrado`);
            return null;
        }

        const config = {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Costo Materiales',
                    data: data.costosMateriales,
                    backgroundColor: this.config.colors.info + '80',
                    borderColor: this.config.colors.info,
                    borderWidth: 1,
                    stack: 'Stack 0'
                }, {
                    label: 'Costo Mano de Obra',
                    data: data.costosManoObra,
                    backgroundColor: this.config.colors.warning + '80',
                    borderColor: this.config.colors.warning,
                    borderWidth: 1,
                    stack: 'Stack 0'
                }, {
                    label: 'Otros Costos',
                    data: data.otrosCostos || [],
                    backgroundColor: this.config.colors.danger + '80',
                    borderColor: this.config.colors.danger,
                    borderWidth: 1,
                    stack: 'Stack 0'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('es-PY', {
                                    style: 'currency',
                                    currency: 'PYG',
                                    minimumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribución de Costos por Obra'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${new Intl.NumberFormat('es-PY', {
                                    style: 'currency',
                                    currency: 'PYG',
                                    minimumFractionDigits: 0
                                }).format(context.parsed.y)}`;
                            }
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    
    createEstadoChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) {
            console.error(`Canvas con ID ${canvasId} no encontrado`);
            return null;
        }

        const config = {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.valores,
                    backgroundColor: [
                        this.config.colors.success,
                        this.config.colors.warning,
                        this.config.colors.danger,
                        this.config.colors.info
                    ],
                    borderColor: [
                        this.config.colors.success,
                        this.config.colors.warning,
                        this.config.colors.danger,
                        this.config.colors.info
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Estado de Obras'
                    },
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    
    createProgresoChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) {
            console.error(`Canvas con ID ${canvasId} no encontrado`);
            return null;
        }

        const config = {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Progreso (%)',
                    data: data.progreso,
                    borderColor: this.config.colors.primary,
                    backgroundColor: this.config.colors.primary + '20',
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
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Progreso de Obras'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}%`;
                            }
                        }
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    
    createRentabilidadChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) {
            console.error(`Canvas con ID ${canvasId} no encontrado`);
            return null;
        }

        const config = {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Ingresos',
                    data: data.ingresos,
                    backgroundColor: this.config.colors.success + '80',
                    borderColor: this.config.colors.success,
                    borderWidth: 1
                }, {
                    label: 'Costos',
                    data: data.costos,
                    backgroundColor: this.config.colors.danger + '80',
                    borderColor: this.config.colors.danger,
                    borderWidth: 1
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
                                return new Intl.NumberFormat('es-PY', {
                                    style: 'currency',
                                    currency: 'PYG',
                                    minimumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Análisis de Rentabilidad'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${new Intl.NumberFormat('es-PY', {
                                    style: 'currency',
                                    currency: 'PYG',
                                    minimumFractionDigits: 0
                                }).format(context.parsed.y)}`;
                            }
                        }
                    }
                }
            }
        };

        this.charts[canvasId] = new Chart(ctx, config);
        return this.charts[canvasId];
    }

    
    updateChart(canvasId, newData) {
        const chart = this.charts[canvasId];
        if (!chart) {
            console.error(`Gráfico con ID ${canvasId} no encontrado`);
            return;
        }

        chart.data.labels = newData.labels;
        chart.data.datasets.forEach((dataset, index) => {
            if (newData.datasets && newData.datasets[index]) {
                dataset.data = newData.datasets[index].data;
            }
        });

        chart.update('active');
    }

    
    destroyChart(canvasId) {
        const chart = this.charts[canvasId];
        if (chart) {
            chart.destroy();
            delete this.charts[canvasId];
        }
    }
    destroyAllCharts() {
        Object.keys(this.charts).forEach(canvasId => {
            this.destroyChart(canvasId);
        });
    }
    resizeAllCharts() {
        Object.values(this.charts).forEach(chart => {
            chart.resize();
        });
    }

    
    exportChart(canvasId, format = 'png') {
        const chart = this.charts[canvasId];
        if (!chart) {
            console.error(`Gráfico con ID ${canvasId} no encontrado`);
            return;
        }

        const url = chart.toBase64Image();
        const link = document.createElement('a');
        link.download = `chart-${canvasId}.${format}`;
        link.href = url;
        link.click();
    }

    
    getChart(canvasId) {
        return this.charts[canvasId];
    }

    
    getAllCharts() {
        return this.charts;
    }
}


const dashboardCharts = new DashboardCharts();


if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardCharts;
}

