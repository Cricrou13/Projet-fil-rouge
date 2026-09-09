import { Calendar, Bell, ChevronRight } from "lucide-react";
import StatCard from "../../components/pro/StatCard";
import "./DashBoard.scss";

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

{/* SECTION PLANNING DU JOUR */}

      <section className="dashboard-section">
        <div className="section-header">
          <h3><Calendar size={20} className="icon-blue" /> Planning du jour (Aujourd'hui)</h3>
          <span className="count-label">5 interventions prévues</span>
        </div>
        
        <div className="appointment-list">
          <div className="appointment-item">
            <div className="appointment-item__time">09:00</div>
            <div className="appointment-item__info">
              <h4>Coupe classique + Barbe</h4>
              <p>Client : Marc D. (06 78 90 12 34)</p>
            </div>
            <div className="appointment-item__price">35 €</div>
          </div>

          <div className="appointment-item highlight">
            <div className="appointment-item__time">14:30</div>
            <div className="appointment-item__info">
              <h4>Coupe classique homme</h4>
              <p>Client : Christophe R. <span className="badge-new">(Nouveau)</span></p>
            </div>
            <div className="appointment-item__price">25 €</div>
          </div>
        </div>
      </section>

      {/* 3. SECTION DEVIS */}
      <section className="dashboard-section section-quotes">
        <div className="section-header">
          <h3><Bell size={20} className="icon-orange" /> Demandes de devis (2)</h3>
        </div>
        
        <div className="quote-card">
          <div className="quote-card__content">
            <h4>Prestation mariage (3 pers.)</h4>
            <p>Reçu il y a 2h</p>
          </div>
          <button className="btn-orange">Consulter</button>
        </div>
      </section>
    </div>
  );
}
