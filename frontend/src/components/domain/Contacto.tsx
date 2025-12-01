import "./Contacto.css";


function Contacto() {
  return (
    
    <div className="contenedor-principal">
        <div className="contenedor-secundario">
        <h1 id="titulo">Contactanos</h1>
        <h2 id="subtitulo">Equipo Especializado Listo para programar</h2>
        <div className="contenedor-contacto">
        <label>Su Nombre:</label><br></br>
        <input required></input><br></br>
        <label>Gmail:</label><br></br>
        <input required></input><br></br>
        <label>Comentario:</label><br></br>
        <input required id="comentario-input"></input><br></br>
        <button id="boton-enviar">Enviar</button>
        </div>
        </div>
        
    </div>
  );
}

export default Contacto;
