import React, { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    document.body.classList.add('splash-active');

    const closeSplash = () => {
      setFadingOut(true);
      document.body.classList.remove('splash-active');
      setTimeout(() => {
        setVisible(false);
      }, 800);
    };

    document.addEventListener('click', closeSplash, { once: true });
    document.addEventListener('keydown', closeSplash, { once: true });

    return () => {
      document.body.classList.remove('splash-active');
      document.removeEventListener('click', closeSplash);
      document.removeEventListener('keydown', closeSplash);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="splash-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: "url('docs/CC.jpg') no-repeat center center/cover",
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.8s ease, visibility 0.8s ease',
        cursor: 'pointer',
        opacity: fadingOut ? 0 : 1,
        visibility: fadingOut ? 'hidden' : 'visible',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(44, 62, 80, 0.85)',
        }}
      />
      <div
        className="splash-content"
        style={{
          position: 'relative',
          zIndex: 10000,
          textAlign: 'center',
          color: 'white',
          animation: 'slideUpFade 1.2s ease forwards',
        }}
      >
        <img
          src="docs/Purbana.jpg"
          alt="Centro Comercial Primavera Urbana"
          style={{
            maxHeight: '180px',
            borderRadius: '12px',
            marginBottom: '40px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
          }}
        />
        <h1
          style={{
            fontSize: '3.5rem',
            letterSpacing: '2px',
            marginBottom: '15px',
            fontWeight: 700,
            textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
          }}
        >
          DASHBOARD
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: '#ecf0f1',
            letterSpacing: '1px',
            textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          Gestión y Control de Operaciones TI
        </p>

        <div
          style={{
            marginTop: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
          }}
        >
          <img
            src="docs/mifoto.jpeg"
            alt="Ing. Miller F. Santos. J."
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid white',
              boxShadow: '0 6px 15px rgba(0,0,0,0.5)',
            }}
          />
          <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
            <h3
              style={{
                fontSize: '1.7rem',
                margin: 0,
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              Ing. Miller F. Santos. J.
            </h3>
            <span
              style={{
                fontSize: '1.2rem',
                color: '#ecf0f1',
                textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              }}
            >
              Profesional en infraestructura y soporte TI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
