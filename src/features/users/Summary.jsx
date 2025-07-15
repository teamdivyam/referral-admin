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
import DeactivateAccountAlert from "./DeactivateAccountDialog";
import ActivateAccountAlert from "./ActivateAccountAlert";

export default function SummaryDrawer({ id }) {
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
                                    {referralUser.user.fullName}
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
                                        +91 {referralUser.user.mobileNum}
                                    </span>{" "}
                                    <a
                                        href={`mailto:${referralUser.user.email}`}
                                        className="text-blue-500 hover:underline cursor-pointer"
                                    >
                                        {referralUser.user.email}
                                    </a>{" "}
                                </p>
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="mt-4.5 mx-4.5">
                            <AgentSummaryTable referralUser={referralUser} />
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 my-6.5 mx-4.5">
                            {referralUser.accountStatus === "active" ? (
                                <div className="flex justify-center border px-2 py-1.5 rounded-sm bg-red-300 cursor-pointer">
                                    <DeactivateAccountAlert
                                        referralUserId={referralUser._id}
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-center border px-2 py-1.5 rounded-sm bg-red-300 cursor-pointer">
                                    <ActivateAccountAlert
                                        referralUserId={referralUser._id}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </DrawerContent>
        </Drawer>
        // </Suspense>
    );
}
