import Header from "./components/Header";
import ContactForm from "./component/contactanos";
import "./styles.css";

export default function App() {
  return (
    <div className="page">
      <Header />
      <main className="main">
        <section className="contact">
          <h1 className="title">Contáctenos</h1>
          <p className="subtitle">Equipo especializado listo para programar</p>
          <ContactForm />
        </section>
      </main>
      <footer className="footer">   
        <p>© {new Date().getFullYear()} Equipo Dev</p>
      </footer>
    </div>
  );
}