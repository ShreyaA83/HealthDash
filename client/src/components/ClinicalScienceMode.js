import React, { useEffect, useState } from 'react';
import './ClinicalScienceMode.css';
import TNH from '../assets/TNH.png'
import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import Stars from './Stars'; 

const imageUrls = [
  require('../assets/welcome/analytics.png'),
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
const ClinicalScienceMode = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages(imageUrls).then(loadedImages => {
      setImages(loadedImages);
    }).catch(error => console.error(error));
  }, []);
  return (
    <div>
    <CustomCursor />
    <Stars 
        images={images} 
        numStars={80} 
        canvasClass="home-canvas" 
        linkersColor="rgba(0, 0, 0, 0.3)" 
      />  
      <div className="image-container">
      <Link to="/welcome" aria-label="Welcome Page" >
  <img src={TNH} alt="Clinical Science Mode: Link to Welcome Page" loading="lazy" />
</Link>
    </div>
    </div>
  );
};

export default ClinicalScienceMode;
