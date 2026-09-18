import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  User, 
  Briefcase, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Phone, 
  MapPin, 
  CheckCircle2 
} from "lucide-react";
import "./Login.scss";
export default function Login() {
  const navigate = useNavigate();
  // Mode : "login" (Connexion) ou "register" (Inscription)
  const { login, loginClient } = useAuth();
  const [mode, setMode] = useState("login");
  // Profil : "client" ou "pro"
  const [role, setRole] = useState("client");
  // Affichage du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  // Simulation de succès
  const [isSuccess, setIsSuccess] = useState(false);
  // Données du formulaire
  const [formData, setFormData] = useState({
    name: "",
    entreprise: "",
    metier: "coiffure",
    ville: "",
    telephone: "",
    email: "",
    password: "",
    rememberMe: false,
    cguAccepted: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
  e.preventDefault();
  setIsSuccess(true);

  if (role === "pro") {
    // En mode connexion, le champ "name" n'existe pas dans le formulaire :
    // on utilise le début de l'email comme nom d'affichage à défaut de backend
    const displayName = formData.name || formData.email.split("@")[0];
    login(formData.metier, displayName);
  } else {
    const displayName = formData.name || formData.email.split("@")[0];
    loginClient(displayName);
  }

  setTimeout(() => {
    if (role === "pro") {
      navigate("/pro/tableau-de-bord");
    } else {
      navigate("/mes-rendez-vous");
    }
  }, 1200);
};
  return (
    <div className="auth-page">
      <div className="auth-container">
        
        {/* LOGO & EN-TÊTE */}
        <div className="auth-header">
          <Link to="/" className="auth-logo" title="Retour à l'accueil">
            <span className="auth-logo-badge">∞</span>
            <span className="auth-logo-text">Infin<span>Time</span></span>
          </Link>
          <h1 className="auth-title">
            {mode === "login" ? "Bienvenue sur InfinTime" : "Rejoignez l'aventure InfinTime"}
          </h1>
          <p className="auth-subtitle">
            {mode === "login"
              ? "Accédez à votre espace en toute sécurité"
              : "Créez votre compte gratuit en quelques clics"}
          </p>
        </div>
        {/* CARTE CENTRALE */}
        <div className="auth-card">
          {/* 1. ONGLETS CONNEXION / INSCRIPTION */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${mode === "login" ? "active" : ""}`}
              onClick={() => { setMode("login"); setIsSuccess(false); }}
            >
              Se connecter
            </button>
            <button
              type="button"
              className={`auth-tab ${mode === "register" ? "active" : ""}`}
              onClick={() => { setMode("register"); setIsSuccess(false); }}
            >
              Créer un compte
            </button>
          </div>
          {/* 2. SÉLECTEUR DE RÔLE (CLIENT / PRO) */}
          <div className="role-selector">
            <button
              type="button"
              className={`role-card ${role === "client" ? "selected" : ""}`}
              onClick={() => setRole("client")}
            >
              <div className="role-icon">
                <User size={20} />
              </div>
              <div className="role-text">
                <strong>Je suis un Client</strong>
                <span>Réserver & gérer mes RDV</span>
              </div>
            </button>
            <button
              type="button"
              className={`role-card ${role === "pro" ? "selected" : ""}`}
              onClick={() => setRole("pro")}
            >
              <div className="role-icon">
                <Briefcase size={20} />
              </div>
              <div className="role-text">
                <strong>Je suis un Professionnel</strong>
                <span>Planning, devis & clientèle</span>
              </div>
            </button>
          </div>
          {/* ÉCRAN DE SUCCÈS TEMPORAIRE */}
          {isSuccess ? (
            <div className="auth-success-message">
              <CheckCircle2 size={52} className="success-icon" />
              <h3>{mode === "login" ? "Connexion réussie !" : "Compte créé avec succès !"}</h3>
              <p>
                {role === "pro"
                  ? "Redirection vers votre tableau de bord artisan..."
                  : "Redirection vers votre espace rendez-vous..."}
              </p>
              <div className="auth-spinner"></div>
            </div>
          ) : (
            /* FORMULAIRE */
            <form onSubmit={handleSubmit} className="auth-form">
              
              {/* CHAMPS SPÉCIFIQUES INSCRIPTION */}
              {mode === "register" && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">
                      {role === "pro" ? "Nom du gérant / Responsable" : "Nom & Prénom"}
                    </label>
                    <div className="input-icon-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        placeholder={role === "pro" ? "Ex: Marc Avaro" : "Ex: Jean Dupont"}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {role === "pro" && (
                    <>
                      <div className="form-group">
                        <label htmlFor="entreprise">Nom de l'entreprise ou Salon</label>
                        <div className="input-icon-wrapper">
                          <Building2 size={18} className="input-icon" />
                          <input
                            id="entreprise"
                            type="text"
                            name="entreprise"
                            required
                            placeholder="Ex: Salon Avaro Coiffure"
                            value={formData.entreprise}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="metier">Secteur d'activité</label>
                          <select
                            id="metier"
                            name="metier"
                            value={formData.metier}
                            onChange={handleChange}
                          >
                            <option value="coiffure">✂️ Coiffure & Barbier</option>
                            <option value="electricite">⚡ Électricité générale</option>
                            <option value="plomberie">🔧 Plomberie & Chauffage</option>
                            <option value="terrassement">🚜 Terrassement & BTP</option>
                            <option value="peinture">🎨 Peinture & Rénovation</option>
                            <option value="jardinage">🌿 Paysagiste & Jardin</option>
                            <option value="Informatique">💻 Développeur Web</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="ville">Ville d'intervention</label>
                          <div className="input-icon-wrapper">
                            <MapPin size={18} className="input-icon" />
                            <input
                              id="ville"
                              type="text"
                              name="ville"
                              required
                              placeholder="Ex: Toulouse"
                              value={formData.ville}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="form-group">
                    <label htmlFor="telephone">Numéro de téléphone</label>
                    <div className="input-icon-wrapper">
                      <Phone size={18} className="input-icon" />
                      <input
                        id="telephone"
                        type="tel"
                        name="telephone"
                        required
                        placeholder="Ex: 06 12 34 56 78"
                        value={formData.telephone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {role === "pro" && mode === "login" && (
                <div className="form-group">
                  <label htmlFor="metier">Se connecter en tant que</label>
                  <select
                    id="metier"
                    name="metier"
                    value={formData.metier}
                    onChange={handleChange}
                  >
                    <option value="coiffure">✂️ Coiffure & Barbier</option>
                    <option value="electricite">⚡ Électricité générale</option>
                    <option value="plomberie">🔧 Plomberie & Chauffage</option>
                    <option value="terrassement">🚜 Terrassement & BTP</option>
                    <option value="peinture">🎨 Peinture & Rénovation</option>
                    <option value="jardinage">🌿 Paysagiste & Jardin</option>
                  </select>
                </div>
)}
              {/* CHAMPS COMMUNS : EMAIL & MOT DE PASSE */}
              <div className="form-group">
                <label htmlFor="email">Adresse e-mail</label>
                <div className="input-icon-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="adresse@exemple.fr"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="label-with-link">
                  <label htmlFor="password">Mot de passe</label>
                  {mode === "login" && (
                    <button
                      type="button"
                      className="forgot-link"
                      onClick={() => alert("Lien de réinitialisation envoyé par e-mail (démo).")}
                    >
                      Mot de passe oublié ?
                    </button>
                  )}
                </div>
                <div className="input-icon-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Masquer" : "Afficher"}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {/* OPTIONS SUPPLÉMENTAIRES */}
              {mode === "login" ? (
                <div className="form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span>Se souvenir de moi</span>
                  </label>
                </div>
              ) : (
                <div className="form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="cguAccepted"
                      required
                      checked={formData.cguAccepted}
                      onChange={handleChange}
                    />
                    <span>J'accepte les conditions générales d'utilisation et la politique de confidentialité.</span>
                  </label>
                </div>
              )}
              {/* BOUTON D'ACTION PRINCIPAL */}
              <button type="submit" className="auth-submit-btn">
                <span>
                  {mode === "login" 
                    ? (role === "pro" ? "Accéder à l'Espace Pro" : "Se connecter") 
                    : (role === "pro" ? "Créer mon Espace Artisan" : "Créer mon compte")}
                </span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}
          {/* PIED DE CARTE / BASULE RAPIDE */}
          <div className="auth-footer-switch">
            {mode === "login" ? (
              <p>
                Vous n'avez pas encore de compte ?{" "}
                <button type="button" onClick={() => setMode("register")}>
                  Inscrivez-vous gratuitement
                </button>
              </p>
            ) : (
              <p>
                Vous possédez déjà un compte ?{" "}
                <button type="button" onClick={() => setMode("login")}>
                  Connectez-vous
                </button>
              </p>
            )}
          </div>
        </div>
        {/* RÉASSURANCE */}
        <div className="auth-security-badges">
          <div className="badge-item">
            <ShieldCheck size={16} />
            <span>Connexion chiffrée SSL 256 bits</span>
          </div>
          <div className="badge-item">
            <span>🛡️ Données protégées RGPD</span>
          </div>
          <div className="badge-item">
            <span>⚡ Accès direct 24h/24 & 7j/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}