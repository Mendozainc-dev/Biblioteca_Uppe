import { useEffect, useState } from "react";
import LibroCard from "./LibroCard";
import "./ListaLibros.css";

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

function ListaLibros() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerLibros();
  }, []);

  const obtenerLibros = async () => {
    try {
      setCargando(true);
      setError(null);
      const response = await fetch("http://localhost:8000/api/libro/obtener/");
      const data = await response.json();

      if (data.success) {
        setLibros(data.libros);
      } else {
        setError(data.message || "Error al obtener los libros");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="lista-libros__container">
        <div className="lista-libros__loading">
          <div className="spinner"></div>
          <p>Cargando libros...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lista-libros__container">
        <div className="lista-libros__error">
          <h3>Error al cargar los libros</h3>
          <p>{error}</p>
          <button onClick={obtenerLibros} className="lista-libros__retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (libros.length === 0) {
    return (
      <div className="lista-libros__container">
        <div className="lista-libros__empty">
          <h3>No hay libros disponibles</h3>
          <p>Comienza agregando nuevos libros a la biblioteca</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-libros__container">
      <div className="lista-libros__header">
        <h2>Libros en la Biblioteca</h2>
        <span className="lista-libros__count">{libros.length} libro(s)</span>
      </div>

      <div className="lista-libros__grid">
        {libros.map((libro) => (
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </div>
    </div>
  );
}

export default ListaLibros;
