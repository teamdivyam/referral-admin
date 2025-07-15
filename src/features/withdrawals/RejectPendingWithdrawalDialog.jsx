import AdminService from "../../services/admin.service";
import { useReducer, useState } from "react";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";

const fetchRejectedWithdrawal = async ({ withdrawalId, remarks }) => {
    try {
        const response = await AdminService.rejectedWithdrawalRequest(
            withdrawalId,
            remarks
        );

        return response.data;
    } catch (error) {
        return error;
    }
};

export default function RejectPendingWithdrawalDialog({
    withdrawalId,
    refetch,
}) {
    const [open, setOpen] = useState(false);
    const [remarks, setRemarks] = useState("");

    const { mutate, isSubmitting } = useMutation({
        mutationFn: fetchRejectedWithdrawal,
        onSuccess: (data) => {
            toast(data.message);
            refetch();
            setOpen(false);
        },
        onError: (error) => {
            toast(error.response.data.error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        mutate({
            withdrawalId: withdrawalId,
            remarks: remarks,
        });
    };

    const handleOpenChange = (open) => {
        if (!open && isSubmitting) {
            return;
        }
        setOpen(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <span className="text-sm text-cs-foreground-primary">
                        Reject
                    </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-cs-background-secondary">
                    <DialogHeader>
                        <DialogTitle>Reject Withdrawal</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Remarks</Label>
                            <Input
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
