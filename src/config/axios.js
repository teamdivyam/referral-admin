import axios from "axios";
import { API_URL } from "../lib/constant";
import { toast } from "sonner";

const API = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

// Interceptor to attach token dynamically before every request
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: Catch 401 errors globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log(error);
            console.log("Working...");
            // Clear token
            localStorage.removeItem("token");

            toast.error("Session expired. Redirecting to login...")

            // Redirect to login
            setTimeout(() => {
                window.location.href = "/login";
            }, 2500);

            return Promise.reject(
                new Error("Unauthorized - redirecting to login")
            );
        }

        return Promise.reject(error);
    }
);

export default API;
