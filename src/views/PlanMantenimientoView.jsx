import React, { useState } from 'react';
import ChartCanvas from '../components/ChartCanvas';

const MTO_GLOBAL_DATA = {
  labels: ['Mantenimientos', 'Pendientes'],
  datasets: [
    {
      data: [42, 262],
      backgroundColor: ['#27ae60', '#e1e8ed'],
      borderWidth: 0,
    },
  ],
};

const MTO_GLOBAL_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } },
  cutout: '70%',
};

const MTO_PROGRESO_DATA = {
  labels: ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Equipos (Avance Real)',
      data: [6, 18, 30, 42, 42, null],
      borderColor: '#3498db',
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Equipos (Meta Proyectada)',
      data: [6, 18, 30, 42, 47, 50],
      borderColor: '#bdc3c7',
      borderDash: [5, 5],
      fill: false,
    },
  ],
};

const MTO_PROGRESO_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true, max: 50 } },
};

const PROTOCOL_DATA = {
  1: {
    id: 1,
    shortLabel: 'Recepción y Escalamiento',
    title: '1. Recepción y Escalamiento',
    icon: 'fa-sitemap',
    color: '#7f8c8d',
    desc: 'Define el flujo inicial de atención a usuarios, categorización de incidentes y rutas de escalamiento hacia especialistas TI de nivel 2 y 3.',
    items: [
      { label: 'Registro:', text: 'Ingreso del ticket en sistema con categorización inicial.' },
      { label: 'Priorización:', text: 'Asignación de niveles de urgencia e impacto.' },
      { label: 'Escalamiento:', text: 'Derivación automática según la matriz de especialidad.' },
    ],
  },
  2: {
    id: 2,
    shortLabel: 'Soporte Remoto y Sitio',
    title: '2. Soporte Remoto y Sitio',
    icon: 'fa-suitcase-medical',
    color: '#3498db',
    desc: 'Establece los lineamientos técnicos y de etiqueta para la atención de fallas de hardware y software, tanto vía remota como en presencia física.',
    items: [
      { label: 'Diagnóstico Remoto:', text: 'Uso de herramientas de conexión cifrada (AnyDesk/TeamViewer).' },
      { label: 'Intervención:', text: 'Resolución en primera línea o agendamiento de visita.' },
      { label: 'Cierre en sitio:', text: 'Verificación física con firma de usuario final.' },
    ],
  },
  3: {
    id: 3,
    shortLabel: 'Mantenimiento Preventivo',
    title: '3. Mantenimiento Preventivo',
    icon: 'fa-screwdriver-wrench',
    color: '#2ecc71',
    desc: 'El mantenimiento preventivo garantiza la operatividad y prolonga la vida útil de los activos tecnológicos de Primavera Urbana, reduciendo los riesgos de fallos imprevistos. Este protocolo abarca limpieza física, depuración de software, revisión de conexiones y actualizaciones de seguridad.',
    items: [
      { label: 'Planificación:', text: 'Seguimiento del cronograma mensual (3 equipos semanales).' },
      { label: 'Ejecución:', text: 'Aplicación de las 5 fases estandarizadas (Diagnóstico, Documental, Hardware, Software, Pruebas).' },
      { label: 'Cierre:', text: 'Firma de actas de conformidad y actualización obligatoria de Hojas de Vida de los equipos.' },
    ],
  },
  4: {
    id: 4,
    shortLabel: 'Gestión de Respaldos',
    title: '4. Gestión de Respaldos',
    icon: 'fa-database',
    color: '#9b59b6',
    hasCheck: true,
    desc: 'Garantiza la integridad y disponibilidad de la información crítica del negocio a través de políticas automatizadas de copias de seguridad.',
    items: [
      { label: 'Periodicidad:', text: 'Respaldos incrementales diarios y completos semanales.' },
      { label: 'Almacenamiento:', text: 'Regla 3-2-1 con copias en la nube y repositorio local offline.' },
      { label: 'Restauración:', text: 'Pruebas trimestrales de recuperación de datos (Disaster Recovery Test).' },
    ],
  },
  5: {
    id: 5,
    shortLabel: 'Conectividad y Redes',
    title: '5. Conectividad y Redes',
    icon: 'fa-network-wired',
    color: '#e67e22',
    desc: 'Políticas para el mantenimiento del cableado estructurado, configuración de switches, routers y asignación segura de IPs en la red corporativa.',
    items: [
      { label: 'Monitoreo:', text: 'Revisión constante de latencia y disponibilidad de enlaces.' },
      { label: 'Mantenimiento:', text: 'Limpieza de gabinetes y peinado de racks (semestral).' },
      { label: 'Seguridad de Red:', text: 'Segmentación mediante VLANs y control de acceso MAC.' },
    ],
  },
  6: {
    id: 6,
    shortLabel: 'Ciberseguridad',
    title: '6. Ciberseguridad',
    icon: 'fa-shield-halved',
    color: '#e74c3c',
    desc: 'Lineamientos obligatorios para la protección de endpoints, políticas de contraseñas, firewall y prevención de intrusiones a nivel organizacional.',
    items: [
      { label: 'Prevención:', text: 'Actualización de firmas de EDR/Antivirus y escaneo profundo.' },
      { label: 'Accesos:', text: 'Auditoría de permisos y MFA (Autenticación Multifactor).' },
      { label: 'Respuesta:', text: 'Protocolo de aislamiento de red ante sospecha de malware.' },
    ],
  },
  7: {
    id: 7,
    shortLabel: 'Disaster Recovery',
    title: '7. Disaster Recovery',
    icon: 'fa-house-crack',
    color: '#d35400',
    desc: 'Plan de acción detallado para la rápida restauración de los servicios de TI tras eventos catastróficos, fallas masivas de energía o ataques graves.',
    items: [
      { label: 'Activación:', text: 'Declaración de emergencia y pase a servidores de contingencia.' },
      { label: 'RTO / RPO:', text: 'Tiempos de recuperación definidos y objetivos de pérdida de datos.' },
      { label: 'Comunicación:', text: 'Cadena de notificaciones a gerencia y usuarios afectados.' },
    ],
  },
  8: {
    id: 8,
    shortLabel: 'Gestión de Cambios',
    title: '8. Gestión de Cambios',
    icon: 'fa-diagram-project',
    color: '#1abc9c',
    desc: 'Procedimiento para autorizar, documentar y ejecutar modificaciones en la infraestructura tecnológica sin interrumpir la operación normal.',
    items: [
      { label: 'Propuesta:', text: 'Análisis de impacto, ventana de mantenimiento y riesgos.' },
      { label: 'Aprobación:', text: 'Revisión por el comité de cambios TI (CAB).' },
      { label: 'Rollback:', text: 'Plan de retorno inmediato en caso de falla durante la implementación.' },
    ],
  },
  9: {
    id: 9,
    shortLabel: 'Control de Activos',
    title: '9. Control de Activos',
    icon: 'fa-boxes-stacked',
    color: '#34495e',
    desc: 'Normativa para la recepción, asignación, traslado y baja de equipos informáticos, garantizando un inventario siempre actualizado.',
    items: [
      { label: 'Asignación:', text: 'Entrega de equipos con firma de acta de responsabilidad.' },
      { label: 'Trazabilidad:', text: 'Uso de etiquetas de código de barras y software de inventario.' },
      { label: 'Baja Técnica:', text: 'Proceso de descarte seguro, borrado de disco y disposición final.' },
    ],
  },
};

