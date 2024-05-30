import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.objectIDs) {
            const fetchObjects = data.objectIDs.slice(0, 10).map((id) =>
              fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
                .then((response) => response.json())
            );
            Promise.all(fetchObjects).then((objects) => setResults(objects));
          }
        });
    }
  }, [query]);

  return (
    <div className="search-results">
      {results.length > 0 ? (
        results.map((item) => (
          <div key={item.objectID} className="result-card">
            <img src={item.primaryImageSmall} alt={item.title} className="result-image" />
            <div className="result-info">
              <h3>{item.title}</h3>
              <p className="label">Date:</p>
              <p className="value">{item.objectDate}</p>
              <p className="label">Auteur:</p>
              <p className="value">{item.artistDisplayName}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
