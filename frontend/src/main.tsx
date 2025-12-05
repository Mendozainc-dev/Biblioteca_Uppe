import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import RegistrarUsuario from "./pages/RegistrarUsuario.tsx";
import MostrarContacto from "./pages/ContactoPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
        <Route path="/" element={<App />} />
        <Route path="/contacto" element={<MostrarContacto />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
