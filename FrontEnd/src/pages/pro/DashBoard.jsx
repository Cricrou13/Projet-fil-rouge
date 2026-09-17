import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Phone, 
  TrendingUp, 
  Users, 
  Star, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  ChevronRight,
  ArrowUpRight,
  Check
} from "lucide-react";
import StatCard from "../../components/pro/StatCard";
import "./DashBoard.scss";
// Données initiales des rendez-vous du jour
const initialDayRdv = [
  {
    id: 1,
    heure: "09:00",
    client: "Marc Dupont",
    telephone: "06 78 90 12 34",
    prestation: "Coupe classique + Barbe",
    prix: "35 €",
    statut: "termine", // "termine" | "confirme" | "en_attente"
    isNew: false,
  },
  {
    id: 2,
    heure: "11:15",
    client: "Thomas Edouard",
    telephone: "06 12 34 56 78",
    prestation: "Taille de barbe sculptée",
    prix: "20 €",
    statut: "confirme",
    isNew: false,
  },
  {
    id: 3,
    heure: "14:30",
    client: "Christophe Ramirez",
    telephone: "06 99 88 77 66",
    prestation: "Coupe homme + Soin cuir chevelu",
    prix: "28 €",
    statut: "confirme",
    isNew: true, // Nouveau client !
  },
  {
    id: 4,
    heure: "16:45",
    client: "Julien Martin",
    telephone: "06 55 44 33 22",
    prestation: "Coupe ciseaux dégradé américain",
    prix: "30 €",
    statut: "en_attente",
    isNew: false,
  },
];
// Devis initiaux reçus
const initialQuotes = [
  {
    id: 101,
    client: "Valérie Bertrand",
    demande: "Prestation mariage & coiffure événementielle (4 personnes)",
    date: "Reçu il y a 2h",
    budget: "~ 180 €",
  },
  {
    id: 102,
    client: "Fabien Garcia",
    demande: "Forfait coiffure entreprise / shooting photo",
    date: "Reçu hier",
    budget: "~ 95 €",
  },
];
export default function Dashboard() {
  const [appointments, setAppointments] = useState(initialDayRdv);
  const [quotes, setQuotes] = useState(initialQuotes);
  const [notes, setNotes] = useState([
    "Ne pas oublier de commander les cires coiffantes chez le fournisseur.",
    "Rappeler M. Jacquot pour confirmation du métrage vendredi.",
  ]);
  const [newNoteInput, setNewNoteInput] = useState("");
  const [notification, setNotification] = useState(null);
  // Valider un RDV en attente
  const handleValidate = (id, client) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, statut: "confirme" } : app))
    );
    triggerNotif(`Le rendez-vous de ${client} a été validé !`);
  };
  // Marquer un RDV comme terminé
  const handleComplete = (id, client) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, statut: "termine" } : app))
    );
    triggerNotif(`Intervention avec ${client} marquée comme terminée.`);
  };
  // Traiter un devis (Accepter)
  const handleAcceptQuote = (id, client) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    triggerNotif(`Devis de ${client} accepté et transféré au planning !`);
  };
  // Refuser un devis
  const handleDeclineQuote = (id) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    triggerNotif(`Demande de devis déclinée.`);
  };
  // Ajouter une note rapide
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    setNotes((prev) => [...prev, newNoteInput.trim()]);
    setNewNoteInput("");
  };
  // Supprimer une note
  const handleDeleteNote = (index) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };
  const triggerNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };
  return (
    <div className="dashboard-modern">
      {/* NOTIFICATION D'ACTION EN DIRECT */}
      {notification && (
        <div className="dashboard-toast">
          <CheckCircle2 size={18} />
          <span>{notification}</span>
        </div>
      )}
      {/* 1. GRILLE DE STATISTIQUES */}
      <div className="stats-grid">
        <StatCard 
          title="Interventions du jour" 
          value="4 RDV" 
          subtitle="Journée complète (100%)" 
          type="positive" 
        />
        <StatCard 
          title="Chiffre d'Affaires (Mois)" 
          value="3 850 €" 
          subtitle="+14% vs mois précédent" 
          type="positive" 
        />
        <StatCard 
          title="Devis en attente" 
          value={`${quotes.length} devis`} 
          subtitle="Réponse recommandée sous 24h" 
          type={quotes.length > 0 ? "warning" : "info"} 
        />
        <StatCard 
          title="Note clients certifiée" 
          value="4.9 / 5" 
          subtitle="★ 42 avis certifiés" 
          type="neutral" 
        />
      </div>
      {/* 2. DISPOSITION EN 2 COLONNES */}
      <div className="dashboard-main-grid">
        {/* COLONNE PRINCIPALE : PLANNING DU JOUR + DEVIS */}
        <div className="dashboard-left-col">
          {/* PLANNING DU JOUR INTERACTIF */}
          <section className="dash-card">
            <div className="dash-card__header">
              <div className="title-wrap">
                <Calendar size={20} className="icon-blue" />
                <h3>Planning du jour (Aujourd'hui)</h3>
              </div>
              <Link to="/pro/planning" className="link-view-all">
                <span>Voir la semaine</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="appointment-list-modern">
              {appointments.map((rdv) => (
                <div 
                  key={rdv.id} 
                  className={`appointment-row ${rdv.statut === "termine" ? "is-finished" : ""}`}
                >
                  <div className="row-time">
                    <Clock size={15} />
                    <span>{rdv.heure}</span>
                  </div>
                  <div className="row-info">
                    <div className="client-line">
                      <strong>{rdv.client}</strong>
                      {rdv.isNew && <span className="badge-new-client">Nouveau</span>}
                    </div>
                    <span className="service-name">{rdv.prestation}</span>
                  </div>
                  <div className="row-price">
                    {rdv.prix}
                  </div>
                  <div className="row-actions">
                    <a href={`tel:${rdv.telephone.replace(/\s+/g, '')}`} className="btn-call" title="Appeler">
                      <Phone size={14} />
                    </a>
                    {rdv.statut === "en_attente" && (
                      <button 
                        type="button" 
                        className="btn-action-validate"
                        onClick={() => handleValidate(rdv.id, rdv.client)}
                        title="Valider le rendez-vous"
                      >
                        Valider
                      </button>
                    )}
                    {rdv.statut === "confirme" && (
                      <button 
                        type="button" 
                        className="btn-action-finish"
                        onClick={() => handleComplete(rdv.id, rdv.client)}
                        title="Marquer comme fait"
                      >
                        Terminer
                      </button>
                    )}
                    {rdv.statut === "termine" && (
                      <span className="badge-done">
                        <Check size={14} /> Terminé
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* DEMANDES DE DEVIS À TRAITER */}
          <section className="dash-card">
            <div className="dash-card__header">
              <div className="title-wrap">
                <FileText size={20} className="icon-orange" />
                <h3>Demandes de devis en attente ({quotes.length})</h3>
              </div>
            </div>
            {quotes.length === 0 ? (
              <p className="empty-quotes">Aucun devis en attente. Toutes les demandes ont été traitées ! 👍</p>
            ) : (
              <div className="quotes-list-modern">
                {quotes.map((quote) => (
                  <div key={quote.id} className="quote-item">
                    <div className="quote-details">
                      <div className="quote-top">
                        <strong>{quote.client}</strong>
                        <span className="quote-date">{quote.date}</span>
                      </div>
                      <p className="quote-text">{quote.demande}</p>
                      <span className="quote-budget">Budget estimé : <strong>{quote.budget}</strong></span>
                    </div>
                    <div className="quote-actions">
                      <button 
                        type="button" 
                        className="btn-accept"
                        onClick={() => handleAcceptQuote(quote.id, quote.client)}
                      >
                        Accepter
                      </button>
                      <button 
                        type="button" 
                        className="btn-decline"
                        onClick={() => handleDeclineQuote(quote.id)}
                      >
                        Décliner
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
        {/* COLONNE LATÉRALE : BLOC-NOTES & RACCOURCIS */}
        <div className="dashboard-right-col">
          {/* BLOC-NOTES MEMO RAPIDE */}
          <section className="dash-card">
            <div className="dash-card__header">
              <h3>Mémos & Pense-bête</h3>
            </div>
            <form onSubmit={handleAddNote} className="note-form">
              <input 
                type="text" 
                placeholder="Ajouter un mémo rapide..."
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
              />
              <button type="submit" className="btn-add-note">
                <Plus size={16} />
              </button>
            </form>
            <ul className="notes-list">
              {notes.map((note, idx) => (
                <li key={idx} className="note-item">
                  <span>{note}</span>
                  <button 
                    type="button" 
                    className="btn-del-note"
                    onClick={() => handleDeleteNote(idx)}
                    title="Supprimer la note"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
          {/* RACCOURCIS PRO */}
          <section className="dash-card shortcuts-card">
            <div className="dash-card__header">
              <h3>Accès rapides</h3>
            </div>
            <div className="shortcuts-links">
              <Link to="/pro/planning" className="shortcut-item">
                <Calendar size={18} />
                <span>Ouvrir l'Agenda complet</span>
                <ChevronRight size={16} className="arrow" />
              </Link>
              <Link to="/pro/prestations" className="shortcut-item">
                <FileText size={18} />
                <span>Modifier mes tarifs & prestations</span>
                <ChevronRight size={16} className="arrow" />
              </Link>
              <Link to="/" target="_blank" className="shortcut-item">
                <ArrowUpRight size={18} />
                <span>Aperçu de mon profil public</span>
                <ChevronRight size={16} className="arrow" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}