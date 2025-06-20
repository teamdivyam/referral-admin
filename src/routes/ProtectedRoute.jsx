import { Outlet, Navigate } from "react-router-dom";
import isTokenExpired from "../lib/isTokenExpired";
import { PageProvider } from "../contexts/PageContext";

export default function ProtectedRoute() {
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    const isAuthenticated = token && !isTokenExpired(token);

    return isAuthenticated ? (
        <PageProvider>
            <Outlet />
        </PageProvider>
    ) : (
        <Navigate to="/login" />
    );
}
