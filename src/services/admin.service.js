import API from "../config/axios";

const AdminService = {
    dashboardAnalytics: () =>  API.get("/admin/dashboard-analytics"),

    agents: (params) => API.get("/admin/referral-users", { params }),

    referralUserById: (referralUserId) => API.get(`/admin/referral-user/${referralUserId}`),

    assignReferralCode: (agentId, quantity) =>
        API.post(`/admin/assign-referral-code/${agentId}`, { quantity }),

    activateAccount: (agentId) =>
        API.put(`/admin/change-account-status/activate/${agentId}`),

    deactivateAccount: (agentId) => 
        API.put(`/admin/change-account-status/deactivate/${agentId}`),

    approveWithdrawalRequest: (withdrawalId) => 
        API.put(`/admin/process-withdrawal-request/approved/${withdrawalId}`),

    rejectedWithdrawalRequest: (withdrawalId) => 
        API.put(`/admin/process-withdrawal-request/rejected/${withdrawalId}`),
};

export default AdminService;
