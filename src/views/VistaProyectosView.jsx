import React, { useState, useMemo } from 'react';
import ChartCanvas from '../components/ChartCanvas';

const CONTRATOS_DATA = {
  c1: {
    proveedor: 'Manting (Soporte CCTV, BMS, Automatización)',
    contratoId: 'Contratos: CPU-022-2025 & CPU-031-2025',
    sublabel: 'CPU-022-2025 / CPU-031-2025 (CCTV, BMS y Automatización)',
    badgeCount: 7,
    badgeClass: 'alert',
    borderColor: 'var(--accent-color)',
    chartColor: '#3498db',
    estado: 'Activo / Vigente',
    estadoClase: 'online',
    alcance: `<strong>Objetivo Principal:</strong> Prestar el servicio de mantenimiento preventivo y correctivo para el sistema de Circuito Cerrado de Televisión (CCTV), hardware de soporte y software/hardware de supervisión (BMS) que forman parte del sistema de automatización del Centro Comercial y Empresarial Primavera Urbana.<br><br>
    <strong>Alcance Integrado (Subsistemas):</strong>
    <ul style="padding-left: 20px; margin-top: 5px; list-style-type: disc;">
        <li><strong>Sistema de Control de Accesos y Welcome:</strong> Torniquetes, molinetes, biometría y plataforma de visitantes en lobbies.</li>
        <li><strong>Circuito Cerrado de Televisión (CCTV):</strong> Cámaras, servidores de almacenamiento y switches de red.</li>
        <li><strong>Red Detección de Humo (RDH):</strong> Sensores de humo, panel de detección, estaciones manuales y sirenas.</li>
        <li><strong>Sistemas de Intrusión:</strong> Botones de pánico, paneles y antenas.</li>
        <li><strong>Cuarto de Monitoreo, Redes y Conteo:</strong> Rack, servidores, switches y plataforma de conteo.</li>
    </ul>`,
    incidencias: [
      { fecha: '2026-08-18 11:27', motivo: 'Red e Internet', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por Diana Gonzalez' },
      { fecha: '2026-08-18 16:22', motivo: 'Sistema lento y no reconoce visitantes', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Liliana Chiquiza' },
      { fecha: '2026-08-20 19:48', motivo: 'Pérdida conexión cámara s14c16 en torre j piso 8 m2', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Harold Aza - Posible falla IP/Física' },
      { fecha: '2026-08-21 07:29', motivo: 'Pérdida conexión cámara s12c10 piso 3 modulo 5', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Harold Aza - Posible falla IP/Física' },
      { fecha: '2026-08-25 09:19', motivo: 'Movimiento de cámara', gravedad: 'baja', estado: 'Solucionado', observacion: 'Reportado por Alejandra Rodriguez' },
      { fecha: '2026-08-25 09:46', motivo: 'Limpieza de cámara p2 sobre la casa del kumis', gravedad: 'baja', estado: 'Solucionado', observacion: 'Reportado por Alejandra Rodriguez - Mantenimiento físico' },
      { fecha: '2026-08-25 09:48', motivo: 'Cámara frente a fervor p1-m8 grabar directo y movimiento', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por Alejandra Rodriguez' },
      { fecha: '2026-08-25 16:17', motivo: 'Falla al ingresar número de documento', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Diana Gonzalez' },
      { fecha: '2026-08-26 12:06', motivo: 'Credenciales de acceso / no toma los rostros', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Liliana Chiquiza' },
      { fecha: '2026-08-26 15:16', motivo: 'Pérdida de conexión IP de cámara', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Harold Aza - Falla de red recurrente' },
      { fecha: '2026-08-26 15:32', motivo: 'Pantalla de acceso hardware/dispositivos', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por Diana Gil' },
      { fecha: '2026-08-27 11:38', motivo: 'Credenciales de acceso / no está dando ingreso', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Liliana Chiquiza' },
      { fecha: '2026-08-27 11:54', motivo: 'Credenciales de acceso en lobby 3', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Liliana Chiquiza' },
      { fecha: '2026-08-28 14:48', motivo: 'Biométrico derecho al ingresar visitantes', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Diana Gonzalez' },
      { fecha: '2026-08-29 08:50', motivo: 'Cámara p7-m2 auditorio fuera de servicio', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Alejandra Rodriguez' },
      { fecha: '2026-08-31 18:11', motivo: 'Local Milanelo obturador', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Harold Aza - Sistema Pánico' },
      { fecha: '2026-09-01 07:56', motivo: 'Lobby 3 sistema Welcome demora aprox 20 seg por CC', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Diana Gonzalez' },
      { fecha: '2026-09-02 16:55', motivo: 'Sistema Welcome se bloquea/lento', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Liliana Chiquiza' },
      { fecha: '2026-09-04 18:34', motivo: 'Sistema Welcome reinicios/fallas', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Liliana Chiquiza' },
      { fecha: '2026-09-04 18:37', motivo: 'Sistema Welcome fuera de servicio', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Liliana Chiquiza' },
      { fecha: '2026-09-06', motivo: 'CÁMARA S10C10 IMAGEN BORROSA', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN CAMILO ORTIZ' },
      { fecha: '2026-09-06', motivo: 'CAMARAS S14C23 Y S14C24 IMAGEN A BLANCO Y NEGRO PTOS DE PAGO', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN CAMILO ORTIZ' },
      { fecha: '2026-09-08', motivo: 'camaras S05C18 Y S05C17 están robóticas y se van y vuelven', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN CAMILO ORTIZ' },
      { fecha: '2026-09-08', motivo: 'SISTEMA DE DETECCIÓN DE INCENDIO LAZO 2 CAIDO (Panel de Detección de Humo)', gravedad: 'alta', estado: 'Pendiente', observacion: 'Reportado por CRISTIAN CAMILO ORTIZ - Pendiente en panel de detección de humo' },
      { fecha: '2026-09-09', motivo: 'Soporte derecho de molinos / torniquete suelto Lobby 3', gravedad: 'media', estado: 'Pendiente', observacion: 'Reportado por DIANA GONZALEZ - Pendiente ajuste torniquete' },
      { fecha: '2026-09-12', motivo: 'LECTORES BIOMETRICOS: biométrico adm/casino no marca/apagado', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Cristian camilo ' },
      { fecha: '2026-09-12', motivo: 'TECLADOS: Lector ingreso Casino no marcan números', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por DANIEL FELIPE GARCIA ZAPATA' },
      { fecha: '2026-09-13', motivo: 'PTZ EXTERNA PERDIÓ LA CONEXIÓN CON LA CAMARA', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Cristian ' },
      { fecha: '2026-09-14', motivo: 'boton de panico local # 325 no funciona', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Cristian ' },
      { fecha: '2026-09-15', motivo: 'camara piso 3 lobby 3 s09c02 ascensores no presenta movimiento', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-15', motivo: 'MOLINETE / TORNIQUETE DERECHO ESTA DIRECTO', gravedad: 'alta', estado: 'Pendiente', observacion: 'Reportado por Cristian/Cristian ortiz - Sin resolver' },
      { fecha: '2026-09-16', motivo: 'Sensor y panel de detección de humo (cuarto de tempoaseo)', gravedad: 'media', estado: 'Pendiente', observacion: 'Reportado por Santiago Echeverry Silva - Sin resolver' },
      { fecha: '2026-09-17', motivo: 'Torniquete queda directo', gravedad: 'alta', estado: 'Pendiente', observacion: 'Reportado por CRISTIAN CAMILO ORTIZ - Sin resolver' },
      { fecha: '2026-09-24', motivo: 'TORNIQUETE INGRESOS ADMINISTRACION Y CASINO DIRECTO', gravedad: 'alta', estado: 'Pendiente', observacion: 'Reportado por CRISTIAN ORTIZ - Sin resolver' },
      { fecha: '2026-09-25', motivo: 'cámara s06c13 borrosa', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-26', motivo: 'Torniquete (molinete) por momentos directo', gravedad: 'alta', estado: 'Pendiente', observacion: 'Reportado por Cristian - Sin resolver' },
      { fecha: '2026-09-29', motivo: 'biometríco puerta rampa sotano 2 a torre 1 no funciona el lector de huella', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ORTIZ ' },
      { fecha: '2026-09-29', motivo: 'Cámara S14c04 sin link', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por Cristian Ortiz' },
      { fecha: '2026-09-29', motivo: 'CAMARA S14C11 AL PARECER DESENFOCADA Y CON TELARAÑAS', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ORTIZ ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S10C10 BORROSA , NO ES CLARA LA IMAGEN', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S11C18 BLANCO Y NEGRO', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S13C12 NO SE OBSERVA A COLOR', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S13C25 , AL PARECER CON TELARAÑAS O SUCIA EN LENTE', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S14C05 IMAGEN SUCIA O MALA CLARIDAD DE IMAGEN', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S14C16 , SIN LINK', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S14C23 NO SE OBSERVA A COLOR', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S14C24 NO SE OBSERVA A COLOR', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S05C11 CON SUCIO O TELARAÑAS', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S05C18 ROBOTICA', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S05C17 ROBOTICA', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'CAMARA S05C33 NO SE VE , PRESENTA INTERFERENCIA O EN BLANCO', gravedad: 'alta', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
      { fecha: '2026-09-29', motivo: 'S06C13 SE ENCUENTRA CON IMAGEN BORROSA', gravedad: 'media', estado: 'Solucionado', observacion: 'Reportado por CRISTIAN ' },
    ],
    histograma: [0, 0, 0, 16, 36, 64, 0],
  },
  c3: {
    proveedor: 'E-Global (Smart Parking)',
    contratoId: 'Contrato: 012-23.1',
    sublabel: '012-23.1 (Smart Parking)',
    badgeCount: 0,
    badgeClass: 'neutral',
    borderColor: 'var(--primary-color)',
    chartColor: '#2c3e50',
    estado: 'Activo (Otrosí 3)',
    estadoClase: 'online',
    alcance: `<strong>Objetivo Principal:</strong> Prestar el servicio de mantenimiento preventivo y correctivo para el sistema integrado denominado Smart Parking Seamless y Tiquete (con repuestos incluidos).<br><br>
    <strong>Alcance:</strong> El servicio se aplicará exclusivamente a los equipos que componen dicho sistema, el cual está ubicado en la calle 15 #40-01, barrio el Buque, en la ciudad de Villavicencio. Incluye la ejecución de mantenimientos preventivos bajo un cronograma establecido, la atención y corrección de fallas (mantenimiento correctivo) reportadas mediante un sistema de tickets, y el suministro de los repuestos necesarios para garantizar la operatividad y el óptimo funcionamiento del sistema.<br><br>
    <strong>Vigencia:</strong> Desde el 1 de septiembre de 2023 hasta el 31 de agosto de 2027 (Vigencia inicial extendida por un año mediante Otrosí 1, y posteriormente extendida por otro año mediante Otrosí 2, y ampliada nuevamente mediante Otrosí 3).`,
    incidencias: [
      { fecha: '2026-10-26', motivo: 'MODULO ADMINISTRATIVO PARKING-01/Pirmavera22 (Solución Remota - Nivel 2)', gravedad: 'alta', estado: 'Solucionado', observacion: '6 incidentes cerrados en octubre' },
      { fecha: '2026-10-29', motivo: 'POS-AUTOMATICO-01/Pirmavera04 (Cambio de Dispositivo)', gravedad: 'alta', estado: 'Solucionado', observacion: '5 incidentes cerrados en octubre (INC00067561 fuera de SLA: 69h 46m)' },
      { fecha: '2026-10-23', motivo: 'CARRIL-ENT-03/Pirmavera03 (Ajuste de hardware en sitio)', gravedad: 'alta', estado: 'Solucionado', observacion: '4 incidentes cerrados en octubre' },
      { fecha: '2026-10-26', motivo: 'CARRIL-SAL-02/Pirmavera13 (Daño externo – Equipo recuperado en sitio)', gravedad: 'media', estado: 'Solucionado', observacion: '3 incidentes cerrados en octubre' },
      { fecha: '2026-10-05', motivo: 'CARRIL-SAL-04/Pirmavera15 (Sin aprobación y/o O.C - INC00049317)', gravedad: 'media', estado: 'Solucionado', observacion: '3 incidentes en octubre (306h 33m - No cumple SLA)' },
      { fecha: '2026-10-30', motivo: '32 OTs Correctivas ejecutadas / 39 Incidentes cerrados en Octubre', gravedad: 'baja', estado: 'Solucionado', observacion: 'Cumplimiento ANS: 92.3% (36/39 en SLA de 24h hábiles)' },
    ],
    histograma: [0, 0, 0, 0, 59, 39, 0],
  },
};

const HISTORIAL_GENERAL = [
  { fecha: '2026-08-18 11:27', reporta: 'Diana Gonzalez', desc: 'Red e Internet', criticidad: 'media', estado: 'Solucionado' },
  { fecha: '2026-08-18 16:22', reporta: 'Liliana Chiquiza', desc: 'Sistema lento y no reconoce visitantes', criticidad: 'alta', estado: 'Solucionado' },
  { fecha: '2026-08-25 16:17', reporta: 'Diana Gonzalez', desc: 'Falla al ingresar número de documento', criticidad: 'alta', estado: 'Solucionado' },
  { fecha: '2026-08-26 12:06', reporta: 'Liliana Chiquiza', desc: 'Credenciales de acceso / no toma los rostros', criticidad: 'alta', estado: 'Solucionado' },
  { fecha: '2026-08-26 15:32', reporta: 'Diana Gil', desc: 'Pantalla de acceso hardware/dispositivos', criticidad: 'media', estado: 'Solucionado' },
  { fecha: '2026-08-27 11:38', reporta: 'Liliana Chiquiza', desc: 'Credenciales de acceso / no está dando ingreso', criticidad: 'alta', estado: 'Solucionado' },
  { fecha: '2026-08-28 14:48', reporta: 'Diana Gonzalez', desc: 'Biométrico derecho al ingresar visitantes', criticidad: 'alta', estado: 'Solucionado' },
  { fecha: '2026-08-29 08:50', reporta: 'Alejandra Rodriguez', desc: 'Cámara p7-m2 auditorio fuera de servicio', criticidad: 'alta', estado: 'Solucionado' },
  { fecha: '2026-08-31 18:11', reporta: 'Harold Aza', desc: 'Local Milanelo obturador (Sistema Pánico)', criticidad: 'alta', estado: 'Solucionado' },
];

const MANTING_OCTUBRE_RESUMEN = [
  { subsistema: 'Sistema de Control de Accesos (Torniquetes, molinetes, biometría)', tickets: 22, porcentaje: '34.4%', pctNum: 34.4, color: 'var(--alert)' },
  { subsistema: 'CCTV / Cámaras (Pérdidas de video, reubicaciones, cableado)', tickets: 21, porcentaje: '32.8%', pctNum: 32.8, color: 'var(--accent-color)' },
  { subsistema: 'Sistema Welcome (Plataforma y registro de visitantes en lobbies)', tickets: 17, porcentaje: '26.6%', pctNum: 26.6, color: 'var(--warning)' },
  { subsistema: 'Red Detección de Humo (RDH) (Sensores de humo y panel)', tickets: 3, porcentaje: '4.7%', pctNum: 4.7, color: '#e67e22' },
  { subsistema: 'Intrusión (Botón de pánico)', tickets: 1, porcentaje: '1.5%', pctNum: 1.5, color: 'var(--primary-color)' },
];

const EGLOBAL_OCTUBRE_REINCIDENCIA = [
  { activo: 'MODULO ADMINISTRATIVO PARKING-01/Pirmavera22', incidentes: 6, codigo: '(Cerrado) Solución Remota - Nivel 2', fecha: '2026-10-26' },
  { activo: 'POS-AUTOMATICO-01/Pirmavera04', incidentes: 5, codigo: '(Ejecutado) Cambio de Dispositivo', fecha: '2026-10-29' },
  { activo: 'CARRIL-ENT-03/Pirmavera03', incidentes: 4, codigo: '(Ejecutado) Ajuste de hardware en sitio', fecha: '2026-10-23' },
  { activo: 'CARRIL-SAL-02/Pirmavera13', incidentes: 3, codigo: '(Ejecutado) Daño externo – Equipo recuperado en sitio', fecha: '2026-10-26' },
  { activo: 'CARRIL-SAL-04/Pirmavera15', incidentes: 3, codigo: 'Sin aprobación y/o O.C', fecha: '2026-10-05' },
  { activo: 'POS-AUTOMATICO-04/Pirmavera07', incidentes: 2, codigo: '(Ejecutado) Falla No Existente / Primera Línea', fecha: '2026-10-30' },
  { activo: 'SERVIDOR PRINCIPAL-01/Pirmavera18', incidentes: 2, codigo: '(Ejecutado) Ajuste Configuración de Software', fecha: '2026-10-30' },
  { activo: 'CENTRAL MONITOREO-01/Pirmavera24', incidentes: 2, codigo: '(Ejecutado) Ajuste Configuración de Software', fecha: '2026-10-26' },
  { activo: 'POS-AUTOMATICO-02/Pirmavera05', incidentes: 2, codigo: '(Ejecutado) Cambio de Dispositivo', fecha: '2026-10-22' },
  { activo: 'MODULO ADMINISTRATIVO PAYMENT-01/Pirmavera21', incidentes: 2, codigo: '(Cerrado) Solución Remota - Nivel 2', fecha: '2026-10-12' },
];

const EGLOBAL_OCTUBRE_CANALES = [
  { canal: 'En Sitio / Campo', cantidad: 15, porcentaje: '38%', color: 'var(--primary-color)' },
  { canal: 'Remoto / Mesa de Ayuda', cantidad: 13, porcentaje: '33%', color: 'var(--accent-color)' },
  { canal: 'Configuración / Software', cantidad: 6, porcentaje: '15%', color: 'var(--positive)' },
  { canal: 'Cambio de Repuesto', cantidad: 3, porcentaje: '8%', color: 'var(--warning)' },
  { canal: 'Otros', cantidad: 2, porcentaje: '5%', color: '#95a5a6' },
];

export default function VistaProyectosView() {
  const [selectedContrato, setSelectedContrato] = useState('c1');
  const data = CONTRATOS_DATA[selectedContrato];

  const pendientes = useMemo(
    () => data.incidencias.filter((inc) => inc.estado !== 'Solucionado'),
    [data]
  );

  const chartData = useMemo(
    () => ({
      labels: ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'],
      datasets: [
        {
          label: 'Incidencias',
          data: data.histograma,
          backgroundColor: data.chartColor,
          borderRadius: 4,
        },
      ],
    }),
    [data]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
      plugins: { legend: { display: false } },
    }),
    []
  );

  return (
    <section id="vista-proyectos" className="tab-content active-tab">
      <div className="table-container">
        <div className="table-header" style={{ borderBottom: 'none', marginBottom: '10px' }}>
          <div>
            <h3>
              <i className="fa-solid fa-project-diagram" style={{ color: 'var(--accent-color)' }}></i> Gestión y Seguimiento de Proyectos TI
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
              Monitoreo interactivo de incidentes en los contratos de soporte y mantenimiento técnico
            </p>
          </div>
        </div>

        <div className="kpi-cards" style={{ marginBottom: '25px' }}>
          <div className="card" style={{ borderLeftColor: 'var(--accent-color)' }}>
            <div className="card-header">
              <span>CONTRATOS DE SOPORTE</span>
              <i className="fa-solid fa-file-signature" style={{ color: 'var(--accent-color)' }}></i>
            </div>
            <div className="card-value">3</div>
            <p className="kpi-detail">Contratos activos y vigentes</p>
          </div>
          <div className="card" style={{ borderLeftColor: 'var(--alert)' }}>
            <div className="card-header">
              <span>INCIDENCIAS REPORTADAS</span>
              <i className="fa-solid fa-triangle-exclamation" style={{ color: 'var(--alert)' }}></i>
            </div>
            <div className="card-value">218</div>
            <p className="kpi-detail">Consolidado general (Octubre: 64 Manting + 39 E-Global)</p>
          </div>
          <div className="card green-border">
            <div className="card-header">
              <span>RESOLUCIÓN DE INCIDENTES</span>
              <i className="fa-solid fa-circle-check" style={{ color: 'var(--positive)' }}></i>
            </div>
            <div className="card-value">96.8%</div>
            <p className="kpi-detail">Porcentaje de éxito (211/218 resueltos)</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '30px' }}>
          <div style={{ flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {Object.entries(CONTRATOS_DATA).map(([key, item]) => {
              const isActive = selectedContrato === key;
              return (
                <div
                  key={key}
                  className={`contrato-card ${isActive ? 'active-card' : ''}`}
                  onClick={() => setSelectedContrato(key)}
                  style={{
                    background: 'white',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    borderLeft: `5px solid ${isActive ? item.borderColor : '#bdc3c7'}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--primary-color)' }}>{item.proveedor}</strong>
                    <span className="status-pill online" style={{ fontSize: '0.75rem' }}>
                      Activo
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: '12px' }}>{item.sublabel}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f2f4f7', paddingTop: '10px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#555' }}>
                      <i className="fa-solid fa-bug" style={{ color: 'var(--alert)', marginRight: '5px' }}></i> Incidencias Activas:
                    </span>
                    <span
                      className="badge"
                      style={{
                        background: item.badgeCount > 0 ? 'var(--alert)' : 'var(--border-color)',
                        color: item.badgeCount > 0 ? 'white' : '#7f8c8d',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        padding: '3px 8px',
                        borderRadius: '10px',
                      }}
                    >
                      {item.badgeCount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="contrato-detalle" style={{ flex: 2, minWidth: '500px', background: 'white', borderRadius: '10px', padding: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '2px solid var(--bg-color)', paddingBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <h3 style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }}>{data.proveedor}</h3>
                <span className={`status-pill ${data.estadoClase}`}>{data.estado}</span>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--accent-color)', fontSize: '0.95rem' }}>{data.contratoId}</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#7f8c8d', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: 'bold' }}>
                  Objeto y Alcance del Soporte
                </h4>
                <div
                  style={{ fontSize: '0.95rem', color: 'var(--secondary-color)', lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: data.alcance }}
                />
              </div>

              <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 style={{ fontSize: '0.85rem', color: '#7f8c8d', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: 'bold', textAlign: 'center' }}>
                  Incidencias por Mes
                </h4>
                <div style={{ position: 'relative', height: '180px', width: '100%' }}>
                  <ChartCanvas id="incidenciasChart" type="bar" data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>

            {(selectedContrato === 'c1' || selectedContrato === 'c2') && (
              <div style={{ borderTop: '1px solid var(--bg-color)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', margin: 0 }}>
                    <i className="fa-solid fa-chart-pie" style={{ color: 'var(--accent-color)' }}></i> Consolidado de Incidencias Manting Soporte — Octubre
                  </h4>
                  <span className="badge" style={{ background: 'var(--primary-color)', color: 'white', fontWeight: 'bold', fontSize: '0.85rem', padding: '4px 12px', borderRadius: '12px' }}>
                    Total: 64 Tickets (100%)
                  </span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="data-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '58%', padding: '10px 15px' }}>Subsistema / Módulo</th>
                        <th style={{ width: '18%', padding: '10px 15px', textAlign: 'center' }}>N.° de Tickets</th>
                        <th style={{ width: '24%', padding: '10px 15px' }}>% Participación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MANTING_OCTUBRE_RESUMEN.map((item, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '10px 15px', fontWeight: 500, color: 'var(--primary-color)' }}>{item.subsistema}</td>
                          <td style={{ padding: '10px 15px', textAlign: 'center' }}>
                            <strong>{item.tickets}</strong>
                          </td>
                          <td style={{ padding: '10px 15px' }}>
                            <div className="progress-wrapper">
                              <div className="progress-track" style={{ height: '8px' }}>
                                <div className="progress-fill" style={{ width: `${item.pctNum}%`, backgroundColor: item.color }}></div>
                              </div>
                              <span style={{ fontWeight: 'bold', color: 'var(--primary-color)', minWidth: '48px', textAlign: 'right' }}>{item.porcentaje}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr style={{ backgroundColor: '#f8f9fa', borderTop: '2px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 15px', fontWeight: 'bold', color: 'var(--primary-color)' }}>Total Tickets Manting</td>
                        <td style={{ padding: '12px 15px', textAlign: 'center', fontWeight: 'bold', color: 'var(--alert)', fontSize: '1rem' }}>64</td>
                        <td style={{ padding: '12px 15px', fontWeight: 'bold', color: 'var(--primary-color)' }}>100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedContrato === 'c3' && (
              <div style={{ borderTop: '1px solid var(--bg-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', margin: 0 }}>
                    <i className="fa-solid fa-chart-simple" style={{ color: 'var(--positive)' }}></i> Informe Ezytec / E-Global Smart Parking — Octubre 2026
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: 'rgba(46, 204, 113, 0.15)', color: '#27ae60', fontWeight: 'bold', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '12px' }}>
                      ANS: 92.3% (36/39 cumplen)
                    </span>
                    <span className="badge" style={{ background: 'var(--primary-color)', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '12px' }}>
                      39 Incidentes | 32 OTs Correctivas
                    </span>
                    <span className="badge" style={{ background: 'rgba(243, 156, 18, 0.15)', color: '#d35400', fontWeight: 'bold', fontSize: '0.8rem', padding: '4px 10px', borderRadius: '12px' }}>
                      Tiempo Prom.: 896 min | Mto. Prev: 0/1
                    </span>
                  </div>
                </div>

                {/* Canales de Resolución */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                  {EGLOBAL_OCTUBRE_CANALES.map((c, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', border: '1px solid var(--border-color)', borderLeft: `4px solid ${c.color}`, borderRadius: '6px', padding: '10px 12px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#7f8c8d', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>{c.canal}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{c.cantidad}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: c.color }}>{c.porcentaje}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tabla de Reincidencia por Activo */}
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '8px' }}>
                    <i className="fa-solid fa-rotate" style={{ color: 'var(--accent-color)' }}></i> Reincidencia por Activo (Activos con 2+ incidentes cerrados en Octubre 2026)
                  </div>
                  <table className="data-table" style={{ width: '100%', fontSize: '0.85rem' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '8px 12px' }}>Activo</th>
                        <th style={{ padding: '8px 12px', textAlign: 'center' }}># Incidentes</th>
                        <th style={{ padding: '8px 12px' }}>Último Código de Cierre</th>
                        <th style={{ padding: '8px 12px' }}>Última Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EGLOBAL_OCTUBRE_REINCIDENCIA.map((item, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--primary-color)' }}>{item.activo}</td>
                          <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 'bold', color: item.incidentes >= 4 ? 'var(--alert)' : 'var(--primary-color)' }}>
                            {item.incidentes}
                          </td>
                          <td style={{ padding: '8px 12px', color: '#555' }}>{item.codigo}</td>
                          <td style={{ padding: '8px 12px', color: '#7f8c8d' }}>{item.fecha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderTop: '1px solid var(--bg-color)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                  <i className="fa-solid fa-circle-exclamation" style={{ color: 'var(--alert)' }}></i> Bitácora de Incidencias Atendidas en Plan de Mantenimiento
                </h4>
                <span className="badge alert" style={{ background: 'var(--accent-color)', color: 'white', fontWeight: 'bold', fontSize: '0.85rem', padding: '4px 10px', borderRadius: '12px' }}>
                  {pendientes.length} Incidencias Activas/Pendientes
                </span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '12%', padding: '10px 15px' }}>Fecha</th>
                      <th style={{ width: '33%', padding: '10px 15px' }}>Motivo / Descripción</th>
                      <th style={{ width: '12%', padding: '10px 15px' }}>Gravedad</th>
                      <th style={{ width: '13%', padding: '10px 15px' }}>Estado</th>
                      <th style={{ width: '30%', padding: '10px 15px' }}>Concepto Técnico / Observación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendientes.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', color: '#95a5a6', padding: '20px' }}>
                          No hay incidencias pendientes o activas en este contrato.
                        </td>
                      </tr>
                    ) : (
                      pendientes.map((inc, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '12px 15px' }}>
                            <strong>{inc.fecha}</strong>
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            <div style={{ fontSize: '0.9rem', color: '#2c3e50', lineHeight: 1.4 }}>{inc.motivo}</div>
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            <span className={`severity-tag ${inc.gravedad}`}>{inc.gravedad}</span>
                          </td>
                          <td style={{ padding: '12px 15px' }}>
                            <span className="status-pill online" style={{ fontSize: '0.75rem', padding: '3px 8px', backgroundColor: 'var(--alert)', color: 'white' }}>
                              {inc.estado}
                            </span>
                          </td>
                          <td style={{ padding: '12px 15px', fontSize: '0.85rem', color: '#555' }}>{inc.observacion || '—'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {(selectedContrato === 'c1' || selectedContrato === 'c2') && (
              <div style={{ marginTop: '20px', background: 'rgba(231, 76, 60, 0.05)', borderLeft: '4px solid var(--alert)', padding: '15px', borderRadius: '4px' }}>
                <h5 style={{ color: 'var(--alert)', marginBottom: '5px', fontWeight: 'bold' }}>
                  <i className="fa-solid fa-fire"></i> Hallazgo Importante (Octubre): Distribución de las 64 Incidencias Manting
                </h5>
                <p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>
                  <strong>1. Sistema de Control de Accesos (34.4% - 22 tickets):</strong> Subsistema con mayor volumen de reportes (torniquetes, molinetes y biometría).
                  <br />
                  <strong>2. CCTV / Cámaras (32.8% - 21 tickets):</strong> Segundo frente crítico por pérdidas de video, reubicaciones y fallas de cableado.
                  <br />
                  <strong>3. Sistema Welcome (26.6% - 17 tickets):</strong> Incidencias recurrentes en la plataforma y registro de visitantes en lobbies.
                </p>
              </div>
            )}

            {selectedContrato === 'c3' && (
              <div style={{ marginTop: '15px', background: 'rgba(52, 152, 219, 0.05)', borderLeft: '4px solid var(--accent-color)', padding: '15px', borderRadius: '4px' }}>
                <h5 style={{ color: 'var(--primary-color)', marginBottom: '5px', fontWeight: 'bold' }}>
                  <i className="fa-solid fa-square-parking"></i> Hallazgo Importante (Octubre 2026): E-Global / Ezytec Smart Parking
                </h5>
                <p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>
                  <strong>Nivel de Servicio ANS del 92.3% (vs 90% contratado):</strong> Se cerraron <strong>39 incidentes</strong> (36 dentro del SLA de 24h hábiles) y se ejecutaron <strong>32 OTs correctivas</strong> (38% en sitio/campo, 33% remoto/mesa de ayuda, 15% configuración/software, 8% cambio de repuesto).
                  <br />
                  <strong>Reincidencia y Preventivo:</strong> Mayor concentración de fallas en <strong>MODULO ADMINISTRATIVO PARKING-01</strong> (6 incidentes), <strong>POS-AUTOMATICO-01</strong> (5 incidentes) y <strong>CARRIL-ENT-03</strong> (4 incidentes). Mantenimiento preventivo programado: <strong>0/1 ejecutado</strong> (ACOMPAÑAMIENTO-01).
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="table-container" style={{ marginTop: '30px' }}>
          <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-list-check" style={{ color: 'var(--accent-color)' }}></i> Registro de Incidencias Generales TI
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: '15px' }}>
            Incidencias internas y soporte directo fuera del alcance de los contratos externos de mantenimiento.
          </p>

          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '12%' }}>Fecha</th>
                <th style={{ width: '20%' }}>Área / Reporta</th>
                <th style={{ width: '33%' }}>Descripción del Incidente</th>
                <th style={{ width: '12%' }}>Criticidad</th>
                <th style={{ width: '23%' }}>Resolución / Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {HISTORIAL_GENERAL.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.fecha}</td>
                  <td>{row.reporta}</td>
                  <td>{row.desc}</td>
                  <td>
                    <span className={`severity-tag ${row.criticidad}`}>{row.criticidad}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--positive)', fontWeight: 'bold' }}>{row.estado}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
