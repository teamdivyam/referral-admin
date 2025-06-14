import { useQuery } from "@tanstack/react-query";
import AdminService from "../../services/admin.service";
import LoadingCircle from "../../components/loading-circle";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { CreditCard, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DetailPayout from "./DetailPayout";

const fetchLatestPayout = async (page) => {
    try {
        const response = await AdminService.latestPayout(page);
        return response.data;
    } catch (error) {
        console.error(
            "Error in fetching referral over time:",
            error.response?.data?.error?.message || "fetch error"
        );
    }
};

export default function LatestPayout() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["referralOverTime"],
        queryFn: () => fetchLatestPayout(),
    });

    return (
        <div className="col-span-5 lg:col-span-2 lg:row-span-3 bg-cs-background-secondary px-6 py-6.5 rounded-xl shadow-sm">
            <div className="flex item-center gap-2 mb-4">
                <CreditCard className="size-8 text-cs-icon-primary" />
                <span className="text-cs-foreground-primary text-xl font-semibold">
                    Latest Payout
                </span>
            </div>
            {isLoading ? (
                <div className="w-full h-64 flex justify-center items-center ">
                    <LoadingCircle />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="bg-cs-background-secondary">
                            <TableHead className="text-cs-foreground-primary">
                                Date & Time
                            </TableHead>
                            <TableHead className="text-cs-foreground-primary">
                                Status
                            </TableHead>
                            <TableHead className="text-cs-foreground-primary">
                                Amount
                            </TableHead>
                            <TableHead className="text-right text-cs-foreground-primary ">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.latestPayout.length === 0 ? (
                            <TableRow className="bg-cs-background-secondary">
                                <TableCell
                                    colSpan={4}
                                    className="h-24 text-center"
                                >
                                    Empty latest Payout
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.latestPayout.map((payout, index) => (
                                <TableRow
                                    key={index}
                                    className="bg-cs-background-secondary"
                                >
                                    <TableCell className="font-medium">
                                        {format(payout.createdAt, "dd/MM/yyyy")}
                                    </TableCell>
                                    <TableCell>{payout.status}</TableCell>
                                    <TableCell>{payout.amount}</TableCell>
                                    <TableCell>
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
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onSelect={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        <DetailPayout payout={payout}/>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onSelect={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        
                    </TableBody>
                </Table>
            )}
            <div className="mt-3.5 flex justify-end gap-2.5">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Prev
                </Button>
                <Button variant="outline" disabled={true}>
                    {Math.ceil(data?.rows / 50)}
                </Button>
                <Button
                    variant="outline"
                    disabled={
                        data?.rows === 0 || page === Math.ceil(data?.rows / 50)
                    }
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}