import "./LibroCard.css";

interface Libro {
  id: number;
  nombre_libro: string;
  autor: string;
  descripcion: string | null;
  fecha_publicacion: string;
  total_libros: number;
  status: boolean;
  fecha_creacion: string;
}

interface LibroCardProps {
  libro: Libro;
}

function LibroCard({ libro }: LibroCardProps) {
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="libro-card">
      <div className="libro-card__header">
        <h3 className="libro-card__title">{libro.nombre_libro}</h3>
        <span
          className={`libro-card__status ${
            libro.status ? "libro-card__status--active" : "libro-card__status--inactive"
          }`}
        >
          {libro.status ? "Disponible" : "No disponible"}
        </span>
      </div>

      <div className="libro-card__content">
        <div className="libro-card__field">
          <label className="libro-card__label">Autor:</label>
          <p className="libro-card__value">{libro.autor}</p>
        </div>

        {libro.descripcion && (
          <div className="libro-card__field">
            <label className="libro-card__label">Descripción:</label>
            <p className="libro-card__value libro-card__value--description">
              {libro.descripcion}
            </p>
          </div>
        )}

        <div className="libro-card__meta">
          <div className="libro-card__meta-item">
            <label className="libro-card__label">Publicación:</label>
            <p className="libro-card__value">
              {formatearFecha(libro.fecha_publicacion)}
            </p>
          </div>

          <div className="libro-card__meta-item">
            <label className="libro-card__label">Copias:</label>
            <p className="libro-card__value libro-card__value--count">
              {libro.total_libros}
            </p>
          </div>
        </div>

        <div className="libro-card__footer">
          <small className="libro-card__date">
            Agregado: {formatearFecha(libro.fecha_creacion)}
          </small>
        </div>
      </div>
    </div>
  );
}

export default LibroCard;
