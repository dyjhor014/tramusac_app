import './Services.css';
import Navbar from '../../ui/navbar/Navbar';
import Footer from '../../ui/footer/Footer';

export default function Services() {

  const servicios = [
    {
      id: 1,
      fechaCreacion: '2023-05-01',
      fechaProgramada: '2023-05-15',
      fechaDisposicion: '2023-05-16',
      cliente: 'EcoSolutions S.A.',
      sede: 'Lima Centro',
      contacto: 'Juan Pérez',
      destino: 'Planta de Reciclaje',
      vehiculo: 'Camión ECO-001',
      chofer: 'Carlos Rodríguez',
      oc: 'OC-001',
      residuo: 'Peligroso',
      estado: 'Realizado',
      peso: '500 kg',
      nroGuia: 'G-001',
      nroBoleta: 'B-001',
      ejecutivo: 'Ana García'
    },
    {
        id: 2,
        fechaCreacion: '2023-05-01',
        fechaProgramada: '2023-05-15',
        fechaDisposicion: '2023-05-16',
        cliente: 'QROMA S.A.',
        sede: 'Agustino',
        contacto: 'Andrea Pérez',
        destino: 'Relleno sanitario petramás',
        vehiculo: 'Camión ECO-001',
        chofer: 'Tomas Rodríguez',
        oc: 'OC-003',
        residuo: 'No Peligroso',
        estado: 'Realizado',
        peso: '15000 kg',
        nroGuia: 'G-005',
        nroBoleta: 'B-003',
        ejecutivo: 'Cesar Ore'
      },
    // ... (rest of the data)
  ];

  return (
    <>
    <Navbar />
    <div className="servicios-ecologicos">

      <main className="main-content">
      <div>
            <h1 className="heading">Servicios</h1>
            
            <div className="crud-options">
              <button className="btn btn-primary">Nuevo Servicio</button>
              <button className="btn btn-secondary">Editar</button>
              <button className="btn btn-danger">Eliminar</button>
              <button className="btn btn-info">Ver Detalles</button>
            </div>

            <div className="search-bar">
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
                        <tr key={servicio.id} className="table-row">
                      <td className="table-cell">{servicio.id}</td>
                      <td className="table-cell">{servicio.fechaCreacion}</td>
                      <td className="table-cell">{servicio.fechaProgramada}</td>
                      <td className="table-cell">{servicio.fechaDisposicion}</td>
                      <td className="table-cell">{servicio.cliente}</td>
                      <td className="table-cell">{servicio.sede}</td>
                      <td className="table-cell">{servicio.contacto}</td>
                      <td className="table-cell">{servicio.destino}</td>
                      <td className="table-cell">{servicio.vehiculo}</td>
                      <td className="table-cell">{servicio.chofer}</td>
                      <td className="table-cell">{servicio.oc}</td>
                      <td className="table-cell">{servicio.residuo}</td>
                      <td className="table-cell">{servicio.estado}</td>
                      <td className="table-cell">{servicio.peso}</td>
                      <td className="table-cell">{servicio.nroGuia}</td>
                      <td className="table-cell">{servicio.nroBoleta}</td>
                      <td className="table-cell">{servicio.ejecutivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </main>
    </div>
    <Footer />
    </>
  );
}