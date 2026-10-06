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
            incidencias: [
                { fecha: "2026-08-20 19:48", motivo: "Pérdida conexión cámara s14c16 en torre j piso 8 m2", gravedad: "alta", estado: "En Revisión", observacion: "Reportado por Harold Aza - Posible falla IP/Física" },
                { fecha: "2026-08-21 07:29", motivo: "Pérdida conexión cámara s12c10 piso 3 modulo 5", gravedad: "alta", estado: "En Revisión", observacion: "Reportado por Harold Aza - Posible falla IP/Física" },
                { fecha: "2026-08-25 09:19", motivo: "Movimiento de cámara", gravedad: "baja", estado: "Pendiente", observacion: "Reportado por Alejandra Rodriguez" },
                { fecha: "2026-08-25 09:46", motivo: "Limpieza de cámara p2 sobre la casa del kumis", gravedad: "baja", estado: "Pendiente", observacion: "Reportado por Alejandra Rodriguez - Mantenimiento físico" },
                { fecha: "2026-08-25 09:48", motivo: "Cámara frente a fervor p1-m8 grabar directo y movimiento", gravedad: "media", estado: "Pendiente", observacion: "Reportado por Alejandra Rodriguez" },
                { fecha: "2026-08-26 15:16", motivo: "Pérdida de conexión IP de cámara", gravedad: "alta", estado: "En Revisión", observacion: "Reportado por Harold Aza - Falla de red recurrente" },
                { fecha: "2026-08-29 08:50", motivo: "Cámara p7-m2 auditorio fuera de servicio", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Alejandra Rodriguez" }
                            ,{ fecha: "2026-09-06", motivo: "CÁMARA S10C10 IMAGEN BORROSA", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN CAMILO ORTIZ" },
                { fecha: "2026-09-06", motivo: "CAMARAS S14C23 Y S14C24 IMAGEN A BLANCO Y NEGRO PTOS DE PAGO", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN CAMILO ORTIZ" },
                { fecha: "2026-09-08", motivo: "camaras  S05C18 Y S05C17  están robóticas  y se van y vuelven", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN CAMILO ORTIZ" },
                { fecha: "2026-09-13", motivo: "PTZ EXTERNA PERDIÓ LA CONEXIÓN CON LA CAMARA", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Cristian " },
                { fecha: "2026-09-15", motivo: "camara piso 3 lobby 3 s09c02 ascensores no presenta movimiento", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-25", motivo: "cámara s06c13 borrosa", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "Cámara S14c04 sin link", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Cristian Ortiz" },
                { fecha: "2026-09-29", motivo: "CAMARA S14C11 AL PARECER DESENFOCADA Y CON TELARAÑAS", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN ORTIZ " },
                { fecha: "2026-09-29", motivo: "CAMARA S10C10  BORROSA , NO ES CLARA LA IMAGEN", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S11C18 BLANCO Y NEGRO", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S13C12 NO SE OBSERVA A COLOR", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S13C25 , AL PARECER CON TELARAÑAS O SUCIA EN LENTE", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S14C05 IMAGEN SUCIA  O MALA CLARIDAD DE IMAGEN", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S14C16 , SIN LINK", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S14C23 NO SE OBSERVA A COLOR", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S14C24 NO SE OBSERVA A COLOR", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S05C11 CON SUCIO O TELARAÑAS", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S05C18 ROBOTICA", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S05C17 ROBOTICA", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "CAMARA S05C33 NO SE VE , PRESENTA INTERFERENCIA O EN BLANCO", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN " },
                { fecha: "2026-09-29", motivo: "S06C13 SE ENCUENTRA  CON IMAGEN BORROSA", gravedad: "media", estado: "Pendiente", observacion: "Reportado por CRISTIAN " }
            ],
            histograma: [0, 0, 0, 7, 21, 0, 0]
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
            incidencias: [
                { fecha: "2026-08-18 11:27", motivo: "Red e Internet", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Diana Gonzalez" },
                { fecha: "2026-08-18 16:22", motivo: "Sistema lento y no reconoce visitantes", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Liliana Chiquiza" },
                { fecha: "2026-08-25 16:17", motivo: "Falla al ingresar número de documento", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Diana Gonzalez" },
                { fecha: "2026-08-26 12:06", motivo: "Credenciales de acceso / no toma los rostros", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Liliana Chiquiza" },
                { fecha: "2026-08-26 15:32", motivo: "Pantalla de acceso hardware/dispositivos", gravedad: "media", estado: "Solucionado", observacion: "Reportado por Diana Gil" },
                { fecha: "2026-08-27 11:38", motivo: "Credenciales de acceso / no está dando ingreso", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Liliana Chiquiza" },
                { fecha: "2026-08-27 11:54", motivo: "Credenciales de acceso en lobby 3", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Liliana Chiquiza" },
                { fecha: "2026-08-28 14:48", motivo: "Biométrico derecho al ingresar visitantes", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Diana Gonzalez" },
                { fecha: "2026-08-31 18:11", motivo: "Local Milanelo obturador", gravedad: "alta", estado: "Solucionado", observacion: "Reportado por Harold Aza - Sistema Pánico" },
                { fecha: "2026-09-01 07:56", motivo: "Lobby 3 sistema Welcome demora aprox 20 seg por CC", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Diana Gonzalez" },
                { fecha: "2026-09-02 16:55", motivo: "Sistema Welcome se bloquea/lento", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Liliana Chiquiza" },
                { fecha: "2026-09-04 18:34", motivo: "Sistema Welcome reinicios/fallas", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Liliana Chiquiza" },
                { fecha: "2026-09-04 18:37", motivo: "Sistema Welcome fuera de servicio", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Liliana Chiquiza" }
                            ,{ fecha: "2026-09-08", motivo: "SISTEMA DE DETECCIÓN DE  INCENDIO LAZO 2 CAIDO", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN CAMILO ORTIZ" },
                { fecha: "2026-09-12", motivo: "LECTORES BIOMETRICOS: biométrico adm/casino no marca/apagado", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Cristian camilo " },
                { fecha: "2026-09-12", motivo: "TECLADOS: Lector ingreso Casino no marcan números", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por DANIEL FELIPE GARCIA ZAPATA" },
                { fecha: "2026-09-14", motivo: "boton de panico local # 325 no funciona", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Cristian " },
                { fecha: "2026-09-15", motivo: "MOLINETE DERECHO ESTA DIRECTO", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Cristian/Cristian ortiz" },
                { fecha: "2026-09-16", motivo: "Sensor de humo sucio, cuarto de tempoaseo", gravedad: "media", estado: "Pendiente", observacion: "Reportado por Santiago Echeverry Silva" },
                { fecha: "2026-09-17", motivo: "Torniquete queda directo", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN CAMILO ORTIZ " },
                { fecha: "2026-09-24", motivo: "TORNIQUETE INGRESOS ADMINISTRACION Y CASINO DIRECTO", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN ORTIZ " },
                { fecha: "2026-09-26", motivo: "Torniquete  ( molinete)  por momentos directo", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por Cristian " },
                { fecha: "2026-09-29", motivo: "biometríco  puerta rampa sotano 2  a torre 1 no funciona el lector de huella", gravedad: "alta", estado: "Pendiente", observacion: "Reportado por CRISTIAN ORTIZ " }
            ],
            histograma: [0, 0, 0, 9, 14, 0, 0]
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
                labels: ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'],
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

        const pendientes = data.incidencias.filter(inc => inc.estado !== 'Solucionado');
        const totalPendientes = pendientes.length;
        detIncidenciasCount.innerText = `${totalPendientes} Incidencias Activas/Pendientes`;

        let html = '';
        if (totalPendientes === 0) {
            html = '<tr><td colspan="5" style="text-align:center; color:#95a5a6; padding: 20px;">No hay incidencias pendientes o activas en este contrato.</td></tr>';
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