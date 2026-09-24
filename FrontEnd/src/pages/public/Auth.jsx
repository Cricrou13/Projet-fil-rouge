import React, { useState } from 'react';
import './Auth.scss';

export default function Auth() {
  // État pour savoir quel onglet est actif : 'login' ou 'register'
  const [activeTab, setActiveTab] = useState('login');

  // États pour le formulaire de connexion
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  // États pour le formulaire d'inscription
  const [registerData, setRegisterData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    role: 'client',
    adresse_facturation: '',
    code_postal: '',
    ville: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Gestion des changements pour la connexion
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Gestion des changements pour l'inscription
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // Soumission de la connexion
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost/infintime.api/connexion.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Connexion réussie ! Redirection en cours...');
        
        // Stocker les infos de l'utilisateur connecté
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirection en fonction de son rôle (client ou artisan)
        setTimeout(() => {
          if (data.user.role === 'artisan') {
            window.location.href = '/pro/tableau-de-bord';
          } else {
            window.location.href = '/';
          }
        }, 1000);

      } else {
        setError(data.message || "Identifiants incorrects.");
      }
    } catch (err) {
      setError('Erreur de communication avec l’API.');
    }
  };

  // Soumission de l'inscription
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost/infintime.api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Compte créé avec succès ! Vous pouvez vous connecter.');
        setActiveTab('login'); // Bascule automatique vers l'onglet connexion
      } else {
        setError(data.message || "Erreur lors de l’inscription.");
      }
    } catch (err) {
      setError('Erreur de communication avec l’API.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* En-tête avec les onglets */}
        <div className="auth-tabs">
          <button
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setMessage(''); setError(''); }}
          >
            Connexion
          </button>
          <button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setMessage(''); setError(''); }}
          >
            Inscription
          </button>
        </div>

        <div className="auth-content">
          <h2>InfinTime - <span>{activeTab === 'login' ? 'Connexion' : 'Inscription'}</span></h2>

          {message && <div className="alert-message success">{message}</div>}
          {error && <div className="alert-message error">{error}</div>}

          {/* Formulaire de Connexion */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <input
                type="email"
                name="email"
                placeholder="Adresse email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit" className="btn-submit">Se connecter</button>
            </form>
          )}

          {/* Formulaire d'Inscription */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={registerData.nom}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={registerData.prenom}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
              <input
                type="tel"
                name="telephone"
                placeholder="Téléphone"
                value={registerData.telephone}
                onChange={handleRegisterChange}
              />
              <select
                name="role"
                value={registerData.role}
                onChange={handleRegisterChange}
              >
                <option value="client">Client</option>
                <option value="artisan">Artisan</option>
              </select>
              <input
                type="text"
                name="adresse_facturation"
                placeholder="Adresse"
                value={registerData.adresse_facturation}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="code_postal"
                placeholder="Code postal"
                value={registerData.code_postal}
                onChange={handleRegisterChange}
              />
              <input
                type="text"
                name="ville"
                placeholder="Ville"
                value={registerData.ville}
                onChange={handleRegisterChange}
              />
              <button type="submit" className="btn-submit">S'inscrire</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}