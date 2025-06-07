import { Link } from "react-router-dom";
import LoadingCircle from "../../components/loading-circle";
import AdminService from "../../services/admin.service";

import { useQuery } from "@tanstack/react-query";
import {
    Activity,
    Calendar,
    IndianRupee,
    ScrollText,
    Sigma,
    Users,
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
    }
};

export default function SummaryAnalytics() {
    const { setCurrentPage } = useContext(PageContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["summaryAnalytics"],
        queryFn: fetchSummaryAnalytics,
    });

    return (
        
        <>
            <Link to="/users" onClick={() => setCurrentPage(1)}>
                <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm transition-shadow duration-250 hover:shadow-md">
                    <div className="flex justify-center items-center">
                        <Users className="size-8 text-cs-icon-primary" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm text-cs-foreground-secondary">
                            Referral Users
                        </span>
                        <span className="text-2xl font-semibold text-sidebar-primary">
                            {isLoading ? (
                                <LoadingCircle />
                            ) : (
                                data.totalReferralUser
                            )}
                        </span>
                    </div>
                </div>
            </Link>
            <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm transition-shadow duration-250 hover:shadow-md">
                <div className="flex justify-center items-center">
                    <IndianRupee className="size-8 text-cs-icon-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-cs-foreground-secondary">
                        Total Paid
                    </span>
                    <span className="text-2xl font-semibold text-sidebar-primary">
                        {isLoading ? (
                            <LoadingCircle />
                        ) : (
                            data.totalPaidToReferralUser
                        )}
                    </span>
                </div>
            </div>
            <Link to="/withdrawals"  onClick={() => setCurrentPage(2)}>
                <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm transition-shadow duration-250 hover:shadow-md">
                    <div className="flex justify-center items-center">
                        <ScrollText className="size-8 text-cs-icon-primary" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm text-cs-foreground-secondary">
                            Withdrawal Request
                        </span>
                        <span className="text-2xl font-semibold text-sidebar-primary">
                            {isLoading ? (
                                <LoadingCircle />
                            ) : (
                                data.totalLatestWithdrawalRequest
                            )}
                        </span>
                    </div>
                </div>
            </Link>

            <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm transition-shadow duration-250 hover:shadow-md">
                <div className="flex justify-center items-center">
                    <Sigma className="size-8 text-cs-icon-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-cs-foreground-secondary">
                        Total Orders Via Referral
                    </span>
                    <span className="text-2xl font-semibold text-sidebar-primary">
                        {isLoading ? (
                            <LoadingCircle />
                        ) : (
                            data.totalOrdersCompleted
                        )}
                    </span>
                </div>
            </div>
            {/* <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm transition-shadow duration-250 hover:shadow-md">
                <div className="flex justify-center items-center">
                    <Calendar className="size-8 text-cs-icon-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-cs-foreground-secondary">
                        Total Referral This Month
                    </span>
                    <span className="text-2xl font-semibold text-sidebar-primary">
                        4669
                    </span>
                </div>
            </div> */}
        </>
    );
}
