import React from 'react';

const MENU_ITEMS = [
  { id: 'plan-trabajo', label: 'Plan de trabajo', icon: 'fa-solid fa-list-check' },
  { id: 'infraestructura', label: 'Infraestructura', icon: 'fa-solid fa-network-wired' },
  { id: 'vista-proyectos', label: 'Gestión y Seguimiento de Proyectos', icon: 'fa-solid fa-project-diagram' },
  { id: 'plan-mantenimiento-directo', label: 'Plan de Mantenimiento', icon: 'fa-solid fa-file-contract' },
  { id: 'desarrollo-software', label: 'Desarrollo de Software', icon: 'fa-solid fa-code' },
  { id: 'bitacora', label: 'Bitácora de Trabajo', icon: 'fa-regular fa-calendar-days' },
  { id: 'soporte-ti', label: 'Soporte TI', icon: 'fa-solid fa-headset' },
  { id: 'kpis-reglamentarios', label: 'KPIs y Métricas TI', icon: 'fa-solid fa-chart-line' },
  { id: 'proyeccion', label: 'Proyección', icon: 'fa-solid fa-compass-drafting' },
];

export default function Sidebar({ activeTab, onSelectTab }) {
  return (
    <aside className="sidebar">
      <div className="logo" onClick={() => onSelectTab('resumen')} title="Ir a Resumen de operaciones">
        <h2>Dashboard</h2>
        <p>Reporte desempeño TI</p>
      </div>

      <nav className="menu">
        <p className="menu-label">GESTIÓN OPERATIVA</p>
        <ul>
          {MENU_ITEMS.map((item) => (
            <li
              key={item.id}
              className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
            >
              <i className={item.icon}></i> {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
