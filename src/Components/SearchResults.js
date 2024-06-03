import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const filters = {
    year: searchParams.get('year'),
    department: searchParams.get('department'),
    title: searchParams.get('title'),
    period: searchParams.get('period'),
    city: searchParams.get('city'),
    artist: searchParams.get('artist'),
  };
  const resultsRef = useRef(null);

  const fetchResults = async (pageNumber) => {
    let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}&hasImages=true&offset=${(pageNumber - 1) * 15}&limit=15`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.objectIDs) {
      const objectIDs = data.objectIDs.slice(0, 15);
      const fetchObjects = objectIDs.map((id) =>
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
          .then((response) => response.json())
      );
      const objects = await Promise.all(fetchObjects);

      const filteredResults = objects.filter((item) => {
        return (
          (!filters.year || (item.objectDate && item.objectDate.includes(filters.year))) &&
          (!filters.department || (item.department && item.department.includes(filters.department))) &&
          (!filters.title || (item.title && item.title.includes(filters.title))) &&
          (!filters.period || (item.period && item.period.includes(filters.period))) &&
          (!filters.city || (item.city && item.city.includes(filters.city))) &&
          (!filters.artist || (item.artistDisplayName && item.artistDisplayName.includes(filters.artist)))
        );
      });

      setResults(filteredResults);
    }
  };

  useEffect(() => {
    fetchResults(page);
    if (resultsRef.current) {
      resultsRef.current.scrollTo(0, 0); // Défilement vers le haut de la page
    }
  }, [query, filters, page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="search-results" ref={resultsRef}>
      {results.length > 0 ? (
        <>
          {results.map((item) => (
            <div key={item.objectID} className="result-card">
              <img src={item.primaryImageSmall} alt={item.title} className="result-image" />
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
      )}
    </div>
  );
};

export default SearchResults;
