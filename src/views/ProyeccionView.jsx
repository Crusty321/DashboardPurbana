import React, { useState } from 'react';

const PROYECTOS_NOVIEMBRE = [
  {
    id: 1,
    numero: '01',
    titulo: 'Inventario de Activos y Estampilla QR',
    subtitulo: 'Activos Fijos y Activos Tecnológicos con Trazabilidad QR',
    icono: 'fa-qrcode',
    color: '#3498db',
    progreso: 35,
    estado: 'En Ejecución',
    estadoClase: 'info',
    imagenAdjunta: {
      src: '/static/img/estampilla_qr_horizontal.png',
      titulo: 'Estampilla Oficial QR — Primavera Urbana',
      etiqueta: 'Estampilla QR Oficial',
      leyenda: [
        'Logo Primavera Urbana',
        'Clasificación: Activo Fijo / TI',
        'Código QR + Serie (Ej. ECC-0037)',
      ],
    },
    diagrama: [
      {
        paso: '1',
        titulo: 'Censo de Activos',
        detalle: 'Levantamiento de activos fijos y tecnológicos',
        icono: 'fa-clipboard-list',
        estado: 'done',
      },
      {
        paso: '2',
        titulo: 'Diseño y Generación QR',
        detalle: 'Logo empresa + Tipo activo + Código QR',
        icono: 'fa-qrcode',
        estado: 'done',
      },
      {
        paso: '3',
        titulo: 'Estampillado Físico',
        detalle: 'Postura de etiqueta QR en cada equipo',
        icono: 'fa-tags',
        estado: 'active',
      },
      {
        paso: '4',
        titulo: 'Consolidación Digital',
        detalle: 'Carga de QRs en Drive y BD maestra Excel',
        icono: 'fa-cloud-arrow-up',
        estado: 'pending',
      },
    ],
    entregables: [
      { icono: 'fa-file-lines', texto: 'Informe del Ítem 1' },
      { icono: 'fa-google-drive', brand: true, texto: 'Códigos QR en Google Drive' },
      { icono: 'fa-file-excel', texto: 'Base de Datos Excel (Activos y TI)' },
    ],
  },
  {
    id: 2,
    numero: '02',
    titulo: 'Software de Seguimiento de Compras',
    subtitulo: 'Plataforma de Control y Trazabilidad de Requisiciones',
    icono: 'fa-cart-shopping',
    color: '#2c3e50',
    progreso: 25,
    estado: 'Levantamiento Requerimientos',
    estadoClase: 'warning',
    subDiagramaTitulo: 'Requerimientos del Flujo de Compras (Inputs del Sistema)',
    subDiagramaNodos: [
      { icono: 'fa-file-pen', label: 'Solicitud Área', sub: 'ID + Centro Costo' },
      { icono: 'fa-scale-balanced', label: 'Cotizaciones', sub: 'Proveedores + PDF' },
      { icono: 'fa-user-check', label: 'Aprobación', sub: 'Rol Gerencia' },
      { icono: 'fa-file-invoice-dollar', label: 'Orden Compra', sub: 'Semáforo SLA' },
      { icono: 'fa-box-check', label: 'Recepción', sub: 'Factura y Cierre' },
    ],
    diagrama: [
      {
        paso: '1',
        titulo: 'Levantamiento Requerimientos',
        detalle: 'Roles, flujo de estados OC, campos y alertas SLA',
        icono: 'fa-magnifying-glass-chart',
        estado: 'active',
      },
      {
        paso: '2',
        titulo: 'Arquitectura y Base de Datos',
        detalle: 'Modelado de usuarios, requisiciones y soportes PDF',
        icono: 'fa-database',
        estado: 'pending',
      },
      {
        paso: '3',
        titulo: 'Desarrollo de Módulos',
        detalle: 'Tablero de estados, aprobaciones y notificaciones',
        icono: 'fa-laptop-code',
        estado: 'pending',
      },
      {
        paso: '4',
        titulo: 'Entrega y Escalamiento',
        detalle: 'Software en marcha + Manual técnico',
        icono: 'fa-rocket',
        estado: 'pending',
      },
    ],
    entregables: [
      { icono: 'fa-file-lines', texto: 'Informe del Ítem 2' },
      { icono: 'fa-laptop-code', texto: 'Software de Compras Funcional' },
      { icono: 'fa-book', texto: 'Documentación Técnica (Escalamiento)' },
    ],
  },
  {
    id: 3,
    numero: '03',
    titulo: 'Montaje y Sonido Cascada Central',
    subtitulo: 'Adecuación Estructural, Equipos y Cableado de Audio',
    icono: 'fa-volume-high',
    color: '#e67e22',
    progreso: 75,
    estado: 'A la espera de Tarima',
    estadoClase: 'warning',
    imagenAdjunta: {
      src: '/static/img/mapa_sonido_cascada.png',
      titulo: 'Plano de Distribución — Sonido Cascada Central',
      etiqueta: 'Mapa Proyecto Sonido',
      leyenda: [
        '1: Tarima Central (Escenario)',
        '2 y 3: Cabinas en Rocas (Perforadas)',
        '4: Retorno Tarima | 5: Ruta Cableado',
      ],
    },
    diagrama: [
      {
        paso: '1',
        titulo: 'Diagnóstico de Equipos',
        detalle: 'Revisión total de equipos recibidos de Mercadeo',
        icono: 'fa-stethoscope',
        estado: 'done',
      },
      {
        paso: '2',
        titulo: 'Mantenimiento Correctivo',
        detalle: 'Envío y reparación de cada elemento de sonido',
        icono: 'fa-screwdriver-wrench',
        estado: 'done',
      },
      {
        paso: '3',
        titulo: 'Perforación en Rocas',
        detalle: 'Adecuación física para posicionar cabinas (Puntos 2 y 3)',
        icono: 'fa-bore-hole',
        estado: 'done',
      },
      {
        paso: '4',
        titulo: 'Tarima, Cableado y Pruebas',
        detalle: 'En espera de tarima (Punto 1) para cablear y probar',
        icono: 'fa-plug',
        estado: 'active',
      },
    ],
    entregables: [
      { icono: 'fa-file-lines', texto: 'Informe del Ítem 3' },
      { icono: 'fa-bullhorn', texto: 'Sistema de Sonido Puesto en Marcha para Eventos' },
    ],
  },
  {
    id: 4,
    numero: '04',
    titulo: 'Inventario de Cámaras y Direccionamiento IP',
    subtitulo: 'Actualización de Red CCTV y Mapa Topológico',
    icono: 'fa-video',
    color: '#2980b9',
    progreso: 40,
    estado: 'En Ejecución',
    estadoClase: 'info',
    diagrama: [
      {
        paso: '1',
        titulo: 'Escaneo y Auditoría IP',
        detalle: 'Levantamiento de IPs activas en switches y NVR',
        icono: 'fa-radar',
        iconoAlt: 'fa-tower-Show',
        iconoFinal: 'fa-satellite-dish',
        estado: 'done',
      },
      {
        paso: '2',
        titulo: 'Actualización Inventario IP',
        detalle: 'Consolidación de tabla de direccionamiento de cámaras',
        icono: 'fa-table-list',
        estado: 'active',
      },
      {
        paso: '3',
        titulo: 'Diseño Mapa Topológico',
        detalle: 'Diagramación lógica y física de todos los dispositivos',
        icono: 'fa-diagram-project',
        estado: 'pending',
      },
      {
        paso: '4',
        titulo: 'Validación y Entrega',
        detalle: 'Soportes técnicos de red y topología final',
        icono: 'fa-file-shield',
        estado: 'pending',
      },
    ],
    entregables: [
      { icono: 'fa-file-lines', texto: 'Informe del Ítem 4' },
      { icono: 'fa-list-ol', texto: 'Documento Soportado Direccionamiento IP' },
      { icono: 'fa-sitemap', texto: 'Mapa Topológico de Red (Todos los Dispositivos)' },
    ],
  },
  {
    id: 5,
    numero: '05',
    titulo: 'Configuración de Respaldos (Backups 3-2-1)',
    subtitulo: 'Nube por Áreas, Servidor NAS y Discos Externos',
    icono: 'fa-database',
    color: '#8e44ad',
    progreso: 50,
    estado: 'En Curso',
    estadoClase: 'info',
    diagrama: [
      {
        paso: '1',
        titulo: 'Asignación Nube por Área',
        detalle: 'Estructuración de carpetas y documentos en la nube',
        icono: 'fa-cloud',
        estado: 'done',
      },
      {
        paso: '2',
        titulo: 'Entrega Correo (Rol Lector)',
        detalle: 'Envío de accesos de lectura a cada área vía email',
        icono: 'fa-envelope-circle-check',
        estado: 'active',
      },
      {
        paso: '3',
        titulo: 'Backups NAS y Discos',
        detalle: 'Ejecución de copias en servidor NAS y discos externos',
        icono: 'fa-hard-drive',
        estado: 'active',
      },
      {
        paso: '4',
        titulo: 'Manual 3-2-1 y Auditoría',
        detalle: 'Procedimiento documentado + Custodia credenciales',
        icono: 'fa-user-shield',
        estado: 'pending',
      },
    ],
    entregables: [
      { icono: 'fa-file-lines', texto: 'Informe del Ítem 5' },
      { icono: 'fa-shield-halved', texto: 'Documento Procedimiento Backups (Método 3-2-1)' },
      { icono: 'fa-key', texto: 'Credenciales de Acceso para Revisión de Auditoría' },
    ],
  },
  {
    id: 6,
    numero: '06',
    titulo: 'Despliegue Oficial de la Intranet',
    subtitulo: 'Puesta en Producción en Dominio Propio Primavera Urbana',
    icono: 'fa-globe',
    color: '#27ae60',
    progreso: 90,
    estado: 'Fase Final',
    estadoClase: 'online',
    diagrama: [
      {
        paso: '1',
        titulo: 'Cierre de Desarrollo',
        detalle: 'Módulos de Intranet integrados y validados',
        icono: 'fa-code',
        estado: 'done',
      },
      {
        paso: '2',
        titulo: 'Dominio Primavera Urbana',
        detalle: 'Configuración DNS, SSL y despliegue en dominio propio',
        icono: 'fa-earth-americas',
        estado: 'done',
      },
      {
        paso: '3',
        titulo: 'Repositorio GitHub',
        detalle: 'Control de versiones y accesos para escalamiento',
        icono: 'fa-code-branch',
        estado: 'active',
      },
      {
        paso: '4',
        titulo: 'Lanzamiento Oficial',
        detalle: 'Entrega de software terminado y documentado',
        icono: 'fa-circle-check',
        estado: 'pending',
      },
    ],
    entregables: [
      { icono: 'fa-file-lines', texto: 'Informe del Ítem 6' },
      { icono: 'fa-laptop-file', texto: 'Software Terminado y Documentado' },
      { icono: 'fa-github', brand: true, texto: 'Accesos a GitHub (En caso de Escalamiento)' },
    ],
  },
];

