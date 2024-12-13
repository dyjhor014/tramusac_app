import AuthForm from './components/pages/auth/AuthForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/dashoboard/Dashboard';
import Services from './components/pages/services/Services';
import Maintenance from './components/pages/maintenance/Maintenance';
import Tercero from './components/pages/tercero/Tercero';
import Sedes from './components/pages/sede/Sede';
import Residuo from './components/pages/residuo/Residuo';
import Estado from './components/pages/estado/Estado';


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
      </Routes>
    </Router>
  );
}

export default App;
