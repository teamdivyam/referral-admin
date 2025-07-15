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
import { IndianRupee, ReceiptText, Mail, Phone, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function PendingRequestDetail({ pendingRequest }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div>
                        View Details
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-cs-background-secondary">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <ReceiptText className="text-cs-icon-primary" />
                            <span className="text-cs-foreground-primary">
                                Pending Request Details
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex my-3.5 flex-col gap-3">
                        {/* User Information Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-cs-icon-primary">
                                <User size={16} />
                                <span>User Information</span>
                            </div>
                            <Separator />
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Name
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingRequest.user?.fullName || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Email
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center gap-1">
                                    <Mail size={14} />
                                    {pendingRequest.user?.email || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Mobile
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center gap-1">
                                    <Phone size={14} />
                                    {pendingRequest.user?.mobile || "-"}
                                </span>
                            </div>
                        </div>

                        {/* Wallet Information Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-cs-icon-primary">
                                <IndianRupee size={16} />
                                <span>Wallet Information</span>
                            </div>
                            <Separator />
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Balance
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} /> {pendingRequest.referralUser.wallet.balance.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Pending Balance
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} /> {pendingRequest.referralUser.wallet.pendingBalance.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Pending Withdrawal
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} /> {pendingRequest.referralUser.wallet.pendingWithdrawal.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary">
                                    Total Earning
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} /> {pendingRequest.referralUser.wallet.totalEarning.toFixed(2)}
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
