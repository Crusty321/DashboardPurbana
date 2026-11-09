import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

export default function PlanTrabajoView({ onSelectTab, onOpenMarco }) {
  const [subVista, setSubVista] = useState('vista-mapa');
  const [mostrarInventario, setMostrarInventario] = useState(false);
  const [workbookData, setWorkbookData] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState('');
  const fileInputRef = useRef(null);

  const handleExcelUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const parsed = {};
      workbook.SheetNames.forEach((sheetName) => {
        const ws = workbook.Sheets[sheetName];
        parsed[sheetName] = XLSX.utils.sheet_to_json(ws, { defval: '' });
      });
      setWorkbookData(parsed);
      if (workbook.SheetNames.length > 0) {
        setSelectedSheet(workbook.SheetNames[0]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleLimpiarExcel = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setWorkbookData(null);
    setSelectedSheet('');
    setMostrarInventario(false);
  };

  const sheetRows = workbookData && selectedSheet ? workbookData[selectedSheet] || [] : [];
  const sheetCols = sheetRows.length > 0 ? Object.keys(sheetRows[0]) : [];

  return (
    <section id="plan-trabajo" className="tab-content active-tab">
      {subVista === 'vista-mapa' && (
        <div id="vista-mapa" className="sub-vista active-sub-vista">
          <div className="mapa-conceptual">
            <div className="nodo-principal">Plan de Trabajo TI</div>
            <div className="linea-vertical"></div>
            <div className="nodos-secundarios">
              <div
                className="nodo-secundario"
                onClick={() => setSubVista('vista-operativa')}
              >
                <i className="fa-solid fa-gears" style={{ color: 'var(--accent-color)' }}></i>
                <span className="titulo-nodo">1. Gestión Operativa</span>
                <div className="sub-lista-nodo">
                  <div className="rama-nodo">
                    <strong
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTab('plan-mantenimiento-directo');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fa-solid fa-file-contract"></i> <span>Plan de Mantenimiento</span>
                    </strong>
                    <div className="hoja-nodo">
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTab('plan-mantenimiento-directo');
                        }}
                      >
                        <i className="fa-solid fa-caret-right"></i> Preventivo
                      </p>
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTab('plan-mantenimiento-directo');
                        }}
                      >
                        <i className="fa-solid fa-caret-right"></i> Correctivo
                      </p>
                    </div>
                  </div>
                  <div className="rama-nodo">
                    <strong>
                      <i className="fa-solid fa-folder-open"></i> Documentos
                    </strong>
                    <div className="hoja-nodo">
                      <p>
                        <i className="fa-solid fa-caret-right"></i> Hoja de vida
                      </p>
                      <p>
                        <i className="fa-solid fa-caret-right"></i> Actas de baja
                      </p>
                      <p>
                        <i className="fa-solid fa-caret-right"></i> Concepto Técnico
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="nodo-secundario"
                onClick={() => onSelectTab('infraestructura')}
              >
                <i className="fa-solid fa-network-wired" style={{ color: 'var(--accent-color)' }}></i>
                <span className="titulo-nodo">2. Infraestructura</span>
                <div className="sub-lista-nodo">
                  <div className="rama-nodo">
                    <strong>
                      <i className="fa-solid fa-list-check"></i> Planes de Mejoramiento
                    </strong>
                    <div className="hoja-nodo">
                      <p>
                        <i className="fa-solid fa-video"></i> Plan de Mejoramiento de CCTV
                      </p>
                      <p>
                        <i className="fa-solid fa-phone-volume"></i> Plan de Mejoramiento de Planta Telefónica
                      </p>
                      <p>
                        <i className="fa-solid fa-wifi"></i> Plan de Conectividad WIFI
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="nodo-secundario"
                onClick={() => onSelectTab('vista-proyectos')}
              >
                <i className="fa-solid fa-project-diagram" style={{ color: 'var(--warning)' }}></i>
                <span className="titulo-nodo">3. Gestión de Proyectos</span>
                <div className="sub-lista-nodo">
                  <div className="rama-nodo">
                    <strong>
                      <i className="fa-solid fa-list-check"></i> Seguimiento de proyectos
                    </strong>
                    <div className="hoja-nodo">
                      <p title="Manting Contratos: CPU-022-2025 & CPU-031-2025">
                        <i className="fa-solid fa-file-signature"></i> Manting (Soporte CCTV, BMS, Automatización)
                      </p>
                      <p title="E-Global Contrato: 012-23.1">
                        <i className="fa-solid fa-file-signature"></i> E-Global C: 012-23.1
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="nodo-secundario"
                onClick={() => setSubVista('vista-innovacion')}
              >
                <i className="fa-solid fa-lightbulb" style={{ color: 'var(--positive)' }}></i>
                <span className="titulo-nodo">4. Desarrollo e Innovación</span>
                <div className="sub-lista-nodo">
                  <div className="rama-nodo">
                    <strong>
                      <i className="fa-solid fa-rocket"></i> Implementaciones
                    </strong>
                    <div className="hoja-nodo">
                      <p>
                        <i className="fa-solid fa-network-wired fa-fw"></i> Intranet Primavera Urbana
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subVista === 'vista-operativa' && (
        <div id="vista-operativa" className="sub-vista active-sub-vista">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button className="btn-volver" style={{ marginBottom: 0 }} onClick={() => setSubVista('vista-mapa')}>
              <i className="fa-solid fa-arrow-left"></i> Volver al Mapa
            </button>
            <button className="btn-volver" style={{ marginBottom: 0 }} onClick={() => setSubVista('vista-matriz')}>
              <i className="fa-solid fa-file-excel" style={{ color: 'var(--positive)' }}></i> Ver Matriz / Cargar Excel
            </button>
          </div>

          <div className="kpi-cards">
            <div className="card">
              <div className="card-header">
                <span>UNIVERSO ACTIVOS</span>
                <i className="fa-solid fa-desktop" style={{ color: '#bdc3c7' }}></i>
              </div>
              <div className="card-value">304</div>
              <p className="kpi-detail">Equipos totales del inventario</p>
            </div>
            <div className="card green-border">
              <div className="card-header">
                <span>MANTENIMIENTOS AL DÍA</span>
                <i className="fa-solid fa-check-circle" style={{ color: 'var(--positive)' }}></i>
              </div>
              <div className="card-value">42</div>
              <p className="kpi-detail">Hojas de vida actualizadas</p>
            </div>
            <div className="card warning-border">
              <div className="card-header">
                <span>PROGRESO DEL CICLO</span>
                <i className="fa-solid fa-spinner" style={{ color: 'var(--warning)' }}></i>
              </div>
              <div className="progress-wrapper" style={{ marginTop: '15px' }}>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '14%' }}></div>
                </div>
                <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>14%</span>
              </div>
              <p className="kpi-detail">Consolidado general de avance</p>
            </div>
          </div>

          <div className="table-container" style={{ marginBottom: '25px' }}>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-screwdriver-wrench" style={{ color: 'var(--accent-color)' }}></i> Lote 1: Plan de Mantenimiento Preventivo Inicial (50 Activos)
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: '15px' }}>
              Detalle y seguimiento del primer lote de 50 dispositivos priorizados (Pantallas de Publicidad, Puestos de Administración y Operaciones).
            </p>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Cód. Activo</th>
                  <th>Dispositivo / Nombre</th>
                  <th>Ubicación Específica</th>
                  <th>Tipo de Mantenimiento</th>
                  <th>Estado Preventivo</th>
                  <th>Semana Programada</th>
                  <th>Responsable Técnico</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>PUB-001</strong>
                  </td>
                  <td>Tótem Publicitario LED 55"</td>
                  <td>Pasillo Principal - Entrada 1</td>
                  <td>Físico (Limpieza y Ajuste)</td>
                  <td>
                    <span className="status-pill online">Completado</span>
                  </td>
                  <td>Semana 1</td>
                  <td>Ing. Miller F. Santos. J.</td>
                </tr>
                <tr>
                  <td>
                    <strong>PUB-002</strong>
                  </td>
                  <td>Pantalla Digital de Señalización</td>
                  <td>Plaza de Comidas - Zona Norte</td>
                  <td>Físico & Lógico (Actualización)</td>
                  <td>
                    <span className="status-pill online">Completado</span>
                  </td>
                  <td>Semana 1</td>
                  <td>Ing. Miller F. Santos. J.</td>
                </tr>
                <tr>
                  <td>
                    <strong>ADM-005</strong>
                  </td>
                  <td>PC de Escritorio - Admin Core 1</td>
                  <td>Oficina Contabilidad</td>
                  <td>Lógico (Antivirus y Limpieza)</td>
                  <td>
                    <span className="status-pill offline">Pendiente</span>
                  </td>
                  <td>Semana 2</td>
                  <td>Ing. Miller F. Santos. J.</td>
                </tr>
                <tr>
                  <td>
                    <strong>ADM-006</strong>
                  </td>
                  <td>PC de Escritorio - Admin Core 2</td>
                  <td>Oficina Recursos Humanos</td>
                  <td>Lógico (Antivirus y Limpieza)</td>
                  <td>
                    <span className="status-pill offline">Pendiente</span>
                  </td>
                  <td>Semana 2</td>
                  <td>Ing. Miller F. Santos. J.</td>
                </tr>
                <tr>
                  <td>
                    <strong>OPE-012</strong>
                  </td>
                  <td>Impresora POS Punto de Info</td>
                  <td>Punto de Información Central</td>
                  <td>Físico (Limpieza e Inyectores)</td>
                  <td>
                    <span className="status-pill offline">Pendiente</span>
                  </td>
                  <td>Semana 3</td>
                  <td>Ing. Miller F. Santos. J.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ color: 'var(--primary-color)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <i className="fa-solid fa-server" style={{ color: 'var(--primary-color)' }}></i> Resto de Activos TI Primavera Urbana (254 Equipos)
              </h4>
              <span className="badge" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--secondary-color)', fontSize: '0.8rem', fontWeight: 600 }}>
                Inventario Restante
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: '15px' }}>
              Equipos catalogados en el centro comercial que iniciarán su mantenimiento preventivo programado a partir del Ciclo de Lotes 2 en adelante.
            </p>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Cód. Activo</th>
                  <th>Dispositivo / Nombre</th>
                  <th>Ubicación Específica</th>
                  <th>Tipo de Mantenimiento</th>
                  <th>Estado de Gestión</th>
                  <th>Semana Programada</th>
                  <th>Responsable Técnico</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>SRV-001</strong>
                  </td>
                  <td>Servidor Físico Dell PowerEdge</td>
                  <td>Data Center - Rack Principal</td>
                  <td>Físico & Lógico (Copias)</td>
                  <td>
                    <span className="status-pill warning">Fase de Pruebas</span>
                  </td>
                  <td>Semana 7</td>
                  <td>Administrador de Redes</td>
                </tr>
                <tr>
                  <td>
                    <strong>SRV-002</strong>
                  </td>
                  <td>Servidor de Archivos Proxmox</td>
                  <td>Data Center - Rack Principal</td>
                  <td>Lógico (Auditoría)</td>
                  <td>
                    <span className="status-pill warning">Fase de Pruebas</span>
                  </td>
                  <td>Semana 7</td>
                  <td>Administrador de Redes</td>
                </tr>
                <tr>
                  <td>
                    <strong>SWT-010</strong>
                  </td>
                  <td>Switch Administrable Cisco 24P</td>
                  <td>Rack Piso 1 - Zona Comercial</td>
                  <td>Físico (Limpieza e Inyectores)</td>
                  <td>
                    <span className="status-pill warning">Fase de Pruebas</span>
                  </td>
                  <td>Semana 8</td>
                  <td>Administrador de Redes</td>
                </tr>
                <tr>
                  <td>
                    <strong>NVR-001</strong>
                  </td>
                  <td>Grabador de Video NVR Hikvision</td>
                  <td>Cuarto de Monitoreo CCTV</td>
                  <td>Lógico (Almacenamiento)</td>
                  <td>
                    <span className="status-pill warning">Fase de Pruebas</span>
                  </td>
                  <td>Semana 8</td>
                  <td>Administrador de Redes</td>
                </tr>
                <tr>
                  <td>
                    <strong>SWT-011</strong>
                  </td>
                  <td>Switch POE de Distribución</td>
                  <td>Rack Cuarto de Monitoreo</td>
                  <td>Físico (Limpieza e Inyectores)</td>
                  <td>
                    <span className="status-pill warning">Fase de Pruebas</span>
                  </td>
                  <td>Semana 9</td>
                  <td>Administrador de Redes</td>
                </tr>
                <tr>
                  <td>
                    <strong>PC-040</strong>
                  </td>
                  <td>PC Puesto de Control Central</td>
                  <td>Cuarto de Monitoreo</td>
                  <td>Físico & Lógico (Actualización)</td>
                  <td>
                    <span className="status-pill warning">Fase de Pruebas</span>
                  </td>
                  <td>
                    <div className="progress-wrapper">
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: '75%', backgroundColor: 'var(--warning)' }}></div>
                      </div>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>75%</span>
                    </div>
                  </td>
                  <td>Administrador de Redes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subVista === 'vista-matriz' && (
        <div id="vista-matriz" className="sub-vista active-sub-vista">
          <button className="btn-volver" onClick={() => setSubVista('vista-mapa')}>
            <i className="fa-solid fa-arrow-left"></i> Volver al Mapa
          </button>
          <div className="table-container">
            <div className="table-header">
              <h3>
                <i className="fa-solid fa-clipboard-check" style={{ color: 'var(--accent-color)' }}></i> Matriz de Control: Plan de Mantenimiento Integral
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
              <input
                ref={fileInputRef}
                type="file"
                id="excel-upload"
                accept=".xlsx, .xls, .csv"
                style={{ display: 'none' }}
                onChange={handleExcelUpload}
              />

              <label
                htmlFor="excel-upload"
                className="profile-btn"
                style={{ cursor: 'pointer', backgroundColor: 'var(--positive)', color: 'white', border: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <i className="fa-solid fa-file-excel"></i> Cargar Excel de Activos
              </label>

              {workbookData && (
                <button
                  onClick={handleLimpiarExcel}
                  className="profile-btn"
                  style={{ cursor: 'pointer', backgroundColor: 'var(--alert)', color: 'white', border: 'none', display: 'inline-flex', fontSize: '0.85rem', alignItems: 'center', gap: '5px' }}
                >
                  <i className="fa-solid fa-trash"></i> Limpiar Tabla
                </button>
              )}
            </div>

            {workbookData && (
              <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', color: 'var(--primary-color)', marginRight: '10px' }}>
                  Seleccionar Categoría de Activo:
                </label>
                <select
                  value={selectedSheet}
                  onChange={(e) => setSelectedSheet(e.target.value)}
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid var(--border-color)' }}
                >
                  {Object.keys(workbookData).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {workbookData ? (
              <table className="data-table">
                {sheetRows.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan="100%" style={{ textAlign: 'center' }}>
                        No hay datos en esta hoja
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <>
                    <thead>
                      <tr>
                        {sheetCols.map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sheetRows.map((row, idx) => (
                        <tr key={idx}>
                          {sheetCols.map((col) => (
                            <td key={col}>{row[col] !== undefined ? String(row[col]) : ''}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            ) : (
              <>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID Equipo</th>
                      <th>Área / Ubicación</th>
                      <th>Estado Físico</th>
                      <th>Estado Lógico</th>
                      <th>Hoja de Vida</th>
                      <th>Disposición</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>1PU-CCTV-01</strong>
                      </td>
                      <td>Centro de Control / Seguridad</td>
                      <td>
                        <span className="status-pill online">Óptimo</span>
                      </td>
                      <td>
                        <span className="status-pill online">Depurado</span>
                      </td>
                      <td>
                        <span className="status-pill online">Actualizada</span>
                      </td>
                      <td>Operativo</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>1PU-GER-PORT</strong>
                      </td>
                      <td>Gerencia General</td>
                      <td>
                        <span className="status-pill online">Óptimo</span>
                      </td>
                      <td>
                        <span className="status-pill online">Depurado</span>
                      </td>
                      <td>
                        <span className="status-pill online">Actualizada</span>
                      </td>
                      <td>Operativo</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>1PU-PARQ-S1</strong>
                      </td>
                      <td>Caja Parqueadero Sótano 1</td>
                      <td>
                        <span className="status-pill warning">Mantenimiento</span>
                      </td>
                      <td>
                        <span className="status-pill neutral">Pendiente</span>
                      </td>
                      <td>
                        <span className="status-pill neutral">Pendiente</span>
                      </td>
                      <td>En Revisión</td>
                    </tr>
                  </tbody>

                  <tbody className={`filas-ocultas ${mostrarInventario ? 'mostrar' : ''}`}>
                    <tr>
                      <td>
                        <strong>1PU-ADMIN-04</strong>
                      </td>
                      <td>Recursos Humanos</td>
                      <td>
                        <span className="status-pill neutral">Por Programar</span>
                      </td>
                      <td>
                        <span className="status-pill neutral">Por Programar</span>
                      </td>
                      <td>
                        <span className="status-pill neutral">Sin Crear</span>
                      </td>
                      <td>Programado</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>1PU-CONTAB-02</strong>
                      </td>
                      <td>Contabilidad</td>
                      <td>
                        <span className="status-pill neutral">Por Programar</span>
                      </td>
                      <td>
                        <span className="status-pill neutral">Por Programar</span>
                      </td>
                      <td>
                        <span className="status-pill neutral">Sin Crear</span>
                      </td>
                      <td>Programado</td>
                    </tr>
                  </tbody>
                </table>

                <button className="btn-desplegar" onClick={() => setMostrarInventario(!mostrarInventario)}>
                  <i className={`fa-solid ${mostrarInventario ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>{' '}
                  {mostrarInventario ? 'Ocultar Inventario Completo' : 'Ver Inventario Mapeado (69 Equipos)'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {subVista === 'vista-innovacion' && (
        <div id="vista-innovacion" className="sub-vista active-sub-vista">
          <button className="btn-volver" onClick={() => setSubVista('vista-mapa')}>
            <i className="fa-solid fa-arrow-left"></i> Volver al Mapa
          </button>
          <div className="table-container">
            <h3 style={{ marginBottom: '5px' }}>
              <i className="fa-solid fa-lightbulb" style={{ color: 'var(--positive)' }}></i> Desarrollo e Innovación
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '25px' }}>
              Control de iniciativas tecnológicas e infraestructura emergente
            </p>

            <div className="kpi-cards">
              <div className="card green-border">
                <div className="card-header">
                  <span>DESARROLLO INTRANET</span>
                  <i className="fa-solid fa-globe" style={{ color: 'var(--positive)' }}></i>
                </div>
                <div className="card-value">100%</div>
                <p className="kpi-detail">Portal Pirarucú desplegado y funcional</p>
              </div>
              <div className="card warning-border">
                <div className="card-header">
                  <span>SEGURIDAD DE LA INFO</span>
                  <i className="fa-solid fa-shield-halved" style={{ color: 'var(--warning)' }}></i>
                </div>
                <div className="card-value">Directorio Activo</div>
                <p className="kpi-detail">Políticas de acceso configuradas</p>
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Iniciativa de Desarrollo</th>
                  <th>Estado de Implementación</th>
                  <th>Progreso Visual</th>
                  <th>Responsable Técnico</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Intranet Primavera Urbana</strong>
                  </td>
                  <td>
                    <span className="status-pill online">Completado / En Vivo</span>
                  </td>
                  <td>
                    <div className="progress-wrapper">
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: '100%', backgroundColor: 'var(--positive)' }}></div>
                      </div>
                      <span style={{ fontWeight: 'bold', color: 'var(--positive)' }}>100%</span>
                    </div>
                  </td>
                  <td>Desarrollador TI</td>
                </tr>
                <tr>
                  <td>
                    <strong>Seguridad de la información (Directorio Activo)</strong>
                  </td>
                  <td>
                    <span className="status-pill warning">Fase de Pruebas</span>
                  </td>
                  <td>
                    <div className="progress-wrapper">
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: '75%', backgroundColor: 'var(--warning)' }}></div>
                      </div>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>75%</span>
                    </div>
                  </td>
                  <td>Administrador de Redes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
