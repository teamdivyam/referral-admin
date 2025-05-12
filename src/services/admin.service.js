import API from "../config/axios";

const AdminService = {
    dashboard: () => API.get("/dashboard"),

    agents: () => API.get("/admin/agent"),

    agentSummary: (params) =>
        API.get("/admin/agent/summary", {
            params,
        }),
};

export default AdminService;
