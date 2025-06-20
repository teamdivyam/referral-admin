import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { IndianRupee, ReceiptText } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AdminService from "../../services/admin.service";
import LoadingCircle from "../../components/loading-circle";

const fetchWithdrawals = async (referralUserId) => {
    try {
        const response = await AdminService.referralUserBalance(referralUserId);

        return response?.data?.userInfo;
    } catch (error) {
        console.log(error);
    }
};

export default function UserInfo({ referralUserId }) {
    const { data, isLoading } = useQuery({
        queryKey: ["withdrawals"],
        queryFn: () => fetchWithdrawals(referralUserId),
    });

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div>Check Balance</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-cs-background-secondary">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <ReceiptText className="text-cs-icon-primary" />
                            <span className="text-cs-foreground-primary">
                                User Wallet
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    {isLoading ? (
                        <div className="w-full h-64 flex justify-center items-center">
                            <LoadingCircle />
                        </div>
                    ) : (
                        <div className="flex my-3.5 flex-col gap-2.5">
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    User
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    {data.user?.fullName}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Balance
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} />{" "}
                                    {data.wallet?.balance}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Pending Balance
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} />{" "}
                                    {data.wallet?.pendingBalance}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Pending Withdrawal
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} />{" "}
                                    {data.wallet?.pendingWithdrawal}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Total Earning
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} />{" "}
                                    {data.wallet?.totalEarning}
                                </span>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="bg-cs-icon-primary text-white dark:text-cs-background-primary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
