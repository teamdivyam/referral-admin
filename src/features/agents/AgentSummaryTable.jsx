import { IndianRupee } from "lucide-react";

export default function AgentSummaryTable({ referralUser }) {
    return (
        <div className="flex flex-col gap-2.5 px-2.5 py-2.5 border rounded-md bg-cs-background-secondary">
            {/* Total Earning Amount */}
            <div className="flex justify-between items-center text-sm">
                <span className="text-cs-foreground-primary">
                    Total Earning
                </span>
                <span className="flex items-center gap-1">
                    <IndianRupee className="size-3 text-cs-icon-primary" />
                    <span className="text-cs-foreground-secondary">
                        {referralUser.wallet.totalEarning}
                    </span>
                </span>
            </div>
            {/* Pending Withdrawal Amount */}
            <div className="flex justify-between items-center text-sm">
                <span className="text-cs-foreground-primary">
                    Pending Withdrawal
                </span>
                <span className="flex items-center gap-1">
                    <IndianRupee className="size-3 text-cs-icon-primary" />
                    <span className="text-cs-foreground-secondary">
                        {referralUser.wallet.pendingWithdrawal}
                    </span>
                </span>
            </div>
            {/* Balance */}
            <div className="flex justify-between items-center text-sm">
                <span className="text-cs-foreground-primary">Balance</span>
                <span className="flex items-center gap-1">
                    <IndianRupee className="size-3 text-cs-icon-primary" />
                    <span className="text-cs-foreground-secondary">
                        {referralUser.wallet.balance}
                    </span>
                </span>
            </div>
            {/* Pending Balance */}
            <div className="flex justify-between items-center text-sm">
                <span className="text-cs-foreground-primary">
                    Pending Balance
                </span>
                <span className="flex items-center gap-1">
                    <IndianRupee className="size-3 text-cs-icon-primary" />
                    <span className="text-cs-foreground-secondary">
                        {referralUser.wallet.pendingBalance}
                    </span>
                </span>
            </div>
            {/* Total Referal */}
            <div className="flex justify-between items-center text-sm">
                <span className="text-cs-foreground-primary">Total Refer</span>
                <span className="flex items-center gap-1">
                    <span className="text-cs-foreground-secondary">
                        {referralUser.referralEvents.length}
                    </span>
                </span>
            </div>
            {/* Total Order Completed */}
            <div className="flex justify-between items-center text-sm">
                <span className="text-cs-foreground-primary">
                    Total Order Completed
                </span>
                <span className="flex items-center gap-1">
                    <span className="text-cs-foreground-secondary">
                        {referralUser.referralEvents.length}
                    </span>
                </span>
            </div>
            {/* Available Referral Code */}
            <div className="flex justify-between items-center text-sm">
                <span className="text-cs-foreground-primary">
                    Referral Code
                </span>
                <span className="flex items-center gap-1">
                    <span className="text-cs-foreground-secondary">
                        {referralUser.referralCode}
                    </span>
                </span>
            </div>
        </div>
    );
}
