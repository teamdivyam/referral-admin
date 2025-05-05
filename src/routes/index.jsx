import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Agents from "../pages/Agents";
import Settings from "../pages/Settings";
import Login from "../pages/Login";

import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/agents" element={<Agents />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}
