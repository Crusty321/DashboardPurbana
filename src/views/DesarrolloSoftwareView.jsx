import React, { useState } from 'react';

const INTRANET_URL = 'https://intra-net-primaveraurbana-eta.vercel.app/';

const MODULOS_INTRANET = [
  {
    id: 1,
    ruta: '/',
    titulo: '1. Portal Corporativo "Pirarucú"',
    icono: 'fa-house-laptop',
    color: '#1C2F1E',
    accent: '#C5E063',
    estado: 'En Producción',
    items: [
      'Identidad visual oficial de Primavera Urbana ("Pirarucú") con diseño adaptable (Desktop y Mobile).',
      'Navegación lateral inteligente con acceso rápido a todos los servicios del centro comercial y empresarial.',
      'Optimización de rendimiento sobre arquitectura moderna Next.js y React.',
    ],
  },
  {
    id: 2,
    ruta: '/eventos',
    titulo: '2. Calendario y Eventos 2026',
    icono: 'fa-calendar-days',
    color: '#27ae60',
    estado: 'En Producción',
    items: [
      'Calendario mensual interactivo con programación de actividades y eventos del centro comercial (Noviembre 2026).',
      'Fichas detalladas por evento (ej. Show de Apertura - Navidad de Jengibre) con fecha, horario, ubicación y tipo de acceso.',
      'Consulta ágil para arrendatarios, funcionarios y administración.',
    ],
  },
  {
    id: 3,
    ruta: '/politicas & /procedimientos',
    titulo: '3. Gestión Documental de Arrendatarios (Políticas y Procedimientos)',
    icono: 'fa-file-shield',
    color: '#2980b9',
    estado: 'En Producción',
    items: [
      'Módulo de Políticas: Consulta directa de Acceso y Reglamentación de Uso de Terrazas Torre Empresarial y Uso de Sala de Juntas.',
      'Módulo de Procedimientos: Visor del Procedimiento de Control de Acceso para Propietarios, Arrendatarios y Funcionarios.',
      'Estructura escalable preparada para Manual de Vitrinismo y Parqueadero.',
    ],
  },
  {
    id: 4,
    ruta: '/solicitudes',
    titulo: '4. Solicitud y Autorizaciones en Línea',
    icono: 'fa-file-signature',
    color: '#e67e22',
    estado: 'En Producción',
    items: [
      'Digitalización de trámites operativos mediante formularios dinámicos en línea.',
      'Formato interactivo de Autorización de Ingresos y Salidas diligenciable directamente desde el navegador.',
      'Eliminación de reprocesos en papel y agilización de autorizaciones administrativas.',
    ],
  },
  {
    id: 5,
    ruta: '/contacto',
    titulo: '5. Directorio Corporativo y Contacto Directo',
    icono: 'fa-address-book',
    color: '#8e44ad',
    estado: 'En Producción',
    items: [
      'Directorio centralizado de las jefaturas y coordinaciones de Primavera Urbana.',
      'Canales oficiales: Coordinación Administrativa, Dirección de Mercadeo, Coordinación de Operaciones y Dirección de Seguridad.',
      'Integración de correos corporativos (@primaveraurbana.com.co) para comunicación inmediata.',
    ],
  },
  {
    id: 6,
    ruta: 'Widget Global',
    titulo: '6. Asistente Virtual "Asistente Pirarucú"',
    icono: 'fa-robot',
    color: '#16a085',
    estado: 'En Producción',
    items: [
      'Asistente conversacional integrado en todas las pantallas del portal con botón flotante reposicionable.',
      'Atención inmediata de consultas sobre políticas, procedimientos, eventos, horarios y trámites de la copropiedad.',
      'Interfaz de chat limpia con historial de sesión y reinicio rápido de conversación.',
    ],
  },
];

