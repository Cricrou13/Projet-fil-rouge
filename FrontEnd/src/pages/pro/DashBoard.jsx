import StatCard from "../../components/pro/StatCard";
import AppointmentList from "../../components/pro/AppointmentList";
import NotesPanel from "../../components/pro/NotesPanel";
import { mockStats, mockProchainsRdv, mockNotes } from "../../data/mockDasboard";
import "./DashBoard.scss";

export default function DashBoard() {
  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <StatCard title="Clients" value="5 clients" subtitle="Journée complète" subtitleType="positive" />
        <StatCard title="Total" value="28" subtitle="+4 hier" subtitleType="info" />
        <StatCard title="CA estimé (mois)" value="3 450 €" subtitle="+14% vs N-1" subtitleType="positive" />
        <StatCard title="Note clients" value="4.9 / 5" subtitle="★ 42 avis" subtitleType="neutral" />  
      </div>

      <div className="dashboard-main">
        <AppointmentList rdvs={mockProchainsRdv} />
        <NotesPanel notes={mockNotes} />
      </div>
    </div>
  );
}