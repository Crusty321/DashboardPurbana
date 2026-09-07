document.addEventListener('DOMContentLoaded', () => {
    
    // Simulación de base de datos de contratos
    const contratosData = {
        c1: {
            proveedor: "Soporte de Hardware",
            contratoId: "Categoría: Equipos, Pantallas y Periféricos",
            estado: "Interno",
            estadoClase: "online",
            incidencias: [
                { fecha: "2026-08-15 11:56", motivo: "Computador lento", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Mirley Rodriguez" },
                { fecha: "2026-08-18 08:42", motivo: "Prueba: Mapping con sonido", gravedad: "baja", estado: "Solucionado", observacion: "Reportado por Camilo Cediel" },
                { fecha: "2026-08-19 13:01", motivo: "Falla en teclado", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Paola Andrea Orjuela" },
                { fecha: "2026-08-19 17:00", motivo: "Problema en conectores de pantalla/monitor", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Daniel Esteban Linares" },
                { fecha: "2026-08-20 08:37", motivo: "Mini panel de luz para fotografía", gravedad: "baja", estado: "Pendiente", observacion: "Reportado por Diana Gil" },
                { fecha: "2026-08-21 14:41", motivo: "Falla reportada en teclado", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Yeidy Yasmin Cantor" },
                { fecha: "2026-08-25 09:13", motivo: "Acceso puerta de vidrio p2-m8", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Alejandra Rodriguez" },
                { fecha: "2026-08-25 15:26", motivo: "Falla en teclado/periférico", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Liyibeth Gutierrez" },
                { fecha: "2026-08-25 15:46", motivo: "Mantenimiento preventivo y cambio de crema disipadora", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Eliana Molina Gonzalez" },
                { fecha: "2026-08-26 18:32", motivo: "Celular corporativo fuera de servicio", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Paola Andrea Orjuela" },
                { fecha: "2026-08-26 19:25", motivo: "Reporte de equipo en recepción lobby 2", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Harold Aza" },
                { fecha: "2026-08-27 15:52", motivo: "Daño en escáner de impresora", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Angie Marcela Mahecha" },
                { fecha: "2026-08-27 17:36", motivo: "Apoyo con reparación de equipo", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Liyibeth Gutierrez" },
                { fecha: "2026-08-31 10:57", motivo: "Mantenimiento de impresora", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Liyibeth Gutierrez" },
                { fecha: "2026-08-31 11:08", motivo: "Mantenimiento impresora D", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Miller Fabian Santos" }
            ],
            histograma: [0, 0, 0, 15, 0, 0, 0]
        }
    };

    const contratoCards = document.querySelectorAll('.contrato-card');
    const detProveedor = document.getElementById('det-proveedor');
    const detEstado = document.getElementById('det-estado');
    const detContratoId = document.getElementById('det-contrato-id');
    
    const detIncidenciasCount = document.getElementById('det-incidencias-count');
    const incidenciasRows = document.getElementById('incidencias-rows');

    let incidenciasChartInstance = null;

    function renderizarHistograma(datosHistograma, colorBase) {
        const ctx = document.getElementById('incidenciasChart');
        if (!ctx) return;

        if (incidenciasChartInstance) {
            incidenciasChartInstance.destroy();
        }

        incidenciasChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'],
                datasets: [{
                    label: 'Incidencias',
                    data: datosHistograma || [0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: colorBase,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 2 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    function actualizarDetalleContrato(key) {
        const data = contratosData[key];
        if (!data) return;

        detProveedor.innerText = data.proveedor;
        detContratoId.innerText = data.contratoId;
        
        
        detEstado.innerText = data.estado;
        detEstado.className = `status-pill ${data.estadoClase}`;

        const pendientes = data.incidencias.filter(inc => inc.estado !== 'Solucionado');
        const totalPendientes = pendientes.length;
        detIncidenciasCount.innerText = `${totalPendientes} Incidencias Activas/Pendientes`;

        let html = '';
        if (totalPendientes === 0) {
            html = '<tr><td colspan="5" style="text-align:center; color:#95a5a6; padding: 20px;">No hay incidencias pendientes o activas en esta categoría.</td></tr>';
        } else {
            pendientes.forEach(inc => {
                html += `
                    <tr>
                        <td style="padding: 12px 15px;"><strong>${inc.fecha}</strong></td>
                        <td style="padding: 12px 15px;">
                            <div style="font-size: 0.9rem; color: #2c3e50; line-height: 1.4;">${inc.motivo}</div>
                        </td>
                        <td style="padding: 12px 15px;">
                            <span class="severity-tag ${inc.gravedad}">${inc.gravedad}</span>
                        </td>
                        <td style="padding: 12px 15px;">
                            <span class="status-pill online" style="font-size: 0.75rem; padding: 3px 8px; background-color: var(--alert); color: white;">${inc.estado}</span>
                        </td>
                        <td style="padding: 12px 15px; font-size: 0.85rem; color: #555;">
                            ${inc.observacion !== undefined ? inc.observacion : '—'}
                        </td>
                    </tr>
                `;
            });
        }
        incidenciasRows.innerHTML = html;

        let colorBase = '#3498db'; // Hardware color
        renderizarHistograma(data.histograma, colorBase);
    }

    contratoCards.forEach(card => {
        card.addEventListener('click', () => {
            contratoCards.forEach(c => {
                c.classList.remove('active-card');
                c.style.borderLeftColor = '#bdc3c7';
            });
            card.classList.add('active-card');
            
            const key = card.getAttribute('data-contrato');
            
            if (key === 'c1') card.style.borderLeftColor = 'var(--accent-color)';

            actualizarDetalleContrato(key);
        });
    });

    if (contratoCards.length > 0) {
        actualizarDetalleContrato('c1');
    }

    // Funcionalidad para filtro de botones (Semana, Mes, Año)
    const filterBtns = document.querySelectorAll('.filter-btn');
    function actualizarVistaSemana() {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        const btnSemana = Array.from(filterBtns).find(b => b.innerText.trim() === 'Semana');
        if (btnSemana) btnSemana.classList.add('active');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    actualizarVistaSemana();
});