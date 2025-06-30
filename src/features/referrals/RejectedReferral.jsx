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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, MoreHorizontal, Search } from "lucide-react";
import Status from "../common/Status";
import LoadingCircle from "../../components/loading-circle";
import { Input } from "@/components/ui/input";
// // import { useDebounce } from "../../hooks/useDebounce";
import { Calendar } from "@/components/ui/calendar";
import ViewDetailPendingReferral from "./ViewDetailPendingReferral";
import ViewDetailRejectedReferral from "./ViewDetailRejectedReferral";

const fetchRejectedReferrals = async (page, search, fromDate, toDate) => {
    try {
        const response = await AdminService.getReferrals(
            "cancelled",
            page
            // search,
            // fromDate,
            // toDate
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default function RejectedReferral() {
    // const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    // const debouncedSearchTerm = useDebounce(search, 500);
    const [selectFromDate, setSelectFromDate] = useState(undefined);
    const [selectToDate, setSelectToDate] = useState(undefined);
    const { data, isLoading } = useQuery({
        queryKey: [
            "rejected-referrals",
            page,
            // debouncedSearchTerm,
            // selectFromDate,
            // selectToDate,
        ],
        queryFn: () =>
            fetchRejectedReferrals(
                page
                // debouncedSearchTerm,
                // selectFromDate,
                // selectToDate
            ),
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-xl font-semibold text-cs-foreground-primary">
                    {data?.rows} Rows
                </div>
                {/* <div className="mt-3.5 flex justify-end gap-2.5">
                    <div className="flex gap-2.5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="font-normal cursor-pointer text-cs-foreground-primary"
                                >
                                    Select Date From:{" "}
                                    {selectFromDate &&
                                        format(selectFromDate, "dd/MM/yyyy")}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <Calendar
                                    mode="single"
                                    defaultMonth={selectFromDate || new Date()}
                                    selected={selectFromDate || new Date()}
                                    onSelect={(d) => {
                                        setSelectFromDate(d);
                                        if (selectToDate && d > selectToDate) {
                                            setSelectToDate(d);
                                        }
                                    }}
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="font-normal cursor-pointer text-cs-foreground-primary"
                                >
                                    Select Date To:{" "}
                                    {selectToDate &&
                                        format(selectToDate, "dd/MM/yyyy")}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <Calendar
                                    mode="single"
                                    defaultMonth={selectToDate || new Date()}
                                    selected={selectToDate || new Date()}
                                    onSelect={(d) => {
                                        setSelectToDate(d);
                                        if (d < selectFromDate) {
                                            setSelectFromDate(d);
                                        }
                                    }}
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                            placeholder="User Id, Email and Name"
                            className="pl-10 bg-cs-background-secondary focus-visible:ring-1"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
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
                            data?.rows === 0 ||
                            page === Math.ceil(data?.rows / 50)
                        }
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </div> */}
            </div>

            <div className="overflow-auto">
                <Table className="mt-4 bg-cs-background-secondary rounded-md max-h-[540px] relative">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="py-3.5 text-cs-foreground-primary  font-base sticky top-0 z-1 bg-cs-background-secondary">
                                ID
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary  font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Referrer
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary  font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Referred
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary  font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Refer Date
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary  font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Completed Date
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary  font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Order ID
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary  font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Commission Amount
                            </TableHead>
                            <TableHead className="py-3.5 text-cs-foreground-primary font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Status
                            </TableHead>
                            <TableHead className="text-right py-3.5 text-cs-foreground-primary  font-base sticky top-0 z-1 bg-cs-background-secondary">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={9} className="w-full h-48">
                                    <div className="flex justify-center">
                                        <LoadingCircle />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data?.referrals.map((referral) => (
                                <TableRow key={referral.ref_id}>
                                    <TableCell className="text-slate-800">
                                        {referral.ref_id}
                                    </TableCell>
                                    <TableCell className="text-slate-800">
                                        {referral.referrer_user_id.fullName ||
                                            referral.referrer_user_id.email ||
                                            referral.referrer_user_id.mobileNum}
                                    </TableCell>
                                    <TableCell className="text-slate-800">
                                        {referral.referee_user_id.fullName ||
                                            referral.referee_user_id.email ||
                                            referral.referee_user_id.mobileNum}
                                    </TableCell>
                                    <TableCell className="text-slate-800">
                                        {format(
                                            referral.createdAt,
                                            "dd/MM/yyyy"
                                        )}
                                    </TableCell>
                                    <TableCell className="text-slate-800">
                                        {format(
                                            referral.processed_at,
                                            "dd/MM/yyyy"
                                        ) || "nil"}
                                    </TableCell>
                                    <TableCell className="text-slate-800">
                                        {referral.order
                                            .slice(referral.order.length - 4)
                                            .toUpperCase()}
                                    </TableCell>
                                    <TableCell className="text-slate-800">
                                        {referral.amount}
                                    </TableCell>

                                    <TableCell className="text-slate-800">
                                        <Status statusType={referral.status} />
                                    </TableCell>
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
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onSelect={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        <ViewDetailRejectedReferral
                                                            rejectedReferral={
                                                                referral
                                                            }
                                                        />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onSelect={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        {/* <ApprovedWithdrawalRequestAlert
                                                            withdrawalId={
                                                                request._id
                                                            }
                                                        /> */}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onSelect={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                    >
                                                        {/* <RejectWithdrawalRequestAlert
                                                            withdrawalId={
                                                                request._id
                                                            }
                                                        /> */}
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
        </>
    );
}
