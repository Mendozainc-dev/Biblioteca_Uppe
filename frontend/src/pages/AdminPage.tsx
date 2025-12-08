import Menubar from "../components/domain/Menubar";
import ListaLibros from "../components/domain/ListaLibros";
import "./Adminpage.css";

function AdminPage() {
  return (
    <div className="containerAdminpage">
      <Menubar />
      <main className="admin-main">
        <ListaLibros />
      </main>
    </div>
  );
}

export default AdminPage;
