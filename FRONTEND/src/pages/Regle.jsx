import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/style.css";

import { Link } from "react-router-dom";
const Regle = () => {
  return (
    <div>
    
      {/* Contenu des règles */}
      <center>
        <p className="regle-title">REGLES DU JEU</p>
      </center>
      <div className="reglejeu">
        <div className="groupe">
          <p className="Tittre1">1. Conditions de participation</p>
          <ul>
            <li>Le jeu est ouvert à toute personne majeure résidant en France métropolitaine.</li>
            <li>Pour participer, il faut effectuer un achat minimum de 49€ dans une boutique Thé Tip Top.</li>
            <li>Un ticket de caisse ou une facture donnant droit à un code unique (10 caractères : chiffres + lettres) est remis à chaque achat éligible.</li>
            <li>Chaque participant peut jouer autant de fois qu'il possède de codes uniques.</li>
          </ul>
        </div>
        <div className="groupe">
          <p className="Tittre1">2. Modalités de participation</p>
          <ul>
            <li>Le jeu est accessible en ligne sur le site dédié.</li>
            <li>Le participant doit s'inscrire avec son adresse e-mail ou via un compte Google ou Facebook.</li>
            <li>Il entre son code unique pour découvrir immédiatement son lot.</li>
            <li>100% des participants gagnent un lot selon la répartition ci-dessous.</li>
          </ul>
        </div>
        <div className="groupe">
          <p className="Tittre1">3. Répartitions des gains</p>
          <ul>
            <li>60% des tickets : 1 infuseur à thé.</li>
            <li>20% des tickets : 1 boîte de 100g de thé détox ou infusion.</li>
            <li>10% des tickets : 1 boîte de 100g de thé signature.</li>
            <li>6% des tickets : 1 coffret découverte (valeur 39€).</li>
            <li>4% des tickets : 1 coffret découverte (valeur 69€).</li>
          </ul>
        </div>
        <div className="groupe">
          <p className="Tittre1">4. Période et validité du jeu</p>
          <ul>
            <li>Le jeu-concours se déroule sur une période de 30 jours.</li>
            <li>Un maximum de 500 000 tickets seront distribués.</li>
            <li>Les participants ont 30 jours supplémentaires après la fin du jeu pour valider leur code et réclamer leur lot.</li>
          </ul>
        </div>
        <div className="groupe">
          <p className="Tittre1">5. Récupération des lots</p>
          <ul>
            <li>Les gains peuvent être retirés en boutique en présentant le ticket gagnant.</li>
            <li>Une option de livraison en ligne est disponible via un bon de réduction envoyé après validation du code.</li>
            <li>Les lots non réclamés dans les 30 jours suivant la fin du jeu seront considérés comme perdus.</li>
          </ul>
        </div>
      </div>

     
    </div>
    
  );
};

export default Regle;
