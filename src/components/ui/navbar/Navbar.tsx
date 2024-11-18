import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('servicios');

  return (
    <>
    <div className="servicios-ecologicos">
      <nav className="navbar">
        <div className="logo">TRAMUSAC</div>
        <ul className="tabService">
          <a href="/services">
          <li 
            className={activeTab === 'servicios' ? 'tabService-item active' : 'tabService-item'} 
            onClick={() => setActiveTab('servicios')}
          >
            Servicios
          </li>
          </a>
          <li 
            className={activeTab === 'comercializacion' ? 'tabService-item active' : 'tabService-item'} 
            onClick={() => setActiveTab('comercializacion')}
          >
            Comercialización
          </li>
          <a href="/maintenance">
          <li 
            className={activeTab === 'mantenimiento' ? 'tabService-item active' : 'tabService-item'} 
            onClick={() => setActiveTab('mantenimiento')}
          >
            Mantenimiento
          </li>
          </a>
        </ul>
      </nav>
    </div>
    </>
  );
}