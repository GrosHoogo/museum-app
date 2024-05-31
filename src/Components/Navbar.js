import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../Assets/museum-logo.png';
import searchIcon from '../Assets/search-icon.png';
import '../Styles/Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-img-link">
        <img src={logoImg} alt="Logo" className="logo-img" />
      </Link>
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">
            <img src={searchIcon} alt="Search" className="search-icon" />
          </button>
        </form>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/about">À propos</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/searchmenu">Search</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
