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
import { format } from "date-fns";
import { Ban, IndianRupee, Calendar, Clock, AlertCircle, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function RejectRequestDetail({ rejectedRequest }) {
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
                            <Ban className="text-red-500" />
                            <span className="text-cs-foreground-primary">Rejected Request Details</span>
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex my-3.5 flex-col gap-3">
                        {/* Rejection Information Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-red-500">
                                <AlertCircle size={16} />
                                <span>Rejection Details</span>
                            </div>
                            <Separator />
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Calendar size={14} /> Reject Date
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {rejectedRequest.updatedAt ? format(rejectedRequest.updatedAt, "dd/MM/yyyy") : "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <Clock size={14} /> Reject Time
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {rejectedRequest.updatedAt ? format(rejectedRequest.updatedAt, "hh:mm:ss a") : "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <AlertCircle size={14} /> Status
                                </span>
                                <span className="text-sm text-cs-foreground-secondary">
                                    {rejectedRequest.status || "-"}
                                </span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <IndianRupee size={14} /> Amount
                                </span>
                                <span className="text-sm text-cs-foreground-secondary flex items-center">
                                    <IndianRupee size={14} /> {rejectedRequest.amount || "0"}
                                </span>
                            </div>
                        </div>

                        {/* Remarks Section */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 font-medium text-red-500">
                                <FileText size={16} />
                                <span>Rejection Remarks</span>
                            </div>
                            <Separator />
                            
                            <div className="flex flex-col gap-1">
                                <span className="font-medium text-sm text-cs-foreground-primary flex items-center gap-1">
                                    <FileText size={14} /> Reason
                                </span>
                                <div className="text-sm text-cs-foreground-secondary bg-cs-background-primary p-2 rounded-md">
                                    {rejectedRequest.remarks || "No remarks provided"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="bg-cs-foreground-primary text-white dark:text-cs-background-primary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}