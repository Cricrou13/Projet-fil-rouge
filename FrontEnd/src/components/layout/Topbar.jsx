import "./Topbar.scss";

export default function Topbar({ nom = "Utilisateur" }) {
  return (
    <div className="topbar">
      <span>Bonjour {nom}</span>
    </div>
  );
}