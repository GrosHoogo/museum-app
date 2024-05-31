import React from 'react';
import Navbar from '../Components/Navbar'; // Chemin vers le composant Navbar
import Search from '../Components/SearchMenu'; // Chemin vers le composant SearchMenu
import Footer from '../Components/Footer'; // Chemin vers le composant Footer

const SearchMenuPage = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <Footer />
    </div>
  );
};

export default SearchMenuPage;
