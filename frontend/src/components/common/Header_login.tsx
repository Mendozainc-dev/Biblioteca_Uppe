import LogoBibliotecaUppe from "../../assets/images/WhatsApp Image 2025-10-13 at 6.48.53 PM.jpeg";
import "./Header_login.css";
import { Link } from "react-router-dom";

function HeaderLogin() {
  return (
    <div>
      <header>
        <div className="logo_container">
          <img src={LogoBibliotecaUppe} alt="LogoBibliotecaUppe" />
        </div>
        <nav className="navigator_container">
          <Link to="/contacto">
            <button>Contactanos</button>
          </Link>
          <Link to="/">
            <button>Iniciar Sesión</button>
          </Link>
          <Link to="/registrar-usuario">
            <button>Registrarse</button>
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default HeaderLogin;
