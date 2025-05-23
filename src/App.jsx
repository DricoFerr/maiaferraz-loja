// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';

import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  const [nuvveCollectionImages, setNuvveCollectionImages] = useState([]);

  useEffect(() => {
    const modules = import.meta.glob('./assets/destaquenuvve/*.{jpg,jpeg,png,gif,webp}', { eager: true });

    const loadedImages = Object.values(modules).map(mod => mod.default);
    setNuvveCollectionImages(loadedImages);
  }, []);

  return (
    <Router>
      <div className="animated-intro-bar"></div> {/* <<<< ADICIONE ESTE DIV AQUI */}
      <Header /> 
      <div className="app-content-wrapper">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/colecoes/nuvve" 
              element={
                <CollectionPage 
                  collectionTitle="NUVVE COLLECTION"
                  images={nuvveCollectionImages} 
                >
                  <p>Descubra a inovação e o estilo da nossa exclusiva Nuvve Collection. Cada peça é pensada para trazer modernidade e conforto ao seu dia a dia.</p>
                  <p>Explore a fusão perfeita entre design contemporâneo e tecidos de alta qualidade, garantindo não apenas beleza, mas também uma experiência de uso excepcional.</p>
                </CollectionPage>
              } 
            />
          </Routes>
        </main>
      </div>
      <Footer /> 
    </Router>
  );
}

export default App;