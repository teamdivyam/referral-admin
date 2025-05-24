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

export default function ActivateAccountAlert({ agentId }) {

    const handleClick = async () => {

        console.log("Click on deactivate account.")
        try {
            const response = await AdminService.activateAccount(agentId);

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
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleClick}
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

