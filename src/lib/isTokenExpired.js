import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
};

export default isTokenExpired;