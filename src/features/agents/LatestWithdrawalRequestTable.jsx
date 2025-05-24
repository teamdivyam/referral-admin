import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ApprovedWithdrawalRequestAlert from "./ApprovedWithdrawalRequestAlert";
import RejectWithdrawalRequestAlert from "./RejectWithdrawalRequestAlert";

export default function LatestWithdrawalRequestTable({ agent }) {
    const latestWithdrawalRequest = agent.wallet.withdrawalHistory.filter(
        (req) => req.status === "pending"
    );

    return (
        <Table>
            <TableHeader className="bg-cs-background-secondary">
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Order Id</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {latestWithdrawalRequest.length === 0 ? (
                    <TableRow className="bg-cs-background-secondary">
                        <TableCell colSpan={4} className="h-24 text-center">
                            No withdrawal request found
                        </TableCell>
                    </TableRow>
                ) : (
                    latestWithdrawalRequest.map((request) => (
                        <TableRow
                            key={request.id}
                            className="bg-cs-background-secondary"
                        >
                            <TableCell className="font-medium">
                                {request.date}
                                {format(request.createdAt, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell>{request.amount}</TableCell>
                            <TableCell>37856</TableCell>
                            <TableCell>
                                <div className="flex justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
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
                                                onSelect={(e) => {
                                                    e.preventDefault();
                                                }}
                                            >
                                                <ApprovedWithdrawalRequestAlert
                                                    withdrawalId={request._id}
                                                />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onSelect={(e) => {
                                                    e.preventDefault();
                                                }}
                                            >
                                                <RejectWithdrawalRequestAlert
                                                    withdrawalId={request._id}
                                                />
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
    );
}
