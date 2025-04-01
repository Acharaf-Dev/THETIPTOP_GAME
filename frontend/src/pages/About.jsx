import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/style.css";


const About = () => {
  return (
    <>
      
      <main className="about">
        <h1>À Propos de Thé Tip Top</h1>
          <p><strong>Notre histoire :</strong> Thé Tip Top est une entreprise passionnée par les thés bio et handmade. Depuis plusieurs années, nous créons des mélanges uniques pour offrir une expérience gustative inoubliable.</p>

          <h2>Notre mission</h2>
          <p>Offrir des thés d’exception, tout en respectant l’environnement et les traditions artisanales.</p>

          <h2>Pourquoi ce jeu-concours ?</h2>
          <p>Pour célébrer l’ouverture de notre 10ᵉ boutique à Nice, nous organisons un jeu-concours exclusif permettant de découvrir nos produits.</p>

          <h2>Nos engagements</h2>
          <ul>
              <li>🌿 Thés 100% bio et éthiques</li>
              <li>🤝 Fabrication artisanale</li>
              <li>📦 Expédition rapide et soignée</li>
              <li>💚 Satisfaction garantie</li>
              <li> Jeu 100% gagnant</li>
          </ul>

          <h2>Nous contacter</h2>
          <p>Email : <a href="contact.developeur@gmail.com">contact.developeur@gmail.com</a></p>
          <p>Téléphone : +33 1 23 45 67 89</p>
          <p>Adresse : 10 Rue de Nice, 06000 Nice</p>
      </main>
    
    </>
  );
};

export default About;
