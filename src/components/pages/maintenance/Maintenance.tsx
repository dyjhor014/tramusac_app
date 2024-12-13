import "./Maintenance.css";
import Navbar from "../../ui/navbar/Navbar";
import Footer from "../../ui/footer/Footer";
import { Helmet } from "react-helmet";

interface Opcion {
  index: number;
  titulo: string;
  icono: JSX.Element;
  ruta: string;
}

const opciones: Opcion[] = [
  { index: 1, titulo: "Tercero", icono: <span className="icon">🏢</span>, ruta: '/tercero' },
  { index: 2, titulo: "Sede", icono: <span className="icon">📍</span>, ruta: '/sede' },
  { index: 3, titulo: "Residuo", icono: <span className="icon">♻️</span>, ruta: '/residuo' },
  { index: 4, titulo: "Estado", icono: <span className="icon">📊</span>, ruta: '/estado' },
  { index: 5, titulo: "Vehículo", icono: <span className="icon">🚚</span>, ruta: '/vehiculo' },
  { index: 6, titulo: "Conductor", icono: <span className="icon">👤</span>, ruta: '/conductor' },
  { index: 7, titulo: "Usuario", icono: <span className="icon">🧑</span>, ruta: '/usuario' },
  { index: 8, titulo: "Relleno Sanitario", icono: <span className="icon">⛰️</span>, ruta: '/relojo' },
  /* { index: 9, titulo: "Método de Pago", icono: <span className="icon">💳</span>, ruta: '/metodo' },
  { index: 10, titulo: "Impuesto", icono: <span className="icon">🧾</span>, ruta: '/impuesto' }, */
  { index: 11, titulo: "Coordinador", icono: <span className="icon">💼</span>, ruta: '/coordinador' },
  { index: 12, titulo: "Empresa Operadora", icono: <span className="icon">🏭</span>, ruta: '/empresa' },
];

export default function Maintenance() {
  return (
    <>
    <Helmet>
      <title>Tramusac | Mantenimiento</title>
    </Helmet>
    <Navbar />
    <div className="containerM">
    <h1 className="heading">Mantenimiento</h1>

      <div className="gridM">
        {opciones.map((opcion) => (
          <a href={opcion.ruta}  key={opcion.index}>
            <div className="cardM">
            <div className="cardM-content">
              {opcion.icono}
              <h2 className="cardM-title">{opcion.titulo}</h2>
            </div>
          </div>
          </a>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};