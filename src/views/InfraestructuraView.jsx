import React, { useState } from 'react';

export default function InfraestructuraView() {
  const [showCctvModal, setShowCctvModal] = useState(false);

  return (
    <section id="infraestructura" className="tab-content active-tab">
      <div className="table-container" style={{ marginBottom: '30px' }}>
        <div className="table-header" style={{ borderBottom: 'none', marginBottom: '15px' }}>
          <div>
            <h3>
              <i className="fa-solid fa-chess-knight" style={{ color: 'var(--accent-color)' }}></i> Mapa de Procesos: Protocolo de Levantamiento
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
              Flujo metodológico estandarizado para la ejecución de los planes de mantenimiento tecnológico
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', marginTop: '25px' }}>
          {/* Paso 1 */}
          <div
            style={{
              background: 'var(--bg-color)',
              border: '2px solid var(--accent-color)',
              borderRadius: '10px',
              padding: '25px 15px 15px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                background: 'var(--accent-color)',
                color: 'white',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.15rem',
                position: 'absolute',
                top: '-17px',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            >
              1
            </div>
            <i className="fa-solid fa-magnifying-glass-chart" style={{ fontSize: '2.2rem', color: 'var(--accent-color)', marginBottom: '12px' }}></i>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', marginBottom: '8px' }}>Diagnóstico</h4>
            <ul style={{ fontSize: '0.9rem', color: '#7f8c8d', lineHeight: 1.4, textAlign: 'left', paddingLeft: '20px', margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>Evaluación estado actual.</li>
              <li>Recolección de necesidades.</li>
            </ul>
          </div>

          {/* Paso 2 */}
          <div
            style={{
              background: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '25px 15px 15px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                background: 'var(--primary-color)',
                color: 'white',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.15rem',
                position: 'absolute',
                top: '-17px',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            >
              2
            </div>
            <i className="fa-solid fa-users-gear" style={{ fontSize: '2.2rem', color: 'var(--primary-color)', marginBottom: '12px' }}></i>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', marginBottom: '8px' }}>Usuarios</h4>
            <ul style={{ fontSize: '0.9rem', color: '#7f8c8d', lineHeight: 1.4, textAlign: 'left', paddingLeft: '20px', margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>Identificar necesidades de usuarios.</li>
              <li>Detectar falencias hacia el sistema.</li>
            </ul>
          </div>

          {/* Paso 3 */}
          <div
            style={{
              background: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '25px 15px 15px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                background: 'var(--warning)',
                color: 'white',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.15rem',
                position: 'absolute',
                top: '-17px',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            >
              3
            </div>
            <i className="fa-solid fa-server" style={{ fontSize: '2.2rem', color: 'var(--warning)', marginBottom: '12px' }}></i>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', marginBottom: '8px' }}>Infraestructura</h4>
            <ul style={{ fontSize: '0.9rem', color: '#7f8c8d', lineHeight: 1.4, textAlign: 'left', paddingLeft: '20px', margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>Análisis de hardware.</li>
              <li style={{ marginBottom: '4px' }}>Topología de red.</li>
              <li>Dimensionamiento técnico.</li>
            </ul>
          </div>

          {/* Paso 4 */}
          <div
            style={{
              background: 'var(--bg-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '25px 15px 15px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div
              style={{
                background: 'var(--positive)',
                color: 'white',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.15rem',
                position: 'absolute',
                top: '-17px',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              }}
            >
              4
            </div>
            <i className="fa-solid fa-check-double" style={{ fontSize: '2.2rem', color: 'var(--positive)', marginBottom: '12px' }}></i>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', marginBottom: '8px' }}>Consolidación</h4>
            <ul style={{ fontSize: '0.9rem', color: '#7f8c8d', lineHeight: 1.4, textAlign: 'left', paddingLeft: '20px', margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>Propuesta socializada en gerencia.</li>
              <li>Aprobación para ejecución.</li>
            </ul>
          </div>
        </div>

        <div style={{ position: 'relative', width: '75%', margin: '0 auto', marginTop: '15px' }}>
          <div style={{ height: '15px', borderBottom: '2px dashed var(--alert)', borderLeft: '2px dashed var(--alert)', borderRight: '2px dashed var(--alert)', borderRadius: '0 0 5px 5px' }}></div>
          <div style={{ width: '2px', height: '15px', backgroundColor: 'var(--alert)', margin: '0 auto' }}></div>
        </div>

        <div style={{ background: 'var(--alert)', color: 'white', borderRadius: '10px', padding: '15px 20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', maxWidth: '450px', margin: '0 auto' }}>
          <i className="fa-solid fa-chess-knight" style={{ fontSize: '2.5rem', color: 'white' }}></i>
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '3px', fontWeight: 'bold', letterSpacing: '1px' }}>ESTRATEGIA</h4>
            <p style={{ fontSize: '0.95rem', opacity: 0.9, margin: 0 }}>Abarca todo el Mapa de Procesos: Definición del plan, recursos y cronograma.</p>
          </div>
        </div>
      </div>

      {/* Plan de Mejoramiento de Infraestructura */}
      <div className="table-container">
        <div className="table-header" style={{ borderBottom: 'none', marginBottom: '10px' }}>
          <div>
            <h3>
              <i className="fa-solid fa-screwdriver-wrench" style={{ color: 'var(--primary-color)' }}></i> Plan de Mejoramiento
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
              Estrategias y planes orientados a optimizar componentes físicos e impulsar la productividad laboral
            </p>
          </div>
          <div className="header-actions-mto" style={{ marginBottom: 0 }}>
            <span className="badge warning" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
              <i className="fa-solid fa-clock"></i> Jornada: Martes, Jueves y Viernes (Tardes)
            </span>
          </div>
        </div>

        <div className="kpi-cards" style={{ marginBottom: '30px' }}>
          <div className="card" style={{ borderLeftColor: 'var(--primary-color)' }}>
            <div className="card-header">
              <span>ÁREAS IMPACTADAS</span>
              <i className="fa-solid fa-layer-group" style={{ color: 'var(--primary-color)' }}></i>
            </div>
            <div className="card-value">2 Áreas</div>
            <p className="kpi-detail">Seguridad y Admin</p>
          </div>
          <div className="card green-border">
            <div className="card-header">
              <span>PLANES PRIORIZADOS</span>
              <i className="fa-solid fa-route" style={{ color: 'var(--positive)' }}></i>
            </div>
            <div className="card-value">3 Planes</div>
            <p className="kpi-detail">CCTV, Planta Telefónica y Conectividad WIFI</p>
          </div>
          <div className="card" style={{ borderLeftColor: 'var(--accent-color)' }}>
            <div className="card-header">
              <span>HITO RECIENTE TI</span>
              <i className="fa-solid fa-flag-checkered" style={{ color: 'var(--accent-color)' }}></i>
            </div>
            <div className="card-value" style={{ fontSize: '1.6rem', marginTop: '5px', marginBottom: '7px' }}>
              CCTV 100%
            </div>
            <p className="kpi-detail">Plan de mejoramiento CCTV consolidado</p>
          </div>
        </div>

        <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontSize: '1rem' }}>
            <i className="fa-solid fa-list-check"></i> Estructuración de Planes
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* CCTV */}
            <div style={{ background: 'var(--white)', padding: '20px', borderRadius: '8px', borderTop: '4px solid var(--positive)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '350px' }}>
              <div>
                <h5 style={{ color: 'var(--primary-color)', fontSize: '0.95rem', marginBottom: '8px', fontWeight: 'bold' }}>
                  <i className="fa-solid fa-video"></i> 1. Plan de Mejoramiento de CCTV
                </h5>
                <ul style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, marginBottom: '12px', paddingLeft: '20px', marginTop: 0 }}>
                  <li style={{ marginBottom: '4px' }}>Se realizó el diagnóstico.</li>
                  <li style={{ marginBottom: '4px' }}>Se revisó la infraestructura.</li>
                  <li style={{ marginBottom: '4px' }}>Se contempló la información de los usuarios.</li>
                  <li>Se consolidó la información.</li>
                </ul>

                <div style={{ margin: '12px 0', paddingTop: '10px', borderTop: '1px dashed var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <i className="fa-solid fa-gauge-high" style={{ color: 'var(--positive)' }}></i> Indicadores de Avance
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--positive)' }}>100%</span>
                  </div>
                  <div className="progress-track" style={{ height: '6px', marginBottom: '12px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="progress-fill" style={{ width: '100%', height: '100%', backgroundColor: 'var(--positive)', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                    <i className="fa-solid fa-list-check" style={{ color: 'var(--positive)' }}></i> Indicadores:
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', fontSize: '0.75rem', color: '#7f8c8d' }}>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 1. Diagnóstico
                    </div>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 2. Usuarios
                    </div>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 3. Infraestructura
                    </div>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 4. Consolidación
                    </div>
                  </div>
                </div>

                {/* Entregable Descargable: Pliego de Condiciones Técnicas CCTV */}
                <div
                  style={{
                    marginTop: '12px',
                    marginBottom: '12px',
                    padding: '12px',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-file-contract"></i> Entregable Oficial Consolidado:
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#1e293b', fontWeight: 600, lineHeight: 1.35, marginBottom: '10px' }}>
                    Pliego de Condiciones Técnicas — Suministro, Migración (347 Cám.), Ampliación (+40 Cám.) e Integración Centralizada CCTV (387 Canales)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <a
                      href="/static/docs/Pliego_Condiciones_Tecnicas_CCTV_Primavera_Urbana.pdf"
                      download="Pliego_Condiciones_Tecnicas_CCTV_Primavera_Urbana.pdf"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#16a34a',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '6px 11px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        boxShadow: '0 2px 5px rgba(22, 163, 74, 0.25)',
                      }}
                    >
                      <i className="fa-solid fa-file-pdf"></i> Descargar PDF
                    </a>
                    <a
                      href="/static/docs/Pliego_Condiciones_Tecnicas_CCTV_Primavera_Urbana.doc"
                      download="Pliego_Condiciones_Tecnicas_CCTV_Primavera_Urbana.doc"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#2563eb',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '6px 11px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        boxShadow: '0 2px 5px rgba(37, 99, 235, 0.2)',
                      }}
                    >
                      <i className="fa-solid fa-file-word"></i> Descargar Word
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowCctvModal(true)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'white',
                        color: '#0f172a',
                        border: '1px solid #cbd5e1',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      <i className="fa-solid fa-eye" style={{ color: 'var(--primary-color)' }}></i> Ver Pliego
                    </button>
                  </div>
                </div>
              </div>
              <span className="badge" style={{ backgroundColor: 'rgba(46, 204, 113, 0.1)', color: 'var(--positive)', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, alignSelf: 'flex-start', marginTop: 'auto' }}>
                <i className="fa-solid fa-circle-check"></i> Completado al 100%
              </span>
            </div>

            {/* Planta Telefónica */}
            <div style={{ background: 'var(--white)', padding: '20px', borderRadius: '8px', borderTop: '4px solid var(--warning)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '350px' }}>
              <div>
                <h5 style={{ color: 'var(--primary-color)', fontSize: '0.95rem', marginBottom: '8px', fontWeight: 'bold' }}>
                  <i className="fa-solid fa-phone-volume"></i> 2. Plan de Mejoramiento de Planta Telefónica
                </h5>
                <ul style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, marginBottom: '12px', paddingLeft: '20px', marginTop: 0 }}>
                  <li style={{ marginBottom: '6px' }}>
                    <strong>Adecuación de temperatura:</strong>{' '}
                    <span style={{ color: 'var(--positive)', fontWeight: 700 }}>
                      <i className="fa-solid fa-circle-check"></i> (Realizado)
                    </span>
                  </li>
                  <li style={{ marginBottom: '4px' }}>
                    <strong>Pendiente:</strong> Instalación de sensor de temperatura de la sala en tiempo real, desde administración.
                  </li>
                </ul>

                <div style={{ margin: '12px 0', paddingTop: '10px', borderTop: '1px dashed var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <i className="fa-solid fa-gauge-high" style={{ color: 'var(--positive)' }}></i> Indicadores de Avance
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--positive)' }}>75%</span>
                  </div>
                  <div className="progress-track" style={{ height: '6px', marginBottom: '12px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="progress-fill" style={{ width: '75%', height: '100%', backgroundColor: 'var(--positive)', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                    <i className="fa-solid fa-list-check" style={{ color: 'var(--positive)' }}></i> Indicadores:
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', fontSize: '0.75rem', color: '#7f8c8d' }}>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 1. Diagnóstico
                    </div>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 2. Usuarios
                    </div>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 3. Adecuación Temp.
                    </div>
                    <div style={{ color: 'var(--alert)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-clock"></i> 4. Sensor Tiempo Real
                    </div>
                  </div>
                </div>
              </div>
              <span className="badge" style={{ backgroundColor: 'rgba(241, 196, 15, 0.12)', color: 'var(--warning)', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, alignSelf: 'flex-start', marginTop: 'auto' }}>
                <i className="fa-solid fa-temperature-half"></i> Pendiente Sensor en Tiempo Real
              </span>
            </div>

            {/* WIFI */}
            <div style={{ background: 'var(--white)', padding: '20px', borderRadius: '8px', borderTop: '4px solid var(--accent-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '350px' }}>
              <div>
                <h5 style={{ color: 'var(--primary-color)', fontSize: '0.95rem', marginBottom: '8px', fontWeight: 'bold' }}>
                  <i className="fa-solid fa-wifi"></i> 3. Plan de Conectividad WIFI
                </h5>
                <ul style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5, marginBottom: '12px', paddingLeft: '20px', marginTop: 0 }}>
                  <li style={{ marginBottom: '4px' }}>
                    <strong>Objetivo:</strong> Centralizar zonas WIFI del centro comercial y empresarial.
                  </li>
                  <li style={{ marginBottom: '4px' }}>
                    <strong>Diagnóstico inicial:</strong> Levantamiento torre J y SS. (Torre J ya centralizado).
                  </li>
                  <li>
                    <strong>Estado actual:</strong> 9 puntos centralizados (5 en torre J, 4 nuevos en Semisótano). Pendiente documentación de APs.
                  </li>
                </ul>

                <div style={{ margin: '12px 0', paddingTop: '10px', borderTop: '1px dashed var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <i className="fa-solid fa-gauge-high" style={{ color: 'var(--positive)' }}></i> Indicadores de Avance
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--positive)' }}>75%</span>
                  </div>
                  <div className="progress-track" style={{ height: '6px', marginBottom: '12px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="progress-fill" style={{ width: '75%', height: '100%', backgroundColor: 'var(--positive)', borderRadius: '3px', transition: 'width 0.3s ease' }}></div>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                    <i className="fa-solid fa-list-check" style={{ color: 'var(--positive)' }}></i> Indicadores:
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', fontSize: '0.75rem', color: '#7f8c8d' }}>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 1. Diagnóstico
                    </div>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 2. Usuarios
                    </div>
                    <div style={{ color: 'var(--positive)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-check"></i> 3. Infraestructura
                    </div>
                    <div style={{ color: 'var(--alert)', fontWeight: 'bold' }}>
                      <i className="fa-solid fa-clock"></i> 4. Documentación
                    </div>
                  </div>
                </div>
              </div>
              <span className="badge" style={{ backgroundColor: 'rgba(46, 204, 113, 0.1)', color: 'var(--positive)', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, alignSelf: 'flex-start', marginTop: 'auto' }}>
                <i className="fa-solid fa-circle-check"></i> Pendiente Documentación
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Visor del Pliego de Condiciones Técnicas CCTV */}
      {showCctvModal && (
        <div
          onClick={() => setShowCctvModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.78)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '14px',
              width: '95%',
              maxWidth: '1050px',
              height: '88vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
            }}
          >
            <div
              style={{
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-file-shield" style={{ color: '#4ade80', fontSize: '1.25rem' }}></i>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                    Pliego de Condiciones Técnicas — Sistema de Videovigilancia (CCTV)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Entregable Oficial 1. Plan de Mejoramiento de CCTV · 387 Canales (347 Migración + 40 Nuevos)
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <a
                  href="/static/docs/Pliego_Condiciones_Tecnicas_CCTV_Primavera_Urbana.pdf"
                  download="Pliego_Condiciones_Tecnicas_CCTV_Primavera_Urbana.pdf"
                  style={{
                    background: '#16a34a',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '7px 13px',
                    borderRadius: '7px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fa-solid fa-file-pdf"></i> Descargar PDF
                </a>
                <a
                  href="/static/docs/Pliego_Condiciones_Tecnicas_CCTV_Primavera_Urbana.doc"
                  download="Pliego_Condiciones_Tecnicas_CCTV_Primavera_Urbana.doc"
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '7px 13px',
                    borderRadius: '7px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <i className="fa-solid fa-file-word"></i> Descargar Word
                </a>
                <button
                  type="button"
                  onClick={() => setShowCctvModal(false)}
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '7px 12px',
                    borderRadius: '7px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <i className="fa-solid fa-xmark"></i> Cerrar
                </button>
              </div>
            </div>
            <iframe
              src="/static/docs/Pliego_Condiciones_Tecnicas_CCTV_Primavera_Urbana.html"
              title="Pliego de Condiciones Técnicas CCTV"
              style={{ width: '100%', flex: 1, border: 'none', background: '#ffffff' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
