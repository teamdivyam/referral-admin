import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useMutationState } from "@tanstack/react-query";
import AdminService from "../../services/admin.service";

// Define validation schema
const passwordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(
                /[^A-Za-z0-9]/,
                "Must contain at least one special character"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

const reducerFn = (state, action) => {
    switch (action.type) {
        case "setShowCurrentPassword":
            return {
                ...state,
                showCurrentPassword: !state.showCurrentPassword,
            };
        case "setShowNewPassword":
            return { ...state, showNewPassword: !state.showNewPassword };
        case "setShowConfirmPassword":
            return {
                ...state,
                showConfirmPassword: !state.showConfirmPassword,
            };
    }
};

const initialState = {
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
};

const fetchChangePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
}) => {
    try {
        const response = await AdminService.resetPassword({
            currentPassword,
            newPassword,
            confirmPassword,
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default function ChangePasswordDialog() {
    const [open, setOpen] = useState(false);
    const [state, dispatch] = useReducer(reducerFn, initialState);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: fetchChangePassword,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                reset();
                setOpen(false);
            }
        },
        onError: (error) => {
            toast.error(error.response.data.error.message);
            reset();
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <KeyRound className="h-4 w-4" />
                    Change Password
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                            <Lock className="h-5 w-5" />
                        </div>
                        <div>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                                Update your dashboard password securely
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(mutate)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                            Current Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="currentPassword"
                                type={
                                    state.showCurrentPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter current password"
                                {...register("currentPassword")}
                                className={`pr-10 ${
                                    errors.currentPassword
                                        ? "border-red-500"
                                        : ""
                                }`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() =>
                                    dispatch({ type: "setShowCurrentPassword" })
                                }
                            >
                                {state.showCurrentPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.currentPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={
                                    state.showNewPassword ? "text" : "password"
                                }
                                placeholder="Enter new password"
                                {...register("newPassword")}
                                className={`pr-10 ${
                                    errors.newPassword ? "border-red-500" : ""
                                }`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() =>
                                    dispatch({ type: "setShowNewPassword" })
                                }
                            >
                                {state.showNewPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                            Confirm New Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={
                                    state.showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm new password"
                                {...register("confirmPassword")}
                                className={`pr-10 ${
                                    errors.confirmPassword
                                        ? "border-red-500"
                                        : ""
                                }`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() =>
                                    dispatch({ type: "setShowConfirmPassword" })
                                }
                            >
                                {state.showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Change Password"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
