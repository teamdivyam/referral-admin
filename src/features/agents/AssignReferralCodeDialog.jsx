import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import AdminService from "../../services/admin.service";
import { toast } from "sonner";

export default function AssignReferralCodeDialog({ agentId, name }) {
    const [dialogToggle, setDialogToggle] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = async () => {
        try {
            const response = await AdminService.assignReferralCode(agentId, quantity);

            if (response.data.success) {
                toast("Successfully Assigned Referral Code");
                setDialogToggle(false);
            }
        } catch (error) {
            console.error("Error in assigning referral code:", error.message);
        }
    };

    return (
        <Dialog open={dialogToggle} onOpenChange={setDialogToggle}>
            <DialogTrigger asChild>
                <span className="text-sm text-cs-foreground-primary">
                    Assign Refer Code
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Assign Referral Code</DialogTitle>
                </DialogHeader>
                <DialogDescription>To: {name}</DialogDescription>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Quantity
                        </Label>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Assign</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
