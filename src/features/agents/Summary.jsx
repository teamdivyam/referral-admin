import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import AdminService from "../../services/admin.service";
import { useQuery } from "@tanstack/react-query";
import { IndianRupee, X } from "lucide-react";
import AssignReferralCodeDialog from "./AssignReferralCodeDialog";
import ViewDetail from "./ViewDetailDrawer";
import AgentSummaryTable from "./AgentSummaryTable";

export default function SummaryDrawer({ id }) {
    const fetchAgent = async () => {
        try {
            const response = await AdminService.agentById(id);

            return response.data?.agent;
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    const { data: agent, isLoading } = useQuery({
        queryKey: ["agent-summary"],
        queryFn: fetchAgent,
    });

    return (
        // <Suspense fallback={<div>Loading....</div>}>
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <div>Summary</div>
            </DrawerTrigger>
            <DrawerContent>
                {isLoading ? (
                    <>
                        <span>Loading...</span>
                    </>
                ) : (
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <div className="flex justify-between items-center ">
                                <DrawerTitle className="text-cs-foreground-primary text-2xl">
                                    {agent.name}
                                </DrawerTitle>
                                <DrawerClose asChild>
                                    <Button
                                        variant="outline"
                                        className="size-8 bg-cs-background-primary"
                                    >
                                        <X />
                                    </Button>
                                </DrawerClose>
                            </div>
                            <DrawerDescription>
                                <p className="flex gap-4.5">
                                    <span className="text-cs-foreground-secondary">
                                        +91 {agent.phoneNumber}
                                    </span>{" "}
                                    <a
                                        href={`mailto:${agent.email}`}
                                        className="text-blue-500 hover:underline cursor-pointer"
                                    >
                                        {agent.email}
                                    </a>{" "}
                                </p>
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="mt-4.5 mx-4.5">
                            <AgentSummaryTable agent={agent}/>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 my-6.5 mx-4.5">
                            <div className="flex justify-center border py-1.5 rounded-sm bg-green-300 cursor-pointer">
                                <AssignReferralCodeDialog
                                    agentId={agent._id}
                                    name={agent.name}
                                />
                            </div>
                            <div className="flex justify-center border py-1.5 rounded-sm bg-yellow-200 cursor-pointer">
                                <span className="text-sm text-cs-foreground-primary">
                                    <ViewDetail id={agent._id}/>
                                </span>
                            </div>
                            <div className="flex justify-center border py-1.5 rounded-sm bg-red-300 cursor-pointer">
                                <span className="text-sm text-cs-foreground-primary">
                                    Deactivate Account
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </DrawerContent>
        </Drawer>
        // </Suspense>
    );
}
