"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import AssignReferralCodeDialog from "./AssignReferralCodeDialog";
import { useQuery } from "@tanstack/react-query";
import AdminService from "../../services/admin.service";
import DeactivateAccountAlert from "./DeactivateAccountDialog";
import ActivateAccountAlert from "./ActivateAccountAlert";
import AgentSummaryTable from "./AgentSummaryTable";
import LatestWithdrawalRequestTable from "./LatestWithdrawalRequestTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WithdrawalHistoryTable from "./WithdrawalHistoryTable";
import ActiveReferralTable from "./ActiveReferralTable";
import PendingReferralTable from "./PendingReferralTable";
import UsedReferralTable from "./UsedReferralTable";
import { format } from "date-fns";
import { data } from "react-router-dom";

export default function ViewDetail({ id }) {
    const fetchAgent = async () => {
        try {
            const response = await AdminService.referralUserById(id);

            return response.data?.referralUser;
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    const { data: referralUser, isLoading } = useQuery({
        queryKey: ["agent-summary"],
        queryFn: fetchAgent,
    });

    return (
        <div className="grid grid-cols-2 gap-2">
            <Sheet>
                <SheetTrigger asChild>
                    <div>View Detail</div>
                </SheetTrigger>
                <SheetContent
                    side="bottom"
                    className="bg-cs-background-primary h-screen overflow-y-scroll"
                >
                    {isLoading ? (
                        <>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <div className="mx-4.5 my-2.5">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-2">
                                    <span className="text-2xl font-semibold text-cs-foreground-primary">
                                        {referralUser.user.fullName}
                                    </span>
                                    <span className="flex gap-4 text-sm font-medium">
                                        <span className="text-cs-foreground-secondary">
                                            {referralUser.user.mobileNum}
                                        </span>
                                        <a
                                            href={`mailto:${referralUser.user.email}`}
                                            className="text-blue-500 hover:underline cursor-pointer"
                                        >
                                            {referralUser.user.email}
                                        </a>{" "}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4.5">
                                <h2 className="text-xl font-medium text-cs-foreground-primary">
                                    Quick Actions
                                </h2>
                                <div className="flex gap-3.5 mt-2.5">
                                    {/* <div className="flex justify-center border px-2 py-1.5 rounded-sm bg-green-300 cursor-pointer">
                                        <AssignReferralCodeDialog
                                            agentId={agent._id}
                                            name={agent.name}
                                        />
                                    </div> */}
                                    {/* {agent.accountStatus === "activate" ? (
                                        <div className="flex justify-center border px-2 py-1.5 rounded-sm bg-red-300 cursor-pointer">
                                            <DeactivateAccountAlert
                                                agentId={agent._id}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex justify-center border px-2 py-1.5 rounded-sm bg-red-300 cursor-pointer">
                                            <ActivateAccountAlert
                                                agentId={agent._id}
                                            />
                                        </div>
                                    )} */}
                                </div>
                            </div>

                            <div className="mt-4.5">
                                <div className="grid grid-cols-1 gap-5.5 md:grid-cols-2">
                                    <div>
                                        <h2 className="text-xl font-medium text-cs-foreground-primary">
                                            Agent Summary
                                        </h2>
                                        <div className="mt-4.5 h-full">
                                            <AgentSummaryTable referralUser={referralUser} />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-medium text-cs-foreground-primary">
                                            Latest Withdrawal Request
                                        </h2>
                                        <div className="mt-4.5 border">
                                            <LatestWithdrawalRequestTable
                                                referralUser={referralUser}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-6.5">
                                <Tabs
                                    defaultValue="withdrawalHistory"
                                    className="w-[70vw]"
                                >
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
                                        <TabsTrigger value="usedReferral">
                                            Used Referral
                                        </TabsTrigger>
                                    </TabsList>
                                    {/* <TabsContent value="withdrawalHistory">
                                        <div className="mt-4.5 border">
                                            <WithdrawalHistoryTable
                                                agent={agent}
                                            />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="activeReferral">
                                        <div className="mt-4.5">
                                            <ActiveReferralTable
                                                agent={agent}
                                            />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="pendingReferral">
                                        <div className="mt-4.5">
                                            <PendingReferralTable
                                                agent={agent}
                                            />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="usedReferral">
                                        <div className="mt-4.5">
                                            <UsedReferralTable agent={agent} />
                                        </div>
                                    </TabsContent> */}
                                </Tabs>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
