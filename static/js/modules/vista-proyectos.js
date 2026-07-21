document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // LOGICA DETALLE DE CONTRATOS E INCIDENCIAS
    // ==========================================
    const contratosData = {
        c1: {
            proveedor: "Manting (Soporte CCTV)",
            contratoId: "Contrato 1: CPU-022-2025",
            estado: "Activo / Vigente",
            estadoClase: "online",
            alcance: `<strong>Objetivo Principal:</strong> Prestar el servicio de mantenimiento preventivo integral y soporte de hardware de cómputo (CPUs, pantallas locales, periféricos e impresoras POS).<br><br>
            <strong>Alcance:</strong> Garantiza el correcto funcionamiento de los puestos de trabajo operativos en todo el centro comercial. Incluye limpieza, depuración lógica y auditorías de seguridad física y lógica.`,
            incidencias: [],
            histograma: [0, 1, 0, 0, 0, 0, 0]
        },
        c2: {
            proveedor: "Manting (BMS & Automatización)",
            contratoId: "Contrato 2: CPU-031-2025",
            estado: "Activo / Vigente",
            estadoClase: "online",
            alcance: `<strong>Objetivo Principal:</strong> Prestar el servicio de mantenimiento preventivo y correctivo (sin incluir repuestos) para el hardware y software de supervisión (BMS) que forman parte del sistema de automatización del Centro Comercial y Empresarial Primavera Urbana.<br><br>
            <strong>Alcance del Proyecto (6 Subsistemas):</strong>
            <ul style="padding-left: 20px; margin-top: 5px; list-style-type: disc;">
                <li><strong>Detección de Incendio:</strong> Sensores de humo, panel de incendio, estaciones manuales y sirenas.</li>
                <li><strong>Circuito Cerrado de Televisión (CCTV):</strong> Cámaras, servidores de almacenamiento y switches de red.</li>
                <li><strong>Sistemas de Intrusión:</strong> Botones, paneles y antenas.</li>
                <li><strong>Cuarto de Monitoreo:</strong> Rack, servidores y monitores.</li>
                <li><strong>Redes:</strong> Switches, cableado de red y extensores.</li>
                <li><strong>Sistema de Conteo:</strong> Mantenimiento de cámaras y plataforma.</li>
            </ul><br>
            <strong>Vigencia:</strong> Duración de doce (12) meses, desde el 6 de agosto de 2025 hasta el 5 de agosto de 2026.`,
            incidencias: [],
            histograma: [0, 0, 1, 0, 0, 0, 0]
        },
        c3: {
            proveedor: "E-Global (Smart Parking)",
            contratoId: "Contrato: 012-23.1",
            estado: "Activo (Otrosí 2)",
            estadoClase: "online",
            alcance: `<strong>Objetivo Principal:</strong> Prestar el servicio de mantenimiento preventivo y correctivo para el sistema integrado denominado Smart Parking Seamless y Tiquete (con repuestos incluidos).<br><br>
            <strong>Alcance:</strong> El servicio se aplicará exclusivamente a los equipos que componen dicho sistema, el cual está ubicado en la calle 15 #40-01, barrio el Buque, en la ciudad de Villavicencio. Incluye la ejecución de mantenimientos preventivos bajo un cronograma establecido, la atención y corrección de fallas (mantenimiento correctivo) reportadas mediante un sistema de tickets, y el suministro de los repuestos necesarios para garantizar la operatividad y el óptimo funcionamiento del sistema.<br><br>
            <strong>Vigencia:</strong> Desde el 1 de septiembre de 2023 hasta el 31 de agosto de 2026 (Vigencia inicial extendida por un año mediante Otrosí 1, y posteriormente extendida por otro año mediante Otrosí 2).`,
            incidencias: [],
            histograma: [0, 0, 0, 0, 0, 0, 0]
        }
    };

    const contratoCards = document.querySelectorAll('.contrato-card');
    const detProveedor = document.getElementById('det-proveedor');
    const detEstado = document.getElementById('det-estado');
    const detContratoId = document.getElementById('det-contrato-id');
    const detAlcance = document.getElementById('det-alcance');
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
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Incidencias',
                    data: datosHistograma || [0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: colorBase || '#3498db',
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 }
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
        detAlcance.innerHTML = data.alcance;
        
        detEstado.innerText = data.estado;
        detEstado.className = `status-pill ${data.estadoClase}`;

        const totalIncidencias = data.incidencias.length;
        detIncidenciasCount.innerText = `${totalIncidencias} Incidencias`;

        let html = '';
        if (totalIncidencias === 0) {
            html = '<tr><td colspan="5" style="text-align:center; color:#95a5a6; padding: 20px;">Sin incidencias registradas. El histórico iniciará a partir de la fecha de inicio del plan de mantenimiento.</td></tr>';
        } else {
            data.incidencias.forEach(inc => {
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
                            <span class="status-pill online" style="font-size: 0.75rem; padding: 3px 8px;">${inc.estado}</span>
                        </td>
                        <td style="padding: 12px 15px; font-size: 0.85rem; color: #555;">
                            ${inc.observacion !== undefined ? inc.observacion : '—'}
                        </td>
                    </tr>
                `;
            });
        }
        incidenciasRows.innerHTML = html;

        let colorBase = '#bdc3c7';
        if (key === 'c1') colorBase = '#3498db';
        else if (key === 'c2') colorBase = '#f39c12';
        else if (key === 'c3') colorBase = '#2c3e50';

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
            else if (key === 'c2') card.style.borderLeftColor = 'var(--warning)';
            else if (key === 'c3') card.style.borderLeftColor = 'var(--primary-color)';

            actualizarDetalleContrato(key);
        });
    });

    if (contratoCards.length > 0) {
        actualizarDetalleContrato('c1');
    }

    actualizarVistaSemana();
});