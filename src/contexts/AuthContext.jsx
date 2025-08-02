import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminService from "../services/admin.service";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["auth-user"],
        queryFn: async () => {
            const response = await AdminService.verifyAdmin();
            return response.data;
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                if (data.success) {
                    setAuthData({
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        adminId: data.adminId,
                        phone: data.phone,
                    });
                }
            }
            setLoading(false);
        }
    }, [data, isLoading]);

    const value = {
        authData,
        loading,
        isAuthenticated: !!authData,
        setAuthData,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
