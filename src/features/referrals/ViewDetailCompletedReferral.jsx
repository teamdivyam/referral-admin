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
import { ReceiptText } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function ViewDetailCompletedReferral({ completedReferral }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div>Details</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-cs-background-secondary">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <ReceiptText className="text-cs-icon-primary" />
                            <span className="text-cs-foreground-primary">
                                Completed Referral Detail
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex my-3.5 flex-col gap-2.5">
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Referral ID
                            </span>
                            <span className="text-sm text-cs-foreground-secondary">
                                {completedReferral.ref_id}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Referral Code
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.referral_code}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Order ID
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.order.slice(completedReferral.order.length - 8).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Status
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.status}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Commission Amount
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.amount}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Refer Date
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {format(
                                    completedReferral.createdAt,
                                    "dd/MM/yyyy"
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Complete Date
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {format(
                                    completedReferral.processed_at,
                                    "dd/MM/yyyy"
                                )}
                            </span>
                        </div>
                        <div className="font-medium text-cs-icon-primary">
                            Referrer
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Name
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.referrer_user_id.fullName ||
                                    "nil"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Email
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.referrer_user_id.email ||
                                    "nil"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Phone
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.referrer_user_id.mobileNum}
                            </span>
                        </div>
                        <div className="font-medium text-cs-icon-primary">
                            Referee
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Name
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.referee_user_id.fullName ||
                                    "nil"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Email
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.referee_user_id.email || "nil"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Phone
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {completedReferral.referee_user_id.mobileNum}
                            </span>
                        </div>
                    </div>
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
