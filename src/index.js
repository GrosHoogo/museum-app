import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importez BrowserRouter, Routes et Route
import './index.css';
import Acceuil from './Pages/Page d\'acceuil';
import About from './Pages/Page About';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes> {/* Enveloppez vos routes dans le composant <Routes> */}
        <Route exact path="/" element={<Acceuil />} /> {/* Utilisez l'attribut "element" pour spécifier le composant */}
        <Route path="/about" element={<About />} /> {/* Utilisez l'attribut "element" pour spécifier le composant */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