const RADIAL_ANGLES = [-90, -50, -10, 30, 70, 110, 150, 190, 230];

export default function PlanMantenimientoView({ onOpenMarco }) {
  const [selectedProtocol, setSelectedProtocol] = useState(3);
  const currentProto = PROTOCOL_DATA[selectedProtocol];

  return (
    <section id="plan-mantenimiento-directo" className="tab-content active-tab">
      <div id="vista-mantenimiento" className="sub-vista active-sub-vista">
        <div className="table-container">
          <div className="table-header" style={{ borderBottom: 'none', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>
                <i className="fa-solid fa-chart-line" style={{ color: 'var(--accent-color)' }}></i> Plan de Mantenimiento
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                Visualización de resultados, proyecciones y cumplimiento de metas
              </p>
            </div>
            <div className="header-actions-mto" style={{ marginBottom: 0, display: 'flex', gap: '12px' }}>
              <button
                onClick={onOpenMarco}
                style={{
                  background: 'white',
                  color: 'var(--primary-color)',
                  border: '1px solid #dcdde1',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                }}
              >
                <i className="fa-solid fa-file-invoice" style={{ color: 'var(--primary-color)' }}></i> Ver Documento Marco
              </button>
              <button
                style={{
                  background: 'linear-gradient(135deg, var(--accent-color), #2980b9)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(52,152,219,0.25)',
                }}
              >
                <i className="fa-solid fa-file-word"></i> Descargar Plan (Word)
              </button>
            </div>
          </div>

          <div className="kpi-cards" style={{ marginBottom: '15px' }}>
            <div className="card" style={{ borderLeftColor: 'var(--primary-color)' }}>
              <div className="card-header">
                <span>ACTIVOS TOTALES</span>
                <i className="fa-solid fa-boxes-stacked" style={{ color: 'var(--primary-color)' }}></i>
              </div>
              <div className="card-value">304</div>
              <p className="kpi-detail">Inventario tecnológico general</p>
            </div>
            <div className="card green-border">
              <div className="card-header">
                <span>LOTE PLAN ACTUAL</span>
                <i className="fa-solid fa-tv" style={{ color: 'var(--positive)' }}></i>
              </div>
              <div className="card-value">50</div>
              <p className="kpi-detail">Equipos de computación (Censo)</p>
            </div>
            <div className="card" style={{ borderLeftColor: 'var(--accent-color)' }}>
              <div className="card-header">
                <span>META SEMANAL</span>
                <i className="fa-solid fa-clock" style={{ color: 'var(--accent-color)' }}></i>
              </div>
              <div className="card-value">3</div>
              <p className="kpi-detail">Mar - Mié - Jue (1 eq/día)</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px', marginBottom: '15px' }}>
            <div className="card">
              <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--secondary-color)' }}>Estado de Ejecución Global</h4>
              <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
                <ChartCanvas id="mtoGlobalChart" type="doughnut" data={MTO_GLOBAL_DATA} options={MTO_GLOBAL_OPTIONS} />
              </div>
            </div>
            <div className="card">
              <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: 'var(--secondary-color)' }}>Equipos Mantenidos (Acumulado)</h4>
              <div style={{ height: '250px' }}>
                <ChartCanvas id="mtoProgresoMensualChart" type="line" data={MTO_PROGRESO_DATA} options={MTO_PROGRESO_OPTIONS} />
              </div>
            </div>
          </div>

          <div className="table-header">
            <h3>
              <i className="fa-solid fa-file-shield" style={{ color: 'var(--accent-color)' }}></i> Monitoreo de Cumplimiento Documental
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '15px' }}>
            <div className="card" style={{ borderLeftColor: 'var(--positive)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontSize: '0.95rem' }}>
                <i className="fa-solid fa-check-double"></i> Fichas Técnicas y Hojas de Vida
              </h4>
              <div className="progress-wrapper" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.8rem', marginBottom: '6px' }}>
                  <span>Progreso de Creación</span>
                  <strong>14% (42 / 304)</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '14%', backgroundColor: 'var(--positive)' }}></div>
                </div>
              </div>
            </div>

            <div className="card" style={{ borderLeftColor: 'var(--warning)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontSize: '0.95rem' }}>
                <i className="fa-solid fa-clipboard-list"></i> Protocolos de Actuación
              </h4>
              <div className="progress-wrapper" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.8rem', marginBottom: '6px' }}>
                  <span>Documentación de Procedimientos</span>
                  <strong>11% (1 / 9)</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '11%', backgroundColor: 'var(--warning)' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Módulo Estructura Radial de Protocolos */}
          <div className="table-container" style={{ padding: '25px 20px', textAlign: 'center', background: 'white', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', paddingLeft: '15px', paddingRight: '15px' }}>
              <h3 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', margin: 0, textAlign: 'left' }}>Manual de Protocolos de Actuación TI</h3>
              <span style={{ fontSize: '0.95rem', color: '#7f8c8d', textAlign: 'right' }}>Catálogo de lineamientos operativos y técnicos</span>
            </div>

            <div style={{ position: 'relative', width: '100%', minHeight: '600px', margin: '0 auto', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, zIndex: 1 }}>
                {RADIAL_ANGLES.map((angle) => (
                  <div
                    key={angle}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '250px',
                      height: '2px',
                      borderTop: '2px dashed #bdc3c7',
                      transformOrigin: '0 0',
                      transform: `rotate(${angle}deg)`,
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  border: '2px solid rgba(52, 152, 219, 0.4)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                }}
              >
                <i className="fa-solid fa-book-medical" style={{ fontSize: '2.8rem', color: '#2980b9', marginBottom: '12px' }}></i>
                <h2 style={{ fontSize: '0.95rem', margin: 0, fontWeight: 'bold', color: 'var(--primary-color)', lineHeight: 1.2 }}>
                  Manual de
                  <br />
                  Protocolos TI
                </h2>
              </div>

              {Object.values(PROTOCOL_DATA).map((proto) => (
                <div
                  key={proto.id}
                  className={`nodo-periferico nodo-${proto.id} ${selectedProtocol === proto.id ? 'selected' : ''}`}
                  onClick={() => setSelectedProtocol(proto.id)}
                >
                  <div className="nodo-icon" style={{ position: 'relative' }}>
                    <i className={`fa-solid ${proto.icon}`} style={{ fontSize: '1.5rem' }}></i>
                    {proto.hasCheck && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          background: '#2ecc71',
                          color: 'white',
                          borderRadius: '50%',
                          width: '22px',
                          height: '22px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          border: '2px solid white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      >
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                  </div>
                  <div className="nodo-label">
                    <span style={{ fontSize: '0.75rem', opacity: 0.75, marginRight: '2px' }}>{proto.id}.</span> {proto.shortLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de Detalles Inferior */}
          <div
            id="protocol-detail-panel"
            className="card"
            style={{
              maxWidth: '800px',
              margin: '0 auto 15px auto',
              borderTop: `4px solid ${currentProto.color}`,
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              textAlign: 'left',
              background: 'white',
              transition: 'all 0.3s ease',
            }}
          >
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className={`fa-solid ${currentProto.icon}`} style={{ color: currentProto.color }}></i>
              <span>{currentProto.title}</span>
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.6, marginBottom: '15px' }}>{currentProto.desc}</p>
            <ul style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.7, paddingLeft: '20px', margin: 0 }}>
              {currentProto.items.map((item, idx) => (
                <li key={idx} style={{ marginBottom: idx < currentProto.items.length - 1 ? '8px' : 0 }}>
                  <strong>{item.label}</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Mapa de Procesos: Alcance General del Mantenimiento */}
          <div className="card" style={{ marginBottom: '15px', borderLeftColor: 'var(--accent-color)', backgroundColor: 'white', padding: '20px' }}>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-diagram-project" style={{ color: 'var(--accent-color)' }}></i> Mapa de Procesos: Alcance Técnico General
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.6, marginBottom: '20px' }}>
              Para garantizar la estandarización y calidad del proceso, se aplicará el siguiente diagrama de flujo técnico y documental a todos los equipos:
            </p>

            <div className="mapa-procesos">
              <div className="flow-box shape-inicio">
                <h5>
                  <i className="fa-solid fa-magnifying-glass"></i> 1. Diagnóstico Inicial
                </h5>
                <ul>
                  <li>Inspección de operatividad previa.</li>
                  <li>Registro de fallas preexistentes.</li>
                  <li>Levantamiento de requerimientos de repuestos.</li>
                </ul>
              </div>

              <div className="flow-arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </div>

              <div className="flow-box shape-doc">
                <h5>
                  <i className="fa-solid fa-file-invoice"></i> 2. Fase Documental
                </h5>
                <ul>
                  <li>Levantamiento de Ficha Técnica.</li>
                  <li>Registro en Hoja de Vida (HDV).</li>
                  <li>Vinculación digital en sistema.</li>
                </ul>
              </div>

              <div className="flow-arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </div>

              <div className="flow-box shape-proceso">
                <h5>
                  <i className="fa-solid fa-screwdriver-wrench"></i> 3. Fase Física (HW)
                </h5>
                <ul>
                  <li>Limpieza de hardware.</li>
                  <li>Inspección de conexiones de video/energía.</li>
                  <li>Verificación de soportes físicos.</li>
                </ul>
              </div>

              <div className="flow-arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </div>

              <div className="flow-box shape-proceso">
                <h5>
                  <i className="fa-solid fa-terminal"></i> 4. Fase Lógica (SW)
                </h5>
                <ul>
                  <li>Depuración de archivos temporales.</li>
                  <li>Revisión de logs de sistema y parches.</li>
                  <li>Confirmación de enlace de red.</li>
                </ul>
              </div>

              <div className="flow-arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </div>

              <div className="flow-box shape-fin">
                <h5>
                  <i className="fa-solid fa-check-double"></i> 5. Pruebas de Cierre
                </h5>
                <ul>
                  <li>Verificación de encendido automático.</li>
                  <li>Pruebas de video continuas.</li>
                  <li>Firma de conformidad.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderLeftColor: 'var(--secondary-color)', background: 'white', marginBottom: '15px', padding: '20px' }}>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-calendar-days" style={{ color: 'var(--secondary-color)' }}></i> Cronograma de Metas Mensuales
            </h4>

            <table className="crono-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>Mes / Fase</th>
                  <th style={{ width: '45%' }}>Áreas y Equipos a Intervenir</th>
                  <th style={{ width: '17%' }}>Meta Semanal</th>
                  <th style={{ width: '18%' }}>Meta Mensual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="mes-badge">
                      Julio <i className="fa-solid fa-circle-check" style={{ color: '#27ae60', marginLeft: '4px' }} title="Cumplido sin novedad"></i>
                    </span>
                    <span className="fase-text">Fase 1</span>
                  </td>
                  <td className="areas-text">Dispositivos Publicitarios (Lote 1)</td>
                  <td>
                    <span className="meta-badge">
                      <i className="fa-solid fa-desktop" style={{ marginRight: '6px', color: '#94a3b8' }}></i> 3 eq/sem
                    </span>
                  </td>
                  <td>
                    <span className="meta-total">6 Equipos</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="mes-badge">
                      Agosto <i className="fa-solid fa-circle-check" style={{ color: '#27ae60', marginLeft: '4px' }} title="Cumplido sin novedad"></i>
                    </span>
                    <span className="fase-text">Fase 2</span>
                  </td>
                  <td className="areas-text">Dispositivos Publicitarios (Lote 2)</td>
                  <td>
                    <span className="meta-badge">
                      <i className="fa-solid fa-desktop" style={{ marginRight: '6px', color: '#94a3b8' }}></i> 3 eq/sem
                    </span>
                  </td>
                  <td>
                    <span className="meta-total">12 Equipos</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="mes-badge">
                      Septiembre <i className="fa-solid fa-circle-check" style={{ color: '#27ae60', marginLeft: '4px' }} title="Cumplido sin novedad"></i>
                    </span>
                    <span className="fase-text">Fase 3</span>
                  </td>
                  <td className="areas-text">Únicamente los 12 dispositivos de administración</td>
                  <td>
                    <span className="meta-badge">
                      <i className="fa-solid fa-desktop" style={{ marginRight: '6px', color: '#94a3b8' }}></i> 3 eq/sem
                    </span>
                  </td>
                  <td>
                    <span className="meta-total">12 Equipos</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="mes-badge">
                      Octubre <i className="fa-solid fa-circle-check" style={{ color: '#27ae60', marginLeft: '4px' }} title="Cumplido sin novedad"></i>
                    </span>
                    <span className="fase-text">Fase 4</span>
                  </td>
                  <td className="areas-text">Mercadeo (3) + Operaciones (7) + Puntos Info. (2)</td>
                  <td>
                    <span className="meta-badge">
                      <i className="fa-solid fa-desktop" style={{ marginRight: '6px', color: '#94a3b8' }}></i> 3 eq/sem
                    </span>
                  </td>
                  <td>
                    <span className="meta-total">12 Equipos</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="mes-badge" style={{ background: 'rgba(243, 156, 18, 0.1)', color: '#e67e22' }}>
                      Noviembre <i className="fa-solid fa-spinner fa-spin" style={{ marginLeft: '4px' }} title="En ejecución"></i>
                    </span>
                    <span className="fase-text">Fase 5 (En ejecución)</span>
                  </td>
                  <td className="areas-text">Seguridad (1) + Puesto Control (1) + Lobbys (3)</td>
                  <td>
                    <span className="meta-badge">
                      <i className="fa-solid fa-desktop" style={{ marginRight: '6px', color: '#94a3b8' }}></i> 3 eq/sem
                    </span>
                  </td>
                  <td>
                    <span className="meta-total">5 Equipos</span>
                  </td>
                </tr>
                <tr style={{ background: 'rgba(231, 76, 60, 0.02)' }}>
                  <td>
                    <span className="mes-badge" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#c0392b' }}>
                      Diciembre
                    </span>
                    <span className="fase-text">Fase 6</span>
                  </td>
                  <td className="areas-text">Consolidación documental, Hojas de Vida (HDV) y Cierre</td>
                  <td>
                    <span className="meta-badge" style={{ background: 'transparent', border: 'none', color: '#a0aec0' }}>
                      —
                    </span>
                  </td>
                  <td>
                    <span className="meta-cierre">Cierre Total</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
