import { useNavigate } from "react-router-dom";
import ProCard from "../../components/home/ProCard";
import { mockPros } from "../../data/mockPros";
import "./SearchPro.scss";

export default function SearchPro() {
  const navigate = useNavigate();

  return (
    <div className="search-pro">
      <h1>Rechercher un pro</h1>
      <input type="text" placeholder="Métier, ville..." className="search-input" />

      <div className="search-results">
        {mockPros.map((pro) => (
          <div key={pro.id} onClick={() => navigate(`/reservation?pro=${pro.id}`)}>
            <ProCard pro={pro} />
          </div>
        ))}
      </div>
    </div>
  );
}