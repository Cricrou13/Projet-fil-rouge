export default function ProCard({ pro }) {
  return (
    <div className="pro-card">
      <h3>{pro.name}</h3>
      <p>{pro.metier}</p>
      <span>{pro.ville}</span>
    </div>
  );
}