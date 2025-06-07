import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import AdminService from "../../services/admin.service";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fetchWithdrawals = async (page) => {
    try {
        const response = await AdminService.withdrawals("rejected", page);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default function RejectedWithdrawals() {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useQuery({
        queryKey: ["withdrawals", page],
        queryFn: () => fetchWithdrawals(page),
    });

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-xl font-semibold text-cs-foreground-primary">
                    {data.rows} Rows
                </div>
                <div className="mt-3.5 flex justify-end gap-2.5">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </Button>
                    <Button variant="outline" disabled={true}>
                        {Math.ceil(data.rows / 50)}
                    </Button>
                    <Button
                        variant="outline"
                        disabled={
                            data.rows === 0 ||
                            page === Math.ceil(data.rows / 50)
                        }
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <Table className="mt-4 bg-cs-background-secondary rounded-md max-h-[540px] relative">
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-3.5 font-base sticky top-0 z-1 bg-cs-background-secondary">
                            Request Date
                        </TableHead>
                        <TableHead className="py-3.5 font-base sticky top-0 z-1 bg-cs-background-secondary">
                            Status
                        </TableHead>
                        <TableHead className="py-3.5 font-base sticky top-0 z-1 bg-cs-background-secondary">
                            Bank Account
                        </TableHead>
                        <TableHead className="py-3.5 font-base sticky top-0 z-1 bg-cs-background-secondary">
                            Amount
                        </TableHead>
                        <TableHead className="text-right py-3.5 font-base sticky top-0 z-1 bg-cs-background-secondary">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.withdrawals.map((request) => (
                        <TableRow key={request._id}>
                            <TableCell className="font-medium">
                                {format(request.createdAt, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell>{request.status}</TableCell>
                            <TableCell>{request.bank.name}</TableCell>
                            <TableCell>{request.amount}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0 cursor-pointer"
                                            >
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem className="cursor-pointer">
                                                Remarks
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                Approved
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-3.5 flex justify-end gap-2.5">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </Button>
                <Button variant="outline" disabled={true}>
                    {Math.ceil(data.rows / 50)}
                </Button>
                <Button
                    variant="outline"
                    disabled={
                        data.rows === 0 || page === Math.ceil(data.rows / 50)
                    }
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
