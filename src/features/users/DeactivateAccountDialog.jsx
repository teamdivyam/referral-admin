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

export default function DeactivateAccountAlert({ referralUserId }) {
    const handleClick = async () => {
        try {
            const response = await AdminService.deactivateAccount(referralUserId);

            if (response.data.success) {
                return toast(response.data?.message);
            }

            toast("deactivate agent account operation is failed!");
        } catch (error) {
            console.error(
                "Error in deactivating agent account:",
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
                    Deactivate Account
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Deactivate Account Confirmation ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action is used to deactivate the activate agent
                        account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
