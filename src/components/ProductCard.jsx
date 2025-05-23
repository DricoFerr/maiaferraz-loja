// src/components/ProductCard.jsx
import React from 'react';
import '../styles/ProductCard.css'; // <<<< MUDANÇA AQUI: Caminho atualizado

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{product.price}</p>
      <button>Ver Detalhes</button>
    </div>
  );
}

export default ProductCard;