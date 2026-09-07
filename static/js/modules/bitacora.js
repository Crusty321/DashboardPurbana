document.addEventListener('DOMContentLoaded', () => {


    // ==========================================
    // LÓGICA DE SELECCIÓN DE VISTA Y FILTROS DEL GANTT (Bitácora)
    // ==========================================
    const ganttViewSelector = document.getElementById('gantt-view-selector');
    const ganttViewContainers = document.querySelectorAll('.gantt-view-container');
    const filterMesWrapper = document.getElementById('filter-mes-wrapper');
    const filterSemanaWrapper = document.getElementById('filter-semana-wrapper');
    const filterDiaWrapper = document.getElementById('filter-dia-wrapper');
    const filterMes = document.getElementById('gantt-filter-mes');
    const filterSemana = document.getElementById('gantt-filter-semana');
    const filterDia = document.getElementById('gantt-filter-dia');

    const mesesData = {
        "Julio": {
            semanas: ["Semana 1 (20-26 Jul)", "Semana 2 (27 Jul - 2 Ago)"],
            mto: "Fase 1: Mantenimiento Pantallas y Totems (Publicidad)",
            mtoColspan: 2,
            mtoResto: 0,
            soft: "Fase 1: Diseño Base de Datos y UI (Intranet)",
            softColspan: 2,
            cctv: "Cableado y Balanceo NVR (Mar/Jue)",
            tel: "Configuración planta IP (Jue) [Desde S2]",
            telEmpty: 1, telColspan: 1,
            parq: "No aplica",
            parqEmpty: 2, parqColspan: 0
        },
        "Agosto": {
            semanas: ["Semana 3 (3-9 Ago)", "Semana 4 (10-16 Ago)", "Semana 5 (17-23 Ago)", "Semana 6 (24-30 Ago)"],
            mto: "Fase 2: Ejecución Pantallas Publicitarias",
            mtoColspan: 4,
            mtoResto: 0,
            soft: "Fase 1 (S3-S4) / Fase 2: Login y Roles (S5-S6)",
            softColspan: 4,
            cctv: "Revisión de DVRs perimetrales (Mar/Jue)",
            tel: "Actualización de cableado telefonía (Jue)",
            telEmpty: 0, telColspan: 4,
            parq: "Pruebas de lazo magnético en parqueo [Desde S3]",
            parqEmpty: 0, parqColspan: 4
        },
        "Septiembre": {
            semanas: ["Semana 7 (31 Ago-6 Sep)", "Semana 8 (7-13 Sep)", "Semana 9 (14-20 Sep)", "Semana 10 (21-27 Sep)"],
            mto: "Cierre Pantallas (S7) / Mto. PCs Admin (S8-S10)",
            mtoColspan: 4,
            mtoResto: 0,
            soft: "Fase 2: Admin (S7-S8) / Fase 3: Gestión Doc (S9-S10)",
            softColspan: 4,
            cctv: "Enrutamiento racks principales (Mar/Jue)",
            tel: "Extensiones oficinas administrativas (Jue)",
            telEmpty: 0, telColspan: 4,
            parq: "Sincronización base de datos de parqueo",
            parqEmpty: 0, parqColspan: 4,
            wifi: "F0 Switch 14/09 · P1 Carulla 15-16/09 · P2 Falabella 17-18/09 · P3 Parq.Motos 21-22/09 · P4 (por def.) 23-24/09",
            wifiColspan: 2,
            wifiEmpty: 2
        },
        "Octubre": {
            semanas: ["Semana 11 (28 Sep-4 Oct)", "Semana 12 (5-11 Oct)", "Semana 13 (12-18 Oct)", "Semana 14 (19-25 Oct)"],
            mto: "Mto. PCs Admin (S11) / Mercadeo, Ops e Info (S12-S14)",
            mtoColspan: 4,
            mtoResto: 0,
            soft: "Fase 3 (S11-S12) / Fase 4: Muro y Avisos (S13-S14)",
            softColspan: 4,
            cctv: "Saneamiento de conmutadores CCTV",
            tel: "Mantenimiento preventivo planta telefónica (Jue)",
            telEmpty: 0, telColspan: 4,
            parq: "Calibración fotoceldas y tiqueteras (Mar/Vie)",
            parqEmpty: 0, parqColspan: 4
        },
        "Noviembre": {
            semanas: ["Semana 15 (26 Oct-1 Nov)", "Semana 16 (2-8 Nov)", "Semana 17 (9-15 Nov)"],
            mto: "Mercadeo/Ops (S15) / Mto. Seguridad, Ctrl y Lobbys (S16-S17)",
            mtoColspan: 3,
            mtoResto: 0,
            soft: "Fase 4 (S15) / Fase 5: Pruebas y QA (S16)",
            softColspan: 2,
            softResto: 1,
            cctv: "Aseguramiento conectividad NVR (S15-S16)",
            tel: "No aplica",
            telEmpty: 3, telColspan: 0,
            parq: "Cierre preventivos y redundancia de red (S15-S16)",
            parqEmpty: 0, parqColspan: 2, parqResto: 1
        },
        "Diciembre": {
            semanas: ["Semana 18 (Consolidación)"],
            mto: "Cierre de Ciclo y Hojas de Vida (HDV)",
            mtoColspan: 1,
            mtoResto: 0,
            soft: "Completado y Desplegado",
            softColspan: 1,
            cctv: "Consolidación de Informes CCTV",
            tel: "No aplica",
            telEmpty: 1, telColspan: 0,
            parq: "No aplica",
            parqEmpty: 1, parqColspan: 0
        }
    };

    const semanasFullData = {
        1: {
            rango: "20 - 26 Jul",
            mtoDesc: "Mto. Pantallas y Totems (Lote 1)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 1: Diseño base de datos e interfaz",
            softDias: [true, false, false, false, true, false],
            infraDesc: "Plan de Mejora CCTV (Mar/Jue)",
            infraDias: [false, true, false, true, false, false]
        },
        2: {
            rango: "27 Jul - 2 Ago",
            mtoDesc: "Mto. Pantallas y Totems (Lote 1)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 1: Modelado de tablas y vistas",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Telefonía (Jue)",
            infraDias: [false, true, false, true, false, false]
        },
        3: {
            rango: "3 - 9 Ago",
            mtoDesc: "Mto. Pantallas y Totems (Lote 1)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 1: Definición de APIs REST",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel (Jue)",
            infraDias: [false, true, false, true, true, false]
        },
        4: {
            rango: "10 - 16 Ago",
            mtoDesc: "Mto. Pantallas y Totems (Lote 1)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 1: Pruebas de integración de datos",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel (Jue)",
            infraDias: [false, true, false, true, true, false]
        },
        5: {
            rango: "17 - 23 Ago",
            mtoDesc: "Mto. Pantallas y Totems (Lote 1)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 2: Arquitectura login y tokens",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel (Jue)",
            infraDias: [false, true, false, true, true, false]
        },
        6: {
            rango: "24 - 30 Ago",
            mtoDesc: "Mto. Pantallas y Totems (Lote 1)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 2: Módulo de control de roles",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel (Jue)",
            infraDias: [false, true, false, true, true, false]
        },
        7: {
            rango: "31 Ago - 6 Sep",
            mtoDesc: "Cierre de Lote 1 de Pantallas",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 2: Pruebas y validaciones de login",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel (Jue)",
            infraDias: [false, true, false, true, true, false]
        },
        8: {
            rango: "7 - 13 Sep",
            mtoDesc: "Mto. PCs de Administración (Lote 2)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 2: Panel básico de administrador",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel (Jue)",
            infraDias: [false, true, false, true, true, false]
        },
        9: {
            rango: "14 - 20 Sep",
            mtoDesc: "Mto. PCs de Administración (Lote 2)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 3: Módulo de carga de documentos",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel (Jue)",
            infraDias: [false, true, false, true, true, false],
            wifiDesc: "Lun 14/09: F0 Config Switch+VLANs · Mar 15/09: P1 Carulla Tendido · Mié 16/09: P1 Carulla AP+Pruebas · Jue 17/09: P2 Falabella Tendido · Vie 18/09: P2 Falabella AP+Pruebas",
            wifiDias: [true, true, true, true, true, false]
        },
        10: {
            rango: "21 - 27 Sep",
            mtoDesc: "Mto. PCs de Administración (Lote 2)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 3: Módulo de descarga de documentos",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel + IA",
            infraDias: [false, true, false, true, true, false],
            wifiDesc: "Lun 21/09: P3 Parq.Motos Tendido · Mar 22/09: P3 Parq.Motos AP+Pruebas · Mié 23/09: P4 Tendido · Jue 24/09: P4 Montaje AP+Pruebas",
            wifiDias: [true, true, true, true, false, false]
        },
        11: {
            rango: "28 Sep - 4 Oct",
            mtoDesc: "Mto. PCs de Administración (Lote 2)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 3: Lógica de control de archivos",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel + IA",
            infraDias: [false, true, false, true, true, false]
        },
        12: {
            rango: "5 - 11 Oct",
            mtoDesc: "Mto. PCs Mercadeo, Ops e Info (Lote 3)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 3: Auditoría y log de archivos",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + Tel + IA",
            infraDias: [false, true, false, true, true, false]
        },
        13: {
            rango: "12 - 18 Oct",
            mtoDesc: "Mto. PCs Mercadeo, Ops e Info (Lote 3)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 4: Muro de anuncios (Dashboard)",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + IA",
            infraDias: [false, true, false, true, true, false]
        },
        14: {
            rango: "19 - 25 Oct",
            mtoDesc: "Mto. PCs Mercadeo, Ops e Info (Lote 3)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 4: Formulario de anuncios (Admin)",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + IA",
            infraDias: [false, true, false, true, true, false]
        },
        15: {
            rango: "26 Oct - 1 Nov",
            mtoDesc: "Mto. PCs Mercadeo, Ops e Info (Lote 3)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 4: Feed interactivo de avisos",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + IA",
            infraDias: [false, true, false, true, true, false]
        },
        16: {
            rango: "2 - 8 Nov",
            mtoDesc: "Mto. PCs Seguridad y Control (Lote 4)",
            mtoDias: [false, true, true, true, false, false],
            softDesc: "Fase 5: Pruebas unitarias e integración",
            softDias: [true, false, false, false, true, false],
            infraDesc: "CCTV (Mar/Jue) + Parqueo (Mar/Vie) + IA",
            infraDias: [false, true, false, true, true, false]
        }
    };

    function renderizarGanttMensual() {
        const mes = filterMes.value;
        const data = mesesData[mes];
        const tableContainer = document.getElementById('gantt-mensual');
        if (!data || !tableContainer) return;

        let headerHtml = `
            <tr style="background: var(--bg-color); border-bottom: 2px solid var(--border-color);">
                <th style="padding: 12px; text-align: left; width: 25%;">Eje de Trabajo / Actividad</th>
                <th style="padding: 12px; text-align: left; width: 15%;">Detalle / Jornada</th>
        `;
        data.semanas.forEach(sem => {
            headerHtml += `<th style="padding: 12px; text-align: center;">${sem}</th>`;
        });
        headerHtml += `</tr>`;

        let bodyHtml = `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="${data.semanas.length + 2}">
                    <i class="fa-solid fa-clock-rotate-left"></i> EJE CRÍTICO DIARIO
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px; font-weight: 600; color: var(--alert);">Soporte TI y Atención de Incidencias</td>
                <td style="padding: 10px 12px; color: #7f8c8d;">Lun a Sáb (Horario Laboral)</td>
                <td colspan="${data.semanas.length}" style="padding: 8px;">
                    <div style="background: var(--alert); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;"><i class="fa-solid fa-headset"></i> Soporte TI (L-V 8a-12p y 2p-6p, Sáb 8a-12p)</div>
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="${data.semanas.length + 2}">
                    <i class="fa-solid fa-screwdriver-wrench"></i> PROYECTO 1: MANTENIMIENTO PREVENTIVO
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">Mantenimiento Cómputo y Pantallas</td>
                <td style="padding: 10px 12px; color: #7f8c8d;">Mar, Mié, Jue (3 eq/sem)</td>
                <td colspan="${data.mtoColspan}" style="padding: 8px;">
                    <div style="background: var(--accent-color); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">${data.mto}</div>
                </td>
                ${data.mtoResto > 0 ? `<td colspan="${data.mtoResto}" style="background: #fafafa;"></td>` : ''}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="${data.semanas.length + 2}">
                    <i class="fa-solid fa-code"></i> PROYECTO 2: DESARROLLO DE SOFTWARE
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">Desarrollo Intranet Primavera</td>
                <td style="padding: 10px 12px; color: #7f8c8d;">Lunes y Viernes (TI)</td>
                <td colspan="${data.softColspan}" style="padding: 8px;">
                    <div style="background: var(--primary-color); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">${data.soft}</div>
                </td>
                ${data.softResto > 0 ? `<td colspan="${data.softResto}" style="background: #fafafa;"></td>` : ''}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="${data.semanas.length + 2}">
                    <i class="fa-solid fa-screwdriver-wrench"></i> PROYECTO 3: MEJORAMIENTO DE INFRAESTRUCTURA (TARDES)
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">Plan de Mejoramiento Infraestructura</td>
                <td style="padding: 10px 12px; color: #7f8c8d;">Mar, Mié, Jue (Tardes)</td>
                <td colspan="${data.semanas.length}" style="padding: 8px;">
                    <div style="background: var(--warning); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">CCTV y Herramientas Ofimáticas</div>
                </td>
            </tr>
            ${data.wifi ? `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="${data.semanas.length + 2}">
                    <i class="fa-solid fa-wifi"></i> PROYECTO 4: DESPLIEGUE RED Wi-Fi Y PUNTOS DE RED SS
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">Instalación Wi-Fi + Puntos de Red Cajeros SS</td>
                <td style="padding: 10px 12px; color: #7f8c8d;">14–24 Sep · 2 días/punto</td>
                <td colspan="${data.wifiColspan || 0}" style="background: #fafafa;"></td>
                <td colspan="${4 - (data.wifiColspan || 0) - (data.wifiEmpty || 0)}" style="padding: 8px;">
                    <div style="background: #8e44ad; color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.72rem; font-weight: bold;">${data.wifi}</div>
                </td>
                ${data.wifiEmpty > 0 ? `<td colspan="${data.wifiEmpty}" style="background: #fafafa;"></td>` : ''}
            </tr>
            ` : ''}
        `;

        tableContainer.innerHTML = `
            <div style="overflow-x: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead>${headerHtml}</thead>
                    <tbody>${bodyHtml}</tbody>
                </table>
            </div>
        `;
    }

    function renderizarGanttSemanal() {
        const semNum = filterSemana.value;
        const data = semanasFullData[semNum];
        const tableContainer = document.getElementById('gantt-semanal');
        if (!data || !tableContainer) return;

        const headerHtml = `
            <tr style="background: var(--bg-color); border-bottom: 2px solid var(--border-color);">
                <th style="padding: 12px; text-align: left; width: 25%;">Eje de Trabajo / Actividad</th>
                <th style="padding: 12px; text-align: center; width: 12%;">Lunes</th>
                <th style="padding: 12px; text-align: center; width: 12%;">Martes</th>
                <th style="padding: 12px; text-align: center; width: 12%;">Miércoles</th>
                <th style="padding: 12px; text-align: center; width: 12%;">Jueves</th>
                <th style="padding: 12px; text-align: center; width: 12%;">Viernes</th>
                <th style="padding: 12px; text-align: center; width: 12%;">Sábado</th>
            </tr>
        `;

        const renderCells = (diasArray, label, color) => {
            let cells = '';
            diasArray.forEach(d => {
                if (d) {
                    cells += `
                        <td style="padding: 8px;">
                            <div style="background: ${color}; color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; line-height: 1.1;">${label}</div>
                        </td>
                    `;
                } else {
                    cells += `<td style="background: #fafafa;"></td>`;
                }
            });
            return cells;
        };

        const bodyHtml = `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="7">
                    <i class="fa-solid fa-clock-rotate-left"></i> EJE CRÍTICO DIARIO
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px; font-weight: 600; color: var(--alert);">Soporte TI y Atención de Incidencias</td>
                <td colspan="6" style="padding: 8px;">
                    <div style="background: var(--alert); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;"><i class="fa-solid fa-headset"></i> Soporte TI (L-V 8a-12p y 2p-6p, Sáb 8a-12p)</div>
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="7">
                    <i class="fa-solid fa-screwdriver-wrench"></i> PROYECTO 1: MANTENIMIENTO PREVENTIVO
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">${data.mtoDesc}</td>
                ${renderCells(data.mtoDias, "1 Equipo", "var(--accent-color)")}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="7">
                    <i class="fa-solid fa-code"></i> PROYECTO 2: DESARROLLO DE SOFTWARE
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">${data.softDesc}</td>
                ${renderCells(data.softDias, "TI (5h)", "var(--primary-color)")}
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="7">
                    <i class="fa-solid fa-screwdriver-wrench"></i> PROYECTO 3: MEJORAMIENTO DE INFRAESTRUCTURA (TARDES)
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">Plan de Mejora Infraestructura</td>
                ${renderCells([false, true, true, true, false, false], "CCTV/Ofimática", "var(--warning)")}
            </tr>
            ${data.wifiDesc ? `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: #8e44ad; background: #fdfefe;" colspan="7">
                    <i class="fa-solid fa-wifi"></i> PROYECTO 4: DESPLIEGUE RED Wi-Fi Y PUNTOS DE RED SS
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px; color: #8e44ad; font-weight: 600;">${data.wifiDesc}</td>
                ${renderCells(data.wifiDias, "📡 Red/WiFi SS", "#8e44ad")}
            </tr>
            ` : ''}
        `;

        tableContainer.innerHTML = `
            <div style="overflow-x: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead>${headerHtml}</thead>
                    <tbody>${bodyHtml}</tbody>
                </table>
            </div>
        `;
    }

    function renderizarGanttDiario() {
        const semNum = parseInt(filterSemana.value);
        const dia = filterDia.value;
        const data = semanasFullData[semNum];
        const tableContainer = document.getElementById('gantt-diario');
        if (!data || !tableContainer) return;

        const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const diaIndex = diasSemana.indexOf(dia);
        
        const tieneMto = data.mtoDias[diaIndex];
        const tieneSoft = data.softDias[diaIndex];
        const tieneInfra = [false, true, true, true, false, false][diaIndex];

        const headerHtml = `
            <tr style="background: var(--bg-color); border-bottom: 2px solid var(--border-color);">
                <th style="padding: 12px; text-align: left; width: 25%;">Eje de Trabajo / Actividad</th>
                <th style="padding: 12px; text-align: center; width: 15%;">08:00 - 10:00</th>
                <th style="padding: 12px; text-align: center; width: 15%;">10:00 - 12:00</th>
                <th style="padding: 12px; text-align: center; width: 15%;">12:00 - 14:00</th>
                <th style="padding: 12px; text-align: center; width: 15%;">14:00 - 16:00</th>
                <th style="padding: 12px; text-align: center; width: 15%;">16:00 - 18:00</th>
            </tr>
        `;

        let bodyHtml = `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="6">
                    <i class="fa-solid fa-clock-rotate-left"></i> EJE CRÍTICO DIARIO (RESPUESTA INSTANTÁNEA)
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px; font-weight: 600; color: var(--alert);">
                    <i class="fa-solid fa-circle-exclamation" style="color: var(--alert);"></i> Soporte TI y Atención de Incidencias
                </td>
                <td colspan="2" style="padding: 8px;">
                    <div style="background: var(--alert); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;"><i class="fa-solid fa-headset"></i> Soporte TI (Mañana)</div>
                </td>
                <td style="background: rgba(189, 195, 199, 0.1); text-align: center; font-size: 0.75rem; color: #7f8c8d; font-style: italic;">Almuerzo</td>
                <td colspan="2" style="padding: 8px;">
                    <div style="background: var(--alert); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;"><i class="fa-solid fa-headset"></i> Soporte TI (Tarde)</div>
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="6">
                    <i class="fa-solid fa-screwdriver-wrench"></i> PROYECTO 1: MANTENIMIENTO PREVENTIVO
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">${data.mtoDesc}</td>
        `;
        if (tieneMto) {
            bodyHtml += `
                <td colspan="2" style="padding: 8px;">
                    <div style="background: var(--accent-color); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">Mto. Preventivo Activo</div>
                </td>
                <td style="background: #fafafa;"></td>
                <td style="background: #fafafa;"></td>
                <td style="background: #fafafa;"></td>
            `;
        } else {
            bodyHtml += `<td colspan="5" style="background: #fafafa; text-align: center; color: #aaa; font-style: italic;">No programado para hoy</td>`;
        }
        bodyHtml += `</tr>`;

        bodyHtml += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="6">
                    <i class="fa-solid fa-code"></i> PROYECTO 2: DESARROLLO DE SOFTWARE
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">${data.softDesc}</td>
        `;
        if (tieneSoft) {
            bodyHtml += `
                <td colspan="2" style="padding: 8px;">
                    <div style="background: var(--primary-color); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">Jornada de Desarrollo (Mañana)</div>
                </td>
                <td style="background: #fafafa;"></td>
                <td colspan="2" style="padding: 8px;">
                    <div style="background: var(--primary-color); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">Jornada de Desarrollo (Tarde)</div>
                </td>
            `;
        } else {
            bodyHtml += `<td colspan="5" style="background: #fafafa; text-align: center; color: #aaa; font-style: italic;">No programado para hoy</td>`;
        }
        bodyHtml += `</tr>`;

        bodyHtml += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: var(--primary-color); background: #fdfefe;" colspan="6">
                    <i class="fa-solid fa-screwdriver-wrench"></i> PROYECTO 3: MEJORAMIENTO DE INFRAESTRUCTURA
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px;">Plan de Mejora CCTV y Ofimática</td>
        `;
        if (tieneInfra) {
            bodyHtml += `
                <td style="background: #fafafa;"></td>
                <td style="background: #fafafa;"></td>
                <td style="background: #fafafa;"></td>
                <td colspan="2" style="padding: 8px;">
                    <div style="background: var(--warning); color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">Mejoras de Infraestructura (Tarde)</div>
                </td>
            `;
        } else {
            bodyHtml += `<td colspan="5" style="background: #fafafa; text-align: center; color: #aaa; font-style: italic;">No programado para hoy</td>`;
        }
        bodyHtml += `</tr>`;

        // WiFi project for semanas 9 y 10 (días específicos)
        const wifiPorDia = {
            9: {
                0: "Lun 14/09 — F0: Montaje Switch, Config VLANs y aprovisionamiento controladora APs",
                1: "Mar 15/09 — P1 SS CARULLA: Tendido y ponchado de cable Cat6",
                2: "Mié 16/09 — P1 SS CARULLA: Montaje AP, certificación cable, pruebas RSSI y PoE",
                3: "Jue 17/09 — P2 SS FALABELLA: Tendido y ponchado de cable Cat6",
                4: "Vie 18/09 — P2 SS FALABELLA: Montaje AP, certificación cable, pruebas RSSI y PoE",
            },
            10: {
                0: "Lun 21/09 — P3 SS Parq. Motos: Tendido y ponchado de cable Cat6",
                1: "Mar 22/09 — P3 SS Parq. Motos: Montaje AP, pruebas RSSI, handoff y PoE",
                2: "Mié 23/09 — P4 (Por definir): Tendido y ponchado de cable Cat6",
                3: "Jue 24/09 — P4 (Por definir): Montaje AP, pruebas RSSI, handoff y consumo PoE. Cierre de proyecto",
            }
        };
        const wifiHoyDesc = (wifiPorDia[semNum] && wifiPorDia[semNum][diaIndex]) ? wifiPorDia[semNum][diaIndex] : null;

        if (wifiHoyDesc) {
            bodyHtml += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: bold; color: #8e44ad; background: #fdfefe;" colspan="6">
                    <i class="fa-solid fa-wifi"></i> PROYECTO 4: DESPLIEGUE RED Wi-Fi Y PUNTOS DE RED SS
                </td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                <td style="padding: 10px 12px; padding-left: 25px; color: #8e44ad; font-weight: 600;">${wifiHoyDesc}</td>
                <td colspan="2" style="padding: 8px;">
                    <div style="background: #8e44ad; color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">Instalación en Campo (Mañana)</div>
                </td>
                <td style="background: rgba(189, 195, 199, 0.1); text-align: center; font-size: 0.75rem; color: #7f8c8d; font-style: italic;">Almuerzo</td>
                <td colspan="2" style="padding: 8px;">
                    <div style="background: #8e44ad; color: white; text-align: center; padding: 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">Pruebas y Certificación (Tarde)</div>
                </td>
            </tr>
            `;
        }

        tableContainer.innerHTML = `
            <div style="overflow-x: auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead>${headerHtml}</thead>
                    <tbody>${bodyHtml}</tbody>
                </table>
            </div>
        `;
    }

    function renderizarGanttDinamico() {
        const view = ganttViewSelector.value;
        
        ganttViewContainers.forEach(container => {
            container.style.display = 'none';
        });

        if (view === 'semestral') {
            const semContainer = document.getElementById('gantt-semestral');
            if (semContainer) semContainer.style.display = 'block';
        } else if (view === 'mensual') {
            const menContainer = document.getElementById('gantt-mensual');
            if (menContainer) menContainer.style.display = 'block';
            renderizarGanttMensual();
        } else if (view === 'semanal') {
            const semContainer = document.getElementById('gantt-semanal');
            if (semContainer) semContainer.style.display = 'block';
            renderizarGanttSemanal();
        } else if (view === 'diario') {
            const diaContainer = document.getElementById('gantt-diario');
            if (diaContainer) diaContainer.style.display = 'block';
            renderizarGanttDiario();
        }
    }

    function actualizarFiltrosGantt() {
        const view = ganttViewSelector.value;
        
        if (view === 'semestral') {
            if(filterMesWrapper) filterMesWrapper.style.display = 'none';
            if(filterSemanaWrapper) filterSemanaWrapper.style.display = 'none';
            if(filterDiaWrapper) filterDiaWrapper.style.display = 'none';
        } else if (view === 'mensual') {
            if(filterMesWrapper) filterMesWrapper.style.display = 'block';
            if(filterSemanaWrapper) filterSemanaWrapper.style.display = 'none';
            if(filterDiaWrapper) filterDiaWrapper.style.display = 'none';
        } else if (view === 'semanal') {
            if(filterMesWrapper) filterMesWrapper.style.display = 'none';
            if(filterSemanaWrapper) filterSemanaWrapper.style.display = 'block';
            if(filterDiaWrapper) filterDiaWrapper.style.display = 'none';
        } else if (view === 'diario') {
            if(filterMesWrapper) filterMesWrapper.style.display = 'none';
            if(filterSemanaWrapper) filterSemanaWrapper.style.display = 'block';
            if(filterDiaWrapper) filterDiaWrapper.style.display = 'block';
        }

        renderizarGanttDinamico();
    }

    if (ganttViewSelector) {
        ganttViewSelector.addEventListener('change', actualizarFiltrosGantt);
        actualizarFiltrosGantt();
    }
    if (filterMes) {
        filterMes.addEventListener('change', renderizarGanttDinamico);
    }
    if (filterSemana) {
        filterSemana.addEventListener('change', renderizarGanttDinamico);
    }
    if (filterDia) {
        filterDia.addEventListener('change', renderizarGanttDinamico);
    }

    // ==========================================
    // 7. INTERACTIVIDAD BITÁCORA Y CRONOGRAMA
    // ==========================================
    const taskCircles = document.querySelectorAll('.task-circle');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const btnPrevWeek = document.getElementById('btn-prev-week');
    const btnNextWeek = document.getElementById('btn-next-week');
    const weekLabel = document.getElementById('week-label');
    const bitacoraSub = document.getElementById('bitacora-sub');
    let semanaActual = 1;

    const nombresSemanas = [
        "Dispositivos Publicitarios - Lote 1",
        "Dispositivos Publicitarios - Lote 2",
        "Dispositivos Publicitarios (Restantes) y Admin",
        "Administración (Restantes)",
        "Mercadeo, Operaciones y Puntos de Información",
        "Seguridad, Puesto de Control y Lobbys"
    ];

    function actualizarMetricasBitacora() {
        const percentageMto = 0;
        const percentageSoft = 0;
        const percentageInfra = 0;
        const percentageTotal = 0;
        const faltante = 100;

        const mtoProgressVal = document.getElementById('gantt-progreso-mto');
        const mtoProgressBar = document.getElementById('gantt-bar-mto');
        if (mtoProgressVal && mtoProgressBar) {
            mtoProgressVal.innerText = `${percentageMto}%`;
            mtoProgressBar.style.width = `${percentageMto}%`;
        }

        const softProgressVal = document.getElementById('gantt-progreso-soft');
        const softProgressBar = document.getElementById('gantt-bar-soft');
        if (softProgressVal && softProgressBar) {
            softProgressVal.innerText = `${percentageSoft}%`;
            softProgressBar.style.width = `${percentageSoft}%`;
        }

        const infraProgressVal = document.getElementById('gantt-progreso-infra');
        const infraProgressBar = document.getElementById('gantt-bar-infra');
        if (infraProgressVal && infraProgressBar) {
            infraProgressVal.innerText = `${percentageInfra}%`;
            infraProgressBar.style.width = `${percentageInfra}%`;
        }

        const totalLabel = document.getElementById('gantt-progreso-total-label');
        const totalBar = document.getElementById('gantt-bar-total');
        const totalBadge = document.getElementById('gantt-progreso-total-badge');
        const faltanteBadge = document.getElementById('gantt-progreso-faltante-badge');

        if (totalLabel) totalLabel.innerText = `${percentageTotal.toFixed(1)}% completado`;
        if (totalBar) totalBar.style.width = `${percentageTotal}%`;
        if (totalBadge) totalBadge.innerText = `${percentageTotal.toFixed(1)}%`;
        if (faltanteBadge) faltanteBadge.innerText = `${faltante.toFixed(1)}%`;

        const loteProgresoVal = document.getElementById('lote-progreso');
        if (loteProgresoVal) {
            loteProgresoVal.innerText = `0.0%`;
        }

        const kpiSemanalVal = document.getElementById('kpi-completadas-val');
        const progressFill = document.getElementById('semana-progress');
        if (kpiSemanalVal && progressFill) {
            kpiSemanalVal.innerText = `0 / 8`;
            progressFill.style.width = `0%`;
        }
    }

    function actualizarVistaSemana() {
        timelineItems.forEach(item => item.classList.remove('active'));
        const itemActivo = document.querySelector(`.timeline-item[data-week="${semanaActual}"]`);
        if (itemActivo) itemActivo.classList.add('active');
        actualizarMetricasBitacora();
    }

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            semanaActual = parseInt(item.getAttribute('data-week'));
            actualizarVistaSemana();
        });
    });
});