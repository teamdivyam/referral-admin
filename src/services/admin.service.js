import API from "../config/axios";

const AdminService = {
    dashboardAnalytics: () => API.get("/admin/dashboard-analytics"),

    agents: (params) => API.get("/admin/referral-users", { params }),

    referralUserById: (referralUserId) =>
        API.get(`/admin/referral-user/${referralUserId}`),

    assignReferralCode: (agentId, quantity) =>
        API.post(`/admin/assign-referral-code/${agentId}`, { quantity }),

    activateAccount: (referralUserId) =>
        API.put(`/admin/change-account-status/activate/${referralUserId}`),

    deactivateAccount: (referralUserId) =>
        API.put(`/admin/change-account-status/deactivate/${referralUserId}`),

    approveWithdrawalRequest: (withdrawalId, remarks) =>
        API.patch(
            `/admin/process-withdrawal-request/approved/${withdrawalId}`,
            { remarks }
        ),

    rejectedWithdrawalRequest: (withdrawalId, remarks) =>
        API.patch(
            `/admin/process-withdrawal-request/rejected/${withdrawalId}`,
            { remarks }
        ),
};

export default AdminService;
