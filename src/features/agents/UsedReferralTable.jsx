import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";

export default function UsedReferralTable({ agent }) {
    const usedReferral = agent.referral.used;

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-cs-background-secondary">
                    <TableHead>Referral Code</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Pending Date</TableHead>
                    <TableHead>Used Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {usedReferral.length === 0 ? (
                    <TableRow className="bg-cs-background-secondary">
                        <TableCell colSpan={5} className="h-24 text-center">
                            No used referral code available
                        </TableCell>
                    </TableRow>
                ) : (
                    usedReferral.map((referral, index) => (
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
                                {/* {format(referral.pendingAt, "dd/MM/yyyy")} */}
                            </TableCell>
                            <TableCell>
                                {/* {format(referral.usedAt, "dd/MM/yyyy")} */}
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
