import React from 'react';
import Navbar from '../Components/Navbar'; // Chemin vers le composant Navbar
import About from '../Components/About'; // Chemin vers le composant About
import Footer from '../Components/Footer'; // Chemin vers le composant Footer

const AboutUsPage = () => {
  return (
    <div>
      <Navbar />
      <About />
      <Footer />
    </div>
  );
};

export default AboutUsPage;
