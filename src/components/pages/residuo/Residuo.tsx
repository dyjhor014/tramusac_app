import "./Residuo.css";
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Navbar from "../../ui/navbar/Navbar";
import Footer from "../../ui/footer/Footer";
import { Helmet } from 'react-helmet';
import axios from 'axios';

interface Residuo {
  _id: string;
  nombre: string;
  tipo: string;
}

Modal.setAppElement('#root');

export default function Residuo() {
    let count = 1;
    const [isOpen, setIsOpen] = useState(false);
    const [residuos, setResiduos] = useState<Residuo[]>([]);
    const [formData, setFormData] = useState({
      nombre: '',
      tipo: '',
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
          const response = await axios.get<Residuo[]>(
            'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/residuos/',
            { headers }
          );

          // Map data from API to the expected format
          const mappedData = response.data.map((item) => ({
            _id: item._id,
            nombre: item.nombre,
            tipo: item.tipo,
          }));

          setResiduos(mappedData);
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
          'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/residuos/crear',
          {
            nombre: formData.nombre,
            tipo: formData.tipo,
          },
          { headers }
        );

        // Agregar el nuevo residuo a la lista local
        setResiduos((prev) => [...prev, response.data]);

        // Limpiar formulario y cerrar modal
        setFormData({
          nombre: '',
          tipo: '',
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
          <title>Residuos</title>
        </Helmet>
        <div className="container">
          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          {/* Modal */}
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Crear Nuevo Residuo"
            className="custom-modal-residuo"
            overlayClassName="custom-overlay"
          >
            <div className="modal-header">
              <h2>Crear Nuevo Residuo</h2>
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
                  placeholder='Nombre'
                />
              </div>
              <div>
                <label htmlFor="tipo">Tipo (obligatorio)</label>
                <select name="tipo" id="tipo" value={formData.tipo} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e)}>
                  <option value="" disabled>
                    -- Selecciona un tipo --
                  </option>
                  <option value="peligrosos">peligrosos</option>
                  <option value="no peligrosos">no peligrosos</option>
                  <option value="biocontaminados">biocontaminados</option>
                </select>
              </div>
              {/* Botón de carga */}
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Creando...' : 'Crear'}
              </button>
            </form>
          </Modal>
          <h1 className="heading">Residuos: {residuos.length}</h1>
          {/* Button to open modal */}
          <button onClick={() => setIsOpen(true)} className="open-modal-btn">
            Crear Residuo
          </button>          
          {/* Table */}
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {residuos.map((residuo) => (
                  <tr key={residuo._id}>
                    <td><a href={"ejercicio/id/"+residuo._id}>{count++}</a></td>
                    <td>{residuo.nombre}</td>
                    <td>{residuo.tipo}</td>
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
