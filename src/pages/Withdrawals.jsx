import PendingWithdrawal from "../features/withdrawals/PendingWithdrawal";
import ApprovedWithdrawals from "../features/withdrawals/ApprovedWithdrawal";
import RejectedWithdrawals from "../features/withdrawals/RejectedWithdrawal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Withdrawals() {
    const [searchParams, setSearchParams] = useSearchParams();
    const openTab = searchParams.get("openTab") || "pending";

    return (
        <>
            <Tabs defaultValue={openTab} className="w-full">
                <TabsList className="grid w-full max-w-lg grid-cols-3 gap-2 p-1.5 bg-transparent rounded-xl h-12">
                    <TabsTrigger
                        value="pending"
                        onClick={() => setSearchParams({ openTab: "pending" })}
                        className="rounded-lg data-[state=active]:bg-yellow-500 data-[state=active]:text-white 
                        data-[state=active]:shadow-sm data-[state=inactive]:bg-white dark:data-[state=active]:bg-white 
                        dark:data-[state=active]:text-black data-[state=inactive]:border-slate-300 data-[state=inactive]:border-2 
                        dark:data-[state=inactive]:bg-transparent transition-all duration-200"
                    >
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>Pending</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setSearchParams({ openTab: "approved" })}
                        className="rounded-lg data-[state=active]:bg-emerald-500 
                        data-[state=active]:text-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-white 
                        dark:data-[state=active]:text-black 
                        data-[state=inactive]:bg-white data-[state=inactive]:border-slate-300 
                        data-[state=inactive]:border-2 dark:data-[state=inactive]:bg-transparent  transition-all duration-200"
                        value="approved"
                    >
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Approved</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setSearchParams({ openTab: "rejected" })}
                        className="rounded-lg data-[state=active]:bg-destructive 
                        data-[state=active]:text-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-white 
                        dark:data-[state=active]:text-black
                        data-[state=inactive]:bg-white data-[state=inactive]:border-slate-300 
                        data-[state=inactive]:border-2 dark:data-[state=inactive]:bg-transparent transition-all duration-200"
                        value="rejected"
                    >
                        <div className="flex items-center space-x-2">
                            <XCircle className="w-4 h-4" />
                            <span>Rejected</span>
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                    <div className="mt-4.5">
                        <PendingWithdrawal />
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
