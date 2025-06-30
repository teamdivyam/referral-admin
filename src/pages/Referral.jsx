import { FolderCode } from "lucide-react";
import LoadingCircle from "../components/loading-circle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingReferral from "../features/referrals/PendingReferral";
import CompletedReferral from "../features/referrals/CompletedReferral";
import RejectedReferral from "../features/referrals/RejectedReferral";

export default function Referral() {
    return (
        // <div className="min-h-[75vh] flex justify-center items-center gap-2.5 text-cs-icon-primary text-3xl font-medium">
        //     <FolderCode className="size-8"/>
        //     <span>Currently Working On</span>
        //     <LoadingCircle />
        // </div>

        <Tabs defaultValue="pending" className="">
            <TabsList className="grid w-full grid-cols-3 bg-cs-foreground-secondary">
                <TabsTrigger className="cursor-pointer" value="pending">
                    Pending
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="completed">
                    Completed
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="rejected">
                    Rejected
                </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
                <div className="mt-4.5">
                    <PendingReferral />
                </div>
            </TabsContent>
            <TabsContent value="completed">
                <div className="mt-4.5">
                    <CompletedReferral />
                </div>
            </TabsContent>
            <TabsContent value="rejected">
                <div className="mt-4.5">
                    <RejectedReferral />
                </div>
            </TabsContent>
        </Tabs>
    );
}
