import { NavLink } from "react-router-dom";
import "./Headeradmin.css";

function Headeradmin() {
  return (
    <div
      className="headeradmin"
      role="toolbar"
      aria-label="Acciones de administración"
    >
      <NavLink
        to="delete"
        relative="path"
        className={({ isActive }) =>
          isActive
            ? "headeradmin__link headeradmin__link--active"
            : "headeradmin__link"
        }
      >
        Eliminar
      </NavLink>

      <NavLink
        to="edit"
        relative="path"
        className={({ isActive }) =>
          isActive
            ? "headeradmin__link headeradmin__link--active"
            : "headeradmin__link"
        }
      >
        Editar
      </NavLink>

      <NavLink
        to="create"
        relative="path"
        className={({ isActive }) =>
          isActive
            ? "headeradmin__link headeradmin__link--active"
            : "headeradmin__link"
        }
      >
        Crear
      </NavLink>
    </div>
  );
}

export default Headeradmin;
