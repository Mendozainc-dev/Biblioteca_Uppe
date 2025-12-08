import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import RegistrarUsuario from "./pages/RegistrarUsuario.tsx";
import MostrarContacto from "./pages/ContactoPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import UserHomePage from "./pages/UserHomePage.tsx";
import AdministracionBiblioteca from "./pages/AdministracionBiblioteca.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
        <Route path="/" element={<App />} />
        <Route path="/contacto" element={<MostrarContacto />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/user/home" element={<UserHomePage />} />
        <Route
          path="/admin/administración_biblioteca/*"
          element={<AdministracionBiblioteca />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
