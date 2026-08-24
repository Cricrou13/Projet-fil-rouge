import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Calendar, Briefcase, Users, Settings, LogOut, Menu, X } from "lucide-react";
import logo from "../../assets/Logo.png";
import "./Sidebar.scss";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="sidebar-burger"
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="sidebar-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="InfinTime, retour à l'accueil" />
        </Link>

        <nav className="sidebar-nav" aria-label="Navigation professionnelle">
          <NavLink to="/pro/tableau-de-bord" end onClick={() => setMenuOpen(false)}>
            <LayoutDashboard size={18} aria-hidden="true" /> Tableau de bord
          </NavLink>
          <NavLink to="/pro/planning" onClick={() => setMenuOpen(false)}>
            <Calendar size={18} aria-hidden="true" /> Planning
          </NavLink>
          <NavLink to="/pro/prestations" onClick={() => setMenuOpen(false)}>
            <Briefcase size={18} aria-hidden="true" /> Prestations
          </NavLink>
          <NavLink to="/pro/clientele" onClick={() => setMenuOpen(false)}>
            <Users size={18} aria-hidden="true" /> Clientèle
          </NavLink>
          <NavLink to="/pro/parametres" onClick={() => setMenuOpen(false)}>
            <Settings size={18} aria-hidden="true" /> Paramètres
          </NavLink>
        </nav>

        <button type="button" className="sidebar-logout">
          <LogOut size={18} aria-hidden="true" /> Déconnexion
        </button>
      </aside>
    </>
  );
}