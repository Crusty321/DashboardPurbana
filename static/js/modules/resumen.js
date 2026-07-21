document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // 4. GRÁFICOS CONSOLIDADOS (Resumen de Operaciones)
    // ==========================================
    
    // Gráfico 1: Tickets Semanales
    const ticketsChartEl = document.getElementById('ticketsChart');
    if (ticketsChartEl) {
        const ctx = ticketsChartEl.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
                datasets: [
                    {
                        label: 'Tickets Totales',
                        data: [45, 38, 52, 35],
                        backgroundColor: '#bdc3c7',
                        borderRadius: 4
                    },
                    {
                        label: 'Resueltos 1ra Llamada (FCR)',
                        data: [35, 32, 45, 30],
                        backgroundColor: '#3498db',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Gráfico 2: Distribución de Infraestructura Física
    const infraChartEl = document.getElementById('infraChart');
    if (infraChartEl) {
        const ctx = infraChartEl.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Data Center Principal', 'Racks de Piso', 'Cuarto de Monitoreo CCTV', 'Servidores de Red Local'],
                datasets: [{
                    data: [1, 3, 1, 4], // Quantity counts from the physical inventory section
                    backgroundColor: ['#2c3e50', '#f39c12', '#e74c3c', '#27ae60'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                cutout: '65%'
            }
        });
    }

    // Gráfico 3: Planes de Mejoramiento (Avance)
    const mejoramientoChartEl = document.getElementById('mejoramientoChart');
    if (mejoramientoChartEl) {
        const ctx = mejoramientoChartEl.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['CCTV', 'Telefonía', 'Parqueo', 'Herramientas Ofimáticas'],
                datasets: [{
                    label: 'Progreso de Avance (%)',
                    data: [0, 0, 0, 0], // Currently all at 0%
                    backgroundColor: ['#3498db', '#f39c12', '#27ae60', '#e74c3c'],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100 } },
                plugins: { legend: { display: false } }
            }
        });
    }

    // Gráfico 4: Incidencias de Contratos Externos
    const proyectosChartEl = document.getElementById('proyectosChart');
    if (proyectosChartEl) {
        const ctx = proyectosChartEl.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Manting Soporte PC', 'Manting BMS', 'E-Global Parqueo'],
                datasets: [{
                    label: 'Incidencias Activas',
                    data: [0, 0, 0], // Currently all 0
                    backgroundColor: ['#3498db', '#f39c12', '#27ae60'],
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y', // Horizontal layout
                responsive: true,
                maintainAspectRatio: false,
                scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } },
                plugins: { legend: { display: false } }
            }
        });
    }
});