const ESTADO_STYLE = {
  done: {
    bg: '#f0fdf4',
    border: '#22c55e',
    badgeBg: '#22c55e',
    badgeText: 'Completado',
    badgeIcon: 'fa-check',
    iconColor: '#16a34a',
  },
  active: {
    bg: '#eff6ff',
    border: '#3b82f6',
    badgeBg: '#f59e0b',
    badgeText: 'En Proceso',
    badgeIcon: 'fa-rotate',
    iconColor: '#2563eb',
  },
  pending: {
    bg: '#f8fafc',
    border: '#cbd5e1',
    badgeBg: '#94a3b8',
    badgeText: 'Por Ejecutar',
    badgeIcon: 'fa-clock',
    iconColor: '#64748b',
  },
};

export default function ProyeccionView() {
  const [activeSubTab, setActiveSubTab] = useState('noviembre');
  const [filtroId, setFiltroId] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);

  const listaProyectos = filtroId
    ? PROYECTOS_NOVIEMBRE.filter((p) => p.id === filtroId)
    : PROYECTOS_NOVIEMBRE;

  return (
    <section id="proyeccion" className="tab-content active-tab">
      {/* Modal de Zoom para Imágenes */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '14px',
              padding: '18px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              cursor: 'default',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
              <strong style={{ color: 'var(--primary-color)', fontSize: '1rem' }}>
                <i className="fa-solid fa-magnifying-glass-plus" style={{ color: 'var(--accent-color)', marginRight: '8px' }}></i>
                {zoomImage.titulo}
              </strong>
              <button
                onClick={() => setZoomImage(null)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                }}
              >
                <i className="fa-solid fa-xmark"></i> Cerrar
              </button>
            </div>
            <img
              src={zoomImage.src}
              alt={zoomImage.titulo}
              style={{ maxWidth: '82vw', maxHeight: '76vh', objectFit: 'contain', borderRadius: '8px', margin: '0 auto' }}
            />
          </div>
        </div>
      )}

      {/* Sub-pestaña interior: Proyección Mes de Noviembre */}
      <div
        className="top-tabs-menu"
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          borderBottom: '2px solid var(--border-color)',
          paddingBottom: '10px',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className={`top-tab-btn ${activeSubTab === 'noviembre' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('noviembre')}
          >
            <i className="fa-solid fa-diagram-project" style={{ color: 'var(--accent-color)' }}></i> Proyección Mes de Noviembre
          </button>

          {filtroId && (
            <button
              className="btn-volver"
              style={{ marginBottom: 0, padding: '6px 12px', fontSize: '0.8rem' }}
              onClick={() => setFiltroId(null)}
            >
              <i className="fa-solid fa-grip"></i> Ver las 6 Actividades
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.78rem', color: '#475569' }}>
          <span>
            <i className="fa-solid fa-circle" style={{ color: '#22c55e', fontSize: '0.6rem' }}></i> Completado
          </span>
          <span>
            <i className="fa-solid fa-circle" style={{ color: '#3b82f6', fontSize: '0.6rem' }}></i> En Proceso
          </span>
          <span>
            <i className="fa-solid fa-circle" style={{ color: '#cbd5e1', fontSize: '0.6rem' }}></i> Por Ejecutar
          </span>
        </div>
      </div>

      {activeSubTab === 'noviembre' && (
        <div className="sub-vista active-sub-vista">
          {/* Barra Superior de Navegación Rápida entre los 6 Diagramas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
              gap: '10px',
              marginBottom: '22px',
            }}
          >
            {PROYECTOS_NOVIEMBRE.map((p) => {
              const active = filtroId === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setFiltroId(active ? null : p.id)}
                  style={{
                    background: active ? p.color : 'white',
                    color: active ? 'white' : 'var(--primary-color)',
                    borderRadius: '10px',
                    padding: '12px',
                    cursor: 'pointer',
                    border: `2px solid ${active ? p.color : 'var(--border-color)'}`,
                    boxShadow: active ? '0 6px 14px rgba(0,0,0,0.12)' : '0 2px 5px rgba(0,0,0,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: active ? 'rgba(255,255,255,0.2)' : `${p.color}18`,
                      color: active ? 'white' : p.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.05rem',
                      flexShrink: 0,
                    }}
                  >
                    <i className={`fa-solid ${p.icono}`}></i>
                  </div>
                  <div style={{ overflow: 'hidden', flex: 1 }}>
                    <div style={{ fontSize: '0.68rem', opacity: 0.75, fontWeight: 'bold' }}>PROCESO {p.numero}</div>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={p.titulo}
                    >
                      {p.titulo}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lista de Diagramas de Proceso por cada Actividad */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {listaProyectos.map((p) => (
              <div
                key={p.id}
                className="card"
                style={{
                  borderTop: `4px solid ${p.color}`,
                  borderLeft: 'none',
                  padding: '22px 24px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                }}
              >
                {/* Encabezado de la Actividad + Barra de Progreso */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '14px',
                    marginBottom: '18px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: p.color,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                      }}
                    >
                      <i className={`fa-solid ${p.icono}`}></i>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            background: `${p.color}18`,
                            color: p.color,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                          }}
                        >
                          Diagrama de Proceso #{p.numero}
                        </span>
                        <span className={`status-pill ${p.estadoClase}`} style={{ fontSize: '0.72rem' }}>
                          {p.estado}
                        </span>
                      </div>
                      <h4 style={{ margin: '4px 0 0', fontSize: '1.12rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                        {p.titulo}
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.subtitulo}</span>
                    </div>
                  </div>

                  {/* Indicador de avance circular/barra */}
                  <div style={{ minWidth: '170px', textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: '#64748b', marginBottom: '4px' }}>
                      AVANCE DEL PROCESO: <span style={{ color: p.color, fontSize: '0.9rem' }}>{p.progreso}%</span>
                    </div>
                    <div className="progress-track" style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        className="progress-fill"
                        style={{ width: `${p.progreso}%`, height: '100%', backgroundColor: p.color, borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Cuerpo Principal: Diagrama de Flujo Conectado + Imagen Adjunta (si aplica) */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch', flexWrap: 'wrap' }}>
                  {/* Columna del Diagrama de Proceso */}
                  <div style={{ flex: 3, minWidth: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {/* Flujo de 4 Nodos Conectados por Flechas */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'stretch',
                        justifyContent: 'space-between',
                        gap: '6px',
                        flexWrap: 'nowrap',
                        overflowX: 'auto',
                        padding: '12px 4px',
                      }}
                    >
                      {p.diagrama.map((nodo, idx) => {
                        const st = ESTADO_STYLE[nodo.estado] || ESTADO_STYLE.pending;
                        return (
                          <React.Fragment key={idx}>
                            {/* Nodo del Diagrama */}
                            <div
                              style={{
                                flex: 1,
                                minWidth: '145px',
                                background: st.bg,
                                border: `2px solid ${st.border}`,
                                borderRadius: '12px',
                                padding: '16px 12px 12px',
                                position: 'relative',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: '0 3px 8px rgba(0,0,0,0.04)',
                              }}
                            >
                              {/* Círculo superior de Número de Paso */}
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '-12px',
                                  left: '12px',
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  background: p.color,
                                  color: 'white',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                                }}
                              >
                                {nodo.paso}
                              </div>

                              {/* Badge de estado en esquina derecha */}
                              <span
                                style={{
                                  position: 'absolute',
                                  top: '-10px',
                                  right: '10px',
                                  background: st.badgeBg,
                                  color: 'white',
                                  fontSize: '0.62rem',
                                  fontWeight: 'bold',
                                  padding: '2px 7px',
                                  borderRadius: '10px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                              >
                                <i className={`fa-solid ${st.badgeIcon}`}></i> {st.badgeText}
                              </span>

                              <div>
                                <div
                                  style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    border: `1px solid ${st.border}`,
                                    color: st.iconColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.15rem',
                                    margin: '4px auto 8px',
                                  }}
                                >
                                  <i className={`fa-solid ${nodo.iconoFinal || nodo.icono}`}></i>
                                </div>

                                <div style={{ fontSize: '0.84rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '4px', lineHeight: 1.2 }}>
                                  {nodo.titulo}
                                </div>
                                <div style={{ fontSize: '0.74rem', color: '#475569', lineHeight: 1.35 }}>
                                  {nodo.detalle}
                                </div>
                              </div>
                            </div>

                            {/* Flecha Conectora entre Nodos */}
                            {idx < p.diagrama.length - 1 && (
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: p.color,
                                  fontSize: '1.15rem',
                                  padding: '0 2px',
                                  flexShrink: 0,
                                }}
                              >
                                <i className="fa-solid fa-arrow-right-long"></i>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Sub-diagrama Especial para el Ítem 2 (Flujo Interno del Software de Compras) */}
                    {p.subDiagramaNodos && (
                      <div
                        style={{
                          marginTop: '10px',
                          background: '#f8fafc',
                          border: '1px dashed #94a3b8',
                          borderRadius: '10px',
                          padding: '10px 14px',
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--primary-color)', textTransform: 'uppercase', marginBottom: '8px' }}>
                          <i className="fa-solid fa-sitemap" style={{ color: p.color, marginRight: '6px' }}></i>
                          {p.subDiagramaTitulo}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', overflowX: 'auto' }}>
                          {p.subDiagramaNodos.map((sn, sIdx) => (
                            <React.Fragment key={sIdx}>
                              <div
                                style={{
                                  flex: 1,
                                  background: 'white',
                                  border: '1px solid #cbd5e1',
                                  borderRadius: '8px',
                                  padding: '7px 8px',
                                  textAlign: 'center',
                                  minWidth: '105px',
                                }}
                              >
                                <i className={`fa-solid ${sn.icono}`} style={{ color: p.color, fontSize: '0.9rem', marginBottom: '3px' }}></i>
                                <div style={{ fontSize: '0.73rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{sn.label}</div>
                                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{sn.sub}</div>
                              </div>
                              {sIdx < p.subDiagramaNodos.length - 1 && (
                                <i className="fa-solid fa-chevron-right" style={{ color: '#94a3b8', fontSize: '0.75rem' }}></i>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tarjeta Lateral de Evidencia Gráfica (Estampilla QR en Ítem 1 / Mapa Cascada en Ítem 3) */}
                  {p.imagenAdjunta && (
                    <div
                      style={{
                        flex: 1,
                        minWidth: '230px',
                        maxWidth: '280px',
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        border: `1px solid ${p.color}40`,
                        borderRadius: '12px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '8px',
                        margin: '0 auto',
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: p.color, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>
                          <i className="fa-solid fa-image"></i> {p.imagenAdjunta.etiqueta}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Clic para zoom</span>
                      </div>

                      <div
                        onClick={() =>
                          setZoomImage({
                            src: p.imagenAdjunta.src,
                            titulo: p.imagenAdjunta.titulo,
                          })
                        }
                        style={{
                          background: 'white',
                          borderRadius: '8px',
                          padding: '6px',
                          border: '1px solid #cbd5e1',
                          cursor: 'zoom-in',
                          textAlign: 'center',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        }}
                      >
                        <img
                          src={p.imagenAdjunta.src}
                          alt={p.imagenAdjunta.titulo}
                          style={{
                            width: '100%',
                            maxHeight: '130px',
                            objectFit: 'contain',
                            borderRadius: '4px',
                            display: 'block',
                            margin: '0 auto',
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {p.imagenAdjunta.leyenda.map((l, lIdx) => (
                          <div key={lIdx} style={{ fontSize: '0.72rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <i className="fa-solid fa-caret-right" style={{ color: p.color }}></i>
                            <span>{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Conector Vertical hacia Nodo de Salida (Entregables del Proceso) */}
                <div
                  style={{
                    marginTop: '14px',
                    paddingTop: '12px',
                    borderTop: '2px dashed #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', fontWeight: 'bold', color: '#16a34a', textTransform: 'uppercase' }}>
                    <span
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '6px',
                        background: '#dcfce7',
                        color: '#16a34a',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <i className="fa-solid fa-flag-checkered"></i>
                    </span>
                    <span>Salida del Proceso (Entregables Ítem {p.numero}):</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {p.entregables.map((ent, eIdx) => (
                      <span
                        key={eIdx}
                        style={{
                          background: eIdx === 0 ? '#eff6ff' : '#f0fdf4',
                          color: eIdx === 0 ? '#1d4ed8' : '#15803d',
                          border: `1px solid ${eIdx === 0 ? '#bfdbfe' : '#bbf7d0'}`,
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                        }}
                      >
                        <i className={`${ent.brand ? 'fa-brands' : 'fa-solid'} ${ent.icono}`}></i>
                        {ent.texto}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
