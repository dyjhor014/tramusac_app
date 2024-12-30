import './RellenoSanitario.css'
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Navbar from '../../ui/navbar/Navbar';
import Footer from '../../ui/footer/Footer';
import { Helmet } from 'react-helmet';
import axios from 'axios';

interface RellenoSanitario {
  _id: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  direccion: string;
  ubicacion: string;
}

export default function RellenoSanitario() {
    let count = 1;
    const [isOpen, setIsOpen] = useState(false);
    const [rellenoSanitarios, setRellenoSanitarios] = useState<RellenoSanitario[]>([]);
    const [formData, setFormData] = useState({
      nombre: '',
      descripcion: '',
      tipo: '',
      direccion: '',
      ubicacion: '',
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
          const response = await axios.get<RellenoSanitario[]>(
            'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/rellenos/',
            { headers }
          );

          // Map data from API to the expected format
          const mappedData = response.data.map((item) => ({
            _id: item._id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            tipo: item.tipo,
            direccion: item.direccion,
            ubicacion: item.ubicacion,
          }));

          setRellenoSanitarios(mappedData);
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Error al cargar datos');
            
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
      if (!formData.nombre.trim()) {
        setError('Nombre es obligatorio');
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
          'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/rellenos/crear',
          {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            tipo: formData.tipo,
            direccion: formData.direccion,
            ubicacion: formData.ubicacion,
          },
          { headers }
        );

        // Agregar el nuevo relleno_sanitario a la lista local
        setRellenoSanitarios((prev) => [...prev, response.data]);

        // Limpiar formulario y cerrar modal
        setFormData({
          nombre: '',
          descripcion: '',
          tipo: '',
          direccion: '',
          ubicacion: '',
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
      <title>Relleno Sanitario</title>
    </Helmet>
    <div className="container">
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Crear Nuevo Relleno Sanitario"
          className="custom-modal-relleno"
          overlayClassName="custom-overlay"
        >
          <div className="modal-header">
            <h2>Crear Nuevo Relleno Sanitario</h2>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              X
            </button>
          </div>
          <form onSubmit={handleSubmit} className="modal-form">
            <div>
              <label htmlFor="nombre">Nombre (obligatorio)</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                placeholder="Nombre"
              />
              <label htmlFor="descripcion">Descripcion (opcional)</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
                placeholder="Descripcion"
              />
              <label htmlFor="tipo">Tipo (obligatorio)</label>
              <select required name="tipo" id="tipo" value={formData.tipo} onChange={(e) => handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}>
                <option value="" disabled>
                  -- Selecciona un tipo --
                </option>
                <option value="PE">Peligrosos</option>
                <option value="NP">No peligrosos</option>
                <option value="PENP">Peligrosos y no peligrosos</option>
              </select>
              <label htmlFor="direccion">Direccion (obligatorio)</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
                placeholder="Direccion"
              />
              <label htmlFor="ubicacion">Ubicacion (opcional)</label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                placeholder="Ubicacion"
              />
            </div>
            {/* Botón de carga */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creando..." : "Crear"}
            </button>
          </form>
        </Modal>
        <h1 className="heading">Rellenos Sanitarios: {rellenoSanitarios.length}</h1>
        {/* Button to open modal */}
        <button onClick={() => setIsOpen(true)} className="open-modal-btn">
          Crear Relleno Sanitario
        </button>
        {/* Table */}
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Tipo</th>
                <th>Direccion</th>
                <th>Ubicacion</th>
              </tr>
            </thead>
            <tbody>
              {rellenoSanitarios.map((relleno) => (
                <tr key={relleno._id}>
                  <td>
                    <a href={"ejercicio/id/" + relleno._id}>{count++}</a>
                  </td>
                  <td>{relleno.nombre}</td>
                  <td>{relleno.descripcion}</td>
                  <td>{relleno.tipo}</td>
                  <td>{relleno.direccion}</td>
                  <td>{relleno.ubicacion}</td>
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