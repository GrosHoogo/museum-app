import React from 'react';
import Navbar from '../Components/Navbar'; // Chemin vers le composant Navbar
import Contact from '../Components/Contact'; // Chemin vers le composant About
import Footer from '../Components/Footer'; // Chemin vers le composant Footer

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
