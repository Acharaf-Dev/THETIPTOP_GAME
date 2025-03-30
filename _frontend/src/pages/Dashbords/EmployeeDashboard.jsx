import React from 'react';
import './employee.css';

const EmployeeDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Employé</h2>
        <ul>
          <li><a href="#">Tableau de bord</a></li>
          <li><a href="#">Mes Tâches</a></li>
          <li><a href="#">Projets</a></li>
          <li><a href="#">Notifications</a></li>
          <li><a href="#">Déconnexion</a></li>
        </ul>
      </div>

      <div className="main-content">
        <header>
          <h1>Bonjour, Employé</h1>
        </header>

        <section className="tasks">
          <div className="task-card">
            <h3>Tâches en cours</h3>
            <p>Liste des tâches assignées</p>
          </div>
          <div className="task-card">
            <h3>Projets</h3>
            <p>Projets auxquels vous êtes affecté</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
