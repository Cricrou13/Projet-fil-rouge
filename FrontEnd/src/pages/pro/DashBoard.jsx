import StatCard from "../../components/pro/StatCard";
import "./Dashboard.scss";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="stats-grid">
        <StatCard 
          title="Clients" 
          value="5 clients" 
          subtitle="Journée complète" 
          type="positive" 
        />
        <StatCard 
          title="Total" 
          value="28" 
          subtitle="+4 hier" 
          type="info" 
        />
        <StatCard 
          title="CA estimé (mois)" 
          value="3 450 €" 
          subtitle="+14% vs N-1" 
          type="positive" 
        />
        <StatCard 
          title="Note clients" 
          value="4.9 / 5" 
          subtitle="★ 42 avis" 
          type="neutral" 
        />
      </div>

      {/* Reste de ton dashboard (tableaux, etc.) */}
    </div>
  );
}