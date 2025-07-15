import SummaryAnalytics from "@/features/dashboard/SummaryAnalytics";
import ReferralOverTimeChart from "../features/dashboard/ReferralOverTimeChart";
import LatestPayout from "../features/dashboard/LatestPayout";

export default function Dashboard() {
    return (
        <div>
            <SummaryAnalytics />
            <div className="grid grid-cols-5 gap-3.5 mt-4.5">
                <ReferralOverTimeChart />
                <LatestPayout />
            </div>
        </div>
    );
}
