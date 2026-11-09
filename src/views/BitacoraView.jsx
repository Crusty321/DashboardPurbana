import React, { useState } from 'react';

const MESES_DATA = {
  Julio: {
    semanas: ['Semana 1 (20-26 Jul)', 'Semana 2 (27 Jul - 2 Ago)'],
    mto: 'Fase 1: Mantenimiento Pantallas y Totems (Publicidad)',
    mtoColspan: 2,
    mtoResto: 0,
    soft: 'Fase 1: Diseño Base de Datos y UI (Intranet)',
    softColspan: 2,
    softResto: 0,
    cctv: 'Cableado y Balanceo NVR (Mar/Jue)',
  },
  Agosto: {
    semanas: ['Semana 3 (3-9 Ago)', 'Semana 4 (10-16 Ago)', 'Semana 5 (17-23 Ago)', 'Semana 6 (24-30 Ago)'],
    mto: 'Fase 2: Ejecución Pantallas Publicitarias',
    mtoColspan: 4,
    mtoResto: 0,
    soft: 'Fase 1 (S3-S4) / Fase 2: Login y Roles (S5-S6)',
    softColspan: 4,
    softResto: 0,
    cctv: 'Revisión de DVRs perimetrales (Mar/Jue)',
  },
  Septiembre: {
    semanas: ['Semana 7 (31 Ago-6 Sep)', 'Semana 8 (7-13 Sep)', 'Semana 9 (14-20 Sep)', 'Semana 10 (21-27 Sep)'],
    mto: 'Cierre Pantallas (S7) / Mto. PCs Admin (S8-S10)',
    mtoColspan: 4,
    mtoResto: 0,
    soft: 'Fase 2: Admin (S7-S8) / Fase 3: Gestión Doc (S9-S10)',
    softColspan: 4,
    softResto: 0,
    cctv: 'Enrutamiento racks principales (Mar/Jue)',
    wifi: 'F0 Switch 14/09 · P1 Carulla 15-16/09 · P2 Falabella 17-18/09 · P3 Parq.Motos 21-22/09 · P4 (por def.) 23-24/09',
    wifiColspan: 2,
    wifiEmpty: 0,
  },
  Octubre: {
    semanas: ['Semana 11 (28 Sep-4 Oct)', 'Semana 12 (5-11 Oct)', 'Semana 13 (12-18 Oct)', 'Semana 14 (19-25 Oct)'],
    mto: 'Mto. PCs Admin (S11) / Mercadeo, Ops e Info (S12-S14)',
    mtoColspan: 4,
    mtoResto: 0,
    soft: 'Fase 3 (S11-S12) / Fase 4: Muro y Avisos (S13-S14)',
    softColspan: 4,
    softResto: 0,
    cctv: 'Saneamiento de conmutadores CCTV',
  },
  Noviembre: {
    semanas: ['Semana 15 (26 Oct-1 Nov)', 'Semana 16 (2-8 Nov)', 'Semana 17 (9-15 Nov)'],
    mto: 'Mercadeo/Ops (S15) / Mto. Seguridad, Ctrl y Lobbys (S16-S17)',
    mtoColspan: 3,
    mtoResto: 0,
    soft: 'Fase 4 (S15) / Fase 5: Pruebas y QA (S16)',
    softColspan: 2,
    softResto: 1,
    cctv: 'Aseguramiento conectividad NVR (S15-S16)',
  },
  Diciembre: {
    semanas: ['Semana 18 (Consolidación)'],
    mto: 'Cierre de Ciclo y Hojas de Vida (HDV)',
    mtoColspan: 1,
    mtoResto: 0,
    soft: 'Completado y Desplegado',
    softColspan: 1,
    softResto: 0,
    cctv: 'Consolidación de Informes CCTV',
  },
};

