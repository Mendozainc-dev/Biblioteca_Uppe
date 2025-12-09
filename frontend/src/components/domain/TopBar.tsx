import './TopBar.css';

export const TopBar = () => {
  return (
    <div className="topbar">
      <nav className="topbar-nav">
        <button className="nav-link active">Registar</button>
        <button className="nav-link">Editar</button>
        <button className="nav-link danger">Eliminar</button>
      </nav>
    </div>
  );
};