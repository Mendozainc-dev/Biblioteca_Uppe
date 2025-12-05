import "./Search.css";
import lupa from "../../assets/images/lupa.svg";

const Search = () => {
    return (
        <div className="search-container">
           <img src={lupa} alt="Descripción de la imagen"></img>
            <input 
                type="text" 
                className="search-input" 
                placeholder="Comienza tu búsqueda aquí..."
            />
        </div>
    );
};

export default Search;