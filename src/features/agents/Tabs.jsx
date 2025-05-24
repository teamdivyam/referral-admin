import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WithdrawalHistoryTable } from "./WithdrawalHistoryTable";

export default function Tab({ agents }) {
    return (
        <Tabs defaultValue="account" className="w-[70vw]">
            <TabsList className="grid w-full grid-cols-4 bg-cs-foreground-secondary">
                <TabsTrigger value="withdrawalHistory">
                    Withdrawal History
                </TabsTrigger>
                <TabsTrigger value="activeReferral">
                    Active Referral
                </TabsTrigger>
                <TabsTrigger value="pendingReferral">
                    Pending Referral
                </TabsTrigger>
                <TabsTrigger value="usedReferral">Used Referral</TabsTrigger>
            </TabsList>
            <TabsContent value="withdrawalHistory">
                <div className="mt-4.5">
                    <WithdrawalHistoryTable />
                </div>
            </TabsContent>
            <TabsContent value="activeReferral"></TabsContent>
            <TabsContent value="pendingReferral"></TabsContent>
            <TabsContent value="usedReferral"></TabsContent>
        </Tabs>
    );
}
