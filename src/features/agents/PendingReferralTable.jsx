import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";

export default function PendingReferralTable({ referralUser }) {
    const pendingReferral = referralUser.referralEvents.filter(
        (referral) => referral.status == "pending"
    );

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-cs-background-secondary">
                    <TableHead>Pending Date</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Order ID</TableHead>
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
                                {format(referral.createdAt, "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell>
                                #{referral.referee.slice(referral.referee.length - 5).toUpperCase()}
                            </TableCell>
                            <TableCell>
                                #{referral.orderId.slice(referral.orderId.length - 5).toUpperCase()}
                            </TableCell>
                            <TableCell className="text-right">
                                {referral.amount}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
