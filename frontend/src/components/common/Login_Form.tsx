import React, { useState } from "react";
import "./Login_Form.css";

const LoginForm = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Usuario:",
      user,
      "Contraseña:",
      password,
      "Recordarme:",
      rememberMe,
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
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Recordarme</label>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
          <p className="register-link-container">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="register-link">
              ¡Regístrate!
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
