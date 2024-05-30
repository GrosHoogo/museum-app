import React from 'react';
import '../Styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About the MET Museum</h1>
      <p>The Metropolitan Museum of Art, also known as the MET, is one of the largest and most prestigious art museums in the world. Located in New York City, it boasts a vast collection of artworks spanning 5,000 years of culture from all around the globe.</p>
      <p>The MET's collection includes pieces from ancient Egypt, classical antiquity, Europe, and much more. Visitors can explore galleries filled with paintings, sculptures, textiles, armor, and decorative arts.</p>
      
      <h2>The MET Museum API</h2>
      <p>The MET Museum provides a public API that allows developers to access data about its vast collection. This API can be used to search for artworks, retrieve details about specific pieces, and access images of the art. It's a valuable resource for educators, researchers, and anyone interested in exploring the museum's holdings.</p>
      
      <h3>How to Use the API</h3>
      <p>To use the MET Museum API, you can send HTTP requests to the following endpoints:</p>
      <ul>
        <li><strong>Search Endpoint:</strong> <code>https://collectionapi.metmuseum.org/public/collection/v1/search</code> - This endpoint allows you to search the collection based on keywords.</li>
        <li><strong>Object Endpoint:</strong> <code>https://collectionapi.metmuseum.org/public/collection/v1/objects/{'{'}objectID{'}'}</code> - This endpoint retrieves detailed information about a specific object using its ID.</li>
      </ul>
      
      <h3>Example Usage</h3>
      <p>Here is an example of how to use the search endpoint:</p>
      <pre>
        <code>
          fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=sunflowers')
            .then(response = response.json())
            .then(data = console.log(data));
        </code>
      </pre>
      <p>This request searches for artworks with images that include the keyword "sunflowers".</p>
    </div>
  );
};

export default About;
