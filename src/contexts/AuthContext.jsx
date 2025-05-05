import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext({
    admin: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    register: async () => {},
    login: async () => {},
    logout: async () => {},
    clearError: () => {},
    refreshAuthToken: async () => false,
    reFetchCurrentAdmin: async () => {},
});

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to refresh the access token using refresh token
    const refreshAuthToken = async () => {
        try {
            await authService.refreshToken();
            return true;
        } catch (error) {
            setUser(null);
            return false;
        }
    };

    // Set up axios interceptor to handle token refresh
    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const refreshed = await refreshAuthToken();
                        if (refreshed) {
                            return axios(originalRequest);
                        } else {
                            // If refresh failed, clear use state and redirect to login
                            setUser(null);
                        }
                    } catch (error) {
                        setUser(null);
                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            }
        );

        // Clean up interceptor on unmount
        return () => {
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    // Check if user is already logged in on mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                setIsLoading(true);

                // Fetch user data
                const response = await agentService.getMe();

                setUser(response.data.user);
            } catch (err) {
                if (err.response.status === 401) {
                    try {
                        const refreshed = await refreshAuthToken();
                        if (refreshed) {
                            // If refresh succeeds, try getting the user again
                            const response = await agentService.getMe();
                            console.log("User:", response.data.user);
                            setUser(response.data.user);
                        }
                    } catch (error) {
                        console.log("Check Auth Status Error:", error);
                        // If refresh fails, we leave the user as null
                        setUser(null);
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            setError(null);

            // The server will set HTTP-only cookies for access and refresh tokens
            const loginResponse = await authService.login(email, password);

            if (loginResponse.data.success) {
                const response = await agentService.getMe();
                setUser(response.data.user);
            }

            return loginResponse;
        } catch (errorResponse) {
            setError(
                errorResponse.response.data.error.message ||
                    "Login failed. Please try again."
            );
            throw errorResponse;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email, password, confirmPassword) => {
        try {
            setIsLoading(true);
            setError(null);

            // The server will set HTTP-only cookies for access and refresh tokens
            const registerResponse = await authService.register(
                email,
                password,
                confirmPassword
            );

            if (registerResponse.data.success) {
                const response = await agentService.getMe();
                setUser(response.data.user);
            }

            return registerResponse;
        } catch (errorResponse) {
            setError(
                errorResponse.response.data.error.message ||
                    "Registration failed. Please try again."
            );
            throw errorResponse;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);

            // Call logout API if needed
            await authService.logout();

            setUser(null);
        } catch (err) {
            console.log("Logout Error:", err);
            // Even if logout API fails, we still want to clear local state
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const reFetchCurrentUser = async () => {
        try {
            // After successful registration, fetch user data
            const response = await agentService.getMe();
            setUser(response.data.user);
        } catch (error) {
            console.log("Refetch Current User Error:", error);
            setUser(null);
        }
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                error,
                login,
                logout,
                register,
                reFetchCurrentUser,
                clearError,
                refreshAuthToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
