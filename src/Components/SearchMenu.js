import React, { useState } from 'react';
import '../Styles/SearchMenu.css';

const SearchComponent = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container1">
      <div className="search-box1">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input1"
        />
        <button onClick={handleSearch} className="search-button1">
          <img src="https://img.icons8.com/ios-filled/50/000000/search.png" alt="Search" className="search-icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchComponent;
