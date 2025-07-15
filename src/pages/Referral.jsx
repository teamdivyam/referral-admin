import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingReferral from "../features/referrals/PendingReferral";
import CompletedReferral from "../features/referrals/CompletedReferral";
import RejectedReferral from "../features/referrals/RejectedReferral";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

export default function Referral() {
    return (
        <div>
            <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full max-w-lg grid-cols-3 gap-2 p-1.5 bg-transparent rounded-xl h-12">
                    <TabsTrigger
                        value="pending"
                        className="rounded-lg data-[state=active]:bg-yellow-500 data-[state=active]:text-white 
                        data-[state=active]:shadow-sm dark:data-[state=active]:bg-white 
                        dark:data-[state=active]:text-black data-[state=inactive]:bg-white 
                        data-[state=inactive]:border-slate-300 data-[state=inactive]:border-2 
                        dark:data-[state=inactive]:bg-transparent transition-all duration-200"
                    >
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>Pending</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger
                        value="completed"
                        className="rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white 
                        data-[state=active]:shadow-sm dark:data-[state=active]:bg-white 
                        dark:data-[state=active]:text-black data-[state=inactive]:bg-white 
                        data-[state=inactive]:border-slate-300 data-[state=inactive]:border-2 
                        dark:data-[state=inactive]:bg-transparent transition-all duration-200"
                    >
                        <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Completed</span>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger
                        value="rejected"
                        className="rounded-lg data-[state=active]:bg-destructive data-[state=active]:text-white 
                        data-[state=active]:shadow-sm dark:data-[state=active]:bg-white 
                        dark:data-[state=active]:text-black data-[state=inactive]:bg-white 
                        data-[state=inactive]:border-slate-300 data-[state=inactive]:border-2
                        dark:data-[state=inactive]:bg-transparent transition-all duration-200"
                    >
                        <div className="flex items-center space-x-2">
                            <XCircle className="w-4 h-4" />
                            <span>Rejected</span>
                        </div>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="pending">
                    <PendingReferral />
                </TabsContent>
                <TabsContent value="completed">
                    <CompletedReferral />
                </TabsContent>
                <TabsContent value="rejected">
                    <RejectedReferral />
                </TabsContent>
            </Tabs>
        </div>
    );
}
