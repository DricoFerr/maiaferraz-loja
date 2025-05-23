// src/components/InfiniteCarousel.jsx
import React, { useEffect, useRef } from 'react';
import '../styles/InfiniteCarousel.css';

function InfiniteCarousel({ images, imagesPerView = 3, animationSpeed = 4000 }) { // animationSpeed agora é em segundos para o CSS
  const carouselWrapperRef = useRef(null);

  const hasImages = images && images.length > 0;
  
  // Duplicamos MAIS vezes para um loop extra suave, evitando o "teletransporte" JS visível.
  // Ex: 5 cópias: [img1, img2, img3, img1, img2, img3, img1, img2, img3, img1, img2, img3, img1, img2, img3]
  // O loop ocorrerá entre o 2º e 3º conjunto.
  const numCopies = 5; // Ajuste este número para mais ou menos cópias se precisar de um buffer maior/menor
  const duplicatedImages = hasImages 
    ? Array(numCopies).fill(images).flat()
    : [];

  const numOriginalImages = images ? images.length : 1;

  useEffect(() => {
    if (carouselWrapperRef.current) {
      // Passa variáveis CSS para o InfiniteCarousel.css
      carouselWrapperRef.current.style.setProperty('--images-per-view', imagesPerView);
      carouselWrapperRef.current.style.setProperty('--animation-speed', `${animationSpeed}s`);
      carouselWrapperRef.current.style.setProperty('--num-original-images', numOriginalImages);
      carouselWrapperRef.current.style.setProperty('--num-copies', numCopies); // Nova variável para o CSS
    }
  }, [imagesPerView, animationSpeed, numOriginalImages, numCopies]);

  if (!hasImages) {
    return <p>Nenhuma imagem para exibir no carrossel.</p>;
  }

  return (
    <div 
      className="carousel-infinite-wrapper"
      ref={carouselWrapperRef} // Adiciona a ref ao wrapper
      style={{
        '--carousel-height': '650px', // Altura padrão do carrossel para desktop, pode ser ajustado aqui ou no CSS
      }}
    >
      <div className="carousel-slide-container">
        {duplicatedImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Carousel slide ${index}`} 
            className="carousel-image" 
          />
        ))}
      </div>
    </div>
  );
}

export default InfiniteCarousel;