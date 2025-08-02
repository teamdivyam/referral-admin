import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PageProvider } from "../contexts/PageContext";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();
    const [initialCheckDone, setInitialCheckDone] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        // This ensures we only do the auth check once
        if (!initialCheckDone) {
            setInitialCheckDone(true);
        }
    }, [initialCheckDone]);

    // If no token exists, redirect immediately - BEFORE any auth checks
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Show loading state while verifying auth
    if (loading || !initialCheckDone) {
        return <LoadingSpinner fullScreen />;
    }

    return isAuthenticated ? (
        <PageProvider>
            <Outlet />
        </PageProvider>
    ) : (
        <Navigate to="/login" replace />
    );
}