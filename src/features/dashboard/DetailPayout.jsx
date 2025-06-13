import ApprovedDetails from "../withdrawals/ApprovedDetails";
import RejectedDetails from "../withdrawals/RejectedDetails";

export default function DetailPayout({ payout }) {
    if (payout.status === "approved") {
        return <ApprovedDetails approvedDetails={payout} />;
    } else if (payout.status === "rejected") {
        return <RejectedDetails rejectedDetails={payout} />;
    }
}
