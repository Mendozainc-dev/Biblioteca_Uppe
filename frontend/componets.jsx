export default function Header() {  // el exporte
  return (
    <header className="header">
      <div className="brand">
        {/* Logo avión de papel en SVG */}
        <svg
          className="logo"
          viewBox="0 0 24 24"
          width="28"
          height="28"
          aria-hidden="true"
        >
          <path
            d="M2 21l20-9L2 3l5 8 9-2-9 4-5 8z"
            fill="currentColor" // el color de la app
          />
        </svg>
        <span className="brand-name">DevFly</span>
      </div>

      <nav className="nav">
        <a href="#contacto" className="nav-link active">Contáctenos</a>
        <a href="#login" className="nav-link">Iniciar sesión</a>
        <a href="#registrar" className="nav-link btn-outline">Registrar</a>
      </nav>''
    </header>
  );
}