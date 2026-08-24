const creneaux = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function DateTimePicker({ date, setDate, heure, setHeure }) {
  return (
    <div className="datetime-picker">
      <label>
        Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>

      <div className="creneaux">
        {creneaux.map((c) => (
          <button
            key={c}
            className={heure === c ? "selected" : ""}
            aria-pressed={heure === c}
            onClick={() => setHeure(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}