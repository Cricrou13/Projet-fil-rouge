import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/Logo.png";
import "./Header.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="InfinTime, retour à l'accueil" />
      </Link>

      <button
        type="button"
        className="header-burger"
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`header-nav ${menuOpen ? "open" : ""}`} aria-label="Navigation principale">
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Accueil</NavLink>
        <NavLink to="/pro/tableau-de-bord" onClick={() => setMenuOpen(false)}>Espace Pro</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        <NavLink to="/recherche" onClick={() => setMenuOpen(false)}>Recherche</NavLink>
        <NavLink to="/mon-compte" onClick={() => setMenuOpen(false)}>Mon compte</NavLink>
      </nav>
    </header>
  );
}