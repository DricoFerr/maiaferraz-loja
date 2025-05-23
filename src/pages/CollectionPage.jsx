import React from 'react';
import '../styles/CollectionPage.css';
import ProductCard from '../components/ProductCard';
import '../styles/ProductCardsSection.css';
import FeaturedCarousel from '../components/FeaturedCarousel';

// <<<<<< CONFIGURAÇÕES PARA IMAGENS ALEATÓRIAS (mantém as existentes para ProductCards) <<<<<<
const macaquinhoMacacaoModules = import.meta.glob(
  '../assets/MacaquinhoEMacacao/*.{png,jpg,jpeg,webp}',
  { eager: true, as: 'url' }
);
const topBermudaModules = import.meta.glob(
  '../assets/TopEBermuda/*.{png,jpg,jpeg,webp}',
  { eager: true, as: 'url' }
);
const topCalcaModules = import.meta.glob(
  '../assets/TopECalca/*.{png,jpg,jpeg,webp}',
  { eager: true, as: 'url' }
);

const macaquinhoMacacaoUrls = Object.values(macaquinhoMacacaoModules);
const topBermudaUrls = Object.values(topBermudaModules);
const topCalcaUrls = Object.values(topCalcaModules);

function getRandomImageUrl(urls) {
  if (urls.length === 0) {
    console.warn("Nenhuma imagem encontrada para esta categoria. Verifique o caminho e os tipos de arquivo.");
    return '';
  }
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
}
// >>>>>> FIM DAS CONFIGURAÇÕES >>>>>>

// <<<< NOVA IMPORTAÇÃO PARA AS IMAGENS DO CARROSSEL DE DESTAQUE >>>>
const destaqueNuvveModules = import.meta.glob(
  '../assets/destaquenuvve/*.{png,jpg,jpeg,webp}', // Caminho para a nova pasta
  { eager: true, as: 'url' }
);
const destaqueNuvveUrls = Object.values(destaqueNuvveModules);
// <<<< FIM DA NOVA IMPORTAÇÃO >>>>


function CollectionPage({ collectionTitle, images, children }) {
  const conjuntoProducts = [
    {
      id: 'conjunto-1',
      name: 'Macaquinho e Macacão Esportivo',
      price: 'R$ 189,90',
      imageUrl: getRandomImageUrl(macaquinhoMacacaoUrls),
    },
    {
      id: 'conjunto-2',
      name: 'Conjunto Top e Bermuda Fitness',
      price: 'R$ 129,90',
      imageUrl: getRandomImageUrl(topBermudaUrls),
    },
    {
      id: 'conjunto-3',
      name: 'Kit Top e Calça de Treino',
      price: 'R$ 219,90',
      imageUrl: getRandomImageUrl(topCalcaUrls),
    },
  ];

  // <<<< AGORA, O CARROSSEL DE DESTAQUE USA APENAS AS IMAGENS DA NOVA PASTA >>>>
  const featuredCarouselImages = destaqueNuvveUrls;


  return (
    <div className="collection-page-container">
      <h1 className="collection-page-title">{collectionTitle}</h1>

      {featuredCarouselImages.length > 0 && (
        <FeaturedCarousel images={featuredCarouselImages} />
      )}

      <section className="product-cards-section">
        <h2>Conjuntos</h2>
        <div className="product-cards-container">
          {conjuntoProducts.map(product => (
            <div key={product.id} className="product-card-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <div className="collection-page-content">
        {children || <p>Em breve, mais produtos para esta coleção!</p>}
      </div>
    </div>
  );
}
export default CollectionPage;