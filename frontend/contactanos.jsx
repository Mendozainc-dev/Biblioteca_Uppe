import { useState } from "react"; // importa a react

export default function ContactForm() {
  const [values, setValues] = useState({
    nombre: "",               
    email: "",
    comentario: "",
  });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const validate = () => {
    const errors = {};      // marca los errorres
    if (!values.nombre.trim()) errors.nombre = "El nombre es requerido.";
    if (!values.email.trim()) {  // elimina los espacios en blanco
      errors.email = "El correo es requerido.";
    } else { // cambiar de una funcion a otra
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // busca que un texto tenga la forma de un correo electronico
      if (!re.test(values.email)) errors.email = "Correo inválido.";       
    }
    if (!values.comentario.trim()) errors.comentario = "El comentario es requerido.";
    return errors;  //  regresa un comentario ante errores
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setStatus({ loading: false, ok: false, msg: Object.values(errors)[0] });
      return; // regresa las  variables
    }
    try {
      setStatus({ loading: true, ok: null, msg: "" });  // contesta un mensaje
      // Simulación de envío. Reemplaza con tu endpoint:
      // await fetch("/api/contacto", { method: "POST", body: JSON.stringify(values) });
      await new Promise((res) => setTimeout(res, 900));
      setStatus({ loading: false, ok: true, msg: "Mensaje enviado correctamente." });
      setValues({ nombre: "", email: "", comentario: "" }); // informacion del usario 
    } catch {
      setStatus({ loading: false, ok: false, msg: "Error al enviar. Intenta de nuevo." });
    }
  };

  return (
    <form className="form" onSubmit={onSubmit} id="contacto">
      <div className="field">
        <label htmlFor="nombre" className="label">Su Nombre</label>
        <input   // se va agregar un nuevo usuario
          id="nombre"
          name="nombre"
          type="text"
          className="input"
          placeholder="Ej. Diego García"
          value={values.nombre}
          onChange={onChange}
        />
      </div>
        
      <div className="field"> 
        <label htmlFor="email" className="label">Email</label> 
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          placeholder="tu@correo.com"
          value={values.email}
          onChange={onChange}
        />
      </div>

      <div className="field">
        <label htmlFor="comentario" className="label">Comentario / Detalle</label>
        <textarea
          id="comentario"
          name="comentario"
          className="textarea"
          rows={6}
          placeholder="Cuéntanos sobre tu proyecto o duda…"
          value={values.comentario}
          onChange={onChange}
        />
      </div>

      <button className="btn" type="submit" disabled={status.loading}>
        {status.loading ? "Enviando…" : "Enviar"}
      </button>

      {status.msg && (
        <p className={`status ${status.ok ? "ok" : "error"}`}>{status.msg}</p>
      )}
    </form>
  );
}