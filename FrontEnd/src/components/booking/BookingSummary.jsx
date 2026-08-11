export default function BookingSummary({ service, date, heure }) {
  return (
    <div className="booking-summary">
      <h3>Votre récapitulatif</h3>
      <p><strong>Prestation :</strong> {service?.nom}</p>
      <p><strong>Date :</strong> {date} à {heure}</p>
      <p><strong>Prix :</strong> {service?.prix}€</p>
    </div>
  );
}