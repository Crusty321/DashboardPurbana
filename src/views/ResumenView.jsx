import React from 'react';
import ChartCanvas from '../components/ChartCanvas';

const TICKETS_DATA = {
  labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
  datasets: [
    {
      label: 'Tickets Totales',
      data: [45, 38, 52, 35],
      backgroundColor: '#bdc3c7',
      borderRadius: 4,
    },
    {
      label: 'Resueltos 1ra Llamada (FCR)',
      data: [35, 32, 45, 30],
      backgroundColor: '#3498db',
      borderRadius: 4,
    },
  ],
};

const TICKETS_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true } },
  plugins: { legend: { position: 'bottom' } },
};

const INFRA_DATA = {
  labels: ['Data Center Principal', 'Racks de Piso', 'Cuarto de Monitoreo CCTV', 'Servidores de Red Local'],
  datasets: [
    {
      data: [1, 3, 1, 4],
      backgroundColor: ['#2c3e50', '#f39c12', '#e74c3c', '#27ae60'],
      borderWidth: 1,
    },
  ],
};

const INFRA_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } },
  cutout: '65%',
};

const MEJORAMIENTO_DATA = {
  labels: ['CCTV', 'Tecnología', 'Conectividad WIFI'],
  datasets: [
    {
      label: 'Progreso de Avance (%)',
      data: [100, 25, 75],
      backgroundColor: ['#27ae60', '#f39c12', '#3498db'],
      borderRadius: 4,
    },
  ],
};

const MEJORAMIENTO_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true, max: 100 } },
  plugins: { legend: { display: false } },
};

const PROYECTOS_DATA = {
  labels: ['Manting (CCTV, BMS, Automatización)', 'E-Global Parqueo'],
  datasets: [
    {
      label: 'Incidencias Octubre',
      data: [64, 39],
      backgroundColor: ['#3498db', '#27ae60'],
      borderRadius: 4,
    },
  ],
};

const PROYECTOS_OPTIONS = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } },
  plugins: { legend: { display: false } },
};

export default function ResumenView() {
  return (
    <section id="resumen" className="tab-content active-tab">
      <div className="kpi-cards" style={{ marginBottom: '25px' }}>
        <div className="card" style={{ borderLeftColor: 'var(--primary-color)' }}>
          <div className="card-header">
            <span>ACTIVOS TI TOTALES</span>
            <i className="fa-solid fa-server" style={{ color: 'var(--primary-color)' }}></i>
          </div>
          <div className="card-value">304</div>
          <p className="kpi-detail">Inventariados en el Centro Comercial</p>
        </div>
        <div className="card" style={{ borderLeftColor: 'var(--accent-color)' }}>
          <div className="card-header">
            <span>PLANES PRIORIZADOS</span>
            <i className="fa-solid fa-screwdriver-wrench" style={{ color: 'var(--accent-color)' }}></i>
          </div>
          <div className="card-value">3 Planes</div>
          <p className="kpi-detail">CCTV, Tecnología y Conectividad WIFI</p>
        </div>
        <div className="card green-border">
          <div className="card-header">
            <span>CONTRATOS DE SOPORTE</span>
            <i className="fa-solid fa-file-signature" style={{ color: 'var(--positive)' }}></i>
          </div>
          <div className="card-value">3 Contratos</div>
          <p className="kpi-detail">Externos vigentes (Sin incidencias)</p>
        </div>
        <div className="card warning-border">
          <div className="card-header">
            <span>AVANCE CRONOGRAMA</span>
            <i className="fa-solid fa-spinner" style={{ color: 'var(--warning)' }}></i>
          </div>
          <div className="card-value">0%</div>
          <p className="kpi-detail">Consolidado general de actividades</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '25px' }}>
        <div className="table-container" style={{ marginBottom: 0 }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontSize: '0.95rem', fontWeight: 'bold' }}>
            <i className="fa-solid fa-ticket" style={{ color: 'var(--accent-color)' }}></i> 1. Soporte Operativo: Tickets Semanales (Mesa de Ayuda)
          </h4>
          <div style={{ height: '250px' }}>
            <ChartCanvas id="ticketsChart" type="bar" data={TICKETS_DATA} options={TICKETS_OPTIONS} />
          </div>
        </div>

        <div className="table-container" style={{ marginBottom: 0 }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontSize: '0.95rem', fontWeight: 'bold' }}>
            <i className="fa-solid fa-cubes" style={{ color: 'var(--primary-color)' }}></i> 2. Infraestructura: Distribución de Dispositivos por Categoría
          </h4>
          <div style={{ height: '250px' }}>
            <ChartCanvas id="infraChart" type="doughnut" data={INFRA_DATA} options={INFRA_OPTIONS} />
          </div>
        </div>

        <div className="table-container" style={{ marginBottom: 0 }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontSize: '0.95rem', fontWeight: 'bold' }}>
            <i className="fa-solid fa-route" style={{ color: 'var(--positive)' }}></i> 3. Mejoramiento Tecnológico: Avance por Plan de Mejora (%)
          </h4>
          <div style={{ height: '250px' }}>
            <ChartCanvas id="mejoramientoChart" type="bar" data={MEJORAMIENTO_DATA} options={MEJORAMIENTO_OPTIONS} />
          </div>
        </div>

        <div className="table-container" style={{ marginBottom: 0 }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontSize: '0.95rem', fontWeight: 'bold' }}>
            <i className="fa-solid fa-circle-exclamation" style={{ color: 'var(--alert)' }}></i> 4. Proyectos TI: Incidencias Activas por Contrato Externo
          </h4>
          <div style={{ height: '250px' }}>
            <ChartCanvas id="proyectosChart" type="bar" data={PROYECTOS_DATA} options={PROYECTOS_OPTIONS} />
          </div>
        </div>
      </div>
    </section>
  );
}
