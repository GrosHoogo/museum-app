import React, { useState, useEffect } from 'react';
import '../Styles/Header.css';

function Header() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        // Fetch list of available object IDs
        const idsResponse = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
        if (!idsResponse.ok) {
          throw new Error('Failed to fetch artwork IDs');
        }

        const idsData = await idsResponse.json();
        const objectIDs = idsData.objectIDs;

        let artworksWithImages = [];
        
        while (artworksWithImages.length < 3) {
          const randomIndex = Math.floor(Math.random() * objectIDs.length);
          const randomID = objectIDs[randomIndex];
          
          const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`);
          if (!response.ok) {
            throw new Error('Failed to fetch artwork details');
          }
          
          const data = await response.json();
          if (data.primaryImage) {
            artworksWithImages.push(data);
          }
        }

        setArtworks(artworksWithImages);
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
            <p><span className="label">Date:</span> <span className="value">{artwork.objectDate}</span></p>
            <p><span className="label">Artist:</span> <span className="value">{artwork.artistDisplayName}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
