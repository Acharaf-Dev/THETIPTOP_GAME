import { Link } from 'react-router-dom';
import React from 'react';
import '../Home/Home.css';

const Home = () => {
  return (
    <main className='home'>
      <h1>Bienvenue sur notre plateforme de jeu concours Thé Tip Top ! 🍵</h1>
      <h2>
        Participez au jeu-concours Thé Tip Top 100 % gagnant avec différents
        cadeaux exclusivement réservés pour vous !
      </h2>
      <img src='../images/welcome.png' alt='Thé Tip Top' className='ima-accueil' />
      
      <div className='para'>
        <p>
          The Tip Top est ravi de vous inviter à participer à son jeu-concours exclusif, conçu spécialement pour vous remercier de votre fidélité et pour répondre à tous vos besoins en matière de thé haut de gamme. Découvrez une expérience unique à travers nos différentes gammes de thé, soigneusement sélectionnées pour satisfaire les amateurs les plus exigeants.
        </p>
        <p>
          Reconnu parmi les leaders du marché, Thé Tip Top s&apos;engage à vous offrir des produits d&apos;une qualité exceptionnelle, combinant tradition et innovation. Ce jeu-concours est une occasion idéale pour explorer notre univers et tenter votre chance de remporter des cadeaux exclusifs. Alors, prêt à savourer la perfection dans chaque tasse de thé et à vivre une expérience inoubliable ? Participez dès maintenant !
        </p>
      </div>
      
      <Link to='/game'>
        <button className='btn-play'>Jouer Maintenant</button>
      </Link>
      
      <h3>Découvrez nos lots à gagner :</h3>
      <div className='image-row'>
        {[
          { src: '../images/lo8.jpg', text: 'Lot 1 : 1 Infuseur à thé' },
          { src: '../images/lo1.jpg', text: 'Lot 2 : 1 Boîte de 100g de thé détox ou infusion' },
          { src: '../images/lo3.jpg', text: 'Lot 3 : 1 Boîte de 100g de thé signature' },
          { src: '../images/lo4.jpg', text: 'Lot 4 : 1 Coffret découverte de valeur de 39€' },
          { src: '../images/lo7.jpg', text: 'Lot 5 : 1 Coffret découverte de valeur de 69€' }
        ].map((item, index) => (
          <div className='image-item' key={index}>
            <img src={item.src} alt={item.text} className='image' />
            <p className='description'>{item.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
