// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css'; // <<<< ADICIONE ESTA LINHA

function Footer() {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} Maia Ferraz. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;