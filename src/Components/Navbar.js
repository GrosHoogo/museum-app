import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link depuis React Router
import logoImg from '../Assets/museum-logo.png';
import searchIcon from '../Assets/search-icon.png';
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logoImg} alt="Logo" className="logo-img" />
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="search-button">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </div>
      <ul className="nav-links">
        <li><a href="/">Accueil</a></li> {/* Lien vers la page d'accueil */}
        <li><a href="/about">À propos</a></li> {/* Lien vers la page "À Propos" */}
        <li><a href="#">Contact</a></li>
        <li><a href="#">Search</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
