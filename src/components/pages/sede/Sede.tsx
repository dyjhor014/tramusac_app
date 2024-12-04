'use client';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Sede.css';
import Navbar from '../../ui/navbar/Navbar';
import Footer from '../../ui/footer/Footer';
import { Helmet } from 'react-helmet';
import axios from 'axios';

interface Ejecutivo {
  _id: string;
  nombre: string;
  correo: string;
  telefono: string | null;
}

interface Sede {
  _id: string;
  nombreCorto: string | null;
  direccion: string;
  ubicacion: string;
  chatId: string;
  contactos: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

Modal.setAppElement('#root');

export default function SedesModal() {
  let count = 1;
  const [isOpen, setIsOpen] = useState(false);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [formData, setFormData] = useState({
    nombreCorto: '',
    direccion: '',
    ubicacion: '',
    chatId: '',
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
        const response = await axios.get<Sede[]>(
          'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/tercero_sedes/',
          { headers }
        );

        // Map data from API to the expected format
        const mappedData = response.data.map((item) => ({
          _id: item._id,
          nombreCorto: item.nombreCorto || '',
          direccion: item.direccion,
          ubicacion: item.ubicacion,
          chatId: item.chatId,
          contactos: item.contactos || [],
          status: item.status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));

        setSedes(mappedData);
      } catch (err: any) {
        setError(err.message || 'Error al cargar datos');
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Validate form data
  const validateFormData = (): boolean => {
    if (!formData.direccion.trim()) {
      setError('Dirección es obligatorio');
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
        'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/tercero_sedes/crear',
        {
          direccion: formData.direccion,
          nombreCorto: formData.nombreCorto || undefined,
          ubicacion: formData.ubicacion,
          chatId: formData.chatId,
        },
        { headers }
      );

      // Agregar el nuevo tercero a la lista local
      setSedes((prev) => [...prev, response.data]);

      // Limpiar formulario y cerrar modal
      setFormData({
        nombreCorto: '',
        direccion: '',
        ubicacion: '',
        chatId: '',
      });
      setIsOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el tercero');
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Sedes</title>
      </Helmet>
      <div className="container">
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Crear Nueva Sede"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <div className="modal-header">
            <h2>Crear Nueva Sede</h2>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              X
            </button>                        
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
            <div>
              <label htmlFor="direccion">Dirección (obligatorio)</label>
              <input
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
                placeholder='Dirección'
              />
            </div>
            <div>
              <label htmlFor="nombreCorto">Nombre Comercial (opcional)</label>
              <input
                id="nombreCorto"
                name="nombreCorto"
                value={formData.nombreCorto}
                onChange={handleInputChange}
                placeholder='Nombre corto'
              />
            </div>
            <div>
              <label htmlFor="ubicacion">Ubicación (obligatorio)</label>
              <input
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                required
                placeholder='Ubicación'
              />
            </div>
            <div>
              <label htmlFor="chatId">Chat ID (obligatorio)</label>
              <input
                id="chatId"
                name="chatId"
                value={formData.chatId}
                onChange={handleInputChange}
                required
                placeholder='Chat ID'
              />
            </div>
            {/* Botón de carga */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creando...' : 'Crear'}
            </button>                        
          </form>
        </Modal>
        <h1 className="heading">Sedes: {sedes.length}</h1>
        {/* Button to open modal */}
        <button onClick={() => setIsOpen(true)} className="open-modal-btn">
          Crear Sede
        </button>
        {/* Table */}
        <div className="table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Comercial</th>
              <th>Dirección</th>
              <th>Ubicación</th>
              <th>Chat ID</th>
              <th>Contactos</th>
            </tr>
          </thead>
          <tbody>
            {sedes.map((sede) => (
              <tr key={sede._id}>
                <td><a href={"sede/id/"+sede._id}>{count++}</a></td>
                <td>{sede.nombreCorto}</td>
                <td>{sede.direccion}</td>
                <td>{sede.ubicacion}</td>
                <td>{sede.chatId}</td>
                <td>
                  {sede.contactos.length > 0
                    ? sede.contactos.join(', ')
                    : 'Sin contactos'}
                </td>
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