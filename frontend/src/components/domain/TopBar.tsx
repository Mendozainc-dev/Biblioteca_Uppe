import { useNavigate, useLocation } from 'react-router-dom';
import './TopBar.css';

export const TopBar = () => {
  const navigate = useNavigate(); // Hook para navegar
  const location = useLocation(); // Hook para saber la ruta actual

  // Rutas definidas en tu archivo de rutas
  const rutas = {
    registrar: '/admin/Registar-libro',
    editar: '/admin/Editar-libro'
  };

  return (
    <div className="topbar">
      <nav className="topbar-nav">
        {/* BOTÓN REGISTRAR */}
        <button 
          className={`nav-link ${location.pathname === rutas.registrar ? 'active' : ''}`}
          onClick={() => navigate(rutas.registrar)}
        >
          Registrar
        </button>

        {/* BOTÓN EDITAR */}
        <button 
          className={`nav-link ${location.pathname === rutas.editar ? 'active' : ''}`}
          onClick={() => navigate(rutas.editar)}
        >
          Editar
        </button>

        {/* BOTÓN ELIMINAR (Solo visual por ahora, ya que la eliminación suele ser una acción dentro de editar) */}
        <button className="nav-link danger">
          Eliminar
        </button>
      </nav>
    </div>
  );
};