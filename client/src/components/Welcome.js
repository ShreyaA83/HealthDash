import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
import Layout from './Layout';

const imageUrls = [
  require('../assets/welcome/avocado-svgrepo-com.png'),
  require('../assets/welcome/strawberry-juice-svgrepo-com.png'),
  require('../assets/welcome/ice-cream-svgrepo-com.png'),
  require('../assets/welcome/cake-candle-svgrepo-com.png'),
  require('../assets/welcome/cherry-svgrepo-com.png'),
  require('../assets/welcome/chicken-turkey-3-svgrepo-com.png'),
  require('../assets/welcome/chocolate-svgrepo-com.png'),
  require('../assets/welcome/food-food-and-restauran-restauran-menu-svgrepo-com.png'),
  require('../assets/welcome/food-fruit-fruits-10-svgrepo-com.png'),
  require('../assets/welcome/food-fruit-fruits-11-svgrepo-com.png'),
  require('../assets/welcome/food-fruit-fruits-12-svgrepo-com.png'),
  require('../assets/welcome/food-fruit-fruits-8-svgrepo-com.png'),
  require('../assets/welcome/fish-svgrepo-com.png'),
  require('../assets/welcome/french-fries.png'),
  require('../assets/welcome/fried-egg.png'),
  require('../assets/welcome/hamburger.png'),
  require('../assets/welcome/cookies.png'),
  require('../assets/welcome/food-fruit-fruits-4-svgrepo-com.png'),
  require('../assets/welcome/laugh (1).png'),
  require('../assets/welcome/laugh.png'),
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

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    if (!canvas || !ctx) {
      console.error('Canvas not initialized properly');
      return;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const stars = [];
    const numStars = 150;
    
    for (let i = 0; i < numStars; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
    
      if (Math.abs(x - y) < 40) {
        x += 40;
        if (x > canvas.width) {
          x = canvas.width - 40;
        }
      }
    
      stars.push({
        x,
        y,
        radius: Math.random() * 20 + 10,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        image: images[Math.floor(Math.random() * images.length)]
      });
    }
    
    const drawImages = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const transparency = 0.7; 
      ctx.globalAlpha = transparency;
    
      stars.forEach(star => {
        const { x, y, image, radius } = star;
        if (image) {
          const imageWidth = radius * 1;
          const aspectRatio = image.naturalWidth / image.naturalHeight;
          const imageHeight = imageWidth / aspectRatio;
    
          // Calculate scale factor to ensure image is drawn at a high resolution
          const scaleFactor = 1.4; // Adjust this value as needed based on image resolution
          const scaledWidth = imageWidth * scaleFactor;
          const scaledHeight = imageHeight * scaleFactor;
    
          // Draw the image at a higher resolution and then scale it down if necessary
          ctx.drawImage(
            image,
            x - scaledWidth / 1.4, 
            y - scaledHeight / 1.4, 
            scaledWidth, 
            scaledHeight
          );
    
          // Optionally, reset the transform if any other drawing operations are performed
          ctx.setTransform(1, 0, 0, 1, 0, 0); 
        }
      });
      
      ctx.globalAlpha = 1;
    };
    

    const drawLinkers = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.3;
      for (let i = 0; i < numStars; i++) {
        for (let j = i + 1; j < numStars; j++) {
          const star1 = stars[i];
          const star2 = stars[j];
          const dx = star1.x - star2.x;
          const dy = star1.y - star2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 70) {
            ctx.beginPath();
            ctx.moveTo(star1.x, star1.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.stroke();
          }
        }
      }
    };

    const moveStars = () => {
      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0 || star.x > canvas.width) {
          star.vx = -star.vx;
        }
        if (star.y < 0 || star.y > canvas.height) {
          star.vy = -star.vy;
        }
      });
    };

    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      stars.forEach(star => {
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 40) {
          const angle = Math.atan2(dy, dx);
          star.originalVx = star.vx * 1.2;
          star.originalVy = star.vy * 1.2;
          star.vx = Math.cos(angle) * 0.8;
          star.vy = Math.sin(angle) * 0.8;
          setTimeout(() => {
            star.vx = star.originalVx;
            star.vy = star.originalVy;
          }, 4000);
        }
      });
    };

    const animate = () => {
      drawImages();
      drawLinkers();
      moveStars();
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [images]);

  return (
    <Layout headingText="Nutrition Hub" headingClass="heading-background">
      <div className="welcome-body">
        <canvas id="bgCanvas" className="welcome-canvas"></canvas>
        <div className="welcome-container">
           <h1 className="welcome-titlehead">Nutrition Hub </h1>
          <div className="p-2">
            <Link
              to="/dataset"
              className="bg-emerald-800 hover:bg-blue-700 text-white py-2 px-4 rounded welcome-button"
            >
              Browse Data
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