export default function DesarrolloSoftwareView() {
  const [mostrarPreview, setMostrarPreview] = useState(true);

  return (
    <section id="desarrollo-software" className="tab-content active-tab">
      <div className="table-container">
        {/* Encabezado Principal con Enlace en Vivo */}
        <div
          className="table-header"
          style={{
            borderBottom: 'none',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h3>
              <i className="fa-solid fa-globe" style={{ color: 'var(--positive)' }}></i> Intranet Primavera Urbana — Portal Corporativo &ldquo;Pirarucú&rdquo;
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
              Plataforma web desarrollada y desplegada para la gestión de arrendatarios, normatividad, eventos, autorizaciones y asistencia virtual
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setMostrarPreview(!mostrarPreview)}
              style={{
                background: 'white',
                color: 'var(--primary-color)',
                border: '1px solid #cbd5e1',
                padding: '9px 15px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <i className={`fa-solid ${mostrarPreview ? 'fa-eye-slash' : 'fa-desktop'}`} style={{ color: 'var(--accent-color)' }}></i>
              {mostrarPreview ? 'Ocultar Vista en Vivo' : 'Ver Intranet Interactiva Aquí'}
            </button>

            <a
              href={INTRANET_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #1C2F1E, #27ae60)',
                color: 'white',
                textDecoration: 'none',
                padding: '9px 18px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '0.84rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(39, 174, 96, 0.25)',
              }}
            >
              <i className="fa-solid fa-up-right-from-square"></i> Abrir Intranet en Nueva Pestaña
            </a>
          </div>
        </div>

        {/* KPIs de Resultados del Desarrollo */}
        <div className="kpi-cards" style={{ marginBottom: '25px' }}>
          <div className="card green-border">
            <div className="card-header">
              <span>ESTADO DEL DESARROLLO</span>
              <i className="fa-solid fa-circle-check" style={{ color: 'var(--positive)' }}></i>
            </div>
            <div className="card-value" style={{ color: 'var(--positive)' }}>
              100%
            </div>
            <p className="kpi-detail">Desarrollado y desplegado en producción</p>
          </div>

          <div className="card" style={{ borderLeftColor: 'var(--primary-color)' }}>
            <div className="card-header">
              <span>FUNCIONALIDADES EN VIVO</span>
              <i className="fa-solid fa-cubes" style={{ color: 'var(--primary-color)' }}></i>
            </div>
            <div className="card-value">6 Módulos</div>
            <p className="kpi-detail">Inicio, Eventos, Arrendatarios, Solicitudes, Contacto e IA</p>
          </div>

          <div className="card" style={{ borderLeftColor: 'var(--accent-color)' }}>
            <div className="card-header">
              <span>ASISTENTE VIRTUAL</span>
              <i className="fa-solid fa-robot" style={{ color: 'var(--accent-color)' }}></i>
            </div>
            <div className="card-value" style={{ fontSize: '1.5rem', marginTop: '4px', marginBottom: '6px' }}>
              Pirarucú IA
            </div>
            <p className="kpi-detail">Chat interactivo integrado en todo el portal</p>
          </div>

          <div className="card warning-border">
            <div className="card-header">
              <span>STACK TECNOLÓGICO</span>
              <i className="fa-solid fa-bolt" style={{ color: 'var(--warning)' }}></i>
            </div>
            <div className="card-value" style={{ fontSize: '1.45rem', marginTop: '4px', marginBottom: '6px' }}>
              Next.js + React
            </div>
            <p className="kpi-detail">Alta disponibilidad en la nube (SSL / HTTPS)</p>
          </div>
        </div>

        {/* Visor Interactivo en Vivo de la Intranet */}
        {mostrarPreview && (
          <div
            style={{
              background: '#0F1A11',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '28px',
              border: '2px solid #1C2F1E',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '0 6px',
                color: 'white',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'inline-flex', gap: '6px' }}>
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ef4444' }}></span>
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f59e0b' }}></span>
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#22c55e' }}></span>
                </span>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    color: '#C5E063',
                    fontFamily: 'monospace',
                  }}
                >
                  <i className="fa-solid fa-lock" style={{ marginRight: '6px' }}></i>
                  {INTRANET_URL}
                </span>
              </div>
              <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>
                <i className="fa-solid fa-hand-pointer" style={{ color: '#C5E063', marginRight: '5px' }}></i>
                Vista interactiva en tiempo real
              </span>
            </div>

            <iframe
              src={INTRANET_URL}
              title="Intranet Primavera Urbana - Vista en Vivo"
              style={{
                width: '100%',
                height: '520px',
                border: 'none',
                borderRadius: '8px',
                background: '#0F1A11',
              }}
            />
          </div>
        )}

        {/* Diagrama de Proceso de los Módulos Desplegados */}
        <div className="card" style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '18px', fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-diagram-project" style={{ color: 'var(--positive)' }}></i> Flujo Funcional de la Intranet Primavera Urbana
          </h4>

          <div className="mapa-procesos-sw">
            <div className="flow-box-sw shape-start">
              <h5>
                1. Portal &ldquo;Pirarucú&rdquo; <i className="fa-solid fa-circle-check" style={{ color: 'var(--positive)', marginLeft: '5px' }}></i>
              </h5>
              <span className="tiempo-badge">Ruta: /</span>
              <p>Acceso corporativo unificado con identidad Primavera Urbana y menú adaptable.</p>
              <span className="badge-sw">
                <i className="fa-solid fa-check"></i> Operativo
              </span>
            </div>

            <div className="flow-arrow-sw">
              <i className="fa-solid fa-arrow-right"></i>
            </div>

            <div className="flow-box-sw shape-proc-1">
              <h5>
                2. Arrendatarios & Docs <i className="fa-solid fa-circle-check" style={{ color: 'var(--positive)', marginLeft: '5px' }}></i>
              </h5>
              <span className="tiempo-badge">/politicas · /procedimientos</span>
              <p>Reglamentación de terrazas, sala de juntas y protocolo de control de accesos.</p>
              <span className="badge-sw">
                <i className="fa-solid fa-check"></i> Operativo
              </span>
            </div>

            <div className="flow-arrow-sw">
              <i className="fa-solid fa-arrow-right"></i>
            </div>

            <div className="flow-box-sw shape-proc-2">
              <h5>
                3. Solicitudes & Eventos <i className="fa-solid fa-circle-check" style={{ color: 'var(--positive)', marginLeft: '5px' }}></i>
              </h5>
              <span className="tiempo-badge">/solicitudes · /eventos</span>
              <p>Autorizaciones de ingreso/salida en línea y calendario de eventos 2026.</p>
              <span className="badge-sw">
                <i className="fa-solid fa-check"></i> Operativo
              </span>
            </div>

            <div className="flow-arrow-sw">
              <i className="fa-solid fa-arrow-right"></i>
            </div>

            <div className="flow-box-sw shape-proc-3">
              <h5>
                4. Asistente & Contacto <i className="fa-solid fa-circle-check" style={{ color: 'var(--positive)', marginLeft: '5px' }}></i>
              </h5>
              <span className="tiempo-badge">/contacto + Chat IA</span>
              <p>Asistente virtual Pirarucú 24/7 y directorio directo con áreas de gestión.</p>
              <span className="badge-sw">
                <i className="fa-solid fa-check"></i> Operativo
              </span>
            </div>
          </div>
        </div>

        {/* Desglose Gráfico de Funcionalidades y Resultados */}
        <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-layer-group" style={{ color: 'var(--accent-color)' }}></i> Módulos y Funcionalidades Implementadas
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '18px' }}>
            {MODULOS_INTRANET.map((mod) => (
              <div
                key={mod.id}
                style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  borderTop: `4px solid ${mod.color}`,
                  border: '1px solid #e2e8f0',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          background: mod.color,
                          color: mod.accent || 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.05rem',
                          flexShrink: 0,
                        }}
                      >
                        <i className={`fa-solid ${mod.icono}`}></i>
                      </div>
                      <div>
                        <h5 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                          {mod.titulo}
                        </h5>
                        <span style={{ fontSize: '0.73rem', color: '#64748b', fontFamily: 'monospace' }}>{mod.ruta}</span>
                      </div>
                    </div>
                    <span className="status-pill online" style={{ fontSize: '0.7rem', flexShrink: 0 }}>
                      <i className="fa-solid fa-check"></i> {mod.estado}
                    </span>
                  </div>

                  <ul style={{ fontSize: '0.83rem', color: '#475569', lineHeight: 1.55, paddingLeft: '18px', margin: 0 }}>
                    {mod.items.map((it, idx) => (
                      <li key={idx} style={{ marginBottom: idx < mod.items.length - 1 ? '6px' : 0 }}>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
