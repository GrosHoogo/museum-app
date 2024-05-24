import React from 'react';
import logoImg from '../Assets/museum-logo.png'; // Importez votre image ici
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logoImg} alt="Logo" className="logo-img" /> {/* Utilisez la balise img avec votre image */}
      <ul className="nav-links">
        <li><a href="#">Accueil</a></li>
        <li><a href="#">À propos</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Search</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
