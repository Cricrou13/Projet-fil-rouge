import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        
        {/* Logo */}
        <Link to="/" className="header__logo">
          <div className="logo-box">∞</div>
          <div className="logo-text">
            Infin<span className="blue">Time</span>
          </div>
        </Link>

        {/* Bouton Burger Mobile */}
        <button className="header__burger" onClick={toggleMenu} aria-label="Menu">
          ☰
        </button>

        {/* Menu & Actions */}
        <div className={`header__menu ${isMenuOpen ? 'is-open' : ''}`}>
          
          <nav className="header__nav">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
            <Link to="/recherche" onClick={() => setIsMenuOpen(false)}>Rechercher un professionnel</Link>
            {user && user.role === 'client' && (
              <Link to="/mes-rendez-vous" onClick={() => setIsMenuOpen(false)}>Mes rendez-vous</Link>
            )}
          </nav>

          <div className="header__actions">
            {!user ? (
              <>
                <Link to="/pro/connexion" className="btn-pro" onClick={() => setIsMenuOpen(false)}>
                  Espace pro
                </Link>
                <Link to="/connexion" className="btn-primary" onClick={() => setIsMenuOpen(false)}>
                  Connexion
                </Link>
              </>
            ) : (
              <>
                {user.role === 'artisan' && (
                  <Link to="/pro/tableau-de-bord" className="btn-pro" onClick={() => setIsMenuOpen(false)}>
                    Tableau de bord
                  </Link>
                )}
                <span className="user-link">
                  👤 {user.prenom} {user.nom}
                </span>
                <button onClick={handleLogout} className="btn-pro" style={{ color: '#ef4444' }}>
                  Déconnexion
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}