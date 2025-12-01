import "../../styles/fonts.css";

import { useState } from "react";
import type { FormEvent } from "react";
import "./Login_Form.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      "Usuario:",
      user,
      "Contraseña:",
      password,
      "Recordarme:",
      termsAccepted,
    );
    alert("Esperando respuesta del servidor");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">INICIAR SESIÓN</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="Usuario Proporcionado por la universidad"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type="password"
              className="login-input password-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="/forgot-password" className="forgot-password">
              ¿La olvido?
            </a>
          </div>
          <div className="remember-me-container">
            <input
              type="checkbox"
              id="rememberMe"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="rememberMe">
              Acepto los términos y condiciones
            </label>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
          <p className="register-link-container">
            ¿No tienes cuenta?{" "}
            <Link to="/registrar-usuario" className="register-link">
              ¡Regístrate!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
