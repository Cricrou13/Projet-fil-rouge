import { Briefcase, User, Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss"; 

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        
        {/* LOGO */}
        <Link to="/" className="header__logo">
          <div className="logo-box">∞</div>
          <span className="logo-text">Infin<span className="blue">Time</span></span>
        </Link>

        {/* NAVIGATION CENTRALE */}
        <nav className="header__nav">
          <NavLink to="/"end>Accueil</NavLink>
          <NavLink to="/recherche">Rechercher un pro</NavLink>
          <NavLink to="/devis">Demander un devis</NavLink>
          <NavLink to="/mes-rendez-vous">Mes rendez-vous</NavLink>
        </nav>

        {/* ACTIONS DROITE */}
        <div className="header__actions">
          <Link to="/pro/tableau-de-bord" className="btn-pro">
            <Briefcase size={18} />
            <span>Espace Pro (Artisans)</span>
          </Link>
          
          <Link to="/connexion" className="user-link">
            <User size={20} />
            <span>Mon compte</span>
          </Link>

          <Link to="/reservation" className="btn-primary">
            Prendre RDV
          </Link>
        </div>

      </div>
    </header>
  );
}