const SEMANAS_FULL_DATA = {
  1: { rango: '20 - 26 Jul', mtoDesc: 'Mto. Pantallas y Totems (Lote 1)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 1: Diseño base de datos e interfaz', softDias: [true, false, false, false, true, false] },
  2: { rango: '27 Jul - 2 Ago', mtoDesc: 'Mto. Pantallas y Totems (Lote 1)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 1: Modelado de tablas y vistas', softDias: [true, false, false, false, true, false] },
  3: { rango: '3 - 9 Ago', mtoDesc: 'Mto. Pantallas y Totems (Lote 1)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 1: Definición de APIs REST', softDias: [true, false, false, false, true, false] },
  4: { rango: '10 - 16 Ago', mtoDesc: 'Mto. Pantallas y Totems (Lote 1)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 1: Pruebas de integración de datos', softDias: [true, false, false, false, true, false] },
  5: { rango: '17 - 23 Ago', mtoDesc: 'Mto. Pantallas y Totems (Lote 1)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 2: Arquitectura login y tokens', softDias: [true, false, false, false, true, false] },
  6: { rango: '24 - 30 Ago', mtoDesc: 'Mto. Pantallas y Totems (Lote 1)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 2: Módulo de control de roles', softDias: [true, false, false, false, true, false] },
  7: { rango: '31 Ago - 6 Sep', mtoDesc: 'Cierre de Lote 1 de Pantallas', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 2: Pruebas y validaciones de login', softDias: [true, false, false, false, true, false] },
  8: { rango: '7 - 13 Sep', mtoDesc: 'Mto. PCs de Administración (Lote 2)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 2: Panel básico de administrador', softDias: [true, false, false, false, true, false] },
  9: {
    rango: '14 - 20 Sep',
    mtoDesc: 'Mto. PCs de Administración (Lote 2)',
    mtoDias: [false, true, true, true, false, false],
    softDesc: 'Fase 3: Módulo de carga de documentos',
    softDias: [true, false, false, false, true, false],
    wifiDesc: 'Lun 14/09: F0 Config Switch+VLANs · Mar 15/09: P1 Carulla Tendido · Mié 16/09: P1 Carulla AP+Pruebas · Jue 17/09: P2 Falabella Tendido · Vie 18/09: P2 Falabella AP+Pruebas',
    wifiDias: [true, true, true, true, true, false],
  },
  10: {
    rango: '21 - 27 Sep',
    mtoDesc: 'Mto. PCs de Administración (Lote 2)',
    mtoDias: [false, true, true, true, false, false],
    softDesc: 'Fase 3: Módulo de descarga de documentos',
    softDias: [true, false, false, false, true, false],
    wifiDesc: 'Lun 21/09: P3 Parq.Motos Tendido · Mar 22/09: P3 Parq.Motos AP+Pruebas · Mié 23/09: P4 Tendido · Jue 24/09: P4 Montaje AP+Pruebas',
    wifiDias: [true, true, true, true, false, false],
  },
  11: { rango: '28 Sep - 4 Oct', mtoDesc: 'Mto. PCs de Administración (Lote 2)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 3: Lógica de control de archivos', softDias: [true, false, false, false, true, false] },
  12: { rango: '5 - 11 Oct', mtoDesc: 'Mto. PCs Mercadeo, Ops e Info (Lote 3)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 3: Auditoría y log de archivos', softDias: [true, false, false, false, true, false] },
  13: { rango: '12 - 18 Oct', mtoDesc: 'Mto. PCs Mercadeo, Ops e Info (Lote 3)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 4: Muro de anuncios (Dashboard)', softDias: [true, false, false, false, true, false] },
  14: { rango: '19 - 25 Oct', mtoDesc: 'Mto. PCs Mercadeo, Ops e Info (Lote 3)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 4: Formulario de anuncios (Admin)', softDias: [true, false, false, false, true, false] },
  15: { rango: '26 Oct - 1 Nov', mtoDesc: 'Mto. PCs Mercadeo, Ops e Info (Lote 3)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 4: Feed interactivo de avisos', softDias: [true, false, false, false, true, false] },
  16: { rango: '2 - 8 Nov', mtoDesc: 'Mto. PCs Seguridad y Control (Lote 4)', mtoDias: [false, true, true, true, false, false], softDesc: 'Fase 5: Pruebas unitarias e integración', softDias: [true, false, false, false, true, false] },
};

const WIFI_POR_DIA = {
  9: {
    0: 'Lun 14/09 — F0: Montaje Switch, Config VLANs y aprovisionamiento controladora APs',
    1: 'Mar 15/09 — P1 SS CARULLA: Tendido y ponchado de cable Cat6',
    2: 'Mié 16/09 — P1 SS CARULLA: Montaje AP, certificación cable, pruebas RSSI y PoE',
    3: 'Jue 17/09 — P2 SS FALABELLA: Tendido y ponchado de cable Cat6',
    4: 'Vie 18/09 — P2 SS FALABELLA: Montaje AP, certificación cable, pruebas RSSI y PoE',
  },
  10: {
    0: 'Lun 21/09 — P3 SS Parq. Motos: Tendido y ponchado de cable Cat6',
    1: 'Mar 22/09 — P3 SS Parq. Motos: Montaje AP, pruebas RSSI, handoff y PoE',
    2: 'Mié 23/09 — P4 (Por definir): Tendido y ponchado de cable Cat6',
    3: 'Jue 24/09 — P4 (Por definir): Montaje AP, pruebas RSSI, handoff y consumo PoE. Cierre de proyecto',
  },
};

const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export default function BitacoraView() {
  const [view, setView] = useState('semestral');
  const [mes, setMes] = useState('Julio');
  const [semana, setSemana] = useState(1);
  const [dia, setDia] = useState('Lunes');

  const mesData = MESES_DATA[mes];
  const semanaData = SEMANAS_FULL_DATA[semana];
  const diaIndex = DIAS_SEMANA.indexOf(dia);
  const tieneMto = semanaData.mtoDias[diaIndex];
  const tieneSoft = semanaData.softDias[diaIndex];
  const tieneInfra = [false, true, true, true, false, false][diaIndex];
  const wifiHoyDesc = WIFI_POR_DIA[semana]?.[diaIndex] || null;

  return (
    <section id="bitacora" className="tab-content active-tab">
      <div className="table-container" style={{ marginBottom: '30px' }}>
        <div className="table-header" style={{ borderBottom: 'none', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3>
              <i className="fa-solid fa-chart-gantt" style={{ color: 'var(--accent-color)' }}></i> Cronograma de Hitos y Diagrama de Gantt TI
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
              Visión unificada del Plan de Mantenimiento, Desarrollo de Software y Mejoramiento de Infraestructura
            </p>
          </div>
        </div>

        {/* Panel de Filtros Dinámicos de Visualización */}
        <div className="gantt-filters-flex" style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px', background: 'var(--bg-color)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
          <div className="filter-item">
            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--secondary-color)', marginRight: '5px' }}>
              Escala de Tiempo:
            </label>
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="profile-btn"
              style={{ background: 'white', border: '1px solid var(--border-color)', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', padding: '6px 12px', borderRadius: '6px', outline: 'none' }}
            >
              <option value="semestral">Vista Semestral</option>
              <option value="mensual">Vista Mensual</option>
              <option value="semanal">Vista Semanal</option>
              <option value="diario">Vista Diaria</option>
            </select>
          </div>

          {view === 'mensual' && (
            <div className="filter-item">
              <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--secondary-color)', marginRight: '5px' }}>
                Seleccionar Mes:
              </label>
              <select
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                className="profile-btn"
                style={{ background: 'white', border: '1px solid var(--border-color)', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', padding: '6px 12px', borderRadius: '6px', outline: 'none' }}
              >
                <option value="Julio">Julio 2026</option>
                <option value="Agosto">Agosto 2026</option>
                <option value="Septiembre">Septiembre 2026</option>
                <option value="Octubre">Octubre 2026</option>
                <option value="Noviembre">Noviembre 2026</option>
                <option value="Diciembre">Diciembre 2026</option>
              </select>
            </div>
          )}

          {(view === 'semanal' || view === 'diario') && (
            <div className="filter-item">
              <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--secondary-color)', marginRight: '5px' }}>
                Seleccionar Semana:
              </label>
              <select
                value={semana}
                onChange={(e) => setSemana(Number(e.target.value))}
                className="profile-btn"
                style={{ background: 'white', border: '1px solid var(--border-color)', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', padding: '6px 12px', borderRadius: '6px', outline: 'none' }}
              >
                {Object.entries(SEMANAS_FULL_DATA).map(([num, info]) => (
                  <option key={num} value={num}>
                    Semana {num} ({info.rango})
                  </option>
                ))}
              </select>
            </div>
          )}

          {view === 'diario' && (
            <div className="filter-item">
              <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--secondary-color)', marginRight: '5px' }}>
                Seleccionar Día:
              </label>
              <select
                value={dia}
                onChange={(e) => setDia(e.target.value)}
                className="profile-btn"
                style={{ background: 'white', border: '1px solid var(--border-color)', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', padding: '6px 12px', borderRadius: '6px', outline: 'none' }}
              >
                {DIAS_SEMANA.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* 1. VISTA SEMESTRAL */}
        {view === 'semestral' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-color)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', width: '25%' }}>Eje de Trabajo / Actividad</th>
                  <th style={{ padding: '12px', textAlign: 'left', width: '15%' }}>Jornada / Días</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '10%' }}>Jul</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '10%' }}>Ago</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '10%' }}>Sep</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '10%' }}>Oct</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '10%' }}>Nov</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '10%' }}>Dic</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="8">
                    <i className="fa-solid fa-screwdriver-wrench"></i> 1. PLAN DE MANTENIMIENTO PREVENTIVO (50 EQUIPOS)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 1-2: Pantallas y Totems</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Mar, Mié, Jue (1 eq/día)</td>
                  <td colSpan="2" style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--accent-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Ejecución (21 Pantallas)
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 3: Computadores Admin</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Mar, Mié, Jue (1 eq/día)</td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--accent-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Ejecución (12 PC)
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 4: Mercadeo, Ops e Info</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Mar, Mié, Jue (1 eq/día)</td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--accent-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Ejecución (12 PC)
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 5: Seguridad, Ctrl y Lobbys</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Mar, Mié, Jue (1 eq/día)</td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--accent-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Ejecución (5 PC)
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 6: Consolidación y Cierre</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Cierre Anual (Docs/HDV)</td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--positive)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Cierre de Ciclo
                    </div>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="8">
                    <i className="fa-solid fa-code"></i> 2. PLAN DE DESARROLLO DE SOFTWARE (INTRANET - 4 MESES)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 1: Diseño, Requerimientos & BD</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Lunes y Viernes (TI)</td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Fase 1 (S1-S4)
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 2: Autenticación, Login & Roles</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Lunes y Viernes (TI)</td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Fase 2 (S5-S8)
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 3: Módulo de Gestión Documental</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Lunes y Viernes (TI)</td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Fase 3 (S9-S12)
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 4: Muro & Módulo de Avisos</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Lunes y Viernes (TI)</td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Fase 4 (S13-S15)
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Fase 5: Pruebas & Despliegue Local</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Lunes y Viernes (TI)</td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--positive)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Fase 5 (S16)
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="8">
                    <i className="fa-solid fa-screwdriver-wrench"></i> 3. PLAN DE MEJORAMIENTO DE INFRAESTRUCTURA (TARDES)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Plan de Mejoramiento CCTV</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Mar, Mié, Jue (Tardes)</td>
                  <td colSpan="6" style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--warning)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Ejecución Plan de Mejoramiento CCTV
                    </div>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Plan de Mejoramiento Ofimática</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Mar, Mié, Jue (Tardes)</td>
                  <td colSpan="6" style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--warning)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Ejecución Plan de Mejoramiento Herramientas Ofimáticas
                    </div>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#8e44ad', background: '#fdfefe' }} colSpan="8">
                    <i className="fa-solid fa-wifi"></i> 4. DESPLIEGUE RED Wi-Fi Y PUNTOS DE RED SS
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Instalación Wi-Fi + Puntos Red Cajeros SS</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>14–24 Sep · 2 días/punto</td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td colSpan="2" style={{ padding: '8px' }}>
                    <div style={{ background: '#8e44ad', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      F0:14/9 · P1 Carulla:15-16/9 · P2 Falabella:17-18/9 · P3 Parq.Motos:21-22/9 · P4:23-24/9
                    </div>
                  </td>
                  <td style={{ background: '#fafafa' }}></td>
                  <td style={{ background: '#fafafa' }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 2. VISTA MENSUAL */}
        {view === 'mensual' && mesData && (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-color)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', width: '25%' }}>Eje de Trabajo / Actividad</th>
                  <th style={{ padding: '12px', textAlign: 'left', width: '15%' }}>Detalle / Jornada</th>
                  {mesData.semanas.map((sem) => (
                    <th key={sem} style={{ padding: '12px', textAlign: 'center' }}>
                      {sem}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan={mesData.semanas.length + 2}>
                    <i className="fa-solid fa-clock-rotate-left"></i> EJE CRÍTICO DIARIO
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px', fontWeight: 600, color: 'var(--alert)' }}>Soporte TI y Atención de Incidencias</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Lun a Sáb (Horario Laboral)</td>
                  <td colSpan={mesData.semanas.length} style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--alert)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-headset"></i> Soporte TI (L-V 8a-12p y 2p-6p, Sáb 8a-12p)
                    </div>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan={mesData.semanas.length + 2}>
                    <i className="fa-solid fa-screwdriver-wrench"></i> PROYECTO 1: MANTENIMIENTO PREVENTIVO
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Mantenimiento Cómputo y Pantallas</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Mar, Mié, Jue (3 eq/sem)</td>
                  <td colSpan={mesData.mtoColspan} style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--accent-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {mesData.mto}
                    </div>
                  </td>
                  {mesData.mtoResto > 0 && <td colSpan={mesData.mtoResto} style={{ background: '#fafafa' }}></td>}
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan={mesData.semanas.length + 2}>
                    <i className="fa-solid fa-code"></i> PROYECTO 2: DESARROLLO DE SOFTWARE
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Desarrollo Intranet Primavera</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Lunes y Viernes (TI)</td>
                  <td colSpan={mesData.softColspan} style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {mesData.soft}
                    </div>
                  </td>
                  {mesData.softResto > 0 && <td colSpan={mesData.softResto} style={{ background: '#fafafa' }}></td>}
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan={mesData.semanas.length + 2}>
                    <i className="fa-solid fa-screwdriver-wrench"></i> PROYECTO 3: MEJORAMIENTO DE INFRAESTRUCTURA (TARDES)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Plan de Mejoramiento Infraestructura</td>
                  <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>Mar, Mié, Jue (Tardes)</td>
                  <td colSpan={mesData.semanas.length} style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--warning)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      CCTV y Herramientas Ofimáticas
                    </div>
                  </td>
                </tr>

                {mesData.wifi && (
                  <>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan={mesData.semanas.length + 2}>
                        <i className="fa-solid fa-wifi"></i> PROYECTO 4: DESPLIEGUE RED Wi-Fi Y PUNTOS DE RED SS
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Instalación Wi-Fi + Puntos de Red Cajeros SS</td>
                      <td style={{ padding: '10px 12px', color: '#7f8c8d' }}>14–24 Sep · 2 días/punto</td>
                      <td colSpan={2} style={{ background: '#fafafa' }}></td>
                      <td colSpan={2} style={{ padding: '8px' }}>
                        <div style={{ background: '#8e44ad', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 'bold' }}>
                          {mesData.wifi}
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. VISTA SEMANAL */}
        {view === 'semanal' && semanaData && (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-color)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', width: '25%' }}>Eje de Trabajo / Actividad</th>
                  {DIAS_SEMANA.map((d) => (
                    <th key={d} style={{ padding: '12px', textAlign: 'center', width: '12%' }}>
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="7">
                    <i className="fa-solid fa-clock-rotate-left"></i> EJE CRÍTICO DIARIO
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px', fontWeight: 600, color: 'var(--alert)' }}>Soporte TI y Atención de Incidencias</td>
                  <td colSpan="6" style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--alert)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-headset"></i> Soporte TI (L-V 8a-12p y 2p-6p, Sáb 8a-12p)
                    </div>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="7">
                    <i className="fa-solid fa-screwdriver-wrench"></i> PROYECTO 1: MANTENIMIENTO PREVENTIVO
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>{semanaData.mtoDesc}</td>
                  {semanaData.mtoDias.map((active, i) =>
                    active ? (
                      <td key={i} style={{ padding: '8px' }}>
                        <div style={{ background: 'var(--accent-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                          1 Equipo
                        </div>
                      </td>
                    ) : (
                      <td key={i} style={{ background: '#fafafa' }}></td>
                    )
                  )}
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="7">
                    <i className="fa-solid fa-code"></i> PROYECTO 2: DESARROLLO DE SOFTWARE
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>{semanaData.softDesc}</td>
                  {semanaData.softDias.map((active, i) =>
                    active ? (
                      <td key={i} style={{ padding: '8px' }}>
                        <div style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                          TI (5h)
                        </div>
                      </td>
                    ) : (
                      <td key={i} style={{ background: '#fafafa' }}></td>
                    )
                  )}
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="7">
                    <i className="fa-solid fa-screwdriver-wrench"></i> PROYECTO 3: MEJORAMIENTO DE INFRAESTRUCTURA (TARDES)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Plan de Mejora Infraestructura</td>
                  {[false, true, true, true, false, false].map((active, i) =>
                    active ? (
                      <td key={i} style={{ padding: '8px' }}>
                        <div style={{ background: 'var(--warning)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                          CCTV/Ofimática
                        </div>
                      </td>
                    ) : (
                      <td key={i} style={{ background: '#fafafa' }}></td>
                    )
                  )}
                </tr>

                {semanaData.wifiDesc && (
                  <>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#8e44ad', background: '#fdfefe' }} colSpan="7">
                        <i className="fa-solid fa-wifi"></i> PROYECTO 4: DESPLIEGUE RED Wi-Fi Y PUNTOS DE RED SS
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      <td style={{ padding: '10px 12px', paddingLeft: '25px', color: '#8e44ad', fontWeight: 600 }}>{semanaData.wifiDesc}</td>
                      {semanaData.wifiDias.map((active, i) =>
                        active ? (
                          <td key={i} style={{ padding: '8px' }}>
                            <div style={{ background: '#8e44ad', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                              📡 Red/WiFi SS
                            </div>
                          </td>
                        ) : (
                          <td key={i} style={{ background: '#fafafa' }}></td>
                        )
                      )}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. VISTA DIARIA */}
        {view === 'diario' && semanaData && (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-color)', borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', width: '25%' }}>Eje de Trabajo / Actividad</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '15%' }}>08:00 - 10:00</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '15%' }}>10:00 - 12:00</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '15%' }}>12:00 - 14:00</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '15%' }}>14:00 - 16:00</th>
                  <th style={{ padding: '12px', textAlign: 'center', width: '15%' }}>16:00 - 18:00</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="6">
                    <i className="fa-solid fa-clock-rotate-left"></i> EJE CRÍTICO DIARIO (RESPUESTA INSTANTÁNEA)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px', fontWeight: 600, color: 'var(--alert)' }}>
                    <i className="fa-solid fa-circle-exclamation" style={{ color: 'var(--alert)' }}></i> Soporte TI y Atención de Incidencias
                  </td>
                  <td colSpan="2" style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--alert)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-headset"></i> Soporte TI (Mañana)
                    </div>
                  </td>
                  <td style={{ background: 'rgba(189, 195, 199, 0.1)', textAlign: 'center', fontSize: '0.75rem', color: '#7f8c8d', fontStyle: 'italic' }}>Almuerzo</td>
                  <td colSpan="2" style={{ padding: '8px' }}>
                    <div style={{ background: 'var(--alert)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-headset"></i> Soporte TI (Tarde)
                    </div>
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="6">
                    <i className="fa-solid fa-screwdriver-wrench"></i> PROYECTO 1: MANTENIMIENTO PREVENTIVO
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>{semanaData.mtoDesc}</td>
                  {tieneMto ? (
                    <>
                      <td colSpan="2" style={{ padding: '8px' }}>
                        <div style={{ background: 'var(--accent-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          Mto. Preventivo Activo
                        </div>
                      </td>
                      <td style={{ background: '#fafafa' }}></td>
                      <td style={{ background: '#fafafa' }}></td>
                      <td style={{ background: '#fafafa' }}></td>
                    </>
                  ) : (
                    <td colSpan="5" style={{ background: '#fafafa', textAlign: 'center', color: '#aaa', fontStyle: 'italic' }}>
                      No programado para hoy
                    </td>
                  )}
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="6">
                    <i className="fa-solid fa-code"></i> PROYECTO 2: DESARROLLO DE SOFTWARE
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>{semanaData.softDesc}</td>
                  {tieneSoft ? (
                    <>
                      <td colSpan="2" style={{ padding: '8px' }}>
                        <div style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          Jornada de Desarrollo (Mañana)
                        </div>
                      </td>
                      <td style={{ background: '#fafafa' }}></td>
                      <td colSpan="2" style={{ padding: '8px' }}>
                        <div style={{ background: 'var(--primary-color)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          Jornada de Desarrollo (Tarde)
                        </div>
                      </td>
                    </>
                  ) : (
                    <td colSpan="5" style={{ background: '#fafafa', textAlign: 'center', color: '#aaa', fontStyle: 'italic' }}>
                      No programado para hoy
                    </td>
                  )}
                </tr>

                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary-color)', background: '#fdfefe' }} colSpan="6">
                    <i className="fa-solid fa-screwdriver-wrench"></i> PROYECTO 3: MEJORAMIENTO DE INFRAESTRUCTURA
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                  <td style={{ padding: '10px 12px', paddingLeft: '25px' }}>Plan de Mejora CCTV y Ofimática</td>
                  {tieneInfra ? (
                    <>
                      <td style={{ background: '#fafafa' }}></td>
                      <td style={{ background: '#fafafa' }}></td>
                      <td style={{ background: '#fafafa' }}></td>
                      <td colSpan="2" style={{ padding: '8px' }}>
                        <div style={{ background: 'var(--warning)', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          Mejoras de Infraestructura (Tarde)
                        </div>
                      </td>
                    </>
                  ) : (
                    <td colSpan="5" style={{ background: '#fafafa', textAlign: 'center', color: '#aaa', fontStyle: 'italic' }}>
                      No programado para hoy
                    </td>
                  )}
                </tr>

                {wifiHoyDesc && (
                  <>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#8e44ad', background: '#fdfefe' }} colSpan="6">
                        <i className="fa-solid fa-wifi"></i> PROYECTO 4: DESPLIEGUE RED Wi-Fi Y PUNTOS DE RED SS
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      <td style={{ padding: '10px 12px', paddingLeft: '25px', color: '#8e44ad', fontWeight: 600 }}>{wifiHoyDesc}</td>
                      <td colSpan="2" style={{ padding: '8px' }}>
                        <div style={{ background: '#8e44ad', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          Instalación en Campo (Mañana)
                        </div>
                      </td>
                      <td style={{ background: 'rgba(189, 195, 199, 0.1)', textAlign: 'center', fontSize: '0.75rem', color: '#7f8c8d', fontStyle: 'italic' }}>Almuerzo</td>
                      <td colSpan="2" style={{ padding: '8px' }}>
                        <div style={{ background: '#8e44ad', color: 'white', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                          Pruebas y Certificación (Tarde)
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
