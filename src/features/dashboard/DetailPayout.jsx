import ApprovedWithdrawalDetails from "../withdrawals/ApprovedWithdrawalDetails";
import RejectedWithdrawalDetail from "../withdrawals/RejectedWithdrawalDetail";

export default function DetailPayout({ payout }) {
    if (payout.status === "approved") {
        return <ApprovedWithdrawalDetails approvedRequest={payout} />;
    } else if (payout.status === "rejected") {
        return <RejectedWithdrawalDetail rejectedRequest={payout} />;
    }
}
