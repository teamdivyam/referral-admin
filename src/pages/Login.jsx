import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import loginSchema from "../validator/loginForm";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAxiosPost } from "../hooks/useAxios";
import AuthService from "@/services/auth.service";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

export default function Login() {
    const { fetchError, postData } = useAxiosPost({
        adminService: AuthService.login,
    });
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: joiResolver(loginSchema),
    });

    const onSubmit = async (formValues) => {
        try {
            const response = await postData(formValues);
            console.log(response.data);

            if (response.data.success) {
                /* Destruct Authorization Token from Response
                and Store token in localStorage */
                const token = response.data.token;
                localStorage.setItem("token", token);

                navigate("/dashboard");
            }
        } catch (_) {
            toast(fetchError);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            {...register("email")}
                                            type="email"
                                            placeholder="m@email.com"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="text-red-200 text-sm">
                                                {errors.email?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                        </div>
                                        <Input
                                            {...register("password")}
                                            type="password"
                                            required
                                        />
                                        {errors.password && (
                                            <p className="text-red-200 text-sm">
                                                {errors.email?.password}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" />
                                                <span>Logging</span>
                                            </>
                                        ) : (
                                            <>Login</>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
