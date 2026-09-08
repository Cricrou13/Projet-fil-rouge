import { Briefcase, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import "./Header.scss"; // On crée ce fichier juste après

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
          <Link to="/">Accueil</Link>
          <Link to="/recherche">Rechercher un pro</Link>
          <Link to="/devis">Demander un devis</Link>
          <Link to="/rdv">Mes rendez-vous</Link>
        </nav>

        {/* ACTIONS DROITE */}
        <div className="header__actions">
          <Link to="/pro/tableau-de-bord" className="btn-pro">
            <Briefcase size={18} />
            <span>Espace Pro (Artisans)</span>
          </Link>
          
          <div className="user-link">
            <User size={20} />
            <span>Mon compte</span>
          </div>

          <Link to="/reservation" className="btn-primary">
            Prendre RDV
          </Link>
        </div>

      </div>
    </header>
  );
}