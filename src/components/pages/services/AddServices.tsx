// creamos un componente de formulario para el formulario de creacion de servicios
import './AddServices.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Servicio {
  _id: string;
  fechaCreacion: Date;
  fechaProgramada: Date;
  fechaDisposicion: Date;
  cliente: string;
  sede: string;
  contacto: string;
  destino: string;
  vehiculo: string;
  chofer: string;
  oc: string;
  residuo: string;
  estado: string;
  peso: number;
  nroGuia: string;
  nroBoleta: string;
  ejecutivo: string;
}

interface Tercero {
  _id: string;
  razonSocial: string;
  nombreCorto: string | null;
}

interface TerceroSede {
  _id: string | null;
  nombreCorto: string | null;
  direccion: string;
}

interface Vehiculo {
  _id: string;
  marca: string;
  placa: string;
  capacidad: number | null;
}

interface RellenoSanitario {
  _id: string;
  nombre: string;
  ubicacion: string;
}

interface Residuo {
  _id: string;
  nombre: string;
  tipo: string;
}

interface Estado {
  _id: string;
  nombre: string;
}

interface Usuario {
  _id: string;
  nombre: string;
  correo: string;
}

interface Contacto {
  _id: string;
  nombre: string;
  telefono: string;
}
export default function AddServices() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Indicador de carga
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
  // Estados para los terceros
  const [terceros, setTerceros] = useState<Tercero[]>([]);
  const [selectedTercero, setSelectedTercero] = useState<Tercero>();

  // Estados para las sedes
  const [sedes, setSedes] = useState<TerceroSede[]>([]);
  const [selectedSedeId, setSelectedSedeId] = useState<string | null>(null);

  // Estados para los vehiculos
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [selectedVehiculo, setSelectedVehiculo] = useState<Vehiculo>();

  // Estados para los relleno_sanitarios
  const [rellenoSanitarios, setRellenoSanitarios] = useState<RellenoSanitario[]>([]);  
  const [selectedRellenoSanitario, setSelectedRellenoSanitario] = useState<RellenoSanitario>();

  // Estados para los residuos
  const [residuos, setResiduos] = useState<Residuo[]>([]);
  const [selectedResiduo, setSelectedResiduo] = useState<Residuo>();

  // Estados para los estados
  const [estados, setEstados] = useState<Estado[]>([]);
  const [selectedEstado, setSelectedEstado] = useState<Estado>();

  // Estados para los usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario>();

  // Estados para los contactos
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [selectedContactoId, setSelectedContactoId] = useState<string | null>(null);
  
  // Fetch data from API for terceros
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
        }));

        setTerceros(mappedData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Error al cargar datos');
      }
    };

    fetchData();
  }, []);

  // Efecto para cargar las sedes del tercero seleccionado
  useEffect(() => {
    if (!selectedTercero) {
      setSedes([]);
      return;
    }

    const fetchSedes = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get<TerceroSede[]>(
          `https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/tercero_sedes/${selectedTercero}/sedes`,
          { headers }
        );

        setSedes(response.data);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Error al cargar las sedes');
      } finally {
        setLoading(false);
      }
    };

    fetchSedes();
  }, [selectedTercero]);

  // Manejadores para cambios en los select
  const handleTerceroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const terceroId = event.target.value;
    setSelectedTercero(terceroId);
    setFormData((prev) => ({ ...prev, cliente: terceroId, sede: '' })); // Limpia la sede seleccionada
  };

  const handleSedeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sedeId = event.target.value;
    setSelectedSedeId(sedeId);
    setFormData((prev) => ({ ...prev, sede: sedeId }));
  };
  // Fetch data from API for vehiculos
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
        }));

        setVehiculos(mappedData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Error al cargar datos');
      }
    };

    fetchData();
  }, []);

  // Fetch data from API for relleno_sanitarios
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
          ubicacion: item.ubicacion,
        }));

        setRellenoSanitarios(mappedData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Error al cargar datos');
      }
    };

    fetchData();
  }, []);

  // Fetch data from API for residuos
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

  // Fetch data from API for estados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get<Estado[]>(
          'https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/estados/',
          { headers }
        );

        // Map data from API to the expected format
        const mappedData = response.data.map((item) => ({
          _id: item._id,
          nombre: item.nombre,
        }));

        setEstados(mappedData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Error al cargar datos');
      }
    };

    fetchData();
  }, []);

  // Fetch data from API for Usuarios
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
        }));

        setUsuarios(mappedData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Error al cargar datos');
      }
    };

    fetchData();
  }, []);

  // Cargar contactos al seleccionar una sede
  useEffect(() => {
    if (!selectedSedeId) {
      setContactos([]);
      return;
    }

    const fetchContactos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get<Contacto[]>(
          `https://tramucertbackendv1-7c86fc636ef1.herokuapp.com/api/tercero_sedes/${selectedSedeId}/contactos`,
          { headers }
        );

        setContactos(response.data);
      } catch (error) {
        console.error('Error al cargar contactos:', error);
      }
    };

    fetchContactos();
  }, [selectedSedeId]);

  // Manejador para seleccionar un contacto
  const handleContactoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const contactoId = event.target.value;
    setSelectedContactoId(contactoId);
  };

  // Manejar la selección de un vehiculo
    const handleSelectVehiculoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedVehiculoObj = vehiculos.find(vehiculo => vehiculo._id === e.target.value);
      setSelectedVehiculo(selectedVehiculoObj);
      console.log('Vehiculo seleccionado:', selectedVehiculoObj?._id);
    }

    // Manejar la selección de un relleno_sanitario
    const handleSelectRellenoSanitarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedRellenoSanitarioObj = rellenoSanitarios.find(rellenoSanitario => rellenoSanitario._id === e.target.value);
      setSelectedRellenoSanitario(selectedRellenoSanitarioObj);
      console.log('RellenoSanitario seleccionado:', selectedRellenoSanitarioObj?._id);
    }

    // Manejar la selección de un residuo
    const handleSelectResiduoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedResiduoObj = residuos.find(residuo => residuo._id === e.target.value);
      setSelectedResiduo(selectedResiduoObj);
      console.log('Residuo seleccionado:', selectedResiduoObj?._id);
    }

    // Manejar la selección de un estado
    const handleSelectEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedEstadoObj = estados.find(estado => estado._id === e.target.value);
      setSelectedEstado(selectedEstadoObj);
      console.log('Estado seleccionado:', selectedEstadoObj?._id);
    }

    // Manejar la selección de un usuario
    const handleSelectUsuarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedUsuarioObj = usuarios.find(usuario => usuario._id === e.target.value);
      setSelectedUsuario(selectedUsuarioObj);
      console.log('Usuario seleccionado:', selectedUsuarioObj?._id);
    }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container-modal">
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group">
      <label htmlFor="fechaCreacion">Fecha de Creacion:</label>
      <input
        type="date"
        id="fechaCreacion"
        name="fechaCreacion"
        value={formData.fechaCreacion.toISOString().split('T')[0]}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-group">
      <label htmlFor="fechaProgramada">Fecha de Servicio:  <span>*</span></label>
      <input
        type="date"
        id="fechaProgramada"
        name="fechaProgramada"
        value={formData.fechaProgramada.toISOString().split('T')[0]}
        onChange={handleInputChange}
        required  
      />
      </div>
      <div className="form-group">
      <label htmlFor="fechaDisposicion">Fecha de Disposicion:</label>
      <input
        type="date"
        id="fechaDisposicion"
        name="fechaDisposicion"
        value={formData.fechaDisposicion.toISOString().split('T')[0]}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-group">
      <label htmlFor="tercero-select">Cliente:  <span>*</span></label>
      <select
      id="tercero-select"
      value={selectedTercero || ''} // Asegúrate de que el valor sea un string o ''
      onChange={handleTerceroChange}
    >
      <option value="" disabled>Selecciona un tercero</option>
      {terceros.map((tercero) => (
        <option key={tercero._id} value={tercero._id}>
          {tercero.razonSocial}
        </option>
      ))}
    </select>
      </div>
      <div className="form-group">
      <label htmlFor="sede">Sede:  <span>*</span></label>
      <select
        id="sede-select"
        value={selectedSedeId || ''}
        onChange={handleSedeChange}
        disabled={!selectedTercero || sedes.length === 0}
      >
        <option value="">-- Selecciona una Sede --</option>
        {sedes.map((sede) => (
          <option key={sede._id} value={sede._id}>
            {sede.nombreCorto}
          </option>
        ))}
      </select>

      {loading && <p>Cargando sedes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className="form-group">
      <label htmlFor="contacto">Contacto:  <span>*</span></label>
      <select
        id="contacto-select"
        value={selectedContactoId || ''}
        onChange={handleContactoChange}
      >
        <option value="" disabled>
          -- Selecciona un contacto --
        </option>
        {contactos.map((contacto) => (
          <option key={contacto._id} value={contacto._id}>
            {contacto.nombre}
          </option>
        ))}
      </select>
      </div>
      <div className="form-group">
      <label htmlFor="destino">Relleno Sanitario:  <span>*</span></label>
      <select
        id="relleno-select"
        value={selectedRellenoSanitario?._id || ''}
        onChange={handleSelectRellenoSanitarioChange}
      >
        <option value="" disabled>
          -- Selecciona un relleno sanitario --
        </option>
        {rellenoSanitarios.map((rellenoSanitario) => (
          <option key={rellenoSanitario._id} value={rellenoSanitario._id}>
            {rellenoSanitario.nombre}
          </option>
        ))}
      </select>
      </div>
      <div className="form-group">
      <label htmlFor="vehiculo">Vehiculo:  <span>*</span></label>
      <select
        id="vehiculo-select"
        value={selectedVehiculo?._id || ''}
        onChange={handleSelectVehiculoChange}
      >
        <option value="" disabled>
          -- Selecciona un vehiculo --
        </option>
        {vehiculos.map((vehiculo) => (
          <option key={vehiculo._id} value={vehiculo._id}>
            {vehiculo.marca + ' ' + vehiculo.placa + ' ' + vehiculo.capacidad}
          </option>
        ))}
      </select>
      </div>
      <div className="form-group">
      <label htmlFor="chofer">Chofer: <span>*</span></label>
      <input
        type="text"
        id="chofer"
        name="chofer"
        value={formData.chofer}
        onChange={handleInputChange}
        required
      />
      </div>
      <div className="form-group">
      <label htmlFor="oc">Orden de Servicio (OS/OC):</label>
      <input
        type="text"
        id="oc"
        name="oc"
        value={formData.oc}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-group">
      <label htmlFor="residuo">Residuo:  <span>*</span></label>
      <select
        id="residuo-select"
        value={selectedResiduo?._id || ''}
        onChange={handleSelectResiduoChange}
      >
        <option value="" disabled>
          -- Selecciona un residuo --
        </option>
        {residuos.map((residuo) => (
          <option key={residuo._id} value={residuo._id}>
            {residuo.nombre + ' - ' + residuo.tipo}
          </option>
        ))}
      </select>
      </div>
      <div className="form-group">
      <label htmlFor="estado">Estado:</label>
      <select
        id="estado-select"
        value={selectedEstado?._id || ''}
        onChange={handleSelectEstadoChange}
      >
        <option value="" disabled>
          -- Selecciona un estado --
        </option>
        {estados.map((estado) => (
          <option key={estado._id} value={estado._id}>
            {estado.nombre}
          </option>
        ))}
      </select>
      </div>
      <div className="form-group">
      <label htmlFor="peso">Peso (toneladas):</label>
      <input
        type="number"
        id="peso"
        name="peso"
        value={formData.peso}
        onChange={handleInputChange}
        min={0}
      />
      </div>
      <div className="form-group">
      <label htmlFor="nroGuia">Nro. Guía:</label>
      <input
        type="text"
        id="nroGuia"
        name="nroGuia"
        value={formData.nroGuia}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-group">
      <label htmlFor="nroBoleta">Nro. Boleta:</label>
      <input
        type="text"
        id="nroBoleta"
        name="nroBoleta"
        value={formData.nroBoleta}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-group">
      <label htmlFor="ejecutivo">Ejecutivo:  <span>*</span></label>
      <select
        id="usuario-select"
        value={selectedUsuario?._id || ''}
        onChange={handleSelectUsuarioChange}
      >
        <option value="" disabled>
          -- Selecciona un usuario --
        </option>
        {usuarios.map((usuario) => (
          <option key={usuario._id} value={usuario._id}>
            {usuario.nombre + ' - ' + usuario.correo}
          </option>
        ))}
      </select>
      </div>
      <button type="submit" className='submit-button'>Agregar Servicio</button>
    </form>
  </div>
  );
}