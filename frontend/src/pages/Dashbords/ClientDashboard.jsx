import React from 'react';
import './client.css';

const ClientDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Client</h2>
        <ul>
          <li><a href="#">Tableau de bord</a></li>
          <li><a href="#">Mes Gains</a></li>
          <li><a href="#">Mes Tickets</a></li>
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
            <h3>Dernier jeu</h3>
            <p>Suivi de vos dernières participations</p>
          </div>
          <div className="order-card">
            <h3>Lots</h3>
            <p>Liste de vos lots gagnés</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClientDashboard;
