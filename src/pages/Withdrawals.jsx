import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LatestWithdrawals from "../features/withdrawals/LatestWithdrawals";
import ApprovedWithdrawals from "../features/withdrawals/ApprovedWithdrawals";
import RejectedWithdrawals from "../features/withdrawals/RejectedWithdrawals";

export default function Withdrawals() {
    return (
        <>
            <Tabs defaultValue="latest" className="">
                <TabsList className="grid w-full grid-cols-3 bg-cs-foreground-secondary">
                    <TabsTrigger className="cursor-pointer" value="latest">
                        Latest
                    </TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="approved">
                        Approved
                    </TabsTrigger>
                    <TabsTrigger className="cursor-pointer" value="rejected">
                        Rejected
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="latest">
                    <div className="mt-4.5">
                        <LatestWithdrawals />
                    </div>
                </TabsContent>
                <TabsContent value="approved">
                    <div className="mt-4.5">
                        <ApprovedWithdrawals />
                    </div>
                </TabsContent>
                <TabsContent value="rejected">
                    <div className="mt-4.5">
                        <RejectedWithdrawals />
                    </div>
                </TabsContent>
            </Tabs>
        </>
    );
}
