import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          SeriesManager
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Início
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/sobre" className="navbar-link">
              Sobre
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/cadastrar" className="navbar-link">
              Cadastrar Série
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/series" className="navbar-link">
              Listar Séries
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;