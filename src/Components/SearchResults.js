import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null); // État pour l'œuvre sélectionnée
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const searchBy = searchParams.get('searchBy');
  const resultsRef = useRef(null);

  const fetchResults = async (pageNumber) => {
    setLoading(true);
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}&hasImages=true`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.objectIDs) {
        const objectIDs = data.objectIDs.slice((pageNumber - 1) * 15, pageNumber * 15);
        const fetchObjects = objectIDs.map((id) =>
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then((response) => response.json())
            .catch(error => {
              console.error(`Error fetching object with ID ${id}:`, error);
              return null;
            })
        );
        const objects = await Promise.all(fetchObjects);

        const filteredResults = objects.filter((item) => {
          if (!item) return false;
          switch (searchBy) {
            case 'year':
              return item.objectDate && item.objectDate.includes(query);
            case 'department':
              return item.department && item.department.includes(query);
            case 'title':
              return item.title && item.title.toLowerCase().includes(query.toLowerCase());
            case 'period':
              return item.period && item.period.includes(query);
            case 'city':
              return item.city && item.city.includes(query);
            case 'artist':
              return item.artistDisplayName && item.artistDisplayName.includes(query);
            default:
              return true;
          }
        });

        setResults(filteredResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      setResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults(page);
    if (resultsRef.current) {
      resultsRef.current.scrollTo(0, 0);
    }
  }, [query, searchBy, page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleImageClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleCloseModal = () => {
    setSelectedArtwork(null);
  };

  return (
    <div className="search-results" ref={resultsRef}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        results.length > 0 ? (
          <>
            {results.map((item) => (
              <div key={item.objectID} className="result-card" onClick={() => handleImageClick(item)}>
                <img src={item.primaryImageSmall} alt={item.title} className="result-image" loading="lazy" />
                <div className="result-info">
                  <h3>{item.title}</h3>
                  <p className="date"><span className="label">Date :</span>{item.objectDate}</p>
                  <p className="artist"><span className="label">Artist :</span>{item.artistDisplayName}</p>
                </div>
              </div>
            ))}
            <div className="pagination-buttons">
              <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </>
        ) : (
          <p>No results found</p>
        )
      )}

      {selectedArtwork && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedArtwork.primaryImageSmall} alt={selectedArtwork.title} className="modal-image" />
            <div className="modal-info">
              <h3>{selectedArtwork.title}</h3>
              <p><span className="modal-label">Artist:</span> {selectedArtwork.artistDisplayName}</p>
              <p><span className="modal-label">Period:</span> {selectedArtwork.period}</p>
              <p><span className="modal-label">Date:</span> {selectedArtwork.objectDate}</p>
              <p><span className="modal-label">Department:</span> {selectedArtwork.department}</p>
              <p><span className="modal-label">Medium:</span> {selectedArtwork.medium}</p>
            </div>
            <button className="close-button" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
