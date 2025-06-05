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
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function RejectWithdrawalRequestAlert({ withdrawalId }) {
    const [remarks, setRemarks] = useState("");

    const handleClick = async () => {
        try {
            const response = await AdminService.rejectedWithdrawalRequest(
                withdrawalId,
                remarks
            );

            if (response.data.success) {
                return toast(response.data?.message);
            }

            toast("Rejected withdrawal request operation is failed!");
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
                    Reject
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Reject Withdrawal
                    </AlertDialogTitle>
                    {/* <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription> */}
                </AlertDialogHeader>
                <Input
                    placeholder="remarks"
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
