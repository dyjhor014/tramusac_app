import "./Estado.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Navbar from "../../ui/navbar/Navbar";
import Footer from "../../ui/footer/Footer";
import { Helmet } from "react-helmet";
import axios from "axios";

interface Estado {
  _id: string;
  nombre: string;
}

Modal.setAppElement("#root");

export default function Estado() {
  let count = 1;
  const [isOpen, setIsOpen] = useState(false);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Indicador de carga

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get<Estado[]>(
          "https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/estados/",
          { headers }
        );

        // Map data from API to the expected format
        const mappedData = response.data.map((item) => ({
          _id: item._id,
          nombre: item.nombre,
        }));

        setEstados(mappedData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Error al cargar datos");
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate form data
  const validateFormData = (): boolean => {
    if (!formData.nombre.trim()) {
      setError("Nombre es obligatorio");
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado");
      }

      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        "https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/estados/crear",
        {
          nombre: formData.nombre,
        },
        { headers }
      );

      // Agregar el nuevo estado a la lista local
      setEstados((prev) => [...prev, response.data]);

      // Limpiar formulario y cerrar modal
      setFormData({
        nombre: "",
      });
      setIsOpen(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al cargar datos");
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>Estados</title>
      </Helmet>
      <div className="container">
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Crear Nuevo Estado"
          className="custom-modal-estado"
          overlayClassName="custom-overlay"
        >
          <div className="modal-header">
            <h2>Crear Nuevo Estado</h2>
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
            </div>
            {/* Botón de carga */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creando..." : "Crear"}
            </button>
          </form>
        </Modal>
        <h1 className="heading">Estados: {estados.length}</h1>
        {/* Button to open modal */}
        <button onClick={() => setIsOpen(true)} className="open-modal-btn">
          Crear Estado
        </button>
        {/* Table */}
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {estados.map((estado) => (
                <tr key={estado._id}>
                  <td>
                    <a href={"ejercicio/id/" + estado._id}>{count++}</a>
                  </td>
                  <td>{estado.nombre}</td>
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