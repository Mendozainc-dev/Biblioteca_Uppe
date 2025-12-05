import LogoBibliotecaUppe from "../../assets/images/WhatsApp Image 2025-10-13 at 6.48.53 PM.jpeg";
import "./SideBar.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";


const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`vertical-sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Toggle */}
      <div className="sidebar__toggle-container">
        <label
          tabIndex={0}
          htmlFor="checkbox-input"
          id="label-for-checkbox-input"
          className="nav__toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="toggle--icons" aria-hidden="true">
            {isOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="toggle-svg-icon toggle--open"
              >
                <path d="M3 5a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2zM2 12a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1M2 18a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1"></path>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="toggle-svg-icon toggle--close"
              >
                <path d="M18.707 6.707a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12z"></path>
              </svg>
            )}
          </span>
        </label>
      </div>

      {/* Header */}
      <header>
        <figure>
          <img
            className="upp-logo"
            src={LogoBibliotecaUppe}
            alt="upp logo"
          />
        </figure>
      </header>

      {/* Navigation */}
      <nav>
        <section className="sidebar__wrapper">
          <ul className="sidebar__list list--primary">
            <li className="sidebar__item">
              <a className="sidebar__link" href="#">
                <span className="text">Inicio</span>
              </a>
            </li>
            <li className="sidebar__item">
              <a className="sidebar__link" href="#">
                <span className="text">Agregar Articulos</span>
              </a>
              <a className="sidebar__link" href="#">
                <span className="text">Publicar</span>
              </a>
              <a className="sidebar__link" href="#">
                <span className="text">Panel de Control</span>
              </a>
            </li>
            {/* ... resto de items */}
          </ul>

          <ul className="sidebar__list list--secondary">
            <li className="sidebar__item">
              <a className="sidebar__link" href="#">
                <span className="text">Configuración</span>
              </a>
            </li>
            <li className="sidebar__item">
              <a className="sidebar__link" href="#">
                <span className="text">Soporte</span>
              </a>
            </li>
            <li className="sidebar__item">
              <a className="sidebar__link" href="#">
                <span className="text">Salir</span>
              </a>
            </li>
          </ul>
        </section>
      </nav>
    </aside>
  );
};

export default SideBar;
