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
import {
    CreditCard,
    MoreHorizontal,
    IndianRupee,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

const PAGE_LIMIT = 7;

const fetchLatestPayout = async (page) => {
    try {
        const response = await AdminService.latestPayout(page);
        return response.data;
    } catch (error) {
        console.error(
            "Error in fetching referral over time:",
            error.response?.data?.error?.message || "fetch error"
        );
        throw error;
    }
};

const StatusBadge = ({ status }) => {
    const statusColors = {
        completed:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        pending:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        rejected:
            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        processing:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    };

    return (
        <Badge
            className={`${
                statusColors[status.toLowerCase()] ||
                "bg-gray-100 text-gray-800"
            } capitalize`}
        >
            {status}
        </Badge>
    );
};

export default function LatestPayout() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["referralOverTime", page],
        queryFn: () => fetchLatestPayout(page),
    });

    if (isError) {
        return (
            <div className="col-span-5 lg:col-span-2 bg-cs-background-secondary p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Latest Payout
                    </h3>
                </div>
                <div className="h-64 flex flex-col items-center justify-center text-red-500 dark:text-red-400">
                    <p>Failed to load payout data</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="col-span-5 lg:col-span-2 bg-cs-background-secondary p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Latest Payout
                </h3>
            </div>

            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <LoadingCircle size="lg" />
                </div>
            ) : (
                <>
                    <div className="rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader className="bg-cs-background-primary">
                                <TableRow>
                                    <TableHead className="text-gray-600 dark:text-gray-400 font-medium">
                                        Date & Time
                                    </TableHead>
                                    <TableHead className="text-gray-600 dark:text-gray-400 font-medium">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-gray-600 dark:text-gray-400 font-medium">
                                        Amount
                                    </TableHead>
                                    <TableHead className="text-right text-gray-600 dark:text-gray-400 font-medium">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.latestPayout?.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="h-64 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center py-10">
                                                <CreditCard className="h-10 w-10 text-gray-400 mb-2" />
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    No payout records found
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    data?.latestPayout?.map((payout, index) => (
                                        <TableRow
                                            key={index}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                        >
                                            <TableCell className="font-medium">
                                                <div className="flex flex-col">
                                                    <span>
                                                        {format(
                                                            payout.createdAt,
                                                            "dd MMM yyyy"
                                                        )}
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {format(
                                                            payout.createdAt,
                                                            "hh:mm a"
                                                        )}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge
                                                    status={payout.status}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <IndianRupee className="h-4 w-4" />
                                                    <span>{payout.amount}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
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
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="bg-cs-background-primary"
                                                    >
                                                        <DropdownMenuLabel className="text-sm text-cs-foreground-primary font-medium">
                                                            Menu
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuItem
                                                            className="cursor-pointer"
                                                            onSelect={(e) => {
                                                                e.preventDefault();
                                                            }}
                                                        >
                                                            <DetailPayout
                                                                payout={payout}
                                                            />
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Showing page {page} of{" "}
                            {Math.ceil((data?.rows || 0) / PAGE_LIMIT)}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="flex items-center gap-1"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                    data?.rows === 0 ||
                                    page ===
                                        Math.ceil(
                                            (data?.rows || 0) / PAGE_LIMIT
                                        )
                                }
                                onClick={() => setPage(page + 1)}
                                className="flex items-center gap-1"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
