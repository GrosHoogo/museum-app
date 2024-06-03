import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SearchMenu.css';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState({
    year: '',
    department: '',
    title: '',
    period: '',
    city: '',
    artist: '',
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    Object.keys(searchBy).forEach(key => {
      if (searchBy[key]) {
        searchParams.append(key, searchBy[key]);
      }
    });
    searchParams.append('query', query);
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCheckboxChange = (event) => {
    setSearchBy({
      ...searchBy,
      [event.target.name]: event.target.value,
    });
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
      <div className="checkbox-container2">
        {['year', 'department', 'title', 'period', 'city', 'artist'].map((key) => (
          <label key={key} className="checkbox-label2">
            <input
              type="text"
              name={key}
              value={searchBy[key]}
              onChange={handleCheckboxChange}
              placeholder={`Enter ${key}`}
              className="checkbox-input2"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
