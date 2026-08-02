import { Link } from "react-router-dom";
import ProCard from "../../components/home/ProCard";
import PrestationCard from "../../components/home/PrestationCard";
import { mockPros } from "../../data/mockPros";
import { mockPrestations } from "../../data/mockPrestations";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <h1>Trouvez et réservez votre entrepreneur en quelques clics</h1>
        <p>Consultez les disponibilités, réservez, et suivez vos RDV facilement.</p>
        <Link to="/recherche" className="btn-primary">Trouver un pro</Link>
      </section>

      <section className="home-section">
        <h2>Nos entrepreneurs</h2>
        <div className="home-grid">
          {mockPros.map((pro) => (
            <ProCard key={pro.id} pro={pro} />
          ))}
        </div>
      </section>

      <section className="home-section home-intro">
        <h2>Présentation de l'outil et de la prise de RDV</h2>
        <p>
          Infintime permet aux entrepreneurs de gérer leur agenda, leurs prestations
          et leur clientèle, tout en offrant à leurs clients un espace simple pour
          prendre rendez-vous ou demander un devis.
        </p>
      </section>

      <section className="home-section">
        <h2>Nos prestations</h2>
        <div className="home-grid">
          {mockPrestations.map((prestation) => (
            <PrestationCard key={prestation.id} prestation={prestation} />
          ))}
        </div>
      </section>
    </div>
  );
}