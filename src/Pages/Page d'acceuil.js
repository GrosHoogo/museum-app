// PageAccueil.js
import React from 'react';
import Navbar from '../Components/Navbar.js'; // Chemin vers le composant Navbar
import Header from '../Components/Header.js'; // Chemin vers le composant Header
import Footer from '../Components/Footer.js'; // Chemin vers le composant Footer

const PageAccueil = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Footer />
    </div>
  );
};

export default PageAccueil;
