import { Outlet } from "react-router-dom";
import Topbar from "../components/layout/Topbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

export default function ProLayout() {
    return (
        <div className="pro-layout">
            <Topbar />
            <div className="pro-body">
                <Sidebar />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}
