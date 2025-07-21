import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import loginSchema from "../validator/loginForm";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthService from "../services/auth.service";

const fetchLogin = async ({ email, password }) => {
    try {
        const response = await AuthService.login({ email, password });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export default function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: joiResolver(loginSchema),
    });

    const mutation = useMutation({
        mutationFn: fetchLogin,
        onSuccess: (data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            }
        },
        onError: (error) => {
                toast.error(
                error.response?.data?.error?.message ||
                    "Login failed. Please try again."
            );
            reset();
        },
    });

    const onSubmit = async (formData) => {
        const { email, password } = formData;
        mutation.mutate({ email, password });
    };

    return (
        <div className="min-h-svh w-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-lg rounded-xl overflow-hidden border-0 bg-cs-background-primary">
                    <CardHeader className="text-cs-foreground-primary p-8 pb-6">
                        <div className="flex flex-col items-center">
                            <Avatar className="h-16 w-16">
                                <AvatarImage
                                    src="/img/logo.png"
                                    alt="Company Logo"
                                    className="w-16 invert rotateImg dark:invert-0"
                                />
                                <AvatarFallback>DV</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-3xl font-bold">
                                Welcome Back
                            </CardTitle>
                            <CardDescription className="text-cs-foreground-primary mt-2">
                                Sign in to access your dashboard
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-6">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-cs-foreground-primary font-medium"
                                    >
                                        Email Address
                                    </Label>
                                    <Input
                                        {...register("email")}
                                        type="email"
                                        // ref={inputRef}
                                        placeholder="your@email.com"
                                        className={`py-3 px-4 ${
                                            errors.email
                                                ? "border-red-300 focus:ring-red-200"
                                                : "focus:ring-blue-200"
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {errors.email?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="password"
                                            className="text-cs-foreground-primary font-medium"
                                        >
                                            Password
                                        </Label>
                                        <a
                                            href="#"
                                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                    <Input
                                        {...register("password")}
                                        type="password"
                                        placeholder="••••••••"
                                        className={`py-3 px-4 ${
                                            errors.password
                                                ? "border-red-300 focus:ring-red-200"
                                                : "focus:ring-blue-200"
                                        }`}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {errors.password?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                disabled={isSubmitting}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="p-8 pt-0">
                        <div className="text-center text-sm text-cs-foreground-primary">
                            Don't have an account?{" "}
                            <Link
                                to="#"
                                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                            >
                                Contact administrator
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
                <div className="mt-6 text-center text-xs text-white">
                    © {new Date().getFullYear()} Divyam. All rights reserved.
                </div>
            </div>
        </div>
    );
}
