import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import ProLayout from "./layouts/ProLayout";

import Home from "./pages/public/Home";
import SearchPro from "./pages/public/SearchPro";
import Booking from "./pages/public/Booking";

import Dashboard from "./pages/pro/DashBoard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recherche" element={<SearchPro />} />
          <Route path="/reservation" element={<Booking />} />
        </Route>

        <Route element={<ProLayout metier="électricité"/>}>
          <Route path="/pro/tableau-de-bord" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}