import React from 'react';
import './admin.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li><a href="#">Tableau de bord</a></li>
          <li><a href="#">Utilisateurs</a></li>
          <li><a href="#">Statistiques</a></li>
          <li><a href="#">Paramètres</a></li>
          <li><a href="#">Déconnexion</a></li>
        </ul>
      </div>

      <div className="main-content">
        <header>
          <h1>Bienvenue, Admin</h1>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Utilisateurs</h3>
            <p>Gestion des utilisateurs actifs et inactifs</p>
          </div>
          <div className="card">
            <h3>Statistiques</h3>
            <p>Vue d'ensemble des statistiques du projet</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
