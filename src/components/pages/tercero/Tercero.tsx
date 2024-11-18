'use client';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Tercero.css';
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

interface Tercero {
  _id: string;
  razonSocial: string;
  nombreCorto: string | null;
  ruc: string;
  direccion: string;
  isProveedor: boolean;
  isCliente: boolean;
  sedes: string[];
  ejecutivos: Ejecutivo[];
  contactos: string[];
  residuo: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

Modal.setAppElement('#root');

export default function TercerosModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [terceros, setTerceros] = useState<Tercero[]>([]);
  const [formData, setFormData] = useState({
    razonSocial: '',
    nombreCorto: '',
    ruc: '',
    direccion: '',
    isProveedor: false,
    isCliente: false,
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
        const response = await axios.get<Tercero[]>(
          'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/terceros/',
          { headers }
        );

        // Map data from API to the expected format
        const mappedData = response.data.map((item) => ({
          _id: item._id,
          razonSocial: item.razonSocial,
          nombreCorto: item.nombreCorto || '',
          ruc: item.ruc,
          direccion: item.direccion,
          isProveedor: item.isProveedor,
          isCliente: item.isCliente,
          sedes: item.sedes || [],
          ejecutivos: item.ejecutivos || [],
          contactos: item.contactos || [],
          residuo: item.residuo || [],
          status: item.status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));

        setTerceros(mappedData);
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
    if (!formData.ruc.trim()) {
      setError('RUC es obligatorio');
      return false;
    }
    if (formData.ruc.length !== 11 || isNaN(Number(formData.ruc))) {
      setError('RUC debe ser un número de 11 dígitos');
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
        'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/terceros/crear',
        {
          ruc: formData.ruc,
          nombreCorto: formData.nombreCorto || undefined,
          isProveedor: formData.isProveedor || false,
          isCliente: formData.isCliente || false,
        },
        { headers }
      );

      // Agregar el nuevo tercero a la lista local
      setTerceros((prev) => [...prev, response.data]);

      // Limpiar formulario y cerrar modal
      setFormData({
        razonSocial: '',
        nombreCorto: '',
        ruc: '',
        direccion: '',
        isProveedor: false,
        isCliente: false,
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
        <title>Terceros</title>
      </Helmet>
      <div className="container">
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Button to open modal */}
        <button onClick={() => setIsOpen(true)} className="open-modal-btn">
          Crear Tercero
        </button>

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Crear Nuevo Tercero"
          className="custom-modal"
          overlayClassName="custom-overlay"
        >
          <div className="modal-header">
            <h2>Crear Nuevo Tercero</h2>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              X
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
          <div>
              <label htmlFor="ruc">RUC (obligatorio)</label>
              <input
                id="ruc"
                name="ruc"
                value={formData.ruc}
                onChange={handleInputChange}
                required
                placeholder='20546650082'
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
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  id="isProveedor"
                  name="isProveedor"
                  type="checkbox"
                  checked={formData.isProveedor}
                  onChange={handleInputChange}
                />
                <label htmlFor="isProveedor">Proveedor</label>
              </div>
              <div className="checkbox-item">
                <input
                  id="isCliente"
                  name="isCliente"
                  type="checkbox"
                  checked={formData.isCliente}
                  onChange={handleInputChange}
                />
                <label htmlFor="isCliente">Cliente</label>
              </div>
            </div>
            {/* Botón de carga */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creando...' : 'Crear'}
            </button>
          </form>
        </Modal>

        {/* Table */}
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Razón Social</th>
              <th>Nombre Comercial</th>
              <th>RUC</th>
              <th>Dirección</th>
              <th>Proveedor</th>
              <th>Cliente</th>
              <th>Ejecutivos</th>
              <th>Contactos</th>
            </tr>
          </thead>
          <tbody>
            {terceros.map((tercero) => (
              <tr key={tercero._id}>
                <td><a href={"tercero/id/"+tercero._id}>{tercero._id}</a></td>
                <td>{tercero.razonSocial}</td>
                <td>{tercero.nombreCorto}</td>
                <td>{tercero.ruc}</td>
                <td>{tercero.direccion}</td>
                <td>{tercero.isProveedor ? 'Sí' : 'No'}</td>
                <td>{tercero.isCliente ? 'Sí' : 'No'}</td>
                <td>
                  {tercero.ejecutivos.map((ejecutivo) => (
                    <div key={ejecutivo._id}>
                      {ejecutivo.nombre} ({ejecutivo.correo || 'Sin correo'})
                    </div>
                  ))}
                </td>
                <td>
                  {tercero.contactos.length > 0
                    ? tercero.contactos.join(', ')
                    : 'Sin contactos'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
