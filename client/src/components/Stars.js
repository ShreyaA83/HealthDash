import React, { useEffect, useRef } from 'react';

const Stars = ({ images, numStars, canvasClass, linkersColor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const stars = [];

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
        vx: Math.random() * 0.7 - 0.15,
        vy: Math.random() * 0.7 - 0.15,
        image: images[Math.floor(Math.random() * images.length)]
      });
    }

    const drawImages = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const transparency = 0.8;
      ctx.globalAlpha = transparency;

      stars.forEach(star => {
        const { x, y, image, radius } = star;
        if (image) {
          const imageWidth = radius * 0.8;
          const aspectRatio = image.naturalWidth / image.naturalHeight;
          const imageHeight = imageWidth / aspectRatio;

          const scaleFactor = 1.4;
          const scaledWidth = imageWidth * scaleFactor;
          const scaledHeight = imageHeight * scaleFactor;

          ctx.drawImage(
            image,
            x - scaledWidth / 1.4,
            y - scaledHeight / 1.4,
            scaledWidth,
            scaledHeight
          );

          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      });

      ctx.globalAlpha = 1;
    };

    const drawLinkers = () => {
      ctx.strokeStyle = linkersColor;
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
          star.originalVx = star.vx * 0.6;
          star.originalVy = star.vy * 0.6;
          star.vx = Math.cos(angle) * 0.8;
          star.vy = Math.sin(angle) * 0.8;
          setTimeout(() => {
            star.vx = star.originalVx;
            star.vy = star.originalVy;
          }, 2000);
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
  }, [images, numStars,linkersColor]);

  return <canvas ref={canvasRef} className={canvasClass}></canvas>;
};

export default Stars;
