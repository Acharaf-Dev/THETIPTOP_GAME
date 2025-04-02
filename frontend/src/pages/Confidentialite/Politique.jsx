import React from 'react';
import '../Confidentialite/Politique.css';

const Politique= () => {
  return (
    <main className='politique-confidentialite'>
      <h1>Politique de Confidentialité</h1>
      <p>
        <strong>Collecte des données :</strong> Nous collectons des données personnelles dans le cadre des commandes, des inscriptions aux newsletters et des comptes utilisateurs.
      </p>
      <p>
        <strong>Utilisation des données :</strong> Les données collectées sont utilisées pour traiter les commandes, fournir des services et personnaliser l&apos;expérience utilisateur.
      </p>
      <p>
        <strong>Partage des données :</strong> Les données peuvent être partagées avec des prestataires tiers (livraison, paiement) pour assurer le bon déroulement des commandes.
      </p>
      <p>
        <strong>Droit d&apos;accès et de rectification :</strong> Conformément à la loi informatique et libertés, vous avez un droit d&apos;accès, de rectification et de suppression des données vous concernant.
      </p>
      <p>
        <strong>Cookies :</strong> Le site utilise des cookies pour améliorer la navigation et analyser le trafic. Vous pouvez configurer votre navigateur pour refuser les cookies.
      </p>
    </main>
  );
};

export default Politique;
