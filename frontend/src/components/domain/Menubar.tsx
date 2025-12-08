import Logouppe from "../../assets/images/LogoUppe.svg";
import "./Menubar.css";

import { Link } from "react-router-dom";
function Menubar() {
  return (
    <aside className="menubar" aria-label="Barra de navegación principal">
      <div className="menubar__logo">
        <img src={Logouppe} alt="Logo Uppe" className="menubar__logo-img" />
      </div>

      <nav className="menubar__nav">
        <ul className="menubar__list">
          <li className="menubar__item">
            <Link className="menubar__link" to="/admin/dashboard">
              Inicio
            </Link>
          </li>
          <li className="menubar__item">
            <Link
              className="menubar__link"
              to="/admin/administración_biblioteca"
            >
              Administración
            </Link>
          </li>
          <li className="menubar__item">
            <Link className="menubar__link" to="/">
              Cerrar Sesión
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Menubar;
