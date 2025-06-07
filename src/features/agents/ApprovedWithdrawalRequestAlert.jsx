import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AdminService from "../../services/admin.service";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ApprovedWithdrawalRequestAlert({ withdrawalId }) {
    const [transactionId, setTransactionId] = useState("");
    const [remarks, setRemarks] = useState("");

    const handleClick = async () => {
        try {
            const response = await AdminService.approveWithdrawalRequest(
                withdrawalId,
                transactionId,
                remarks
            );

            if (response.data.success) {
                return toast(response.data?.message);
            }

            toast("Approved withdrawal request operation is failed!");
        } catch (error) {
            console.error(
                "Error in approved withdrawal request:",
                error.message
            );

            toast(
                error.response?.data?.error?.message ||
                    "Internal Server Error! FR"
            );
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="text-sm text-cs-foreground-primary">
                    Approved
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Approved Withdrawal</AlertDialogTitle>
                </AlertDialogHeader>
                <Input
                    placeholder="Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                />
                <Input
                    placeholder="Remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
