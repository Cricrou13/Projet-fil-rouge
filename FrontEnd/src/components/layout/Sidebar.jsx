import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Calendar, Briefcase, Users, Settings, LogOut } from "lucide-react";
import logo from"../../assets/Logo.png";
import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar-logo">
        <img src={logo} alt="Infintime" />
      </Link>

      <nav className="sidebar-nav">
        <NavLink to="/pro/tableau-de-bord" end>
          <LayoutDashboard size={18} /> Tableau de bord
        </NavLink>
        <NavLink to="/pro/planning">
          <Calendar size={18} /> Planning
        </NavLink>
        <NavLink to="/pro/prestations">
          <Briefcase size={18} /> Prestations
        </NavLink>
        <NavLink to="/pro/clientele">
          <Users size={18} /> Clientèle
        </NavLink>
        <NavLink to="/pro/parametres">
          <Settings size={18} /> Paramètres
        </NavLink>
      </nav>

      <button className="sidebar-logout">
        <LogOut size={18} /> Déconnexion
      </button>
    </aside>
  );
}