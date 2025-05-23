// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

import MaiaFerrazLogo from '../assets/logo1.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTshirt, faPhone, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setIsCollectionsDropdownOpen(false);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCollectionsDropdownOpen(false);
  };

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMenu();
  };

  const handleContactClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToContact: true } });
    }
    closeMenu();
  };

  const handleCollectionsMouseEnter = () => {
    setIsCollectionsDropdownOpen(true);
  };

  const handleCollectionsMouseLeave = () => {
    setIsCollectionsDropdownOpen(false);
  };

  const toggleCollectionsDropdownMobile = (e) => {
    e.preventDefault();
    setIsCollectionsDropdownOpen(prev => !prev);
  };

  const handleCollectionLinkClick = () => {
    closeMenu();
  }

  return (
    <header className="main-header">
      <nav>
        <Link to="/" className="logo" onClick={handleHomeClick}>
          <img src={MaiaFerrazLogo} alt="Logo Maia Ferraz" className="header-logo" />
        </Link>
        <div className="header-spacer"></div>
        
        <ul className="desktop-menu">
          <li>
            <Link to="/" onClick={handleHomeClick} className="nav-link-with-icon">
              <FontAwesomeIcon icon={faHome} className="nav-icon" /> Home
            </Link>
          </li>
          <li 
            className="collections-dropdown-container"
            onMouseEnter={handleCollectionsMouseEnter}
            onMouseLeave={handleCollectionsMouseLeave}
          >
            <span className="nav-link-with-icon collections-toggle">
              <FontAwesomeIcon icon={faTshirt} className="nav-icon" /> Coleções <FontAwesomeIcon icon={isCollectionsDropdownOpen ? faChevronUp : faChevronDown} className="dropdown-arrow" />
            </span>
            {isCollectionsDropdownOpen && (
              <ul className="collections-dropdown-menu">
                <li>
                  {/* Agora aponta para a rota que usa o CollectionPage genérico */}
                  <Link to="/colecoes/nuvve" onClick={handleCollectionLinkClick}>Nuvve Collection</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/#contact-section" onClick={handleContactClick} className="nav-link-with-icon">
              <FontAwesomeIcon icon={faPhone} className="nav-icon" /> Contato
            </Link>
          </li>
        </ul>

        <button className="hamburger-button" onClick={toggleMenu} aria-label="Abrir menu">
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </nav>

      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-sidebar-button" onClick={closeMenu} aria-label="Fechar menu">
          &times;
        </button>
        <ul className="sidebar-menu">
          <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
          <li>
            <a href="#" onClick={toggleCollectionsDropdownMobile} className="sidebar-link-with-icon">
              Coleções <FontAwesomeIcon icon={isCollectionsDropdownOpen ? faChevronUp : faChevronDown} className="dropdown-arrow" />
            </a>
            {isCollectionsDropdownOpen && (
              <ul className="sidebar-submenu">
                <li>
                  {/* Agora aponta para a rota que usa o CollectionPage genérico */}
                  <Link to="/colecoes/nuvve" onClick={handleCollectionLinkClick}>Nuvve Collection</Link>
                </li>
              </ul>
            )}
          </li>
          <li><Link to="/#contact-section" onClick={handleContactClick}>Contato</Link></li>
        </ul>
      </div>

      {isMenuOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

    </header>
  );
}

export default Header;