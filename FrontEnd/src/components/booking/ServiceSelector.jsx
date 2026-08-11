export default function ServiceSelector({ services, selected, onSelect }) {
  return (
    <div className="service-selector">
      {services.map((service) => (
        <div
          key={service.id}
          className={`service-option ${selected?.id === service.id ? "selected" : ""}`}
          onClick={() => onSelect(service)}
        >
          <span>{service.nom}</span>
          <span>{service.duree}</span>
          <span>{service.prix}€</span>
        </div>
      ))}
    </div>
  );
}