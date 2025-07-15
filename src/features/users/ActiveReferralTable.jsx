import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export default function ActiveReferralTable({ agent }) {
    const activeReferral = agent.referral.active;

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-cs-background-secondary">
                    <TableHead>Referral Code</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {activeReferral.length === 0 ? (
                    <TableRow className="bg-cs-background-secondary">
                        <TableCell colSpan={4} className="h-24 text-center">
                            No active referral code available
                        </TableCell>
                    </TableRow>
                ) : (
                    activeReferral.map((referral, index) => (
                        <TableRow
                            key={index}
                            className="bg-cs-background-secondary"
                        >
                            <TableCell className="font-medium">
                                {referral.referralCode}
                            </TableCell>
                            <TableCell>{format(referral.createdAt, "dd/MM/yyyy")}</TableCell>
                            <TableCell>{referral.status}</TableCell>
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
