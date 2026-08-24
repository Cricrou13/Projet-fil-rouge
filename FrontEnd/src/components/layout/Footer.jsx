import { Link } from "react-router-dom";
import "./Footer.scss";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h4>Notre entreprise</h4>
        <Link to="/">Recrutement</Link>
        <Link to="/">À propos</Link>
        <Link to="/">Numéro SIREN</Link>
        <Link to="/">Capital social</Link>
      </div>

      <div className="footer-links">
        <Link to="/mentions-legales">Mentions légales</Link>
        <Link to="/politique-donnees">Politique des données</Link>
      </div>

        <div className="footer-social">
            <span>Nos réseaux sociaux</span>
            <div className="footer-social-icons">
                <FaFacebook size={18} />
                <FaInstagram size={18} />
                <FaTwitter size={18} />
                <FaLinkedin size={18} />
            </div>
        </div>

      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} InfinTime. Tous droits réservés.
      </p>
    </footer>
  );
}