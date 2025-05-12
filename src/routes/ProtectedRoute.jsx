import { Outlet, Navigate } from "react-router-dom";
import isTokenExpired from "../lib/isTokenExpired";

export default function ProtectedRoute() {
    const token = localStorage.getItem("token");

    const isAuthenticated = token && !isTokenExpired(token);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

}
