import API from "../config/axios";

const AdminService = {
    dashboard: () => API.get("/dashboard")
}

export default AdminService;