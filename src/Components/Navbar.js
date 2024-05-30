import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link depuis React Router
import logoImg from '../Assets/museum-logo.png';
import searchIcon from '../Assets/search-icon.png';
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-img-link">
        <img src={logoImg} alt="Logo" className="logo-img" />
      </Link>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="search-button">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li> {/* Lien vers la page d'accueil */}
        <li><Link to="/about">À propos</Link></li> {/* Lien vers la page "À Propos" */}
        <li><Link to="/contact">Contact</Link></li> {/* Lien vers la page "Contact" */}
        <li><a href="#">Search</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
