import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userType = localStorage.getItem('userType');
  const profileLink =
    userType === 'admin' ? '/admindashboard' :
    userType === 'employer' ? '/employeedashboard' :
    '/clientdashboard';

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="logo">
          <Link to="/"><img src="/images/logo.png" alt="Thé Tip Top" className="h-10 md:h-12" /></Link>
        </div>

        <ul className="hidden md:flex items-center space-x-6">
          <li><Link to="/reglement" className="text-gray-600 hover:text-teal-600 transition duration-300">Règles du Jeu</Link></li>
          {isLoggedIn && (
            <>
              <li><Link to="/game" className="text-gray-600 hover:text-teal-600 transition duration-300">Espace de Jeu</Link></li>
              <li><Link to={profileLink} className="text-gray-600 hover:text-teal-600 transition duration-300">Espace Client</Link></li>
            </>
          )}
          <li><Link to="/contact" className="text-gray-600 hover:text-teal-600 transition duration-300">Contact</Link></li>

          {isLoggedIn ? (
            <li>
              <Link to={profileLink} className="flex items-center text-gray-600 hover:text-teal-600 transition duration-300 p-2 rounded-full hover:bg-gray-100" title="Mon Compte">
                <UserIcon />
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300">Connexion</Link>
            </li>
          )}
        </ul>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-teal-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><Link to="/reglement" className="text-gray-600 hover:text-teal-600 block" onClick={closeMobileMenu}>Règles</Link></li>
            {isLoggedIn && (
              <>
                <li><Link to="/game" className="text-gray-600 hover:text-teal-600 block" onClick={closeMobileMenu}>Jouer</Link></li>
                <li><Link to={profileLink} className="text-gray-600 hover:text-teal-600 block" onClick={closeMobileMenu}>Espace</Link></li>
              </>
            )}
            <li><Link to="/contact" className="text-gray-600 hover:text-teal-600 block" onClick={closeMobileMenu}>Contact</Link></li>

            {isLoggedIn ? (
              <li>
                <Link to={profileLink} className="text-gray-600 hover:text-teal-600 flex items-center space-x-1" onClick={closeMobileMenu}>
                  <UserIcon />
                  <span>Profil</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-md block text-center" onClick={closeMobileMenu}>Connexion</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;