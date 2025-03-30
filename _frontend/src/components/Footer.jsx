import React from "react";
import "./headerFooter.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/images/logo.png" alt="Thé Tip Top" />
        </div>
        <div className="footer-column">
          <h3>Contact</h3>
          <p>Email : <a href="mailto:contact@thetiptop.com">contact@thetiptop.com</a></p>
          <p>Téléphone : +33 1 23 45 67 89</p>
          <p>Adresse : 10 Rue de Nice, 06000 Nice</p>
        </div>
        <div className="footer-column">
          <h3>Suivez-nous</h3>
          <a href="#"><i className="fab fa-facebook"></i> Facebook</a>
          <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
          <a href="#"><i className="fab fa-tiktok"></i> TikTok</a>
        </div>
        <div className="footer-column">
        <h3>Mentions Légales</h3>
          <p><a href="#">Conditions Générales</a></p>
          <p><a href="#">Politique de Confidentialité</a></p>
          <p><a href="#">Cookies</a></p>
        </div>
        <div className="footer-column">
          <h3>Navigation</h3>
          <p><a href="#">A Propos</a></p>
          <p><a href="#">Espace de jeu</a></p>
          <p><a href="#">Règle du jeu</a></p>
          <p><a href="#">Espace client</a></p>
          <p><a href="#">Se connecter</a></p>
          <p><a href="#">Formulaire de contact</a></p>
        </div>
        <div className="footer-column">
          <h3>Newsletter</h3>
          <p>Adhérer à notre newsletters </p>
          <form >
            <input type="email" placeholder="Votre adresse email" required />
            <button type="submit">S'abonner</button>
          </form>
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
