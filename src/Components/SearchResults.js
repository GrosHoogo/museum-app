import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [showOnlyImages, setShowOnlyImages] = useState(false); // Ajout de l'état
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

  // Filtrer les résultats en fonction de l'état de la case à cocher
  const filteredResults = showOnlyImages ? results.filter(item => item.primaryImageSmall) : results;

  return (
    <div className="search-results">
      <label className="image-checkbox">
        <input
          type="checkbox"
          checked={showOnlyImages}
          onChange={(e) => setShowOnlyImages(e.target.checked)}
        />
        Afficher uniquement les images
      </label>
      {filteredResults.length > 0 ? (
        filteredResults.map((item) => (
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
  );
};

export default SearchResults;
