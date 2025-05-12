import SummaryAnalytics from "@/features/dashboard/SummaryAnalytics";
import SelectTimeRange from "@/features/dashboard/SelectTimeRange";
import ReferralOverTimeChart from "@/features/dashboard/ReferralOverTimeChart";
import { ChartNoAxesColumn, Dot } from "lucide-react";

export default function Dashboard() {
    return (
        <>
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                <SummaryAnalytics />
            </div>

            <div className="grid grid-cols-5 mt-10">
                <div className="col-span-5 lg:col-span-3 bg-cs-background-secondary px-6 py-6.5 rounded-xl shadow-sm">
                    <div className="flex justify-between">
                        <SelectTimeRange />
                        <div className="px-2 py-1.5 bg-cs-background-primary rounded-lg">
                            <ChartNoAxesColumn className="text-cs-icon-primary" />
                        </div>
                    </div>
                    <div className="flex justify-between mt-8">
                            <div className="flex items-center">
                                <Dot className="text-green-400" size={36}/>
                                <span className="-translate-x-2 text-sm text-cs-foreground-primary">Total: </span>
                                <span className="text-sm text-cs-foreground-secondary">4</span>
                            </div>
                    </div>
                    <div className="mt-4">
                        <ReferralOverTimeChart />
                    </div>
                </div>
            </div>
        </>
    );
}
