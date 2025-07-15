import API from "../config/axios";

const AuthService = {
    login: ({ email, password }) =>
        API.post("/auth/admin/login", { email, password }),
};

export default AuthService;
