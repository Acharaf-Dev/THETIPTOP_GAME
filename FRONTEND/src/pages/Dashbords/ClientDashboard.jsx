import React from 'react';
import './client.css';

const ClientDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Client</h2>
        <ul>
          <li><a href="#">Tableau de bord</a></li>
          <li><a href="#">Mes Commandes</a></li>
          <li><a href="#">Mes Produits</a></li>
          <li><a href="#">Support</a></li>
          <li><a href="#">Déconnexion</a></li>
        </ul>
      </div>

      <div className="main-content">
        <header>
          <h1>Bienvenue, Client</h1>
        </header>

        <section className="orders">
          <div className="order-card">
            <h3>Commandes récentes</h3>
            <p>Suivi de vos dernières commandes</p>
          </div>
          <div className="order-card">
            <h3>Produits</h3>
            <p>Liste de vos produits achetés</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClientDashboard;
