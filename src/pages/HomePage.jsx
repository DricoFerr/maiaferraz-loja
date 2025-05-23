// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/HomePage.css';
import HeroBackground from '../assets/hero-background.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollToContact) {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState({}, document.title, location.pathname); 
      }
    }
  }, [location]);

  return (
    <>
      {/* SEÇÃO HERO */}
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${HeroBackground})` }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Maia Ferraz</h1>
          <p className="hero-subtitle">Nuvve Collection</p>
          <Link to="/colecoes/nuvve" className="hero-button">Conheça a Coleção Nuvve</Link>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL DA HOME: Centralizado */}
      <div className="main-content-wrapper">
        <section className="home-main-content">
          <h2>Nossas Coleções:</h2>
          <ul>
            <li>
              {/* O link agora aponta para a rota que usará a CollectionPage genérica */}
              <Link to="/colecoes/nuvve">Coleção Nuvve</Link>
            </li>
          </ul>

          <section className="featured-products">
            <h2>Destaques</h2>
            <p>Em breve, produtos em destaque aqui!</p>
          </section>

          <section className="contact-section" id="contact-section">
            <h2>Contato</h2>
            <div className="social-media-buttons">
                <a href="https://wa.me/5533999958466" target="_blank" rel="noopener noreferrer" className="social-button whatsapp">
                    <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
                </a>
                <a href="https://instagram.com/maiaferrazmodafitness" target="_blank" rel="noopener noreferrer" className="social-button instagram">
                    <FontAwesomeIcon icon={faInstagram} /> Instagram
                </a>
            </div>
            <p className="address-info"><FontAwesomeIcon icon={faMapMarkerAlt} /> Rua da Moda, 123 - Centro, Vitória - ES</p>
          </section>
        </section>
      </div>
    </>
  );
}

export default HomePage;