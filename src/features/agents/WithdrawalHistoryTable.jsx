import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";

export default function WithdrawalHistoryTable({ agent }) {
    const withdrawalHistory = agent.wallet.withdrawalHistory;

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-cs-background-secondary">
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Proccess Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {withdrawalHistory.length === 0 ? (
                    <TableRow className="bg-cs-background-secondary">
                        <TableCell colSpan={4} className="h-24 text-center">
                            No withdrawal history available
                        </TableCell>
                    </TableRow>
                ) : (
                    withdrawalHistory.map((withdrawal, index) => (
                        <TableRow
                            key={index}
                            className="bg-cs-background-secondary"
                        >
                            <TableCell className="font-medium">
                                {format(withdrawal.createdAt, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell>{withdrawal.status}</TableCell>
                            <TableCell>{withdrawal.amount}</TableCell>
                            <TableCell className="text-right">
                                {format(withdrawal.updatedAt, "dd/MM/yyyy")}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
