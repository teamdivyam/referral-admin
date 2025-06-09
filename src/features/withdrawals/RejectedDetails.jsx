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

export default function RejectedDetails({ rejectedDetails }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div>Details</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-cs-background-primary">
                    <DialogHeader>
                        <DialogTitle className="text-red-500">Rejection Detail</DialogTitle>
                    </DialogHeader>
                    <div className="flex my-3.5 flex-col gap-2.5">
                        <div className="flex justify-between">
                            <span className="font-medium text-sm text-cs-foreground-primary">
                                Rejected Date
                            </span>
                            <span className="text-sm text-cs-foreground-secondary">
                                {format(rejectedDetails.updatedAt, "dd/MM/yyyy")}
                            </span>
                        </div>
                        <div className="flex justify-between">
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
