import { Outlet } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import "./ProLayout.scss";

export default function ProLayout() {
  return (
    <div className="pro-layout">
      <div className="pro-body">
        <Sidebar />
        <div className="pro-content">
          <Topbar nom="Jean" />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
