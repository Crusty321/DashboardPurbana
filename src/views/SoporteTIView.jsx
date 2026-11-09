import React, { useState, useMemo } from 'react';
import ChartCanvas from '../components/ChartCanvas';
import { TICKETS_DB } from '../data/ticketsData';

const FRENTES = [
  {
    id: 'ALL',
    titulo: 'Matriz General de Tickets (Consolidado)',
    subtitulo: 'Todos los reportes internos (Soporte TI + Escalamientos Manting)',
    badgeTexto: 'Consolidado',
    borderColor: 'var(--primary-color)',
  },
  {
    id: 'TI',
    titulo: 'Soporte TI Interno',
    subtitulo: 'Hardware, Software, Red, Impresoras, Correo, SIIGO y Telefonía',
    badgeTexto: 'Interno TI',
    borderColor: 'var(--accent-color)',
  },
  {
    id: 'Manting',
    titulo: 'Tickets Escalados a Manting',
    subtitulo: 'Sistema Welcome, Control de Accesos, CCTV y RDH (Red Detección de Humo)',
    badgeTexto: 'Proveedor',
    borderColor: 'var(--warning)',
  },
];

const MESES_LABELS = [
  { id: 'ALL', label: 'Todos los meses (Ago - Nov)' },
  { id: '2026-08', label: 'Agosto 2026' },
  { id: '2026-09', label: 'Septiembre 2026' },
  { id: '2026-10', label: 'Octubre 2026' },
  { id: '2026-11', label: 'Noviembre 2026 (En curso)' },
];

