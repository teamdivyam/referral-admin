import API from "../config/axios";

const AuthService = {
    login: (formData) => API.post("/auth/admin/login", formData),
};

export default AuthService;
