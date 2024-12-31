import AuthForm from './components/pages/auth/AuthForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/dashoboard/Dashboard';
import Services from './components/pages/services/Services';
import Maintenance from './components/pages/maintenance/Maintenance';
import Tercero from './components/pages/tercero/Tercero';
import Sedes from './components/pages/sede/Sede';
import Residuo from './components/pages/residuo/Residuo';
import Estado from './components/pages/estado/Estado';
import Vehiculo from './components/pages/vehiculo/Vehiculo';
import RellenoSanitario from './components/pages/relleno_sanitario/RellenoSanitario';
import Usuario from './components/pages/usuario/Usuario';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/tercero" element={<Tercero />} />
        <Route path="/sede" element={<Sedes />} />
        <Route path="/residuo" element={<Residuo />} />
        <Route path="/estado" element={<Estado />} />
        <Route path="/vehiculo" element={<Vehiculo />} />
        <Route path="/relleno_sanitario" element={<RellenoSanitario />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </Router>
  );
}

export default App;
