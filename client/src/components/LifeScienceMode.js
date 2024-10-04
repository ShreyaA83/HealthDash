import React, { useEffect, useState } from 'react';
import './LifeScienceMode.css';
import CustomCursor from './CustomCursor';
import Stars from './Stars'; 

const imageUrls = [
  require('../assets/welcome/tree.png'),
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


const LifeScienceMode = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages(imageUrls).then(loadedImages => {
      setImages(loadedImages);
    }).catch(error => console.error(error));
  }, []);
  return (
    <div className="life-science-content">
    <CustomCursor />
    <Stars 
        images={images} 
        numStars={80} 
        canvasClass="home-canvas" 
        linkersColor="rgba(0, 0, 0, 0.3)" 
      />     
    </div>
  );
};

export default LifeScienceMode;
