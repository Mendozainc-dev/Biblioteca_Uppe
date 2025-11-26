import React, { useState } from "react";
import "./FomrRegistrarUsuario.css";

const FormRegistrarUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [carrera, setCarrera] = useState("licenciatura_ingenieria_automotriz");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (e) => {
    // 1. Evita que la página se recargue al enviar el formulario.
    e.preventDefault();

    // 2. Aquí es donde debes agregar tu lógica real de envío de datos (e.g., fetch, axios, etc.)
    // La consola y la alerta han sido eliminadas.
  };

  return (
    <div className="register-page-container">
      <div className="tittles_register_container">
        <h1 className="tittle_register">Insertar un nuevo usuario</h1>
        <h2 className="subtitle_register">
          El catálogo de la biblioteca a cualquier hora
        </h2>
      </div>

      <div className="register-card">
        <h3 className="card-title">Información del usuario:</h3>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Fila 1: Nombre y Apellidos */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombreAlumno"
                placeholder="Nombre del alumno"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                name="apellidosAlumno"
                placeholder="Apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Fila 2: E-mail y Matrícula */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="emailAlumno"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="matricula">Matrícula</label>
              <input
                type="text"
                id="matricula"
                name="matriculaAlumno"
                placeholder="Matrícula otorgada por la institución"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Fila 3: Carrera (Select) */}
          <div className="form-row single-column">
            <div className="form-group">
              <label htmlFor="carrera">Carrera</label>
              <select
                id="carrera"
                name="carrerasUsuario"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
              >
                <option value="licenciatura_administracion_gestion_empresarial">
                  Licenciatura en Administración y Gestión Empresarial
                </option>
                <option value="licenciatura_ingenieria_mecatronica">
                  Licenciatura en Ingeniería Mecatrónica
                </option>
                <option value="licenciatura_ingenieria_industrial">
                  Licenciatura en Ingeniería Industrial
                </option>
                <option value="licenciatura_ingenieria_tecnologias_informacion_innovacion_digital">
                  Licenciatura en Ingeniería en Tecnologías de la Información e
                  Innovación Digital
                </option>
                <option value="licenciatura_ingenieria_logistica">
                  Licenciatura en Ingeniería en Logística
                </option>
                <option value="licenciatura_ingenieria_biotecnologia">
                  Licenciatura en Ingeniería en Biotecnología
                </option>
                <option value="licenciatura_ingenieria_alimentos_agroindustria">
                  Licenciatura en Ingeniería en Alimentos (Agroindustrial)
                </option>
                <option value="licenciatura_ingenieria_automotriz">
                  Licenciatura en Ingeniería Automotriz
                </option>
              </select>
            </div>
          </div>

          {/* Campo de Contraseña */}
          <div className="form-row single-column">
            <div className="form-group">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                name="contrasenaUsuario"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Botón de Guardar */}
          <div className="button-container">
            <button type="submit" className="save-button">
              Guardar datos del alumno
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRegistrarUsuario;
