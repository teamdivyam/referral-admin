import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import {
    PlusCircle,
    Trash2,
    Edit,
    Loader2,
    Link,
    ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import AdminService from "../services/admin.service";
import { formatDate } from "date-fns/format";
import { newAdminSchema } from "../validator";
import { joiResolver } from "@hookform/resolvers/joi";

const fetchAdmins = async () => {
    try {
        const response = await AdminService.getAdmins();

        return response.data;
    } catch (error) {
        throw error;
    }
};

const fetchCreateAdmin = async ({ name, email, role, password }) => {
    try {
        const response = await AdminService.createAdmin({
            name,
            email,
            role,
            password,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

const fetchDeleteAdmin = async ({ adminId }) => {
    try {
        const response = await AdminService.deleteAdmin(adminId);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export default function Admin() {
    const [openDialog, setOpenDialog] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(newAdminSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "admin",
            password: "",
        },
    });

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["get-admins"],
        queryFn: fetchAdmins,
    });

    const mutationDelete = useMutation({
        mutationFn: fetchDeleteAdmin,
        onSuccess: (data) => {
            if (data.success) {
                refetch();
            }
        },
    });

    const mutationSubmit = useMutation({
        mutationFn: fetchCreateAdmin,
        onSuccess: (data) => {
            if (data.success) {
                reset();
                refetch();
                setOpenDialog(false);
            }
        },
    });

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-end items-center mb-8">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Admin
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Create New Admin</DialogTitle>
                            <DialogDescription>
                                Add a new admin to the system. They will receive
                                login credentials.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={handleSubmit(mutationSubmit.mutate)}
                            className="space-y-4"
                        >
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Admin name"
                                        {...register("name")}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@example.com"
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Create a password"
                                        {...register("password")}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <select
                                        id="role"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        {...register("role")}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="super_admin">
                                            Super Admin
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={mutationSubmit.isLoading}>
                                    {mutationSubmit.isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Admin"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <div className="border rounded-lg overflow-hidden">
                    <Table className="bg-cs-background-secondary rounded-b-md border relative">
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Last Active</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.admins.map((admin) => (
                                <TableRow key={admin.id}>
                                    <TableCell className="font-medium">
                                        {admin.name}
                                    </TableCell>
                                    <TableCell>{admin.email}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${
                                                admin.role === "super_admin"
                                                    ? "bg-purple-100 text-purple-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {admin.role}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(
                                            admin.createdAt,
                                            "dd/MM/yyyy"
                                        )}
                                    </TableCell>
                                    <TableCell>{admin.lastActive}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="cursor-pointer"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="cursor-pointer"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            {admin.role !== "super_admin" && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        mutationDelete.mutate({
                                                            adminId: admin._id,
                                                        })
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
