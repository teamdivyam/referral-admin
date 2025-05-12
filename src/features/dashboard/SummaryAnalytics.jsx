import {
    Activity,
    Calendar,
    IndianRupee,
    ScrollText,
    Sigma,
    Users,
} from "lucide-react";

export default function SummaryAnalytics() {
    return (
        <>
            <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm">
                <div className="flex justify-center items-center">
                    <Users className="size-8 text-cs-icon-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-cs-foreground-secondary">
                        Total Agents
                    </span>
                    <span className="text-2xl font-semibold text-sidebar-primary">
                        4669
                    </span>
                </div>
            </div>
            <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm">
                <div className="flex justify-center items-center">
                    <Activity className="size-8 text-cs-icon-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-cs-foreground-secondary">
                        Active Codes
                    </span>
                    <span className="text-2xl font-semibold text-sidebar-primary">
                        287
                    </span>
                </div>
            </div>
            <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm">
                <div className="flex justify-center items-center">
                    <IndianRupee className="size-8 text-cs-icon-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-cs-foreground-secondary">
                        Total Paid
                    </span>
                    <span className="text-2xl font-semibold text-sidebar-primary">
                        25,678
                    </span>
                </div>
            </div>
            <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm">
                <div className="flex justify-center items-center">
                    <ScrollText className="size-8 text-cs-icon-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-cs-foreground-secondary">
                        Withdrawal Request
                    </span>
                    <span className="text-2xl font-semibold text-sidebar-primary">
                        125
                    </span>
                </div>
            </div>
            <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm">
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
            </div>
            <div className="flex px-2.5 py-4.5 gap-5.5 bg-cs-background-secondary rounded-lg shadow-sm">
                <div className="flex justify-center items-center">
                    <Sigma className="size-8 text-cs-icon-primary" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-cs-foreground-secondary">
                        Total Order Via Referral
                    </span>
                    <span className="text-2xl font-semibold text-sidebar-primary">
                        4669
                    </span>
                </div>
            </div>
        </>
    );
}
