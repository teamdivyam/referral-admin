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

    approveWithdrawalRequest: (withdrawalId, transactionId, remarks) =>
        API.patch(
            `/admin/process-withdrawal-request/approved/${withdrawalId}`,
            { transactionId, remarks }
        ),

    rejectedWithdrawalRequest: (withdrawalId, remarks) =>
        API.patch(
            `/admin/process-withdrawal-request/rejected/${withdrawalId}`,
            { remarks }
        ),

    withdrawals: (withdrawalType, page, search, fromDate, toDate) =>
        API.get("/admin/withdrawals", {
            params: {
                withdrawalType,
                page,
                search,
                fromDate: fromDate || undefined,
                toDate: toDate || undefined,
            },
        }),

    referralOverTimeData: (defineTime) =>
        API.get("/admin/referral-over-time", { params: { defineTime } }),

    latestPayout: (page) =>
        API.get("/admin/latest-payout", { params: { page } }),

    referralUserBalance: (referralUserId) =>
        API.get("/admin/balance", { params: { referralUserId } }),

    controlCronJob: (state) => API.patch(`/admin/cron/${state}`),

    getCronJobStatus: () => 
        API.get("/admin/cron/status")
};

export default AdminService;
