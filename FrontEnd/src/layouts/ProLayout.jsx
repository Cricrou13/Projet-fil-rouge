import { Outlet } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import Sidebar from "../components/layout/Sidebar";
import { getMetierConfig } from "../data/metiers"; // 1. Import de la source de vérité
import "./ProLayout.scss";

export default function ProLayout({ metier = "default" }) {
  // 2. Récupération de la configuration couleur
  const config = getMetierConfig(metier);

  return (
    <div
      className="pro-layout"
      style={{
        "--color-accent": config.color,
        "--color-accent-bg": config.bgLight,
      }}
    >
      <div className="pro-body">
        <Sidebar />
        <div className="pro-content">
          <Topbar nom="Jean" />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}