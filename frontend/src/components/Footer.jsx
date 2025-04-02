import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './headerFooter.css';

const Footer = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [followUsOpen, setFollowUsOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/images/logo.png" alt="Thé Tip Top" />
        </div>
        <div className="footer-column">
          <h3 onClick={() => setContactOpen(!contactOpen)}>Contact</h3>
          {contactOpen && (
            <div className="footer-content">
              <p>Email : <a href="mailto:contact@thetiptop.com">contact@thetiptop.com</a></p>
              <p>Téléphone : +33 1 23 45 67 89</p>
              <p>Adresse : 10 Rue de Nice, 06000 Nice</p>
            </div>
          )}
        </div>
        <div className="footer-column">
          <h3 onClick={() => setFollowUsOpen(!followUsOpen)}>Suivez-nous</h3>
          {followUsOpen && (
            <div className="footer-content">
              <a href="#"><i className="fab fa-facebook"></i> Facebook</a>
              <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
              <a href="#"><i className="fab fa-tiktok"></i> TikTok</a>
            </div>
          )}
        </div>
        <div className="footer-column">
          <h3 onClick={() => setLegalOpen(!legalOpen)}>Mentions Légales</h3>
          {legalOpen && (
            <div className="footer-content">
              <p><Link to="/cgu">CGU</Link></p>
              <p><Link to="/cgv">CGV</Link></p>
              <p><Link to="/mention">Mentions Légales</Link></p>
              <p><Link to="/politique">Politique de Confidentialité</Link></p>
              <p><Link to="/cookies">Cookies</Link></p>
            </div>
          )}
        </div>
        <div className="footer-column">
          <h3 onClick={() => setNavigationOpen(!navigationOpen)}>Navigation</h3>
          {navigationOpen && (
            <div className="footer-content">
              <p><Link to="/about">A Propos</Link></p>
              <p><Link to="/game">Espace de jeu</Link></p>
              <p><Link to="/reglement">Règle du jeu</Link></p>
              <p><Link to="/clientDashboard">Espace client</Link></p>
              <p><Link to="/login">Se connecter</Link></p>
              <p><Link to="/contact">Formulaire de contact</Link></p>
            </div>
          )}
        </div>
        <div className="footer-column">
          <h3 onClick={() => setNewsletterOpen(!newsletterOpen)}>Newsletter</h3>
          {newsletterOpen && (
            <div className="footer-content">
              <p>Adhérer à notre newsletters</p>
              <form>
                <input type="email" placeholder="Votre adresse email" required />
                <button type="submit">S&apos;abonner</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <center>
        <div className="footer-bottom">
          <p>&copy; 2025 Thé Tip Top - Agence Furious Ducks - Ceci est un site fictif. Projet étudiant</p>
        </div>
      </center>
    </footer>
  );
};

export default Footer;
