import { useQuery } from "@tanstack/react-query";
import BarChart from "../../components/charts/BarChart";
import SelectTimeRange from "@/features/dashboard/SelectTimeRange";
import { ChartNoAxesColumn, Dot } from "lucide-react";
import { useState } from "react";
import AdminService from "../../services/admin.service";
import LoadingCircle from "../../components/loading-circle";

const chartConfig = {
    referral: {
        label: "Referral",
        color: "#2563eb",
        theme: {
            light: "#2563eb",
            dark: "#dc2626",
        },
    },
};

const fetchReferralOverTimeDate = async (defineTime) => {
    try {
        const response = await AdminService.referralOverTimeData(defineTime);
        return response.data;
    } catch (error) {
        console.error(
            "Error in fetching referral over time:",
            error.response?.data?.error?.message || "fetch error"
        );
    }
};

export default function ReferralOverTimeChart() {
    const [defineTime, setDefineTime] = useState("last7Days");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["referralOverTime", defineTime],
        queryFn: () => fetchReferralOverTimeDate(defineTime),
    });

    return (
        <div className="col-span-5 lg:col-span-3 bg-cs-background-secondary px-6 py-6.5 rounded-xl shadow-sm">
            <div className="flex justify-between">
                <SelectTimeRange
                    defineTime={defineTime}
                    setDefineTime={setDefineTime}
                />
                <div className="px-2 py-1.5 bg-cs-background-primary rounded-lg">
                    <ChartNoAxesColumn className="text-cs-icon-primary" />
                </div>
            </div>
            {/* <div className="flex justify-between mt-8">
                <div className="flex items-center">
                    <Dot className="text-green-400" size={36} />
                    <span className="-translate-x-2 text-sm text-cs-foreground-primary">
                        Total:{" "}
                    </span>
                    <span className="text-sm text-cs-foreground-secondary">
                        4
                    </span>
                </div>
            </div> */}
            {isLoading ? (
                <div className="w-full h-64 flex justify-center items-center ">
                    <LoadingCircle />
                </div>
            ) : (
                <div className="mt-16">
                    <div className="">
                        <BarChart
                            chartData={data?.referralOverTimeData}
                            chartConfig={chartConfig}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
