import { Outlet, Navigate } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import Sidebar from "../components/layout/Sidebar";
import { getMetierConfig } from "../data/metiers";
import { useAuth } from "../context/AuthContext";
import "./ProLayout.scss";

export default function ProLayout() {
  const { proMetier, proNom } = useAuth();

  // Si personne n'est connecté, on empêche l'accès à l'espace pro
  if (!proMetier) {
    return <Navigate to="/connexion" replace />;
  }

  const config = getMetierConfig(proMetier);

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
          <Topbar nom={proNom || "Pro"} />
          <main>
            <Outlet context={{ metier: proMetier }} />
          </main>
        </div>
      </div>
    </div>
  );
}