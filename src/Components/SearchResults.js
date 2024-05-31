import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [showOnlyImages, setShowOnlyImages] = useState(false); // State pour gérer l'affichage uniquement des images
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
            Promise.all(fetchObjects).then((objects) => {
              // Filtrer les résultats en fonction de l'état showOnlyImages
              const filteredResults = showOnlyImages ? objects.filter(item => item.primaryImageSmall !== "") : objects;
              setResults(filteredResults);
            });
          }
        });
    }
  }, [query, showOnlyImages]);

  return (
    <div>
      {/* Checkbox et texte "Only Image" */}
      <label className="checkbox">
        <input type="checkbox" onChange={(e) => setShowOnlyImages(e.target.checked)} />
        <svg viewBox="0 0 21 18">
          {/* Les SVGs ici */}
        </svg>
        <svg className="lines" viewBox="0 0 11 11">
          {/* Les SVGs ici */}
        </svg>
      </label>
      <span style={{fontWeight: 'bold', marginLeft: '8px'}}>Only Image</span>

      {/* Résultats */}
      <div className="search-results">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.objectID} className="result-card">
              <img src={item.primaryImageSmall} alt={item.title} className="result-image" />
              <div className="result-info">
                <h3>{item.title}</h3>
                <p className="date"><span className="label">Date :</span>{item.objectDate}</p>
                <p className="artist"><span className="label">Artist :</span>{item.artistDisplayName}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
