import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
import Layout from './Layout';

const Welcome = () => {
  useEffect(() => {
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
    const numStars = 450;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        color: '#D3D3D3',
        originalColor: '#D3D3D3', // Store original color
        // currentColor: '#D3D3D3', // Current color that may change
        opacity: Math.random(),
        twinklingSpeed: Math.random() * 0.09,
        colorChangeProbability: 0.001, 
      });
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`; // Use opacity for twinkling effect
        ctx.fillStyle = star.currentColor; // Use currentColor for the star
        ctx.fill();
      }
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
          if (distance < 100) { // Adjust this distance as needed
            ctx.beginPath();
            ctx.moveTo(star1.x, star1.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.stroke();
          }
        }
      }
    };

    const moveStars = () => {
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > canvas.width) {
          star.vx = -star.vx;
        }
        if (star.y < 0 || star.y > canvas.height) {
          star.vy = -star.vy;
        }
      }
    };

    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 40) {
          const angle = Math.atan2(dy, dx);
          star.originalVx = star.vx * 0.8; // Store original velocities
          star.originalVy = star.vy * 0.8;
          star.vx = Math.cos(angle) * 2;
          star.vy = Math.sin(angle) * 2;
          const randomColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255},0.8)`;
          star.currentColor = randomColor;

          setTimeout(() => {
            star.currentColor = '#D3D3D3';
            star.vx = star.originalVx; // Reset velocities
            star.vy = star.originalVy;
          }, 6000);
        }
      }
    };

    const resetStars = () => {
      const resetInterval = 1;
      const numResetSteps = 7;
      const starsPerStep = Math.ceil(numStars / numResetSteps);

      function resetStarsStep() {
        for (let i = 0; i < starsPerStep; i++) {
          const index = Math.floor(Math.random() * numStars);
          stars[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1 + 1,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            color: '#D3D3D3',
            originalVx: 0,
            originalVy: 0,
          };
        }


        if (stars.some(star => star.color !== '#D3D3D3')) {
          setTimeout(resetStarsStep, resetInterval);
        }
        setTimeout(() => {
          stars.currentColor ='#D3D3D3'
        },8000
      )
      }

      resetStarsStep();
    };

    resetStars();

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      drawStars();
    
      // Update star opacity and color for twinkling effect
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.opacity += star.twinklingSpeed;    
        if (star.opacity > 1) {
          star.twinklingSpeed *= -1; // Reverse twinkling direction
        }
        if (star.opacity < 0) {
          star.opacity = 0; // Ensure opacity doesn't go negative
          star.twinklingSpeed *= -1; // Reverse twinkling direction
        }
    
        // Randomly change color with a certain probability
        if (Math.random() < star.colorChangeProbability) {
          star.currentColor = `rgb(255,215,0,0.6)`;
        }

        star.opacity = Math.max(0, Math.min(1, star.opacity));
      }
    
      drawLinkers();
      moveStars();
      requestAnimationFrame(animate);
    };
    
    
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <Layout>
        <div className="welcome-body">
          <div className="welcome-container">
            <h1 className="welcome-titlehead">Welcome</h1>
            <div className="p-2">
              <Link
                to="/dataset"
                className="bg-gray-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Browse Data
              </Link>
            </div>
          </div>
          <canvas id="bgCanvas" className="welcome-canvas"></canvas>
        </div>
    </Layout>
  );
};

export default Welcome;
