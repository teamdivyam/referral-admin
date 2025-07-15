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
import {
    IndianRupee,
    ReceiptText,
    Calendar,
    Clock,
    CreditCard,
    Hash,
    User,
    Banknote,
} from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function ApprovedRequestDetails({ approvedRequest }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div>View Details</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-cs-background-secondary">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <ReceiptText className="text-cs-icon-primary" />
                            <span className="text-cs-foreground-primary">
                                Payment Details
                            </span>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex my-3.5 flex-col gap-3">
                        {/* Transaction Information Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-cs-icon-primary">
                                <CreditCard size={16} />
                                <span>Transaction Details</span>
                            </div>
                            <Separator />

                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Hash size={14} /> Transaction ID
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {approvedRequest.transaction_id || "-"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Banknote size={14} /> Amount
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} />{" "}
                                    {approvedRequest.amount || "0"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Calendar size={14} /> Date
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {approvedRequest.createdAt
                                        ? format(
                                              approvedRequest.createdAt,
                                              "dd/MM/yyyy"
                                          )
                                        : "-"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Clock size={14} /> Time
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {approvedRequest.createdAt
                                        ? format(
                                              approvedRequest.createdAt,
                                              "hh:mm:ss a"
                                          )
                                        : "-"}
                                </span>
                            </div>
                        </div>

                        {/* Bank Information Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-cs-icon-primary">
                                <CreditCard size={16} />
                                <span>Bank Details</span>
                            </div>
                            <Separator />

                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <CreditCard size={14} /> Bank
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {approvedRequest.bank?.name || "-"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Hash size={14} /> Account No
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {approvedRequest.bank?.accountNumber || "-"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <User size={14} /> Account Holder
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {approvedRequest.bank?.accountHolderName ||
                                        "-"}
                                </span>
                            </div>
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
