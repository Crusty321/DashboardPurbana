import React from 'react';

export default function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div className="header-titles">
        <h1 id="page-title">{title}</h1>
        <p id="page-subtitle">{subtitle}</p>
      </div>
      <div className="header-actions">
        <div className="profile-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="docs/mifoto.jpeg"
            alt="Foto Ing. Miller F. Santos. J."
            className="profile-img"
            style={{
              width: '75px',
              height: '75px',
              objectFit: 'cover',
              borderRadius: '50%',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              border: '2px solid var(--primary-color)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
            <span style={{ fontWeight: 600 }}>Ing. Miller F. Santos. J.</span>
            <span style={{ fontSize: '0.75rem', color: '#7f8c8d' }}>
              Profesional en infraestructura y soporte TI
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
