// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { ReceiptText } from "lucide-react";
// import { format } from "date-fns";
// import { Separator } from "@/components/ui/separator";

// export default function ViewDetailPendingReferral({ pendingReferral }) {
//     return (
//         <Dialog>
//             <form>
//                 <DialogTrigger asChild>
//                     <div>Details</div>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[425px] bg-cs-background-secondary">
//                     <DialogHeader>
//                         <DialogTitle className="flex items-center gap-2">
//                             <ReceiptText className="text-cs-icon-primary" />
//                             <span className="text-cs-foreground-primary">
//                                 Pending Referral Detail
//                             </span>
//                         </DialogTitle>
//                     </DialogHeader>
//                     <div className="flex my-3.5 flex-col gap-2.5">
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Referral ID
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary">
//                                 {pendingReferral.ref_id}
//                             </span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Referral Code
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.referral_code}
//                             </span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Order ID
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.order.slice(pendingReferral.order.length - 8).toUpperCase()}
//                             </span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Status
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.status}
//                             </span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Commission Amount
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.amount}
//                             </span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Refer Date
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {format(
//                                     pendingReferral.createdAt,
//                                     "dd/MM/yyyy"
//                                 )}
//                             </span>
//                         </div>
//                         <div className="font-medium text-cs-icon-primary">
//                             Referrer
//                         </div>
//                         <Separator />
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Name
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.referrer.fullName ||
//                                     "nil"}
//                             </span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Email
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.referrer.email ||
//                                     "nil"}
//                             </span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Phone
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.referrer.mobileNum}
//                             </span>
//                         </div>
//                         <div className="font-medium text-cs-icon-primary">
//                             Referee
//                         </div>
//                         <Separator />
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Name
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.referee.fullName ||
//                                     "nil"}
//                             </span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Email
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.referee.email || "nil"}
//                             </span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-medium text-sm text-cs-foreground-primary">
//                                 Phone
//                             </span>
//                             <span className="text-sm text-cs-foreground-secondary flex items-center">
//                                 {pendingReferral.referee.mobileNum}
//                             </span>
//                         </div>
//                     </div>
//                     <DialogFooter>
//                         <DialogClose asChild>
//                             <Button className="bg-cs-icon-primary text-white dark:text-cs-background-primary">
//                                 Close
//                             </Button>
//                         </DialogClose>
//                     </DialogFooter>
//                 </DialogContent>
//             </form>
//         </Dialog>
//     );
// }


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
import { ReceiptText, User, Mail, Phone, Calendar, Tag, Hash, IndianRupee, ChartPie } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function ViewDetailPendingReferral({ pendingReferral }) {
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
                                Pending Referral Details
                            </span>
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex my-3.5 flex-col gap-3">
                        {/* Referral Information Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-cs-icon-primary">
                                <Tag size={16} />
                                <span>Referral Information</span>
                            </div>
                            <Separator />
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Hash size={14} /> Referral ID
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.ref_id || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Tag size={14} /> Referral Code
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.referral_code || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Hash size={14} /> Order ID
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.order ? pendingReferral.order.slice(-8).toUpperCase() : "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <ChartPie size={14} /> Status
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.status || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <IndianRupee size={14} /> Commission
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} /> {pendingReferral.amount.toFixed(2)}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Calendar size={14} /> Refer Date
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.createdAt ? format(pendingReferral.createdAt, "dd/MM/yyyy") : "-"}
                                </span>
                            </div>
                        </div>

                        {/* Referrer Information Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-cs-icon-primary">
                                <User size={16} />
                                <span>Referrer Details</span>
                            </div>
                            <Separator />
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <User size={14} /> Name
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.referrer?.fullName || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Mail size={14} /> Email
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.referrer?.email || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Phone size={14} /> Phone
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.referrer?.mobileNum || "-"}
                                </span>
                            </div>
                        </div>

                        {/* Referee Information Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-cs-icon-primary">
                                <User size={16} />
                                <span>Referee Details</span>
                            </div>
                            <Separator />
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <User size={14} /> Name
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.referee?.fullName || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Mail size={14} /> Email
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.referee?.email || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Phone size={14} /> Phone
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {pendingReferral.referee?.mobileNum || "-"}
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