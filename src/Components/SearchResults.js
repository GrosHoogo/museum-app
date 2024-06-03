import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
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

  useEffect(() => {
    const fetchResults = async () => {
      let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`;
      
      if (filters.year) {
        url += `&dateBegin=${filters.year}&dateEnd=${filters.year}`;
      }
      if (filters.department) {
        url += `&departmentId=${filters.department}`;
      }
      // Add more filters as needed

      const response = await fetch(url);
      const data = await response.json();

      if (data.objectIDs) {
        const fetchObjects = data.objectIDs.slice(0, 10).map((id) =>
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then((response) => response.json())
        );
        const objects = await Promise.all(fetchObjects);
        setResults(objects);
      }
    };

    fetchResults();
  }, [query, filters]);

  return (
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
  );
};

export default SearchResults;
