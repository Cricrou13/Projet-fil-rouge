export const METIERS = {
  coiffure: { label: 'Coiffure', color: '#DB2777', bgLight: '#FCE7F3' },
  electricite: { label: 'Électricité', color: '#EA580C', bgLight: '#FFEDD5' },
  terrassement: { label: 'Terrassement', color: '#65A30D', bgLight: '#ECFCCB' },
  plomberie: { label: 'Plomberie', color: '#0284C7', bgLight: '#E0F2FE' },
  peinture: { label: 'Peinture', color: '#7C3AED', bgLight: '#F3E8FF' },
  jardinage: { label: 'Jardinage', color: '#16A34A', bgLight: '#DCFCE7' },
  nettoyage: { label: 'Nettoyage', color: '#0D9488', bgLight: '#CCFBF1' },
  menuiserie: { label: 'Menuiserie', color: '#D97706', bgLight: '#FEF3C7' },
  default: { label: 'Autre', color: '#4F46E5', bgLight: '#EEF2FF' },
};

export const getMetierConfig = (key) => {
  if (!key) return METIERS.default;

  // Nettoyage : minuscules + suppression des accents
  const cleanKey = String(key)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  return METIERS[cleanKey] || METIERS.default;
};