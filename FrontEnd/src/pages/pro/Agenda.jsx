import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { getMetierConfig } from "../../data/metiers";
import "./Agenda.scss";

const mockAppointments = [
  { id: 1, day: "Lun 1", client: "Marie D.", service: "Électricité", time: "09h-10h", type: "blue" },
  { id: 2, day: "Mar 2", client: "Soin barbe", service: "Coiffure", time: "10h-11h", type: "purple" },
  { id: 3, day: "Jeu 4", client: "Marc D.", service: "Électricité", time: "09h-10h", type: "primary" },
  { id: 4, day: "Jeu 4", client: "Christophe R.", service: "Plomberie", time: "14h30", type: "green" },
];

export default function Planning() {
  const days = ["Lun 1", "Mar 2", "Mer 3", "Jeu 4", "Ven 5", "Sam 6"];

  return (
    <div className="planning-container">
      {/* HEADER - On garde ta structure mais on ajuste le style */}
      <div className="planning-header">
        <div className="planning-header__title">
          <h2>Planning des rendez-vous</h2>
          <p>Semaine en cours · Salon Avaro</p>
        </div>

        <div className="planning-header__actions">
          <div className="date-nav">
            <button className="btn-nav"><ChevronLeft size={16} /> Précédent</button>
            <button className="btn-today">Aujourd'hui</button>
            <button className="btn-nav">Suivant <ChevronRight size={16} /></button>
          </div>
          <button className="btn-add-rdv">
            <Plus size={18} />
            <span>Bloquer un créneau</span>
          </button>
        </div>
      </div>

      {/* GRILLE DES JOURS */}
      <div className="agenda-grid">
        {days.map((day) => (
          <div key={day} className={`agenda-column ${day === "Jeu 4" ? "is-today" : ""}`}>
            <div className="day-header">
              {day} {day === "Jeu 4" && "(Auj)"}
            </div>
            
            <div className="day-content">
              {/* On filtre les RDV pour n'afficher que ceux de ce jour */}
              {mockAppointments
                .filter((app) => app.day === day)
                .map((app) => {
                  const config = getMetierConfig(app.service);
                  return (
                    <div 
                      key={app.id} 
                      className={`event-card event--${app.type}`}
                      style={{ borderLeftColor: config.color }}
                    >
                      <span className="event-time">{app.time}:</span>
                      <span className="event-client">{app.client}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}