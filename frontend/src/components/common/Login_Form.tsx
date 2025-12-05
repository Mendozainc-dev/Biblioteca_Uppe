import "../../styles/fonts.css";

import { useState } from "react";
import type { FormEvent } from "react";
import "./Login_Form.css";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/admin");
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">INICIAR SESIÓN</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
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
