import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import ProLayout from "./layouts/ProLayout";

import Home from "./pages/public/Home";
import SearchPro from "./pages/public/SearchPro";
import Booking from "./pages/public/Booking";

import Dashboard from "./pages/pro/DashBoard";
import Planning from "./pages/pro/Agenda"; 
import Prestations from "./components/pro/PrestationTable";

import ContactPro from "./pages/public/ContactPro";
import Login from "./pages/public/Login";
import MyAppointments from "./pages/public/MyAppointments";

import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import LegalNotice from "./pages/public/LegalNotice";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Partie publique */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/recherche" element={<SearchPro />} />
            <Route path="/reservation" element={<Booking />} />
            <Route path="/devis" element={<ContactPro />} />
            <Route path="/mes-rendez-vous" element={<MyAppointments/>} />
            <Route path="/connexion" element={<Login/>} />
            <Route path="/politique-donnees" element={<PrivacyPolicy/>} />
            <Route path="/mentions-legales" element={<LegalNotice />} />
          </Route>

          {/* Partie Pro */}
          <Route path="/pro" element={<ProLayout />}>
            <Route path="tableau-de-bord" element={<Dashboard />} />
            <Route path="planning" element={<Planning />} />
            <Route path="prestations" element={<Prestations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}