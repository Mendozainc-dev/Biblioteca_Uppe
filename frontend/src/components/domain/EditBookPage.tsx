import React, { useState } from 'react';
import Menubar from './Menubar'; 
import { TopBar } from './TopBar';
import { Button } from '../ui/Button'; 
import { InputGroup } from '../ui/InputGroup'; 
import './EditBookPage.css';

// Interfaz alineada con tu models.py
interface BookData {
  id: number;
  nombre_libro: string;
  autor: string;
  fecha_publicacion: string;
  total_libros: number;
  descripcion: string;
}

const EditBookPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [book, setBook] = useState<BookData | null>(null);
  const [formData, setFormData] = useState<BookData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // --- 1. BUSCAR (Adaptado a tu backend manual) ---
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setNotFound(false);
      setBook(null);
      setIsEditing(false);

      // Paso A: Pedimos TODOS los libros (Tu backend no filtra por texto en el servidor)
      const response = await fetch('http://127.0.0.1:8000/api/libro/obtener/');
      const data = await response.json();

      if (data.success && data.libros) {
        // Paso B: Filtramos en el navegador (Javascript)
        const term = searchTerm.toLowerCase();
        
        // Buscamos coincidencia en nombre O autor
        const found = data.libros.find((l: BookData) => 
          l.nombre_libro.toLowerCase().includes(term) ||
          l.autor.toLowerCase().includes(term)
        );

        if (found) {
          setBook(found);
          setFormData(found);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true); // No se encontraron libros o hubo error
      }
    } catch (error) {
      console.error("Error buscando:", error);
      alert("Error de conexión. Verifica que el servidor (runserver) esté encendido.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // --- 2. GUARDAR CAMBIOS (Conectado a tu endpoint existente) ---
  const handleSave = async () => {
    if (!formData || !book) return;

    try {
      // Tu views.py espera el ID dentro del JSON, no en la URL
      const response = await fetch('http://127.0.0.1:8000/api/libro/editar/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // formData ya incluye el 'id'
      });

      const data = await response.json();

      if (data.success) {
        alert("¡Libro actualizado correctamente!");
        setBook(formData); // Actualizamos la vista de lectura
        setIsEditing(false);
      } else {
        alert("Error del servidor: " + data.message);
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error de conexión al guardar.");
    }
  };

  // --- 3. ELIMINAR (Conectado a tu endpoint existente) ---
  const handleDelete = async () => {
    if (!book) return;
    if (!confirm(`¿Estás seguro de eliminar "${book.nombre_libro}"?`)) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/libro/eliminar/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        // Tu views.py pide el ID en el body
        body: JSON.stringify({ id: book.id }), 
      });

      const data = await response.json();

      if (data.success) {
        alert("Libro eliminado.");
        setBook(null);
        setFormData(null);
        setSearchTerm("");
      } else {
        alert("Error al eliminar: " + data.message);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="containerEditPage">
      <Menubar />
      <main className="edit-main">
        <TopBar />
        <div className="content-scrollable">
          

          {/* BUSCADOR */}
          <div className="search-section bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Buscar Libro</h2>
            <div className="flex gap-4">
              <input 
                type="text" 
                className="flex-1 border border-gray-300 rounded-md p-2"
                placeholder="Escribe el nombre del libro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch}>Buscar</Button>
            </div>
            {notFound && <div className="mt-4 text-red-600 font-medium">⚠️ Libro no encontrado.</div>}
          </div>

          {/* VISTA LECTURA */}
          {book && !isEditing && (
            <div className="form-card fade-in">
              <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold">{book.nombre_libro}</h2>
                <Button onClick={() => setIsEditing(true)}>Editar</Button>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-4 text-gray-700">
                <p><strong>Autor:</strong> {book.autor}</p>
                <p><strong>Fecha:</strong> {book.fecha_publicacion}</p>
                <p><strong>Copias:</strong> {book.total_libros}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                 <p className="font-semibold text-gray-600">Descripción:</p>
                 <p className="mt-1">{book.descripcion || "Sin descripción"}</p>
              </div>
            </div>
          )}

          {/* VISTA EDICIÓN */}
          {isEditing && formData && (
            <div className="form-card fade-in">
              <h3 className="text-xl font-bold mb-6 text-cyan-600">Editando: {formData.nombre_libro}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <InputGroup label="Nombre del Libro" name="nombre_libro" value={formData.nombre_libro} onChange={handleInputChange} />
                <InputGroup label="Autor" name="autor" value={formData.autor} onChange={handleInputChange} />
                <InputGroup label="Fecha Publicación" type="date" name="fecha_publicacion" value={formData.fecha_publicacion} onChange={handleInputChange} />
                <InputGroup label="Copias Totales" type="number" name="total_libros" value={formData.total_libros} onChange={handleInputChange} />
              </div>
              
              <InputGroup label="Descripción" isTextArea name="descripcion" value={formData.descripcion} onChange={handleInputChange} />

              <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
                <Button onClick={handleSave}>Guardar Cambios</Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
                <div className="ml-auto">
                    <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default EditBookPage;