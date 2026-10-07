document.addEventListener('DOMContentLoaded', () => {
    
    // Simulación de base de datos de contratos
    const contratosData = {
        c1: {
            proveedor: "Soporte de Hardware",
            contratoId: "Categoría: Equipos, Pantallas y Periféricos",
            estado: "Interno",
            estadoClase: "online",
            incidencias: [
                { fecha: "2026-09-05", motivo: "Actualización de SIIGO N 156", gravedad: "media", estado: "Solucionado", observacion: "Reportado por PAOLA ANDREA ORJUELA" },
                { fecha: "2026-09-07", motivo: "Fallas cable consola ambiental", gravedad: "media", estado: "Solucionado", observacion: "Reportado por YEIDY YASMIN CANTOR REYES" },
                { fecha: "2026-09-07", motivo: "Pantalla lobby 2 inactiva", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Maria Gonzalez - Se realizó ajuste de configuración de red y reactivación de puertos", observacion: "Reportado por Maria Gonzalez" },
                { fecha: "2026-09-08", motivo: "Conexión impresora EPSON PC Almacen", gravedad: "media", estado: "Solucionado", observacion: "Reportado por LIYIBETH GUTIERREZ" },
                { fecha: "2026-09-08", motivo: "Reinstalar Windows y Siigo V10", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por MIRLEY RODRIGUEZ MOLINA" },
                { fecha: "2026-09-08", motivo: "Falla al imprimir", gravedad: "media", estado: "Solucionado", observacion: "Reportado por MIRLEY RODRIGUEZ MOLINA" },
                { fecha: "2026-09-09", motivo: "Pantalla publicidad no proyecta", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Mayra Acosta" },
                { fecha: "2026-09-09", motivo: "Falla teléfono gestión documental", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Eliana Molina" },
                { fecha: "2026-09-09", motivo: "Instalar scaner en PC -156", gravedad: "media", estado: "Solucionado", observacion: "Reportado por PAOLA ORJUELA" },
                { fecha: "2026-09-10", motivo: "Equipo y Excel muy lentos", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por ANGIE MARCELA MAHECHA MURCIA" },
                { fecha: "2026-09-10", motivo: "Oficina 435 sin citófono", gravedad: "media", estado: "Pendiente", observacion: "Reportado por LILIANA CHIQUIZA" },
                { fecha: "2026-09-10", motivo: "Comando Ctrl+V en Excel no funciona", gravedad: "baja", estado: "Pendiente", observacion: "Reportado por LUISA FERNANDA MENDEZ RODRIGUEZ" },
                { fecha: "2026-09-11", motivo: "Adobe Premier pide actualización Windows", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por maria gonzalez" },
                { fecha: "2026-09-11", motivo: "Teclados borrados en 3 lobbies", gravedad: "media", estado: "Pendiente", observacion: "Reportado por LILIANA CHIQUIZA" },
                { fecha: "2026-09-11", motivo: "MAC aprendiz lenta y mouse falla", gravedad: "media", estado: "Pendiente", observacion: "Reportado por ELIANA MOLINA" },
                { fecha: "2026-09-12", motivo: "Equipo POS 05 pitido intenso", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por LAURA JARAMILLO" },
                { fecha: "2026-09-13", motivo: "SIIGO no funciona punto de info 1", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Yasmin Cantor" },
                { fecha: "2026-09-14", motivo: "Instalar impresora L3250 156", gravedad: "media", estado: "Pendiente", observacion: "Reportado por paola orjuela" },
                { fecha: "2026-09-14", motivo: "Botón pánico local 325 no funciona", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Jaime Eduardo Gamba Carrillo" },
                { fecha: "2026-09-17", motivo: "No puede ingresar al correo", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por LIYIBETH GUTIERREZ" },
                { fecha: "2026-09-17", motivo: "Fallas proyección pantallas publicidad", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por María Gonzalez" },
                { fecha: "2026-09-19", motivo: "Sensor humo sucio tempoaseo", gravedad: "media", estado: "Pendiente", observacion: "Reportado por OSCAR ARANGO" },
                { fecha: "2026-09-19", motivo: "Incidencia genérica / Dispositivo", gravedad: "baja", estado: "Pendiente", observacion: "Reportado por Isabella Velásquez Romero" },
                { fecha: "2026-09-21", motivo: "Olvido de contraseña ingreso", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Alejandra Rojas" },
                { fecha: "2026-09-21", motivo: "Alerta constante al imprimir", gravedad: "media", estado: "Pendiente", observacion: "Reportado por Alejandra Rojas" },
                { fecha: "2026-09-21", motivo: "Conexión a impresora color mercadeo", gravedad: "media", estado: "Pendiente", observacion: "Reportado por Alejandra Rojas" },
                { fecha: "2026-09-21", motivo: "Organización cableado puestos trabajo", gravedad: "media", estado: "Pendiente", observacion: "Reportado por Alejandra Rojas" },
                { fecha: "2026-09-21", motivo: "TV punto pago con líneas verdes", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por LAURA JARAMILLO" },
                { fecha: "2026-09-21", motivo: "Conexión teléfonos línea interna", gravedad: "media", estado: "Pendiente", observacion: "Reportado por LILIANA CH." },
                { fecha: "2026-09-21", motivo: "Cambio cable de teléfono deteriorado", gravedad: "media", estado: "Pendiente", observacion: "Reportado por DIANA GIL" },
                { fecha: "2026-09-22", motivo: "Revisión línea telefónica oficina 725A", gravedad: "media", estado: "Pendiente", observacion: "Reportado por LILIANA CHIQUIZA" },
                { fecha: "2026-09-23", motivo: "Cambio toner impresora", gravedad: "media", estado: "Pendiente", observacion: "Reportado por LIYIBETH GUTIERREZ" },
                { fecha: "2026-09-24", motivo: "Equipo se congela y desconecta internet", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Paula Ferreira Quitian" },
                { fecha: "2026-09-24", motivo: "Teléfono ext 106 no funciona", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por FERNANDA BEJARANO" },
                { fecha: "2026-09-24", motivo: "Papel atascado impresora 156", gravedad: "media", estado: "Pendiente", observacion: "Reportado por YASMIN CANTOR" },
                { fecha: "2026-09-25", motivo: "Scanner facturas no configurado", gravedad: "media", estado: "Pendiente", observacion: "Reportado por Yeidy Yasmin Cantor Reyes" },
                { fecha: "2026-09-26", motivo: "No enciende PC y Office falla", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por PAULA FERREIRA QUITIAN" }
            ],
            histograma: [0, 0, 0, 15, 37, 0, 0]
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