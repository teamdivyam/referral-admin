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
import { toast } from "sonner";
import AdminService from "../../services/admin.service";

export default function ActivateAccountAlert({ referralUserId }) {

    const handleClick = async () => {

        console.log("Click on deactivate account.")
        try {
            const response = await AdminService.activateAccount(referralUserId);

            if (response.data.success) {
                return toast(response.data?.message);
            }

            toast("Activate agent account operation is failed!")
        } catch (error) {
            console.error("Error in activating agent account:", error.message);

            toast(error.response?.data?.error?.message || "Internal Server Error! FR");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span className="text-sm text-cs-foreground-primary">
                    Activate Account
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Activate Account Confirmation ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                    This action is used to activate the deactivate agent account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleClick}
                    >Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

