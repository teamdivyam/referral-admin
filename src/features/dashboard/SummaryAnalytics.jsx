import { Link } from "react-router-dom";
import LoadingCircle from "../../components/loading-circle";
import AdminService from "../../services/admin.service";
import { useQuery } from "@tanstack/react-query";
import {
    IndianRupee,
    ScrollText,
    Sigma,
    Users,
    ArrowRight,
} from "lucide-react";
import { useContext } from "react";
import { PageContext } from "../../contexts/PageContext";

const fetchSummaryAnalytics = async () => {
    try {
        const response = await AdminService.dashboardAnalytics();
        return response.data;
    } catch (error) {
        console.error(
            "Error in fetching summary analytics:",
            error.response?.data?.error?.message || "fetch error"
        );
        throw error;
    }
};

const StatCard = ({ title, value, icon: Icon, link, loading, onClick }) => {
    const content = (
        <div className="group relative flex flex-col h-full p-6 bg-cs-background-secondary rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start">
                <div className="flex flex-col space-y-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {title}
                    </span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loading ? <LoadingCircle size="sm" /> : value || "0"}
                    </span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            {link && (
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
                    View details
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            )}
        </div>
    );

    return link ? (
        <Link to={link} onClick={onClick} className="block h-full">
            {content}
        </Link>
    ) : (
        <div className="h-full">{content}</div>
    );
};

export default function SummaryAnalytics() {
    const { setCurrentPage } = useContext(PageContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["summaryAnalytics"],
        queryFn: fetchSummaryAnalytics,
    });

    if (isError) {
        return (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="p-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20"
                    >
                        <p className="text-red-600 dark:text-red-400">
                            Failed to load data
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Referral Users"
                value={data?.totalReferralUser}
                icon={Users}
                link="/users"
                loading={isLoading}
                onClick={() => setCurrentPage(1)}
            />

            <StatCard
                title="Total Paid"
                value={
                    <div className="flex items-center">
                        <IndianRupee size={22} />
                        <span>{data?.totalPaidToReferralUser.toFixed(2)}</span>
                    </div>
                }
                icon={IndianRupee}
                loading={isLoading}
            />

            <StatCard
                title="Withdrawal Requests"
                value={data?.totalLatestWithdrawalRequest}
                icon={ScrollText}
                link="/withdrawals"
                loading={isLoading}
                onClick={() => setCurrentPage(2)}
            />

            <StatCard
                title="Referral Orders"
                value={data?.totalOrdersCompleted}
                icon={Sigma}
                loading={isLoading}
            />
        </div>
    );
}