export default function SoporteTIView() {
  const [frenteActivo, setFrenteActivo] = useState('ALL');
  const [mesFiltro, setMesFiltro] = useState('ALL');
  const [urgenciaFiltro, setUrgenciaFiltro] = useState('ALL');
  const [busqueda, setBusqueda] = useState('');

  // Filtrado por frente (ALL, TI, Manting)
  const ticketsPorFrente = useMemo(() => {
    if (frenteActivo === 'ALL') return TICKETS_DB;
    return TICKETS_DB.filter((t) => t.grupo === frenteActivo);
  }, [frenteActivo]);

  // Filtrado combinado (Frente + Mes + Urgencia + Búsqueda)
  const ticketsFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return ticketsPorFrente
      .filter((t) => {
        if (mesFiltro !== 'ALL' && t.mes !== mesFiltro) return false;
        if (urgenciaFiltro !== 'ALL' && t.gravedad !== urgenciaFiltro) return false;
        if (q) {
          const hay =
            t.solicitante.toLowerCase().includes(q) ||
            t.area.toLowerCase().includes(q) ||
            t.categoria.toLowerCase().includes(q) ||
            t.descripcion.toLowerCase().includes(q) ||
            t.doliente.toLowerCase().includes(q) ||
            t.fechaHora.toLowerCase().includes(q);
          if (!hay) return false;
        }
        return true;
      })
      .slice()
      .sort((a, b) => b.id - a.id); // Más recientes primero (Noviembre -> Agosto)
  }, [ticketsPorFrente, mesFiltro, urgenciaFiltro, busqueda]);

  const pendientes = useMemo(
    () => ticketsFiltrados.filter((t) => t.estado !== 'Solucionado'),
    [ticketsFiltrados]
  );

  const solucionadas = useMemo(
    () => ticketsFiltrados.filter((t) => t.estado === 'Solucionado'),
    [ticketsFiltrados]
  );

  // Estadísticas globales por frente para las tarjetas laterales
  const conteosFrente = useMemo(() => {
    const calc = (arr) => ({
      total: arr.length,
      solucionados: arr.filter((t) => t.estado === 'Solucionado').length,
      pendientes: arr.filter((t) => t.estado !== 'Solucionado').length,
    });
    return {
      ALL: calc(TICKETS_DB),
      TI: calc(TICKETS_DB.filter((t) => t.grupo === 'TI')),
      Manting: calc(TICKETS_DB.filter((t) => t.grupo === 'Manting')),
    };
  }, []);

  // Porcentaje de resolución sobre el filtro actual
  const porcentajeResolucion = useMemo(() => {
    if (!ticketsFiltrados.length) return '0.0%';
    return ((solucionadas.length / ticketsFiltrados.length) * 100).toFixed(1) + '%';
  }, [ticketsFiltrados, solucionadas]);

  // Calificación promedio de la herramienta (columna 9 del CSV)
  const promedioClaridad = useMemo(() => {
    const nums = ticketsFiltrados
      .map((t) => parseFloat(t.calificacion))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 5);
    if (!nums.length) return '4.4';
    return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
  }, [ticketsFiltrados]);

  // Histograma mensual (May - Nov)
  const chartDataMes = useMemo(() => {
    const ago = ticketsPorFrente.filter((t) => t.mes === '2026-08').length;
    const sep = ticketsPorFrente.filter((t) => t.mes === '2026-09').length;
    const oct = ticketsPorFrente.filter((t) => t.mes === '2026-10').length;
    const nov = ticketsPorFrente.filter((t) => t.mes === '2026-11').length;

    return {
      labels: ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'],
      datasets: [
        {
          label: 'Tickets Reportados',
          data: [0, 0, 0, ago, sep, oct, nov],
          backgroundColor: ['#cbd5e1', '#cbd5e1', '#cbd5e1', '#64748b', '#3498db', '#2ecc71', '#f39c12'],
          borderRadius: 5,
        },
      ],
    };
  }, [ticketsPorFrente]);

  // Distribución por Área solicitante
  const chartDataAreas = useMemo(() => {
    const map = {};
    ticketsFiltrados.forEach((t) => {
      const a = t.area || 'Otra';
      map[a] = (map[a] || 0) + 1;
    });
    const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return {
      labels: entries.map((e) => e[0]),
      datasets: [
        {
          label: 'Tickets por Área',
          data: entries.map((e) => e[1]),
          backgroundColor: ['#1b4d3e', '#2980b9', '#e67e22', '#27ae60', '#8e44ad', '#e74c3c'],
          borderRadius: 5,
        },
      ],
    };
  }, [ticketsFiltrados]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
      plugins: { legend: { display: false } },
    }),
    []
  );

  const infoFrenteActual = FRENTES.find((f) => f.id === frenteActivo) || FRENTES[0];

  return (
    <section id="vista-proyectos" className="tab-content active-tab">
      <div className="table-container">
        <div className="table-header" style={{ borderBottom: 'none', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3>
              <i className="fa-solid fa-headset" style={{ color: 'var(--accent-color)' }}></i> Central y Bitácora de Tickets TI (Ago – Nov 2026)
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d', margin: 0 }}>
              Registro oficial consolidado del formulario de reporte de incidencias (165 tickets válidos registrados hasta el 09/11/2026)
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700 }}>
              <i className="fa-solid fa-calendar-check"></i> Último ticket: 09 Nov 2026 (16:11)
            </span>
          </div>
        </div>

        {/* KPIs Dinámicos */}
        <div className="kpi-cards" style={{ marginBottom: '22px' }}>
          <div className="card" style={{ borderLeftColor: 'var(--primary-color)' }}>
            <div className="card-header">
              <span>TOTAL TICKETS ({frenteActivo === 'ALL' ? 'MATRIZ' : frenteActivo})</span>
              <i className="fa-solid fa-ticket" style={{ color: 'var(--primary-color)' }}></i>
            </div>
            <div className="card-value">{ticketsFiltrados.length}</div>
            <p className="kpi-detail">
              TI Interno: <strong>{conteosFrente.TI.total}</strong> · Manting: <strong>{conteosFrente.Manting.total}</strong>
            </p>
          </div>

          <div className="card green-border">
            <div className="card-header">
              <span>TICKETS SOLUCIONADOS</span>
              <i className="fa-solid fa-circle-check" style={{ color: 'var(--positive)' }}></i>
            </div>
            <div className="card-value">{porcentajeResolucion}</div>
            <p className="kpi-detail">
              <strong>{solucionadas.length}</strong> de <strong>{ticketsFiltrados.length}</strong> tickets cerrados
            </p>
          </div>

          <div className="card" style={{ borderLeftColor: 'var(--alert)' }}>
            <div className="card-header">
              <span>TICKETS PENDIENTES</span>
              <i className="fa-solid fa-triangle-exclamation" style={{ color: 'var(--alert)' }}></i>
            </div>
            <div className="card-value">{pendientes.length}</div>
            <p className="kpi-detail">
              TI Interno: <strong>{conteosFrente.TI.pendientes}</strong> · Manting: <strong>{conteosFrente.Manting.pendientes}</strong>
            </p>
          </div>

          <div className="card" style={{ borderLeftColor: 'var(--warning)' }}>
            <div className="card-header">
              <span>CLARIDAD DE HERRAMIENTA</span>
              <i className="fa-solid fa-star" style={{ color: 'var(--warning)' }}></i>
            </div>
            <div className="card-value">{promedioClaridad} / 5</div>
            <p className="kpi-detail">Calificación promedio de los usuarios</p>
          </div>
        </div>

        {/* Barra de Filtros Interactivos */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                <i className="fa-solid fa-calendar-days"></i> Mes:
              </label>
              <select
                value={mesFiltro}
                onChange={(e) => setMesFiltro(e.target.value)}
                style={{
                  padding: '7px 12px',
                  borderRadius: '7px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  background: 'white',
                  color: '#0f172a',
                }}
              >
                {MESES_LABELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                <i className="fa-solid fa-gauge-high"></i> Urgencia:
              </label>
              <select
                value={urgenciaFiltro}
                onChange={(e) => setUrgenciaFiltro(e.target.value)}
                style={{
                  padding: '7px 12px',
                  borderRadius: '7px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  background: 'white',
                  color: '#0f172a',
                }}
              >
                <option value="ALL">Todas las urgencias</option>
                <option value="alta">Alta (Bloqueo total)</option>
                <option value="media">Media (Afecta parcialmente)</option>
                <option value="baja">Baja (Puedo seguir trabajando)</option>
              </select>
            </div>

            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.85rem' }}
              ></i>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por solicitante, área, descripción, extensión..."
                style={{
                  width: '100%',
                  padding: '7px 12px 7px 32px',
                  borderRadius: '7px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.84rem',
                  background: 'white',
                }}
              />
            </div>
          </div>

          {(mesFiltro !== 'ALL' || urgenciaFiltro !== 'ALL' || busqueda || frenteActivo !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setFrenteActivo('ALL');
                setMesFiltro('ALL');
                setUrgenciaFiltro('ALL');
                setBusqueda('');
              }}
              style={{
                background: '#fee2e2',
                color: '#b91c1c',
                border: '1px solid #fecaca',
                padding: '7px 12px',
                borderRadius: '7px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <i className="fa-solid fa-rotate-left"></i> Limpiar filtros
            </button>
          )}
        </div>

        {/* Selector Lateral de Frentes + Panel de Gráficas y Pendientes */}
        <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '30px' }}>
          <div style={{ flex: 1, minWidth: '290px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FRENTES.map((f) => {
              const stats = conteosFrente[f.id];
              const isSelected = frenteActivo === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setFrenteActivo(f.id)}
                  className={`contrato-card ${isSelected ? 'active-card' : ''}`}
                  style={{
                    background: isSelected ? '#f8fafc' : 'white',
                    borderRadius: '10px',
                    padding: '18px',
                    boxShadow: isSelected ? '0 6px 16px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
                    borderLeft: `5px solid ${f.borderColor}`,
                    borderTop: isSelected ? '1px solid #cbd5e1' : '1px solid #f1f5f9',
                    borderRight: isSelected ? '1px solid #cbd5e1' : '1px solid #f1f5f9',
                    borderBottom: isSelected ? '1px solid #cbd5e1' : '1px solid #f1f5f9',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '8px' }}>
                    <strong style={{ fontSize: '1.02rem', color: 'var(--primary-color)' }}>{f.titulo}</strong>
                    <span className="status-pill online" style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                      {f.badgeTexto}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '12px', lineHeight: 1.4 }}>{f.subtitulo}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '10px', fontSize: '0.8rem' }}>
                    <span style={{ color: '#334155', fontWeight: 600 }}>
                      Total: <strong>{stats.total}</strong> ({stats.solucionados} resueltos)
                    </span>
                    <span
                      className="badge alert"
                      style={{
                        background: stats.pendientes > 0 ? 'var(--alert)' : 'var(--positive)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.76rem',
                        padding: '3px 9px',
                        borderRadius: '10px',
                      }}
                    >
                      {stats.pendientes} Pendientes
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="contrato-detalle"
            style={{
              flex: 2.2,
              minWidth: '500px',
              background: 'white',
              borderRadius: '10px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ borderBottom: '2px solid var(--bg-color)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ color: 'var(--primary-color)', fontSize: '1.3rem', margin: 0 }}>{infoFrenteActual.titulo}</h3>
                <span className="status-pill online">{infoFrenteActual.badgeTexto}</span>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--accent-color)', fontSize: '0.9rem', margin: 0 }}>{infoFrenteActual.subtitulo}</p>
            </div>

            {/* 2 Gráficas: Por Mes y Por Área */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <h4 style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', fontWeight: 800, textAlign: 'center' }}>
                  <i className="fa-solid fa-chart-column" style={{ color: 'var(--accent-color)' }}></i> Evolución de Tickets por Mes (Ago - Nov)
                </h4>
                <div style={{ position: 'relative', height: '175px', width: '100%' }}>
                  <ChartCanvas id="incidenciasMesChart" type="bar" data={chartDataMes} options={chartOptions} />
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                <h4 style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', fontWeight: 800, textAlign: 'center' }}>
                  <i className="fa-solid fa-building-user" style={{ color: 'var(--primary-color)' }}></i> Tickets por Área Solicitante
                </h4>
                <div style={{ position: 'relative', height: '175px', width: '100%' }}>
                  <ChartCanvas id="incidenciasAreaChart" type="bar" data={chartDataAreas} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Tabla de Tickets Pendientes */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderTop: '1px solid var(--bg-color)', paddingTop: '18px', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', margin: 0 }}>
                  <i className="fa-solid fa-circle-exclamation" style={{ color: 'var(--alert)' }}></i> Bitácora de Tickets Pendientes / En Gestión
                </h4>
                <span className="badge alert" style={{ background: 'var(--alert)', color: 'white', fontWeight: 'bold', fontSize: '0.82rem', padding: '4px 11px', borderRadius: '12px' }}>
                  {pendientes.length} Tickets Pendientes
                </span>
              </div>

              <div style={{ overflowX: 'auto', maxHeight: '380px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <table className="data-table" style={{ width: '100%' }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                    <tr>
                      <th style={{ width: '13%', padding: '10px 12px' }}>Fecha</th>
                      <th style={{ width: '18%', padding: '10px 12px' }}>Solicitante / Área</th>
                      <th style={{ width: '36%', padding: '10px 12px' }}>Categoría / Descripción de la Incidencia</th>
                      <th style={{ width: '10%', padding: '10px 12px' }}>Urgencia</th>
                      <th style={{ width: '11%', padding: '10px 12px' }}>Doliente</th>
                      <th style={{ width: '12%', padding: '10px 12px' }}>Diagnóstico / Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendientes.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                          No hay tickets pendientes con los filtros seleccionados.
                        </td>
                      </tr>
                    ) : (
                      pendientes.map((inc) => (
                        <tr key={inc.id}>
                          <td style={{ padding: '10px 12px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                            <strong>{inc.fechaHora}</strong>
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: '0.82rem' }}>
                            <div style={{ fontWeight: 700, color: '#1e293b' }}>{inc.solicitante}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{inc.area}</div>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '2px' }}>{inc.categoria}</div>
                            <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.35 }}>{inc.descripcion}</div>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span className={`severity-tag ${inc.gravedad}`}>{inc.gravedad}</span>
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>{inc.doliente}</td>
                          <td style={{ padding: '10px 12px', fontSize: '0.78rem' }}>
                            <span className="status-pill online" style={{ fontSize: '0.72rem', padding: '3px 8px', backgroundColor: 'var(--alert)', color: 'white', display: 'inline-block', marginBottom: '3px' }}>
                              Pendiente
                            </span>
                            {(inc.diagnostico || (inc.estadoDetalle && inc.estadoDetalle.toLowerCase() !== 'pendiente')) && (
                              <div style={{ fontSize: '0.74rem', color: '#64748b', lineHeight: 1.25 }}>
                                {inc.diagnostico || inc.estadoDetalle}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Historial Completo de Tickets Solucionados */}
        <div className="table-container" style={{ marginTop: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '4px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-list-check" style={{ color: 'var(--positive)' }}></i> Historial de Tickets Solucionados ({solucionadas.length})
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#7f8c8d', margin: 0 }}>
                Registro completo de incidencias cerradas desde agosto hasta el 9 de noviembre de 2026.
              </p>
            </div>
            <span className="badge" style={{ background: '#dcfce7', color: '#166534', fontWeight: 800, padding: '6px 12px', borderRadius: '8px', fontSize: '0.82rem' }}>
              <i className="fa-solid fa-check-double"></i> {solucionadas.length} Resueltos ({porcentajeResolucion})
            </span>
          </div>

          <div style={{ overflowX: 'auto', maxHeight: '540px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <table className="data-table" style={{ width: '100%' }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <tr>
                  <th style={{ width: '12%' }}>Fecha / Hora</th>
                  <th style={{ width: '18%' }}>Solicitante / Área</th>
                  <th style={{ width: '16%' }}>Categoría</th>
                  <th style={{ width: '30%' }}>Descripción del Incidente</th>
                  <th style={{ width: '9%' }}>Urgencia</th>
                  <th style={{ width: '8%' }}>Doliente</th>
                  <th style={{ width: '7%' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {solucionadas.map((inc) => (
                  <tr key={inc.id}>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                      <strong>{inc.fechaHora}</strong>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>
                      <div style={{ fontWeight: 700, color: '#1e293b' }}>{inc.solicitante}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{inc.area}</div>
                    </td>
                    <td style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)' }}>{inc.categoria}</td>
                    <td style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.38 }}>
                      {inc.descripcion}
                      {inc.diagnostico && (
                        <div style={{ fontSize: '0.74rem', color: '#0f766e', marginTop: '3px', fontWeight: 600 }}>
                          <i className="fa-solid fa-screwdriver-wrench"></i> Diagnóstico: {inc.diagnostico}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`severity-tag ${inc.gravedad}`}>{inc.gravedad}</span>
                    </td>
                    <td style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>{inc.doliente}</td>
                    <td>
                      <span style={{ color: 'var(--positive)', fontWeight: 'bold', fontSize: '0.8rem' }}>
                        <i className="fa-solid fa-check"></i> {inc.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
