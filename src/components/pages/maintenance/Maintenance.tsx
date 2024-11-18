import "./Maintenance.css";
import Navbar from "../../ui/navbar/Navbar";

interface Opcion {
  titulo: string;
  icono: JSX.Element;
  ruta: string;
}

const opciones: Opcion[] = [
  { titulo: "Tercero", icono: <span className="icon">🏢</span>, ruta: '/tercero' },
  { titulo: "Sede", icono: <span className="icon">📍</span>, ruta: '/sede' },
  { titulo: "Residuo", icono: <span className="icon">♻️</span>, ruta: '/residuo' },
  { titulo: "Estado", icono: <span className="icon">📊</span>, ruta: '/estado' },
  { titulo: "Vehículo", icono: <span className="icon">🚚</span>, ruta: '/vehiculo' },
  { titulo: "Conductor", icono: <span className="icon">👤</span>, ruta: '/conductor' },
  { titulo: "Usuario", icono: <span className="icon">🧑</span>, ruta: '/usuario' },
  { titulo: "Relleno Sanitario", icono: <span className="icon">⛰️</span>, ruta: '/relojo' },
  { titulo: "Método de Pago", icono: <span className="icon">💳</span>, ruta: '/metodo' },
  { titulo: "Impuesto", icono: <span className="icon">🧾</span>, ruta: '/impuesto' },
  { titulo: "Coordinador", icono: <span className="icon">💼</span>, ruta: '/coordinador' },
  { titulo: "Empresa Operadora", icono: <span className="icon">🏭</span>, ruta: '/empresa' },
];

export default function Maintenance() {
  return (
    <>
    <Navbar />
    <div className="containerM">
    <h1 className="heading">Mantenimiento</h1>

      <div className="gridM">
        {opciones.map((opcion, index) => (
          <a href={opcion.ruta}>
            <div className="cardM" key={index}>
            <div className="cardM-content">
              {opcion.icono}
              <h2 className="cardM-title">{opcion.titulo}</h2>
            </div>
          </div>
          </a>
        ))}
      </div>
    </div>
    </>
  );
};