import Menubar from './Menubar'; 
import { TopBar } from './TopBar'; 
import { Button } from '../ui/Button'; 
import { InputGroup } from '../ui/InputGroup'; 
import './FormRegisterPage.css'; 

const FormRegisterPage: React.FC = () => {

  return (
    <div className="containerEditPage">
      {/* 1. SIDEBAR (Tu componente existente) */}
      <Menubar />

      {/* 2. CONTENIDO PRINCIPAL (Con margen izquierdo automático) */}
      <main className="edit-main">
        
        {/* Barra superior */}
        <TopBar />

        {/* Contenedor con scroll y padding */}
        <div className="content-scrollable">
          
          <div className="header-section">
            <h1 className="page-title">Registrar libro</h1>
            <Button variant="secondary">Cancelar</Button>
          </div>

          {/* TARJETA BLANCA DEL FORMULARIO */}
          <form>
            <div className="form-card">
              
              {/* Fila 1 */}
              <div className="form-grid">
                <InputGroup 
                  label="Autor(es)" 
                  placeholder="Ej. Gabriel García Márquez" 
                  helperText="Separa los autores con comas."
                />
                <InputGroup 
                  label="Fecha de Publicación" 
                  type="date"
                />
              </div>

              {/* Fila 2 */}
              <div className="form-grid">
                <InputGroup 
                  label="Copias en Existencia" 
                  type="number"
                  min={0}
                  placeholder="0"
                />
                {/* Espacio vacío para mantener la grilla alineada */}
                <div className="hidden-mobile"></div> 
              </div>
            

            {/* Área de texto */}
            <InputGroup 
              label="Descripción / Resumen" 
              isTextArea
              placeholder="Escribe una sinopsis..." 
            />

            {/* Botones de acción */}
            <div className="action-buttons">
              <Button variant="primary">Guardar Libro</Button>
              <Button variant="danger">Eliminar Libro</Button>
            </div>
          </div>
          </form>

        </div>
      </main>
    </div>
  );
};

export default FormRegisterPage;