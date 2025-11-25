import LogoBibliotecaUppe from "../../assets/images/WhatsApp Image 2025-10-13 at 6.48.53 PM.jpeg";
import "./Header_login.css";

function HeaderLogin() {
  return (
    <div>
      <header>
        <div className="logo_container">
          <img src={LogoBibliotecaUppe} alt="LogoBibliotecaUppe" />
        </div>
        <nav className="navigator_container">
          <a href="/">
            <button>Contactanos</button>
          </a>
          <a href="/about">
            <button>Iniciar Sesión</button>
          </a>
          <a href="/contact">
            <button>Registrarse</button>
          </a>
        </nav>
      </header>
    </div>
  );
}

export default HeaderLogin;
