import "./CollectionHeader.css";
import searchIcon from "../../assets/images/lupa.svg";
import arrowRight from "../../assets/images/arrow-right.svg";

interface CollectionHeaderProps {
  title?: string;
  itemCount?: number;
}

export default function CollectionHeader({
  title = "Colección de Harry Potter",
  itemCount = 1,
}: CollectionHeaderProps) {
  return (
    <div className="collection-header">
      <div className="collection-title-section">
        <h1 className="collection-title">{title}</h1>
        <span className="item-counter">{itemCount}</span>
        <button className="nav-button">
          <img src={arrowRight} alt="Siguiente" />
        </button>
      </div>
      <div className="collection-search">
        <img src={searchIcon} alt="Buscar" className="search-icon" />
        <input
          type="text"
          className="collection-search-input"
          placeholder="Buscar por nombre de colección..."
        />
      </div>
    </div>
  );
}
