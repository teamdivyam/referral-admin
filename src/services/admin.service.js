import API from "../config/axios";

const AdminService = {
    dashboardAnalytics: () => API.get("/admin/dashboard-analytics"),

    referralUsers: ({ page, pageSize, search, searchFor, sortBy, sortDir }) =>
        API.get("/admin/referral-users", {
            params: {
                page,
                pageSize,
                search,
                searchFor,
                sortBy,
                sortDir,
            },
        }),

    referralUserById: (referralUserId) =>
        API.get(`/admin/referral-user/${referralUserId}`),

    assignReferralCode: (agentId, quantity) =>
        API.post(`/admin/assign-referral-code/${agentId}`, { quantity }),

    activateAccount: (referralUserId) =>
        API.patch(`/admin/change-account-status/activate/${referralUserId}`),

    deactivateAccount: (referralUserId) =>
        API.patch(`/admin/change-account-status/deactivate/${referralUserId}`),

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

    referralOverTimeData: (defineTime) =>
        API.get("/admin/referral-over-time", { params: { defineTime } }),

    latestPayout: (page) =>
        API.get("/admin/latest-payout", { params: { page } }),

    referralUserBalance: (referralUserId) =>
        API.get("/admin/balance", { params: { referralUserId } }),

    controlCronJob: (state) => API.patch(`/admin/cron/${state}`),

    getCronJobStatus: () => API.get("/admin/cron/status"),

    getReferralSettings: () => API.get("/admin/referral-settings"),

    updateReferralSettings: (name, value) =>
        API.patch("/admin/update-referral-settings", { name, value }),

    updateReferralSchedule: (schedule, scheduleTime) =>
        API.patch("/admin/update-referral-schedule", {
            schedule,
            scheduleTime,
        }),

    getReferrals: ({
        referralStatus,
        page,
        search,
        fromDate,
        toDate,
        searchIn,
        id,
        searchIdIn,
    }) =>
        API.get("/admin/referral", {
            params: {
                referralStatus,
                page,
                search,
                fromDate,
                toDate,
                searchIn,
                id,
                searchIdIn,
            },
        }),

    getWithdrawals: ({ withdrawalStatus, page, search, fromDate, toDate }) =>
        API.get("/admin/withdrawals", {
            params: {
                withdrawalStatus,
                page,
                search,
                fromDate,
                toDate,
            },
        }),

    getSessions: () => API.get("/admin/sessions"),
    revokeSessions: ({ sessionId }) =>
        API.patch("/admin/sessions", {
            sessionId,
        }),
    logout: () => API.patch("/admin/logout"),
    resetPassword: ({ currentPassword, newPassword, confirmPassword }) =>
        API.patch("/admin/reset-password", {
            currentPassword,
            newPassword,
            confirmPassword,
        }),
    verifyAdmin: () => API.get("/admin/verify-admin"),
    getAdmins: () => API.get("/admin/get-admins"),
    deleteAdmin: (adminId) => API.delete(`/admin/delete-admin/${adminId}`),
    createAdmin: ({ name, email, role, password }) =>
        API.post("/admin/create-admin", { name, email, role, password }),
};

export default AdminService;
