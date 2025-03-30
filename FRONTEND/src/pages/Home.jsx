import { Link } from "react-router-dom";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/style.css";

const Home = () => {
  return (
    <>
      <main className="home">
        <h1>Bienvenue sur notre plateforme de jeu concours Thé Tip Top ! 🍵</h1>
        <h2 >
          Participez au jeu-concours Thé Tip Top 100 % gagnant avec différents
          cadeaux exclusivement réservés pour vous!
        </h2>
        <img src="../images/welcome.png" alt="Thé Tip Top" className="ima-accueil"/>
      

          <div class="para">
              The Tip Top est ravi de vous inviter à participer à son jeu-concours exclusif, conçu spécialement pour vous remercier de votre fidélité et pour répondre à tous vos besoins en matière de thé haut de gamme. Découvrez une expérience unique à travers nos différentes gammes de thé, soigneusement sélectionnées pour satisfaire les amateurs les plus exigeants. 

               Reconnu parmi les leaders du marché, The Tip Top s'engage à vous offrir des produits d'une qualité exceptionnelle, combinant tradition et innovation. Ce jeu-concours est une occasion idéale pour explorer notre univers et tenter votre chance de remporter des cadeaux exclusifs. Alors, prêt à savourer la perfection dans chaque tasse de thé et à vivre une expérience inoubliable ? Participez dès maintenant !
          </div>

        

        <Link to="../Game/Game">
          <button className="btn-play">Jouer Maintenant</button>
        </Link>

        <h3>Découvrez nos lot à gagner :</h3>
        <div className="image-row">
          <div className="image-item">
            <img src="../images/lo8.jpg" alt="Image 1" className="image" />
            <p className="description">Lot 1 : Infuseur à thé</p>
          </div>
          <div className="image-item">
            <img src="../images/lo1.jpg" alt="Image 2" className="image" />
            <p className="description">Lot 2 : Boite de 100g d'un thé détox ou d'infusion</p>
          </div>
          <div className="image-item">
            <img src="../images/lo3.jpg" alt="Image 3" className="image" />
            <p className="description">Lot 3 : Boite de 100g d'un thé signature</p>
          </div>
          <div className="image-item">
            <img src="../images/lo4.jpg" alt="Image 4" className="image" />
            <p className="description">Lot 4 : Coffret découverte d'une valeur de 39€</p>
          </div>
          <div className="image-item">
            <img src="../images/lo7.jpg" alt="Image 5" className="image" />
            <p className="description">Lot 5 : Coffret découverte d'une valeur de 69€</p>
          </div>
        </div>
      </main>

      
    </>
  );
};

export default Home;
