import { Link } from 'react-router-dom';

export function ProCard({ pro }) {
  return (
    <div className="pro-card">
      {/* ... Le reste du contenu de la carte ... */}

      <div className="card-actions">
        {/* Bouton Voir le Profil / Réserver */}
        <Link to={`/booking?pro=${pro.id}`}>
          <button className="btn-profil">Profil</button>
        </Link>

        {/* Ou pour le bouton "Prendre RDV" */}
        <Link to={`/booking?pro=${pro.id}`}>
          <button className="btn-rdv">Prendre RDV</button>
        </Link>
      </div>
    </div>
  );
}