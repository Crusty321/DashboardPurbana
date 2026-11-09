import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DocumentoMarcoModal from './components/DocumentoMarcoModal';

import ResumenView from './views/ResumenView';
import PlanTrabajoView from './views/PlanTrabajoView';
import InfraestructuraView from './views/InfraestructuraView';
import VistaProyectosView from './views/VistaProyectosView';
import PlanMantenimientoView from './views/PlanMantenimientoView';
import DesarrolloSoftwareView from './views/DesarrolloSoftwareView';
import BitacoraView from './views/BitacoraView';
import SoporteTIView from './views/SoporteTIView';
import KpisReglamentariosView from './views/KpisReglamentariosView';
import ProyeccionView from './views/ProyeccionView';

const PAGE_METADATA = {
  resumen: {
    title: 'Resumen de operaciones',
    subtitle: 'Métricas y estadísticas del comportamiento de la plataforma de soporte',
  },
  'plan-trabajo': {
    title: 'Plan de trabajo',
    subtitle: 'Registro de ejecución, mantenimiento y soporte operativo',
  },
  infraestructura: {
    title: 'Infraestructura',
    subtitle: 'Evaluación del estado actual en pro de actualizaciones y planes de mejora.',
  },
  'vista-proyectos': {
    title: 'Gestión y Seguimiento de Proyectos',
    subtitle: 'Monitoreo interactivo de incidentes en los contratos de soporte y mantenimiento TI',
  },
  'plan-mantenimiento-directo': {
    title: 'Plan de Mantenimiento',
    subtitle: 'Lineamientos y cronograma del plan de mantenimiento preventivo',
  },
  'desarrollo-software': {
    title: 'Intranet Primavera Urbana',
    subtitle: 'Resultados, funcionalidades y arquitectura desplegada del portal corporativo Pirarucú',
  },
  bitacora: {
    title: 'Bitácora de Trabajo',
    subtitle: 'Seguimiento y bitácora del ciclo de mantenimiento de hardware',
  },
  'soporte-ti': {
    title: 'Soporte TI (Mesa de Ayuda Interna)',
    subtitle: 'Monitoreo interactivo de incidentes en los contratos de soporte y mantenimiento TI',
  },
  'kpis-reglamentarios': {
    title: 'Métricas y Protocolos TI',
    subtitle: 'Gestión Integral del Área de Soporte y Tecnología',
  },
  proyeccion: {
    title: 'Proyección Operativa TI',
    subtitle: 'Planificación mensual de actividades operativas, alcance técnico y entregables',
  },
};

function getInitialTab() {
  const hash = window.location.hash.replace('#', '');
  if (hash && PAGE_METADATA[hash]) return hash;
  return 'plan-trabajo';
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [marcoModalOpen, setMarcoModalOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && PAGE_METADATA[hash]) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tabId) => {
    if (!PAGE_METADATA[tabId]) return;
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  const currentMeta = PAGE_METADATA[activeTab] || PAGE_METADATA['plan-trabajo'];

  return (
    <>
      <SplashScreen />
      <DocumentoMarcoModal isOpen={marcoModalOpen} onClose={() => setMarcoModalOpen(false)} />

      <div className="dashboard-container">
        <Sidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

        <main className="main-content">
          <Header title={currentMeta.title} subtitle={currentMeta.subtitle} />

          {activeTab === 'resumen' && <ResumenView />}
          {activeTab === 'plan-trabajo' && (
            <PlanTrabajoView onSelectTab={handleSelectTab} onOpenMarco={() => setMarcoModalOpen(true)} />
          )}
          {activeTab === 'infraestructura' && <InfraestructuraView />}
          {activeTab === 'vista-proyectos' && <VistaProyectosView />}
          {activeTab === 'plan-mantenimiento-directo' && (
            <PlanMantenimientoView onOpenMarco={() => setMarcoModalOpen(true)} />
          )}
          {activeTab === 'desarrollo-software' && <DesarrolloSoftwareView />}
          {activeTab === 'bitacora' && <BitacoraView />}
          {activeTab === 'soporte-ti' && <SoporteTIView />}
          {activeTab === 'kpis-reglamentarios' && <KpisReglamentariosView />}
          {activeTab === 'proyeccion' && <ProyeccionView />}
        </main>
      </div>
    </>
  );
}
