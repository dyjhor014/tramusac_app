import './Usuario.css'
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Navbar from '../../ui/navbar/Navbar';
import Footer from '../../ui/footer/Footer';
import { Helmet } from 'react-helmet';
import axios from 'axios';

interface Usuario {
  _id: string;
  nombre: string;
  correo: string;
  password: string;
  telefono: string | null;
  rol: string;
}

export default function Usuario() {
    let count = 1;
    const [isOpen, setIsOpen] = useState(false);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [formData, setFormData] = useState({
      nombre: '',
      correo: '',
      password: '',
      telefono: '',
      rol: '',
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
          const response = await axios.get<Usuario[]>(
            'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/usuarios/',
            { headers }
          );

          // Map data from API to the expected format
          const mappedData = response.data.map((item) => ({
            _id: item._id,
            nombre: item.nombre,
            correo: item.correo,
            password: item.password,
            telefono: item.telefono,
            rol: item.rol,
          }));

          setUsuarios(mappedData);
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
          'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/usuarios/registro',
          {
            nombre: formData.nombre,
            correo: formData.correo,
            password: formData.password,
            telefono: formData.telefono,
            rol: formData.rol,
          },
          { headers }
        );

        // Agregar el nuevo usuario a la lista local
        setUsuarios((prev) => [...prev, response.data]);

        // Limpiar formulario y cerrar modal
        setFormData({
          nombre: '',
          correo: '',
          password: '',
          telefono: '',
          rol: '',
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
      <title>Usuario</title>
    </Helmet>
    <div className="container">
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Crear Nuevo Usuario"
          className="custom-modal-usuario"
          overlayClassName="custom-overlay"
        >
          <div className="modal-header">
            <h2>Crear Nuevo Usuario</h2>
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
              <label htmlFor="correo">Correo (obligatorio)</label>
              <input
                type="text"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                required
                placeholder="Correo"
              />
              <label htmlFor="password">Password (obligatorio)</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Password"
              />
              <label htmlFor="telefono">Telefono (opcional)</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Telefono"              
              />
              <label htmlFor="rol">Rol (obligatorio)</label>
              <select required name="rol" id="rol" value={formData.rol} onChange={(e) => handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}>
                <option value="" disabled>
                  -- Selecciona un rol --
                </option>
                <option value="admin">admin</option>
                <option value="coordinador">coordinador</option>
                <option value="operario">operario</option>
                <option value="user">cliente</option>
              </select>
            </div>
            {/* Botón de carga */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creando..." : "Crear"}
            </button>
          </form>
        </Modal>
        <h1 className="heading">Usuarios: {usuarios.length}</h1>
        {/* Button to open modal */}
        <button onClick={() => setIsOpen(true)} className="open-modal-btn">
          Crear Usuario
        </button>
        {/* Table */}
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td>
                    <a href={"ejercicio/id/" + usuario._id}>{count++}</a>
                  </td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.rol}</td>
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