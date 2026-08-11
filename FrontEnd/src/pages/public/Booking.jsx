import { useState } from "react";
import BookingStepper from "../../components/booking/BookingStepper";
import ServiceSelector from "../../components/booking/ServiceSelector";
import DateTimePicker from "../../components/booking/DateTimePicker";
import BookingSummary from "../../components/booking/BookingSummary";
import { mockServices } from "../../data/mockServices";
import "./Booking.scss";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");

  const canGoNext =
    (step === 1 && service) ||
    (step === 2 && date && heure);

  return (
    <div className="booking">
      <h1>Prendre rendez-vous</h1>
      <BookingStepper currentStep={step} />

      {step === 1 && (
        <ServiceSelector services={mockServices} selected={service} onSelect={setService} />
      )}

      {step === 2 && (
        <DateTimePicker date={date} setDate={setDate} heure={heure} setHeure={setHeure} />
      )}

      {step === 3 && (
        <BookingSummary service={service} date={date} heure={heure} />
      )}

      <div className="booking-actions">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}>Retour</button>
        )}
        {step < 3 && (
          <button className="btn-primary" disabled={!canGoNext} onClick={() => setStep(step + 1)}>
            Suivant
          </button>
        )}
        {step === 3 && (
          <button className="btn-primary" onClick={() => alert("Réservation confirmée (démo)")}>
            Confirmer le RDV
          </button>
        )}
      </div>
    </div>
  );
}