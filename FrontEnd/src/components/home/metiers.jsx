export const METIER_COLORS = {
  coiffure: '#DB2777',
  electricite: '#EA580C',
  terrassement: '#65A30D',
  default: '#4F46E5',
};

export const getMetierColor = (metierKey) => {
  const key = metierKey?.toLowerCase();
  return METIER_COLORS[key] || METIER_COLORS.default;
};