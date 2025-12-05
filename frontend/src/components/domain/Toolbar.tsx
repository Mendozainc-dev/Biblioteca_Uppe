import "./Toolbar.css";

interface ToolbarProps {
  onFilter?: () => void;
  onSort?: (sortBy: string) => void;
}

export default function Toolbar({ onFilter, onSort }: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <button className="toolbar-button" onClick={() => onSort?.("relevance")}>
          <span>
            <img src="/preencher.svg" alt="Preencher" />
          </span>
          Preenchér
        </button>
        <div className="split-button">
          <button
            className="split-left"
            onClick={() => onSort?.("title")}
            aria-label="Ordenar por título"
          >
            <span className="split-icon">
              <img src="/titulo.svg" alt="ícono" />
            </span>
            <span className="split-label">Título</span>
          </button>
          <button
            className="split-right"
            onClick={() => onSort?.("title-order")}
            aria-label="Opciones de título"
          >
            <span><img src="/flecha_abajo.svg" alt="flecha_abajo" /></span>
          </button>
        </div>
      </div>
      <button className="toolbar-filter" onClick={onFilter}>
        <span>⚙️</span> Filtros
      </button>
    </div>
  );
}
