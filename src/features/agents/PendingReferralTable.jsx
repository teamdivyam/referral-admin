import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";

export default function PendingReferralTable({ agent }) {
    const pendingReferral = agent.referral.pending;

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-cs-background-secondary">
                    <TableHead>Referral Code</TableHead>
                    <TableHead>Create Date</TableHead>
                    <TableHead>Pending Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pendingReferral.length === 0 ? (
                    <TableRow className="bg-cs-background-secondary">
                        <TableCell colSpan={4} className="h-24 text-center">
                            No pending referral code available
                        </TableCell>
                    </TableRow>
                ) : (
                    pendingReferral.map((referral, index) => (
                        <TableRow
                            key={index}
                            className="bg-cs-background-secondary"
                        >
                            <TableCell className="font-medium">
                                {referral.referralCode}
                            </TableCell>
                            <TableCell>
                                {format(referral.createdAt, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell>
                                {format(referral.pendingAt, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell className="text-right">
                                {referral.rewardAmount}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
