import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header() {
    return (
    <header className="header">
      <div className="header-logo">
        <img src="" alt="Infintime" />
      </div>

      <nav className="header-nav">
        <NavLink to="/" end>Accueil</NavLink>
        <NavLink to="/pro/tableau-de-bord">Espace Pro</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/recherche">Recherche</NavLink>
        <NavLink to="/mon-compte">Mon compte</NavLink>
      </nav>
    </header>
  );
}