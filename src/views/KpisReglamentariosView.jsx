import React, { useState, useMemo } from 'react';
import ChartCanvas from '../components/ChartCanvas';

const centerTextPlugin = (text, color) => ({
  id: 'centerText_' + text,
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    ctx.save();
    ctx.font = `bold ${(height / 110).toFixed(2)}em 'Segoe UI', sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color || '#2c3e50';
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2.15;
    ctx.fillText(text, textX, textY);
    ctx.restore();
  },
});

// 1. KPI Ezytec (4.62 / 5.0)
const KPI1_DATA = {
  labels: ['Nota Obtenida: 4.62 (36/39 en SLA)', 'Brecha: 0.38 (3 fuera de SLA)'],
  datasets: [
    {
      data: [4.62, 0.38],
      backgroundColor: ['#2ecc71', '#ecf0f1'],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

const KPI1_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '78%',
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 11 } } },
    tooltip: { callbacks: { label: (c) => `${c.label}: ${Number(c.raw).toFixed(2)} pts` } },
  },
};

// 2. KPI Manting (4.44 / 5.0)
const KPI2_DATA = {
  labels: ['Nota Obtenida: 4.44 (64/72 Resueltos: CCTV y RDH 100%)', 'Brecha: 0.56 (8 Pendientes: Welcome)'],
  datasets: [
    {
      data: [4.44, 0.56],
      backgroundColor: ['#f39c12', '#fee2e2'],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

const KPI2_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '78%',
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 11 } } },
    tooltip: { callbacks: { label: (c) => `${c.label}: ${Number(c.raw).toFixed(2)} pts` } },
  },
};

// 3. KPI Área de Soporte TI (4.89 / 5.0)
const KPI3_SOPORTE_DATA = {
  labels: ['Nota Obtenida: 4.89 (91/93 Tickets TI Resueltos)', 'Brecha: 0.11 (2 Pendientes)'],
  datasets: [
    {
      data: [4.89, 0.11],
      backgroundColor: ['#2980b9', '#ecf0f1'],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

const KPI3_SOPORTE_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '78%',
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 11 } } },
    tooltip: { callbacks: { label: (c) => `${c.label}: ${Number(c.raw).toFixed(2)} pts` } },
  },
};

// 4. KPI Desarrollo de Software (5.00 / 5.0)
const KPI4_SW_DATA = {
  labels: [
    'M1: Portal Principal Pirarucú',
    'M2: Calendario y Eventos 2026',
    'M3: Políticas y Procedimientos',
    'M4: Solicitudes en Línea',
    'M5: Directorio y Contacto',
    'M6: Asistente IA Pirarucú',
  ],
  datasets: [
    {
      label: 'Nota (0 a 5.0)',
      data: [5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
      backgroundColor: ['#1b4d3e', '#16a34a', '#1b4d3e', '#16a34a', '#1b4d3e', '#16a34a'],
      borderRadius: 4,
    },
  ],
};

const KPI4_SW_OPTIONS = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true,
      max: 5.0,
      ticks: {
        stepSize: 1.0,
        callback: (v) => v.toFixed(1) + ' / 5',
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (c) => `Nota: ${Number(c.raw).toFixed(2)} / 5.0` } },
  },
};

export default function KpisReglamentariosView() {
  const [activeTopTab, setActiveTopTab] = useState('kpis');

  const kpi1Plugins = useMemo(() => [centerTextPlugin('4.62 / 5', '#2ecc71')], []);
  const kpi2Plugins = useMemo(() => [centerTextPlugin('4.44 / 5', '#f39c12')], []);
  const kpi3Plugins = useMemo(() => [centerTextPlugin('4.89 / 5', '#2980b9')], []);

  return (
    <section id="main-tabs-container" style={{ padding: '20px' }}>
      <div className="top-tabs-menu" style={{ display: 'flex', gap: '15px', marginBottom: '25px', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <button
          className={`top-tab-btn ${activeTopTab === 'kpis' ? 'active' : ''}`}
          onClick={() => setActiveTopTab('kpis')}
        >
          <i className="fa-solid fa-chart-line" style={{ color: 'var(--accent-color)' }}></i> Consolidado KPIs (Escala 0 a 5)
        </button>
        <button
          className={`top-tab-btn ${activeTopTab === 'ezytec' ? 'active' : ''}`}
          onClick={() => setActiveTopTab('ezytec')}
        >
          <i className="fa-solid fa-car" style={{ color: '#2ecc71' }}></i> 1. Detalle Ezytec (4.62 / 5.0)
        </button>
        <button
          className={`top-tab-btn ${activeTopTab === 'manting' ? 'active' : ''}`}
          onClick={() => setActiveTopTab('manting')}
        >
          <i className="fa-solid fa-shield-halved" style={{ color: '#f39c12' }}></i> 2. Detalle Manting (4.44 / 5.0)
        </button>
      </div>

      {activeTopTab === 'kpis' && (
        <div id="tab-kpis" className="top-tab-content active">
          {/* Banner Conglomerado Global en Escala de 0 a 5 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1b4d3e 100%)',
              color: 'white',
              borderRadius: '14px',
              padding: '22px 26px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px',
              boxShadow: '0 10px 25px rgba(15, 23, 42, 0.14)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#86efac', fontWeight: 800, marginBottom: '4px' }}>
                <i className="fa-solid fa-ranking-star"></i> Calificación Conglomerada (Escala de 0.00 a 5.00)
              </div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.45rem', fontWeight: 800, color: 'white' }}>
                Nota Global Conglomerada de Gestión TI
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1' }}>
                Promedio de los 4 frentes evaluados: <strong>1. Ezytec (4.62)</strong> · <strong>2. Manting (4.44)</strong> · <strong>3. Área de Soporte (4.89)</strong> · <strong>4. Desarrollo de Software (5.00)</strong>
              </p>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderRadius: '12px',
                padding: '12px 24px',
                textAlign: 'center',
                minWidth: '180px',
              }}
            >
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#4ade80', lineHeight: 1.1 }}>
                4.74 <span style={{ fontSize: '1.15rem', color: '#cbd5e1', fontWeight: 700 }}>/ 5.0</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                Promedio General (94.8%)
              </div>
            </div>
          </div>

          {/* Las 4 Tarjetas de KPI en Notas de 0 a 5 */}
          <div className="kpi-cards" style={{ marginBottom: '26px' }}>
            {/* 1. Ezytec */}
            <div className="card green-border" style={{ borderLeftColor: '#2ecc71' }}>
              <div className="card-header">
                <span>1. KPI CUMPLIMIENTO EZYTEC</span>
                <i className="fa-solid fa-car" style={{ color: '#2ecc71' }}></i>
              </div>
              <div className="card-value" style={{ color: '#2ecc71' }}>
                4.62 <span style={{ fontSize: '1.1rem', color: '#94a3b8' }}>/ 5.0</span>
              </div>
              <p className="kpi-detail">
                ANS <strong>92.3%</strong> (36/39 en SLA) · Satisfactorio ✓
              </p>
            </div>

            {/* 2. Manting */}
            <div className="card" style={{ borderLeftColor: '#f39c12' }}>
              <div className="card-header">
                <span>2. KPI CUMPLIMIENTO MANTING</span>
                <i className="fa-solid fa-shield-halved" style={{ color: '#f39c12' }}></i>
              </div>
              <div className="card-value" style={{ color: '#f39c12' }}>
                4.44 <span style={{ fontSize: '1.1rem', color: '#94a3b8' }}>/ 5.0</span>
              </div>
              <p className="kpi-detail">
                Resolución <strong>88.9%</strong> (64/72 · Pendiente: Welcome)
              </p>
            </div>

            {/* 3. Área de Soporte */}
            <div className="card" style={{ borderLeftColor: '#2980b9' }}>
              <div className="card-header">
                <span>3. KPI ÁREA DE SOPORTE TI</span>
                <i className="fa-solid fa-headset" style={{ color: '#2980b9' }}></i>
              </div>
              <div className="card-value" style={{ color: '#2980b9' }}>
                4.89 <span style={{ fontSize: '1.1rem', color: '#94a3b8' }}>/ 5.0</span>
              </div>
              <p className="kpi-detail">
                Efectividad <strong>97.8%</strong> (91/93 tickets TI resueltos)
              </p>
            </div>

            {/* 4. Desarrollo de Software */}
            <div className="card green-border" style={{ borderLeftColor: '#1b4d3e' }}>
              <div className="card-header">
                <span>4. KPI DESARROLLO DE SOFTWARE</span>
                <i className="fa-solid fa-code" style={{ color: '#1b4d3e' }}></i>
              </div>
              <div className="card-value" style={{ color: '#1b4d3e' }}>
                5.00 <span style={{ fontSize: '1.1rem', color: '#94a3b8' }}>/ 5.0</span>
              </div>
              <p className="kpi-detail">
                Cumplimiento <strong>100%</strong> (Intranet en Producción)
              </p>
            </div>
          </div>

          {/* Tabla Conglomerada + Gráfica Comparativa de Barras (0 a 5) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '22px',
              marginBottom: '28px',
            }}
          >
            <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginTop: 0, marginBottom: '12px', fontSize: '1.02rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-table-list" style={{ color: 'var(--accent-color)' }}></i> Matriz Conglomerada de Calificación (Escala 0.0 a 5.0)
              </h4>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ width: '100%', fontSize: '0.82rem' }}>
                  <thead>
                    <tr>
                      <th>Frente Evaluado</th>
                      <th style={{ textAlign: 'center' }}>Base / Evidencia</th>
                      <th style={{ textAlign: 'center' }}>% Cumpl.</th>
                      <th style={{ textAlign: 'center' }}>Nota (0 a 5)</th>
                      <th>Concepto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>1. Ezytec (Smart Parking)</strong>
                        <div style={{ fontSize: '0.73rem', color: '#64748b' }}>ANS Correctivo Octubre 2026</div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>36 / 39 SLA</td>
                      <td style={{ textAlign: 'center', color: '#475569' }}>92.3%</td>
                      <td style={{ textAlign: 'center', fontWeight: 900, color: '#16a34a', fontSize: '0.96rem' }}>4.62 / 5.0</td>
                      <td>
                        <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px' }}>
                          Satisfactorio
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>2. Manting (CCTV, BMS, RDH)</strong>
                        <div style={{ fontSize: '0.73rem', color: '#64748b' }}>Cámaras y RDH solucionados · Pend. Welcome</div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>64 / 72 Tickets</td>
                      <td style={{ textAlign: 'center', color: '#475569' }}>88.9%</td>
                      <td style={{ textAlign: 'center', fontWeight: 900, color: '#d97706', fontSize: '0.96rem' }}>4.44 / 5.0</td>
                      <td>
                        <span className="badge" style={{ background: '#fef3c7', color: '#b45309', fontWeight: 700, fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px' }}>
                          8 Pend. (Welcome)
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>3. Área de Soporte TI</strong>
                        <div style={{ fontSize: '0.73rem', color: '#64748b' }}>Mesa de Ayuda Interna + Mto. Preventivo</div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>91 / 93 Tickets</td>
                      <td style={{ textAlign: 'center', color: '#475569' }}>97.8%</td>
                      <td style={{ textAlign: 'center', fontWeight: 900, color: '#2563eb', fontSize: '0.96rem' }}>4.89 / 5.0</td>
                      <td>
                        <span className="badge" style={{ background: '#dbeafe', color: '#1d4ed8', fontWeight: 700, fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px' }}>
                          Sobresaliente
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>4. Desarrollo de Software</strong>
                        <div style={{ fontSize: '0.73rem', color: '#64748b' }}>Intranet Primavera Urbana ("Pirarucú")</div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>6 / 6 Módulos</td>
                      <td style={{ textAlign: 'center', color: '#475569' }}>100%</td>
                      <td style={{ textAlign: 'center', fontWeight: 900, color: '#1b4d3e', fontSize: '0.96rem' }}>5.00 / 5.0</td>
                      <td>
                        <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px' }}>
                          Excelente ✓
                        </span>
                      </td>
                    </tr>
                    <tr style={{ background: '#f8fafc', borderTop: '2px solid #cbd5e1' }}>
                      <td style={{ fontWeight: 800, color: '#0f172a' }}>NOTA GLOBAL CONGLOMERADA</td>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>4 Frentes</td>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>94.8%</td>
                      <td style={{ textAlign: 'center', fontWeight: 900, color: '#16a34a', fontSize: '1.02rem' }}>4.74 / 5.0</td>
                      <td>
                        <span className="badge" style={{ background: '#16a34a', color: 'white', fontWeight: 800, fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px' }}>
                          Meta Superada ✓
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <h3 className="kpi-section-title">
            <i className="fa-solid fa-chart-pie"></i> Desglose de Calificación Individual por Frente (Notas de 0 a 5)
          </h3>

          <div className="chart-grid">
            {/* 1. Ezytec */}
            <div className="chart-container-custom">
              <div className="chart-header">
                <h4>
                  <i className="fa-solid fa-car" style={{ color: '#2ecc71' }}></i> 1. KPI Ezytec — Nota: 4.62 / 5.0
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '10px' }}>
                Fórmula: <strong>(36 / 39) × 5.0 = 4.62 / 5.0</strong> (92.3% en SLA &le;24h)
              </p>
              <div style={{ position: 'relative', height: '240px', width: '100%' }}>
                <ChartCanvas id="kpi1Chart" type="doughnut" data={KPI1_DATA} options={KPI1_OPTIONS} plugins={kpi1Plugins} />
              </div>
              <p style={{ fontSize: '0.78rem', color: '#7f8c8d', textAlign: 'center', marginTop: '8px' }}>
                <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>Meta mínima: 4.50 / 5.0 (Cumplido ✓)</span>
              </p>
            </div>

            {/* 2. Manting */}
            <div className="chart-container-custom">
              <div className="chart-header">
                <h4>
                  <i className="fa-solid fa-shield-halved" style={{ color: '#f39c12' }}></i> 2. KPI Manting — Nota: 4.44 / 5.0
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '10px' }}>
                Fórmula: <strong>(64 / 72) × 5.0 = 4.44 / 5.0</strong> (Cámaras y RDH 100% resueltos)
              </p>
              <div style={{ position: 'relative', height: '240px', width: '100%' }}>
                <ChartCanvas id="kpi2Chart" type="doughnut" data={KPI2_DATA} options={KPI2_OPTIONS} plugins={kpi2Plugins} />
              </div>
              <p style={{ fontSize: '0.78rem', color: '#7f8c8d', textAlign: 'center', marginTop: '8px' }}>
                <span style={{ color: '#d97706', fontWeight: 'bold' }}>Único pendiente: Sistema Welcome (8 tickets)</span>
              </p>
            </div>

            {/* 3. Área de Soporte TI */}
            <div className="chart-container-custom">
              <div className="chart-header">
                <h4>
                  <i className="fa-solid fa-headset" style={{ color: '#2980b9' }}></i> 3. KPI Área de Soporte TI — Nota: 4.89 / 5.0
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '10px' }}>
                Fórmula: <strong>(91 / 93) × 5.0 = 4.89 / 5.0</strong> (97.8% de efectividad)
              </p>
              <div style={{ position: 'relative', height: '240px', width: '100%' }}>
                <ChartCanvas id="kpi3SoporteChart" type="doughnut" data={KPI3_SOPORTE_DATA} options={KPI3_SOPORTE_OPTIONS} plugins={kpi3Plugins} />
              </div>
              <p style={{ fontSize: '0.78rem', color: '#7f8c8d', textAlign: 'center', marginTop: '8px' }}>
                <span style={{ color: '#2980b9', fontWeight: 'bold' }}>91 solucionados · 2 pendientes</span> · Meta: 4.50 / 5.0 ✓
              </p>
            </div>

            {/* 4. Desarrollo de Software */}
            <div className="chart-container-custom">
              <div className="chart-header">
                <h4>
                  <i className="fa-solid fa-code" style={{ color: '#1b4d3e' }}></i> 4. KPI Desarrollo Software — Nota: 5.00 / 5.0
                </h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '10px' }}>
                Fórmula: <strong>(6 / 6 Módulos) × 5.0 = 5.00 / 5.0</strong> (Intranet Primavera Urbana)
              </p>
              <div style={{ position: 'relative', height: '240px', width: '100%' }}>
                <ChartCanvas id="kpi4SwChart" type="bar" data={KPI4_SW_DATA} options={KPI4_SW_OPTIONS} />
              </div>
              <p style={{ fontSize: '0.78rem', color: '#7f8c8d', textAlign: 'center', marginTop: '8px' }}>
                <span style={{ color: '#16a34a', fontWeight: 'bold' }}>Nota Máxima 5.00 / 5.0</span> · En Producción (Vercel + IA Pirarucú)
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTopTab === 'ezytec' && (
        <div id="tab-ezytec" className="top-tab-content active">
          <h3 className="kpi-section-title">
            <i className="fa-solid fa-car" style={{ color: '#2ecc71' }}></i> Evaluación Mensual Contratista: EZYTEC (E-Global)
          </h3>
          <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '30px', borderTop: '4px solid #2ecc71' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h4 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginBottom: '5px' }}>Mantenimiento Sistema Smart Parking</h4>
                <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Periodo Evaluado: Octubre 2026 | Contrato a 12 meses</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71' }}>4.62</span>
                <span style={{ fontSize: '1.2rem', color: '#95a5a6' }}> / 5.00</span>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#27ae60', background: 'rgba(46, 204, 113, 0.1)', padding: '4px 12px', borderRadius: '12px', display: 'inline-block', marginTop: '5px' }}>
                  SATISFACTORIO (ANS 92.3%)
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h5 style={{ color: 'var(--text-color)', marginBottom: '10px', fontSize: '0.95rem' }}>Resumen de Operación — Octubre 2026</h5>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#555' }}>
                  <li style={{ marginBottom: '8px' }}>
                    <i className="fa-solid fa-check" style={{ color: '#2ecc71', marginRight: '8px' }}></i> <strong>Incidentes Cerrados:</strong> 39 incidentes atendidos y cerrados (32 OTs correctivas ejecutadas)
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <i className="fa-solid fa-clock" style={{ color: '#2ecc71', marginRight: '8px' }}></i> <strong>Nivel de Servicio ANS:</strong> Nota <strong>4.62 / 5.0</strong> (92.3% vs 90% contratado; 36 de 39 en SLA de 24h hábiles)
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <i className="fa-solid fa-calendar-check" style={{ color: '#e67e22', marginRight: '8px' }}></i> <strong>Mto. Preventivo:</strong> 0 de 1 ejecutado (ACOMPAÑAMIENTO-01: No ejecutado)
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    <i className="fa-solid fa-screwdriver-wrench" style={{ color: '#3498db', marginRight: '8px' }}></i> <strong>Canales de Resolución:</strong> En Sitio/Campo 38% (15), Remoto/Mesa de Ayuda 33% (13), Configuración/SW 15% (6), Cambio Repuesto 8% (3), Otros 5% (2)
                  </li>
                </ul>
              </div>
              <div>
                <h5 style={{ color: 'var(--text-color)', marginBottom: '10px', fontSize: '0.95rem' }}>Desglose de Calificación (Escala 0 a 5.0)</h5>
                <table className="data-table" style={{ fontSize: '0.78rem', width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Ítem Evaluado</th>
                      <th style={{ textAlign: 'center' }}>Evidencia</th>
                      <th style={{ textAlign: 'right' }}>Nota (0 a 5)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cumplimiento ANS (&le;24h hábiles)</td>
                      <td style={{ textAlign: 'center' }}>36 / 39 en SLA</td>
                      <td style={{ textAlign: 'right', color: '#27ae60', fontWeight: 'bold' }}>4.62 / 5.0</td>
                    </tr>
                    <tr>
                      <td>Cierre de Correctivos Octubre</td>
                      <td style={{ textAlign: 'center' }}>39 / 39 cerrados</td>
                      <td style={{ textAlign: 'right', color: '#27ae60', fontWeight: 'bold' }}>5.00 / 5.0</td>
                    </tr>
                    <tr>
                      <td>Detalle Técnico y Trazabilidad OTs</td>
                      <td style={{ textAlign: 'center' }}>32 OTs documentadas</td>
                      <td style={{ textAlign: 'right', color: '#27ae60', fontWeight: 'bold' }}>5.00 / 5.0</td>
                    </tr>
                    <tr style={{ background: '#f8f9fa' }}>
                      <td style={{ fontWeight: 'bold' }}>CALIFICACIÓN CONSOLIDADA EZYTEC</td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold' }}>92.3%</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#2ecc71', fontSize: '0.92rem' }}>4.62 / 5.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTopTab === 'manting' && (
        <div id="tab-manting" className="top-tab-content active">
          <h3 className="kpi-section-title">
            <i className="fa-solid fa-shield-halved" style={{ color: '#f39c12' }}></i> Evaluación Contratista: MANTING (Soporte CCTV, BMS, RDH y Accesos)
          </h3>
          <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '30px', borderTop: '4px solid #f39c12' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h4 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginBottom: '5px' }}>Soporte Correctivo y Preventivo (CCTV, BMS, RDH y Welcome)</h4>
                <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Periodo Consolidado: Agosto – Noviembre 2026 | 72 Tickets en Matriz Interna</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>4.44</span>
                <span style={{ fontSize: '1.2rem', color: '#95a5a6' }}> / 5.00</span>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#b45309', background: '#fef3c7', padding: '4px 12px', borderRadius: '12px', display: 'inline-block', marginTop: '5px' }}>
                  64 / 72 SOLUCIONADOS (88.9%)
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h5 style={{ color: 'var(--text-color)', marginBottom: '10px', fontSize: '0.95rem' }}>Calificación por Subsistema (Escala 0 a 5)</h5>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: '#555' }}>
                  <li style={{ marginBottom: '10px' }}>
                    <i className="fa-solid fa-circle-check" style={{ color: '#2ecc71', marginRight: '8px' }}></i> <strong>CCTV / Cámaras:</strong> Nota <strong>5.00 / 5.0</strong> (100% de los tickets solucionados).
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <i className="fa-solid fa-circle-check" style={{ color: '#2ecc71', marginRight: '8px' }}></i> <strong>Red Detección de Humo (RDH):</strong> Nota <strong>5.00 / 5.0</strong> (100% de los tickets solucionados).
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <i className="fa-solid fa-circle-check" style={{ color: '#2ecc71', marginRight: '8px' }}></i> <strong>Control de Accesos y Botones de Pánico:</strong> Nota <strong>5.00 / 5.0</strong> (Solucionados).
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <i className="fa-solid fa-clock" style={{ color: '#e67e22', marginRight: '8px' }}></i> <strong>Sistema Welcome (Único Pendiente):</strong> 8 tickets abiertos asociados a lentitud en el registro de visitantes en lobbies.
                  </li>
                </ul>
              </div>
              <div>
                <h5 style={{ color: 'var(--text-color)', marginBottom: '10px', fontSize: '0.95rem' }}>Consolidado de Incidencias Manting — Octubre (64 Tickets)</h5>
                <table className="data-table" style={{ fontSize: '0.8rem', width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Subsistema / Módulo</th>
                      <th style={{ textAlign: 'center' }}>N.° Tickets</th>
                      <th style={{ textAlign: 'right' }}>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sistema de Control de Accesos</td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold' }}>22</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#e74c3c' }}>34.4%</td>
                    </tr>
                    <tr>
                      <td>CCTV / Cámaras</td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold' }}>21</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#3498db' }}>32.8%</td>
                    </tr>
                    <tr>
                      <td>Sistema Welcome (En gestión de optimización)</td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold' }}>17</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#f39c12' }}>26.6%</td>
                    </tr>
                    <tr>
                      <td>Red Detección de Humo (RDH)</td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold' }}>3</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#e67e22' }}>4.7%</td>
                    </tr>
                    <tr>
                      <td>Intrusión (Botón de pánico)</td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold' }}>1</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--primary-color)' }}>1.5%</td>
                    </tr>
                    <tr style={{ background: '#f8f9fa', borderTop: '2px solid var(--border-color)' }}>
                      <td style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Total Tickets Octubre</td>
                      <td style={{ textAlign: 'center', fontWeight: 'bold', color: '#e74c3c' }}>64</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--primary-color)' }}>100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
