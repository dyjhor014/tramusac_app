'use client'
import { useState } from 'react';
import Modal from 'react-modal';
import './Tercero.css';
import Navbar from '../../ui/navbar/Navbar';
import { Helmet } from 'react-helmet';

interface Tercero {
  id: number;
  razonSocial: string;
  nombreComercial: string;
  ruc: string;
  direccion: string;
  esProveedor: boolean;
  esCliente: boolean;
  sedes: string;
  ejecutivo: string;
  contacto: string;
}

Modal.setAppElement('#root');

export default function TercerosModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [terceros, setTerceros] = useState<Tercero[]>([]);
  const [formData, setFormData] = useState<Omit<Tercero, 'id'>>({
    razonSocial: '',
    nombreComercial: '',
    ruc: '',
    direccion: '',
    esProveedor: false,
    esCliente: false,
    sedes: '',
    ejecutivo: '',
    contacto: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTercero: Tercero = {
      id: terceros.length + 1,
      ...formData,
    };
    setTerceros((prev) => [...prev, newTercero]);
    setFormData({
      razonSocial: '',
      nombreComercial: '',
      ruc: '',
      direccion: '',
      esProveedor: false,
      esCliente: false,
      sedes: '',
      ejecutivo: '',
      contacto: '',
    });
    setIsOpen(false);
  };

  return (
    <>
    <Navbar />
    <Helmet title="Terceros" />
    <div className="container">
      {/* Botón para abrir el modal */}
      <button onClick={() => setIsOpen(true)}>Crear Tercero</button>

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
            <label htmlFor="razonSocial">Razón Social</label>
            <input
              id="razonSocial"
              name="razonSocial"
              value={formData.razonSocial}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="nombreComercial">Nombre Comercial</label>
            <input
              id="nombreComercial"
              name="nombreComercial"
              value={formData.nombreComercial}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="ruc">RUC</label>
            <input
              id="ruc"
              name="ruc"
              value={formData.ruc}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="direccion">Dirección</label>
            <input
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="checkbox-group">
            <div className="checkbox-item">
                <input
                id="esProveedor"
                name="esProveedor"
                type="checkbox"
                checked={formData.esProveedor}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, esProveedor: e.target.checked }))
                }
                />
                <label htmlFor="esProveedor">Proveedor</label>
            </div>
            <div className="checkbox-item">
                <input
                id="esCliente"
                name="esCliente"
                type="checkbox"
                checked={formData.esCliente}
                onChange={(e) =>
                    setFormData((prev) => ({ ...prev, esCliente: e.target.checked }))
                }
                />
                <label htmlFor="esCliente">Cliente</label>
            </div>
            </div>
          <button type="submit">Guardar</button>
        </form>
      </Modal>

      {/* Tabla */}
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Razón Social</th>
            <th>Nombre Comercial</th>
            <th>RUC</th>
            <th>Dirección</th>
            <th>Proveedor</th>
            <th>Cliente</th>
            <th>Ejecutivo</th>
            <th>Contacto</th>
          </tr>
        </thead>
        <tbody>
          {terceros.map((tercero) => (
            <tr key={tercero.id}>
              <td>{tercero.id}</td>
              <td>{tercero.razonSocial}</td>
              <td>{tercero.nombreComercial}</td>
              <td>{tercero.ruc}</td>
              <td>{tercero.direccion}</td>
              <td>{tercero.esProveedor ? 'Sí' : 'No'}</td>
              <td>{tercero.esCliente ? 'Sí' : 'No'}</td>
              <td>{tercero.ejecutivo}</td>
              <td>{tercero.contacto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
