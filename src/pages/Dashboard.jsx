import SummaryAnalytics from "@/features/dashboard/SummaryAnalytics";
import ReferralOverTimeChart from "../features/dashboard/ReferralOverTimeChart";
import LatestPayout from "../features/dashboard/LatestPayout";

export default function Dashboard() {
    return (
        <>
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <SummaryAnalytics />
            </div>

            <div className="grid grid-cols-5 gap-6 mt-10">
                <ReferralOverTimeChart />
                <LatestPayout />
            </div>
        </>
    );
}
