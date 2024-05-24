import React, { useState, useEffect } from 'react';
import '../Styles/Header.css';

function Header() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response1 = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/437097');
        const response2 = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/437098');
        const response3 = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/437099');

        if (!response1.ok || !response2.ok || !response3.ok) {
          throw new Error('Failed to fetch artwork');
        }

        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();

        setArtworks([data1, data2, data3]);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div>
      <div className="container">
        <h1>Met Museum</h1>
        <p>The Metropolitan Museum of Art Collection API.</p>
        <a href="#">Learn more</a>
      </div>

      <div className="artworks-container">
        {artworks.map((artwork, index) => (
          <div className="artwork" key={index}>
            <img src={artwork.primaryImage} alt={artwork.title} />
            <h3>{artwork.title}</h3>
            <p>Date: {artwork.objectDate}</p>
            <p>Artist: {artwork.artistDisplayName}</p>
          </div>
        ))}
      </div>

      <div className="blank"></div>
    </div>
  );
}

export default Header;
