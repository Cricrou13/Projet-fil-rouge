import './StatCard.scss';

function StatCard({ title, value, subtitle, subtitleType = 'neutral' }) {
  return (
    <div className="stat-card">
      <p className="stat-card__title">{title}</p>
      <p className="stat-card__value">{value}</p>
      {subtitle && (
        <p className={`stat-card__subtitle stat-card__subtitle--${subtitleType}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default StatCard;