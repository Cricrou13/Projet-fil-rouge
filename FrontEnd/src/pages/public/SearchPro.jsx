import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, SlidersHorizontal, RotateCcw, Frown } from "lucide-react";
import ProCard from "../../components/home/ProCard";
import { mockPros } from "../../data/mockPros";
import "./SearchPro.scss";
export default function SearchPro() {
  const [searchParams, setSearchParams] = useSearchParams();
  // 1. Lecture des paramètres d'URL (?metier=...&ville=...)
  const metierParam = searchParams.get("metier") || "";
  const villeParam = searchParams.get("ville") || "";
  // 2. États locaux des champs de recherche
  const [metierInput, setMetierInput] = useState(metierParam);
  const [villeInput, setVilleInput] = useState(villeParam);
  // Synchronise les inputs si l'URL change (ex: clic sur un lien du menu)
  useEffect(() => {
    setMetierInput(metierParam);
    setVilleInput(villeParam);
  }, [metierParam, villeParam]);
  // 3. Filtres avancés
  const [selectedDispo, setSelectedDispo] = useState("all"); // "all", "today", "tomorrow"
  const [minRating, setMinRating] = useState(0); // 0, 4.5, 4.8
  const [typeFilter, setTypeFilter] = useState("all"); // "all", "fixed", "quote"
  const [sortBy, setSortBy] = useState("default"); // "default", "rating", "price"
  // 4. Soumission du formulaire de recherche haute
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (metierInput.trim()) params.set("metier", metierInput.trim());
    if (villeInput.trim()) params.set("ville", villeInput.trim());
    setSearchParams(params);
  };
  // 5. Clic sur un tag rapide
  const handleQuickTag = (tag) => {
    setMetierInput(tag);
    const params = new URLSearchParams();
    if (tag) params.set("metier", tag);
    if (villeInput.trim()) params.set("ville", villeInput.trim());
    setSearchParams(params);
  };
  // 6. Réinitialisation complète des filtres
  const handleReset = () => {
    setMetierInput("");
    setVilleInput("");
    setSelectedDispo("all");
    setMinRating(0);
    setTypeFilter("all");
    setSortBy("default");
    setSearchParams({});
  };
  // 7. Filtrage dynamique et tri (avec useMemo pour la performance)
  const filteredPros = useMemo(() => {
    return mockPros
      .filter((pro) => {
        // Filtrage par métier
        if (metierParam) {
          const query = metierParam.toLowerCase();
          const match =
            pro.metier.toLowerCase().includes(query) ||
            pro.name.toLowerCase().includes(query);
          if (!match) return false;
        }
        // Filtrage par ville
        if (villeParam) {
          const cityQuery = villeParam.toLowerCase();
          const matchCity =
            pro.ville.toLowerCase().includes(cityQuery) ||
            (pro.codePostal && pro.codePostal.includes(cityQuery));
          if (!matchCity) return false;
        }
        // Filtrage par note minimale
        if (minRating > 0 && pro.rating < minRating) return false;
        // Filtrage par type d'intervention (devis vs prix fixe)
        if (typeFilter === "quote" && pro.startingPrice !== "Sur devis") return false;
        if (typeFilter === "fixed" && pro.startingPrice === "Sur devis") return false;
        // Filtrage par disponibilité
        if (
          selectedDispo === "today" &&
          !pro.nextSlot?.toLowerCase().includes("aujourd'hui")
        )
          return false;
        if (
          selectedDispo === "tomorrow" &&
          !pro.nextSlot?.toLowerCase().includes("demain")
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price") {
          const priceA = parseInt(a.startingPrice) || 999;
          const priceB = parseInt(b.startingPrice) || 999;
          return priceA - priceB;
        }
        return 0;
      });
  }, [metierParam, villeParam, selectedDispo, minRating, typeFilter, sortBy]);
  return (
    <div className="search-page">
      <div className="search-container">
        
        {/* BARRE DE RECHERCHE SUPÉRIEURE */}
        <div className="search-top-bar">
          <form className="search-inputs-form" onSubmit={handleSearchSubmit}>
            <div className="search-field">
              <Search className="field-icon" size={18} />
              <input
                type="text"
                placeholder="Quel métier ou artisan ?"
                value={metierInput}
                onChange={(e) => setMetierInput(e.target.value)}
              />
            </div>
            <div className="search-divider"></div>
            <div className="search-field">
              <MapPin className="field-icon" size={18} />
              <input
                type="text"
                placeholder="Où ? (ex: Toulouse, Blagnac)"
                value={villeInput}
                onChange={(e) => setVilleInput(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-search-submit">
              Rechercher
            </button>
          </form>
          {/* Tags de filtres rapides */}
          <div className="search-quick-tags">
            <span className="tags-title">Accès direct :</span>
            <button
              type="button"
              className={`tag-btn ${!metierParam ? "active" : ""}`}
              onClick={() => handleQuickTag("")}
            >
              Tous
            </button>
            <button
              type="button"
              className={`tag-btn ${metierParam.toLowerCase() === "coiffure" ? "active" : ""}`}
              onClick={() => handleQuickTag("Coiffure")}
            >
              ✂️ Coiffure
            </button>
            <button
              type="button"
              className={`tag-btn ${metierParam.toLowerCase() === "plomberie" ? "active" : ""}`}
              onClick={() => handleQuickTag("Plomberie")}
            >
              🔧 Plomberie
            </button>
            <button
              type="button"
              className={`tag-btn ${metierParam.toLowerCase() === "terrassement" ? "active" : ""}`}
              onClick={() => handleQuickTag("Terrassement")}
            >
              🚜 Terrassement
            </button>
          </div>
        </div>
        {/* CONTENU PRINCIPAL : FILTRES GAUCHE + RÉSULTATS DROITE */}
        <div className="search-layout">
          
          {/* BARRE LATÉRALE DE FILTRES */}
          <aside className="search-filters-sidebar">
            <div className="filters-header">
              <span className="filters-title">
                <SlidersHorizontal size={16} />
                <span>Filtres</span>
              </span>
              {(metierParam || villeParam || minRating > 0 || typeFilter !== "all" || selectedDispo !== "all") && (
                <button type="button" className="btn-reset" onClick={handleReset} title="Réinitialiser">
                  <RotateCcw size={13} />
                  <span>Effacer</span>
                </button>
              )}
            </div>
            {/* Filtre Disponibilité */}
            <div className="filter-group">
              <label>Disponibilité</label>
              <div className="filter-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="dispo"
                    checked={selectedDispo === "all"}
                    onChange={() => setSelectedDispo("all")}
                  />
                  <span>Toutes disponibilités</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="dispo"
                    checked={selectedDispo === "today"}
                    onChange={() => setSelectedDispo("today")}
                  />
                  <span>🟢 Aujourd'hui</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="dispo"
                    checked={selectedDispo === "tomorrow"}
                    onChange={() => setSelectedDispo("tomorrow")}
                  />
                  <span>Demain</span>
                </label>
              </div>
            </div>
            {/* Filtre Note minimale */}
            <div className="filter-group">
              <label>Avis clients</label>
              <div className="filter-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 0}
                    onChange={() => setMinRating(0)}
                  />
                  <span>Toutes les notes</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 4.8}
                    onChange={() => setMinRating(4.8)}
                  />
                  <span>★ 4.8 et plus</span>
                </label>
              </div>
            </div>
            {/* Filtre Type d'intervention */}
            <div className="filter-group">
              <label>Type d'intervention</label>
              <div className="filter-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="type"
                    checked={typeFilter === "all"}
                    onChange={() => setTypeFilter("all")}
                  />
                  <span>Tous</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="type"
                    checked={typeFilter === "fixed"}
                    onChange={() => setTypeFilter("fixed")}
                  />
                  <span>Tarif fixe en ligne</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="type"
                    checked={typeFilter === "quote"}
                    onChange={() => setTypeFilter("quote")}
                  />
                  <span>Sur devis</span>
                </label>
              </div>
            </div>
          </aside>
          {/* ZONE DE RÉSULTATS */}
          <main className="search-results-area">
            
            {/* Barre de résumé & Tri */}
            <div className="results-header">
              <h2 className="results-count">
                <strong>{filteredPros.length}</strong> professionnel{filteredPros.length > 1 ? "s" : ""} disponible{filteredPros.length > 1 ? "s" : ""}
                {villeParam && ` à ${villeParam}`}
                {metierParam && ` pour "${metierParam}"`}
              </h2>
              <div className="results-sort">
                <label htmlFor="sort-select">Trier par :</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Pertinence</option>
                  <option value="rating">Mieux notés (★)</option>
                  <option value="price">Prix croissant</option>
                </select>
              </div>
            </div>
            {/* Liste des cartes pros */}
            {filteredPros.length > 0 ? (
              <div className="results-grid">
                {filteredPros.map((pro) => (
                  <ProCard key={pro.id} pro={pro} />
                ))}
              </div>
            ) : (
              /* Écran 0 résultat */
              <div className="empty-results">
                <Frown size={44} className="empty-icon" />
                <h3>Aucun professionnel trouvé</h3>
                <p>
                  Nous n'avons trouvé aucun artisan correspondant à vos critères de recherche.
                </p>
                <button type="button" className="btn-reset-search" onClick={handleReset}>
                  Réinitialiser tous les critères
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}