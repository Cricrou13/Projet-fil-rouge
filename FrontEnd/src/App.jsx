import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import ProLayout from "./layouts/ProLayout";

import Home from "./pages/public/Home";
import SearchPro from "./pages/public/SearchPro";
import Booking from "./pages/public/Booking";

import Dashboard from "./pages/pro/DashBoard";
import Planning from "./pages/pro/Agenda"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Partie publique */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recherche" element={<SearchPro />} />
          <Route path="/reservation" element={<Booking />} />
          <Route path="/devis" element={<div>Page Devis en construction</div>} />
          <Route path="/mes-rendez-vous" element={<div>Page Mes RDV</div>} />
          <Route path="/connexion" element={<div>Page Connexion</div>} />
        </Route>

        {/* Partie Pro */}
        <Route path="/pro" element={<ProLayout metier="électricité" />}>
          <Route path="tableau-de-bord" element={<Dashboard />} />
          <Route path="planning" element={<Planning />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}