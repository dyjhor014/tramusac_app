import './Services.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Navbar from '../../ui/navbar/Navbar';
import Footer from '../../ui/footer/Footer';
import AddServices, { Servicio } from './AddServices';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

export default function Services() {
  let count = 1;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [formData, setFormData] = useState<Servicio>({
    _id: '',
    fechaCreacion: new Date(),
    fechaProgramada: new Date(),
    fechaDisposicion: new Date(),
    cliente: '',
    sede: '',
    contacto: '',
    destino: '',
    vehiculo: '',
    chofer: '',
    oc: '',
    residuo: '',
    estado: '',
    peso: 0,
    nroGuia: '',
    nroBoleta: '',
    ejecutivo: '',
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get<Servicio[]>(
          'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/servicios/',
          { headers }
        );

        // Map data from API to the expected format
        const mappedData = response.data.map((item) => ({
          _id: item._id,
          fechaCreacion: new Date(item.fechaCreacion),
          fechaProgramada: new Date(item.fechaProgramada),
          fechaDisposicion: new Date(item.fechaDisposicion),
          cliente: item.cliente,
          sede: item.sede,
          contacto: item.contacto,
          destino: item.destino,
          vehiculo: item.vehiculo,
          chofer: item.chofer,
          oc: item.oc,
          residuo: item.residuo,
          estado: item.estado,
          peso: item.peso,
          nroGuia: item.nroGuia,
          nroBoleta: item.nroBoleta,
          ejecutivo: item.ejecutivo,
        }));

        setServicios(mappedData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Error al cargar datos');
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'date' ? new Date(value) : type === 'number' ? parseFloat(value) : value,
    }));
  };

  // Validate form data
  const validateFormData = (): boolean => {
    if (!formData.cliente.trim()) {
      setError('Cliente es obligatorio');
      return false;
    }
    if (!formData.sede.trim()) {
      setError('Sede es obligatorio');
      return false;
    }
    if (!formData.contacto.trim()) {
      setError('Contacto es obligatorio');
      return false;
    }
    if (!formData.destino.trim()) {
      setError('Destino es obligatorio');
      return false;
    }
    if (!formData.vehiculo.trim()) {
      setError('Vehiculo es obligatorio');
      return false;
    }
    if (!formData.chofer.trim()) {
      setError('Chofer es obligatorio');
      return false;
    }
    if (!formData.oc.trim()) {
      setError('OC es obligatorio');
      return false;
    }
    if (!formData.residuo.trim()) {
      setError('Residuo es obligatorio');
      return false;
    }
    if (!formData.estado.trim()) {
      setError('Estado es obligatorio');
      return false;
    }
    if (!formData.peso) {
      setError('Peso es obligatorio');
      return false;
    }
    if (!formData.nroGuia.trim()) {
      setError('Nro. Guía es obligatorio');
      return false;
    }
    if (!formData.nroBoleta.trim()) {
      setError('Nro. Boleta es obligatorio');
      return false;
    }
    if (!formData.ejecutivo.trim()) {
      setError('Ejecutivo es obligatorio');
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
        'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/servicios/crear',
        {
          cliente: formData.cliente,
          sede: formData.sede,
          contacto: formData.contacto,
          destino: formData.destino,
          vehiculo: formData.vehiculo,
          chofer: formData.chofer,
          oc: formData.oc,
          residuo: formData.residuo,
          estado: formData.estado,
          peso: formData.peso,
          nroGuia: formData.nroGuia,
          nroBoleta: formData.nroBoleta,
          ejecutivo: formData.ejecutivo,
        },
        { headers }
      );

      // Agregar el nuevo servicio a la lista local
      setServicios((prev) => [...prev, response.data]);

      // Limpiar formulario y cerrar modal
      setFormData({
        _id: '',
        fechaCreacion: new Date(),
        fechaProgramada: new Date(),
        fechaDisposicion: new Date(),
        cliente: '',
        sede: '',
        contacto: '',
        destino: '',
        vehiculo: '',
        chofer: '',
        oc: '',
        residuo: '',
        estado: '',
        peso: 0,
        nroGuia: '',
        nroBoleta: '',
        ejecutivo: '',
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
      <title>Servicios</title>
    </Helmet>
    <div className="servicios-ecologicos">

      <main className="main-content">
      <div>
            <h1 className="heading">Servicios</h1>
            
            <div className="crud-options">
              <button className="btn btn-primary" onClick={openModal}>Nuevo Servicio</button>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                  content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxHeight: '90vh',
                  },
                }}
              >
                <AddServices onClose={closeModal} />
              </Modal>
              <button className="btn btn-secondary">Editar</button>
              <button className="btn btn-danger">Eliminar</button>
              <button className="btn btn-info">Ver Detalles</button>
            </div>

            {/* <div className="search-bar">
              <input type="text" placeholder="Buscar servicios..." className="search-input" />
            </div>

            <div className="table-container">
              <table className="servicios-table">
                <thead>
                  <tr>
                    <th className="table-header">ID</th>
                    <th className="table-header">Fecha Creación</th>
                    <th className="table-header">Fecha Programada</th>
                    <th className="table-header">Fecha Disposición</th>
                    <th className="table-header">Cliente</th>
                    <th className="table-header">Sede</th>
                    <th className="table-header">Contacto</th>
                    <th className="table-header">Destino</th>
                    <th className="table-header">Vehículo</th>
                    <th className="table-header">Chofer</th>
                    <th className="table-header">OC</th>
                    <th className="table-header">Residuo</th>
                    <th className="table-header">Estado</th>
                    <th className="table-header">Peso</th>
                    <th className="table-header">Nro. Guía</th>
                    <th className="table-header">Nro. Boleta</th>
                    <th className="table-header">Ejecutivo</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map((servicio) => (
                        <tr key={servicio._id} className="table-row">
                      <td className="table-cell">{servicio._id}</td>
                      <td className="table-cell">{servicio.fechaCreacion.toLocaleDateString()}</td>
                      <td className="table-cell">{servicio.fechaProgramada.toLocaleDateString()}</td>
                      <td className="table-cell">{servicio.fechaDisposicion.toLocaleDateString()}</td>
                      <td className="table-cell">{servicio.cliente}</td>
                      <td className="table-cell">{servicio.sede}</td>
                      <td className="table-cell">{servicio.contacto}</td>
                      <td className="table-cell">{formData.destino}</td>
                      <td className="table-cell">{formData.vehiculo}</td>
                      <td className="table-cell">{formData.chofer}</td>
                      <td className="table-cell">{formData.oc}</td>
                      <td className="table-cell">{formData.residuo}</td>
                      <td className="table-cell">{formData.estado}</td>
                      <td className="table-cell">{formData.peso}</td>
                      <td className="table-cell">{formData.nroGuia}</td>
                      <td className="table-cell">{formData.nroBoleta}</td>
                      <td className="table-cell">{formData.ejecutivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
      </main>
    </div>
    <Footer />
    </>
  );
}