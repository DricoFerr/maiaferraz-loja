import React, { useState, useEffect } from 'react';
import '../styles/FeaturedCarousel.css'; // Importa o CSS para este componente

function FeaturedCarousel({ images }) {
  // Estado para a imagem principal (destaque) que aparece em cima
  const [mainImageIndex, setMainImageIndex] = useState(0);
  // Estado para os índices das miniaturas (as 3 fotos de baixo)
  const [thumbnailIndices, setThumbnailIndices] = useState([]);

  // Função auxiliar para calcular os índices das miniaturas
  const updateThumbnails = (currentMain, allImages) => {
    const newThumbnails = [];
    if (allImages.length <= 1) { // Se há 0 ou 1 imagem, não há miniaturas
      setThumbnailIndices([]);
      return;
    }
    
    // Pega as 3 próximas imagens na sequência, ciclando o array
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (currentMain + i) % allImages.length;
      newThumbnails.push(nextIndex);
    }
    setThumbnailIndices(newThumbnails);
  };

  // Efeito que é executado na montagem do componente e quando as 'images' mudam
  useEffect(() => {
    if (!images || images.length === 0) {
      setMainImageIndex(0);
      setThumbnailIndices([]);
      return;
    }
    // Inicializa a imagem principal como a primeira (índice 0)
    setMainImageIndex(0);
    // Inicializa as miniaturas com base na primeira imagem principal
    updateThumbnails(0, images);
  }, [images]); // A dependência [images] faz com que este efeito seja re-executado se o array de imagens mudar

  // Lida com o clique em uma miniatura
  const handleThumbnailClick = (clickedIndex) => {
    setMainImageIndex(clickedIndex); // A imagem clicada se torna a principal
    updateThumbnails(clickedIndex, images); // Recalcula as miniaturas a partir da nova imagem principal
  };

  // Renderiza um placeholder se não houver imagens
  if (!images || images.length === 0) {
    return <div className="featured-carousel-placeholder">Nenhuma imagem para exibir.</div>;
  }

  // Renderiza apenas a imagem principal se houver apenas 1 imagem
  if (images.length === 1) {
    return (
      <div className="featured-carousel-container">
        <div className="main-image-display">
          <img src={images[0]} alt="Imagem em destaque" />
        </div>
      </div>
    );
  }

  return (
    <div className="featured-carousel-container">
      {/* Imagem principal (destaque) */}
      <div className="main-image-display">
        <img src={images[mainImageIndex]} alt="Imagem em destaque" />
      </div>

      {/* Grid das miniaturas (somente se houver mais de 1 imagem) */}
      {images.length > 1 && (
        <div className="thumbnail-grid">
          {thumbnailIndices.map((thumbIndex) => (
            <div
              key={thumbIndex} // Usamos o índice da imagem original como key
              className={`thumbnail-item ${thumbIndex === mainImageIndex ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(thumbIndex)}
            >
              <img src={images[thumbIndex]} alt={`Miniatura ${thumbIndex + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedCarousel;