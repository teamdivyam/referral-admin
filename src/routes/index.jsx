import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

// Pages
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Help from "../pages/Help";
import Referral from "../pages/Referral";

import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";
import Withdrawals from "../pages/Withdrawals";
import useAuth from "../hooks/useAuth";
import Admins from "../pages/Admins";

export default function AppRoutes() {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/admins" element={<Admins />} />
                        <Route path="/withdrawals" element={<Withdrawals />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/referral" element={<Referral />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}
