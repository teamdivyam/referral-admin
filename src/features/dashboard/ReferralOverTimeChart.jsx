import { useQuery } from "@tanstack/react-query";
import BarChart from "../../components/charts/BarChart";
import SelectTimeRange from "@/features/dashboard/SelectTimeRange";
import { BarChart as BarChartIcon, Dot, Calendar } from "lucide-react";
import { useState } from "react";
import AdminService from "../../services/admin.service";
import LoadingCircle from "../../components/loading-circle";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const chartConfig = {
  referral: {
    label: "Referral Activity",
    color: "#3b82f6",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
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
    throw error;
  }
};

export default function ReferralOverTimeChart() {
  const [defineTime, setDefineTime] = useState("last7Days");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["referralOverTime", defineTime],
    queryFn: () => fetchReferralOverTimeDate(defineTime),
  });

  // Calculate total referrals for the selected period
  const totalReferrals = data?.referralOverTimeData?.reduce(
    (sum, item) => sum + (item.refers || 0),
    0
  );

  return (
    <Card className="col-span-5 lg:col-span-3 bg-cs-background-secondary">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">
            Referral Activity
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm font-normal">
              <Calendar className="h-3 w-3 mr-1" />
              {defineTime === "last7Days"
                ? "Last 7 Days"
                : defineTime === "thisMonth"
                ? "This Month"
                : "Last Month"}
            </Badge>
            {totalReferrals && (
              <Badge variant="secondary" className="text-sm">
                {totalReferrals} Referrals
              </Badge>
            )}
          </div>
        </div>
        <SelectTimeRange
          defineTime={defineTime}
          setDefineTime={setDefineTime}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <LoadingCircle size="lg" />
          </div>
        ) : isError ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4 text-red-500">
            <BarChartIcon className="h-8 w-8" />
            <p>Failed to load referral data</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="mt-4">
            <BarChart
              chartData={data?.referralOverTimeData}
              chartConfig={chartConfig}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}