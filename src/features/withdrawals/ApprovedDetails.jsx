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
import { IndianRupee } from "lucide-react";
import { format } from "date-fns";

export default function ApprovedDetails({ approvedDetails }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div>Details</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-cs-background-primary">
                    <DialogHeader>
                        <DialogTitle className="text-green-500">Payment Details</DialogTitle>
                    </DialogHeader>
                    <div className="flex my-3.5 flex-col gap-2.5">
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">Transaction ID</span>
                            <span className="text-sm text-cs-foreground-secondary">{approvedDetails.transactionRef}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">Amount</span>
                            <span className="text-sm text-cs-foreground-secondary flex items-center">
                                <IndianRupee size={14}/> {approvedDetails.amount}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">Date</span>
                            <span className="text-sm text-cs-foreground-secondary">{format(approvedDetails.createdAt, "dd/MM/yyyy")}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">Time</span>
                            <span className="text-sm text-cs-foreground-secondary">{format(approvedDetails.createdAt, "hh:mm:ss")}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">Bank</span>
                            <span className="text-sm text-cs-foreground-secondary">{approvedDetails.bank.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">Account No</span>
                            <span className="text-sm text-cs-foreground-secondary">{approvedDetails.bank.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">Account Holder</span>
                            <span className="text-sm text-cs-foreground-secondary">{approvedDetails.bank.accountHolderName}</span>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="bg-cs-foreground-primary text-white dark:text-cs-background-primary">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
