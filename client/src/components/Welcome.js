// Welcome.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
import Layout from './Layout';
import Stars from './Stars'; 

const imageUrls = [
  require('../assets/welcome/avocado-svgrepo-com.png'),
  require('../assets/welcome/ice-cream-svgrepo-com.png'),
  require('../assets/welcome/cherry-svgrepo-com.png'),
  require('../assets/welcome/chicken-turkey-3-svgrepo-com.png'),
  require('../assets/welcome/food-fruit-fruits-10-svgrepo-com.png'),
  require('../assets/welcome/food-fruit-fruits-12-svgrepo-com.png'),
  require('../assets/welcome/food-fruit-fruits-8-svgrepo-com.png'),
  require('../assets/welcome/fried-egg.png'),
  require('../assets/welcome/food-fruit-fruits-4-svgrepo-com.png'),
];

const loadImages = async (urls) => {
  return Promise.all(urls.map((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      setTimeout(() => resolve(img), 100); 
    });
  }));
};

const Welcome = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages(imageUrls).then(loadedImages => {
      setImages(loadedImages);
    }).catch(error => console.error(error));
  }, []);

  return (
    <Layout headingText="Nutrition Hub" headingClass="heading-background">
      <div className="welcome-body">
      <Stars 
        images={images} 
        numStars={200} 
        canvasClass="welcome-canvas" 
        linkersColor="rgba(255, 215, 0, 0.1)" 
      />               
      <div className="welcome-container">
          <h1 className="welcome-titlehead">Nutrition Hub</h1>
          <div className="p-2 button-container">
            <Link
              to="/dataset"
              className="flex-grow bg-emerald-800 hover:bg-blue-700 text-white py-2 px-4 rounded welcome-button"
            >
              Browse Data
            </Link>
            <Link
              to="/"
              className="flex-grow bg-emerald-800 hover:bg-blue-700 text-white py-2 px-4 rounded welcome-button"
            >
              Main
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
