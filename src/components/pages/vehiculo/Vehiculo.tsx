import './Vehiculo.css';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Navbar from '../../ui/navbar/Navbar';
import Footer from '../../ui/footer/Footer';
import { Helmet } from 'react-helmet';
import axios from 'axios';

interface Vehiculo {
  _id: string;
  marca: string;
  placa: string;
  capacidad: number;
  color: string;
  serie: string;
  nroEjes: number | null;
  revisionTecnica: number | null;
  soat: number | null;
  mantenimiento: number | null;
  empresa: string | null;
  status: boolean;
}

Modal.setAppElement('#root');

export default function Vehiculo() {
  let count = 1;
  const [isOpen, setIsOpen] = useState(false);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [formData, setFormData] = useState({
    marca: '',
    placa: '',
    capacidad: null,
    color: '',
    serie: '',
    nroEjes: null,
    revisionTecnica: null,
    soat: null,
    mantenimiento: null,
    empresa: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Indicador de carga

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get<Vehiculo[]>(
          'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/vehiculos/',
          { headers }
        );

        // Map data from API to the expected format
        const mappedData = response.data.map((item) => ({
          _id: item._id,
          marca: item.marca,
          placa: item.placa,
          capacidad: item.capacidad,
          color: item.color,
          serie: item.serie,
          nroEjes: item.nroEjes,
          revisionTecnica: item.revisionTecnica,
          soat: item.soat,
          mantenimiento: item.mantenimiento,
          empresa: item.empresa,
          status: item.status,
        }));

        setVehiculos(mappedData);
      } catch (error: unknown) {
        console.error(error instanceof Error ? error.message : 'Error al cargar datos');
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseFloat(value) : null) : value,
    }));
  };  

  // Validate form data
  const validateFormData = (): boolean => {

    if (!formData.placa.trim()) {
      setError('Placa es obligatorio');
      return false;
    }
    if (formData.capacidad === null) {
      setError('Capacidad es obligatorio');
      return false;
    }
    setError(null);
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFormData()) return;

    setLoading(true); // Activar indicador de carga

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/vehiculos/crear',
        {
          marca: formData.marca,
          placa: formData.placa,
          capacidad: formData.capacidad,
          color: formData.color,
          serie: formData.serie,
          nroEjes: formData.nroEjes,
          revisionTecnica: formData.revisionTecnica,
          soat: formData.soat,
          mantenimiento: formData.mantenimiento,
          empresa: formData.empresa,
        },
        { headers }
      );
      console.log(response.data);
      // Agregar el nuevo vehiculo a la lista local
      setVehiculos((prev) => [...prev, response.data]);

      // Limpiar formulario y cerrar modal
      setFormData({
        marca: '',
        placa: '',
        capacidad: null,
        color: '',
        serie: '',
        nroEjes: null,
        revisionTecnica: null,
        soat: null,
        mantenimiento: null,
        empresa: '',
      });
      setIsOpen(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Error al cargar datos');
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };
  return (
    <>
    <Navbar />
    <Helmet>
      <title>Vehiculos</title>
    </Helmet>
    <div className="container">
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Crear Nuevo vehiculo"
          className="custom-modal-vehiculo"
          overlayClassName="custom-overlay"
        >
          <div className="modal-header">
            <h2>Crear Nuevo Vehiculo</h2>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              X
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
            <div>
              <label htmlFor="placa">Placa (obligatorio)</label>
              <input
                type="text"
                id="placa"
                name="placa"
                value={formData.placa}
                onChange={handleInputChange}
                required
                placeholder="placa"
              />
            </div>
            <div>
              <label htmlFor="capacidad">Capacidad (obligatorio)</label>
              <input
                type="number"
                id="capacidad"
                name="capacidad"
                value={formData.capacidad ?? ''}
                onChange={handleInputChange}
                placeholder="Capacidad"
                min={0}
                max={35}
                required
                />
            </div>
            {/* Botón de carga */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creando..." : "Crear"}
            </button>
          </form>
        </Modal>
        <h1 className="heading">Vehiculos: {vehiculos.length}</h1>
        {/* Button to open modal */}
        <button onClick={() => setIsOpen(true)} className="open-modal-btn">
          Crear Vehiculo
        </button>
        {/* Table */}
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Marca</th>
                <th>Placa</th>
                <th>Capacidad</th>
                <th>Color</th>
                <th>Serie</th>
                <th>Nro Ejes</th>
                <th>Revision Tecnica</th>
                <th>Soat</th>
                <th>Mantenimiento</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.map((vehiculo) => (
                <tr key={vehiculo._id}>
                  <td>
                    <a href={"vehiculo/id/" + vehiculo._id}>{count++}</a>
                  </td>
                  <td>{vehiculo.marca}</td>
                  <td>{vehiculo.placa}</td>
                  {/* si el campo es null, muestra el texto "Sin Capacidad" */}
                  {vehiculo.capacidad ? <td>{vehiculo.capacidad} TN</td> : <td>Sin Capacidad</td>}
                  <td>{vehiculo.color}</td>
                  <td>{vehiculo.serie}</td>
                  <td>{vehiculo.nroEjes}</td>
                  <td>{vehiculo.revisionTecnica}</td>
                  <td>{vehiculo.soat}</td>
                  <td>{vehiculo.mantenimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    <Footer />
    </>
  );
}