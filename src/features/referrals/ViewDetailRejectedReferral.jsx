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

export default function ViewDetailRejectedReferral({ rejectedReferral }) {
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
                                Pending Referral Detail
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex my-3.5 flex-col gap-2.5">
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Referral ID
                            </span>
                            <span className="text-sm text-cs-foreground-secondary">
                                {rejectedReferral.ref_id}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Referral Code
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {rejectedReferral.referral_code}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Order ID
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {rejectedReferral.order.slice(rejectedReferral.order.length - 8).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Status
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {rejectedReferral.status}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Commission Amount
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {rejectedReferral.amount}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Refer Date
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {format(
                                    rejectedReferral.createdAt,
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
                                {rejectedReferral.referrer.fullName ||
                                    "nil"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Email
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {rejectedReferral.referrer.email ||
                                    "nil"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Phone
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {rejectedReferral.referrer.mobileNum}
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
                                {rejectedReferral.referee.fullName ||
                                    "nil"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Email
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {rejectedReferral.referee.email || "nil"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Phone
                            </span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                {rejectedReferral.referee.mobileNum}
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
