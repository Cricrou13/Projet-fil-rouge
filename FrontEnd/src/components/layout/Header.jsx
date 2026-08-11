import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import "./Header.scss";

export default function Header() {
    return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="Infintime" />
      </Link>

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