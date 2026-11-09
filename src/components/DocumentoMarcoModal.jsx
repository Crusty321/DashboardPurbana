import React from 'react';

export default function DocumentoMarcoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      id="modalDocumentoMarco"
      className="modal"
      onClick={(e) => {
        if (e.target.id === 'modalDocumentoMarco') onClose();
      }}
    >
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <div id="contenidoModalMarco">
          <div className="table-header">
            <h3>
              <i className="fa-solid fa-file-signature" style={{ color: 'var(--accent-color)' }}></i> Documento Marco: Estrategia de Mantenimiento Preventivo
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div className="card" style={{ borderLeftColor: 'var(--primary-color)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontSize: '0.95rem' }}>
                <i className="fa-solid fa-bullseye"></i> Objetivos del Plan
              </h4>
              <p style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
                <strong>General:</strong> Garantizar la disponibilidad, integridad y prolongación de la vida útil de los activos tecnológicos mediante un ciclo preventivo integral.
              </p>
              <ul style={{ fontSize: '0.8rem', paddingLeft: '15px', color: 'var(--secondary-color)', lineHeight: 1.5 }}>
                <li>Estandarizar la documentación técnica (HDV y Fichas).</li>
                <li>Identificar y mitigar riesgos de falla en hardware crítico.</li>
                <li>Establecer planes de mejora basados en el estado real de los equipos.</li>
              </ul>
            </div>

            <div className="card" style={{ borderLeftColor: 'var(--warning)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontSize: '0.95rem' }}>
                <i className="fa-solid fa-magnifying-glass-chart"></i> Alcance y Frecuencia
              </h4>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
                <strong>Alcance:</strong> Lote de 50 activos de cómputo y publicidad del censo, de un inventario general de 304 activos.<br />
                <strong>Frecuencia:</strong> Martes, Miércoles y Jueves, 1 activo por día (3 activos/semana).<br />
                <strong>Política de Operatividad:</strong> Para no frenar la productividad, se priorizarán ventanas de mantenimiento fuera del horario de uso pico de cada equipo.
              </p>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '30px', borderLeftColor: 'var(--accent-color)' }}>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '15px', fontSize: '0.95rem' }}>
              <i className="fa-solid fa-list-check"></i> Actividades a Desarrollar (Protocolo Integral)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ fontSize: '0.8rem' }}>
                <strong>1. Fase Documental:</strong> Levantamiento de Ficha Técnica y Hoja de Vida.
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <strong>2. Fase Física:</strong> Limpieza de hardware y revisión de periféricos.
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <strong>3. Fase Lógica:</strong> Depuración de software y parches de seguridad.
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <strong>4. Cierre Técnico:</strong> Pruebas de rendimiento y acta final.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
