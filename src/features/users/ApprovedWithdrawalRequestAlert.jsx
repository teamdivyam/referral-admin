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

const fetchApprovedWithdrawal = async ({
    withdrawalId,
    transactionId,
    remarks,
}) => {
    try {
        const response = await AdminService.approveWithdrawalRequest(
            withdrawalId,
            transactionId,
            remarks
        );

        return response.data;
    } catch (error) {
        return error;
    }
};

const reducerFn = (state, action) => {
    switch (action.type) {
        case "setTransactionId":
            return { ...state, transactionId: action.value };
        case "setRemarks":
            return { ...state, remarks: action.value };
        case "reset":
            return { ...state, transactionId: "", remarks: "" };
        default:
            return state;
    }
};

const initialState = {
    transactionId: "",
    remarks: "",
};

export default function ApprovedWithdrawalRequestDialog({ withdrawalId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [state, dispatch] = useReducer(reducerFn, initialState);

    const { mutate, isSubmitting } = useMutation({
        mutationFn: fetchApprovedWithdrawal,
        onSuccess: (data) => {
            dispatch({ type: "reset" });
            toast(data.message);
            setIsOpen(false);
        },
        onError: (error) => {
            toast(error.response.data.error.message);
        },
    });

    const handleSubmit = () => {
        mutate({
            withdrawalId: withdrawalId,
            transactionId: state.transactionId,
            remarks: state.remarks,
        });
    };

    const handleOpenChange = (open) => {
        if (!open && isSubmitting) {
            return;
        }
        setIsOpen(open);
        if (!open) {
            dispatch({ type: "reset" });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <span className="text-sm text-cs-foreground-primary">
                        Approved
                    </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-cs-background-secondary">
                    <DialogHeader>
                        <DialogTitle>Approved Withdrawal</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Transaction ID</Label>
                            <Input
                                type="number"
                                value={state.transactionId}
                                onChange={(e) =>
                                    dispatch({
                                        type: "setTransactionId",
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Remarks</Label>
                            <Input
                                value={state.remarks}
                                onChange={(e) =>
                                    dispatch({
                                        type: "setRemarks",
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}