import React from 'react';
import Navbar from '../Components/Navbar';
import SearchResults from '../Components/SearchResults';
import Footer from '../Components/Footer';

const SearchResultsPage = () => {
  return (
    <div>
      <Navbar />
      <SearchResults />
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
