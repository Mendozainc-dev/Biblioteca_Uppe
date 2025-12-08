import { Routes, Route } from "react-router-dom";
import Headeradmin from "../components/domain/Headeradmin";
import Menubar from "../components/domain/Menubar";

import Deletepage from "./Deletepage";
import Editpage from "./Editpage";
import Insertpage from "./Insertpage";

import "./AdministracionBiblioteca.css";

function AdministracionBiblioteca() {
  return (
    <div className="containerAdminpage">
      <Menubar />
      <main className="admin-main">
        <header className="admin-header">
          <Headeradmin />
        </header>

        <section className="admin-content">
          <Routes>
            {/* These routes use relative paths that match the header links.
                When the user clicks a header button, the corresponding page
                component will render here on the right side. */}
            <Route path="delete" element={<Deletepage />} />
            <Route path="edit" element={<Editpage />} />
            <Route path="create" element={<Insertpage />} />
            {/* Fallback / index when no specific action chosen */}
            <Route
              index
              element={
                <div style={{ padding: 20 }}>
                  Seleccione una acción: Crear, Editar o Eliminar
                </div>
              }
            />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default AdministracionBiblioteca;
