import StatCard from "../../components/pro/StatCard";
import AppointmentList from "../../components/pro/AppointmentList";
import NotesPanel from "../../components/pro/NotesPanel";
import { mockStats, mockProchainsRdv, mockNotes } from "../../data/mockDasboard";
import "./DashBoard.scss";

export default function DashBoard() {
  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <StatCard label="RDV à venir" value={mockStats.rdvAVenir} />
        <StatCard label="Messages" value={mockStats.messages} />
        <StatCard label="Chiffre d'affaires" value={mockStats.chiffreAffaires} />
      </div>

      <div className="dashboard-main">
        <AppointmentList rdvs={mockProchainsRdv} />
        <NotesPanel notes={mockNotes} />
      </div>
    </div>
  );
}