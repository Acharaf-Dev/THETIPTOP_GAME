import React from 'react';
import { Link } from 'react-router-dom';
import './headerFooter.css';

const Header = () => {
  return (
    <header>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"></link>
      <nav className="navbar">
        <div className="logo">
          <Link to="/"><img src="/images/logo.png" alt="Thé Tip Top" /></Link>
        </div>
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
        <ul className="nav-links">
          <li><Link to="/reglement">Règles du jeu</Link></li>
          <li><Link to="/game">Espace de jeu</Link></li>
          <li><Link to="/clientdashboard">Espace Client</Link></li>
          {/* <li><Link to="/employeedashboard">Espace Employé</Link></li> */}
          {/* <li><Link to="/admindashboard">Espace Administrateur</Link></li> */}
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Connexion</Link></li>
          <li className="profile">
            <Link to="/profil"><i className="fas fa-user-circle"></i>Profil</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
