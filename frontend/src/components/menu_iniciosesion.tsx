import './components_css/menu_iniciosesion.css';
import { use, useState } from 'react';
function Inicio_sesion(){

    const [mostrar, setMostrar] = useState(false);



    return(
<div className="spotlight-card">
  <div className="spotlight-layer"></div>

  <h1>Iniciar Sesión</h1>

  <form>
    <label htmlFor="username">Usuario:</label>
    <input type="text" id="username" name="username" required />

    <label htmlFor="password">Contraseña:</label>
    <input type="password" id="password" name="password" required />

    <div className="remember-checkbox">
      <input type="checkbox" id="remember" name="remember" />
      <label htmlFor="remember">Recuérdame</label>
    </div>
    <button type="submit">Iniciar Sesión</button>
  </form>
</div>

    )
}

export default Inicio_sesion;