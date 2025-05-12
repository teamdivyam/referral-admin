// import BarChart from "@/components/charts/BarChart";
import BarChart from "../../components/charts/BarChart";

const chartDataLast7Days = [
    { day: "06", referral: 12 },
    { day: "05", referral: 13 },
    { day: "04", referral: 81 },
    { day: "03", referral: 45 },
    { day: "02", referral: 19 },
    { day: "01", referral: 12 },
    { day: "30", referral: 22 },
];

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

export default function ReferralOverTimeChart() {
    return (
        <div className="">
            <BarChart
                chartDataLast7Days={chartDataLast7Days}
                chartConfig={chartConfig}
            />
        </div>
    );
}
