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
import { Ban, IndianRupee } from "lucide-react";

export default function RejectedDetails({ rejectedDetails }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div>Details</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-cs-background-secondary">
                    <DialogTitle className="flex items-center gap-2">
                            <Ban className="text-red-500"/>
                            <span className="text-cs-foreground-primary">Rejected Details</span>
                        </DialogTitle>
                    <div className="flex my-3.5 flex-col gap-2.5">
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Reject Date & Time
                            </span>
                            <span className="text-sm text-cs-foreground-secondary">
                                {format(rejectedDetails.processedAt, "dd/MM/yyyy")} &nbsp;
                                {format(rejectedDetails.createdAt, "hh:mm:ss")}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Status
                            </span>
                            <span className="text-sm text-cs-foreground-secondary">
                                {rejectedDetails.status}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Amount
                            </span>
                            <span className="text-sm text-cs-foreground-secondary  flex items-center">
                                <IndianRupee size={14}/> {rejectedDetails.amount}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1.5 justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Remark
                            </span>
                            <span className="text-sm text-cs-foreground-secondary">
                                {rejectedDetails.remarks}
                            </span>
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
