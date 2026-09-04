import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Calendar, User, ArrowRight } from "lucide-react";
import "./Header.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 1. Bandeau supérieur d'annonce (Top bar) */}
      <div className="top-banner">
        <div className="top-banner__container">
          <span className="top-banner__tag">Nouveau</span>
          <span className="top-banner__text">
            Vous êtes artisan ou indépendant ? Développez votre clientèle avec InfinTime.
          </span>
          <Link to="/pro/tableau-de-bord" className="top-banner__link">
            <span>Découvrir l'Espace Pro</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* 2. Header principal avec Logo stylisé et Navigation */}
      <header className="header">
        <div className="header__container">
          
          {/* Logo stylisé InfinTime */}
          <Link to="/" className="header__logo" onClick={() => setMenuOpen(false)}>
            <div className="logo-icon">∞</div>
            <div className="logo-text-wrap">
              <span className="logo-title">
                Infin<span className="logo-accent">Time</span>
              </span>
              <span className="logo-baseline">Réservation & Gestion Pros</span>
            </div>
          </Link>

          {/* Bouton burger mobile */}
          <button
            type="button"
            className="header-burger"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation centrale */}
          <nav className={`header-nav ${menuOpen ? "open" : ""}`} aria-label="Navigation principale">
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>
              Accueil
            </NavLink>
            <NavLink to="/recherche" onClick={() => setMenuOpen(false)}>
              Rechercher un pro
            </NavLink>
            <a href="/#how-it-works" onClick={() => setMenuOpen(false)}>
              Comment ça marche
            </a>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
            <NavLink to="/pro/tableau-de-bord" className="nav-pro-badge" onClick={() => setMenuOpen(false)}>
              💼 Espace Pro
            </NavLink>
          </nav>

          {/* Actions à droite */}
          <div className="header-actions">
            <NavLink to="/mon-compte" className="btn-account">
              <User size={15} />
              <span>Mon compte</span>
            </NavLink>
            <Link to="/recherche" className="btn-cta-rdv">
              <Calendar size={15} />
              <span>Prendre RDV</span>
            </Link>
          </div>

        </div>
      </header>
    </>
  );
}