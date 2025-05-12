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
import { useAxiosGet } from "@/hooks/useAxios";
import AdminService from "../../services/admin.service";

export default function SummaryDrawer({ id }) {
    const { data, fetchLoading, fetchError } = useAxiosGet({
        adminService: AdminService.agentSummary,
        params: { agentId: id },
    });

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <div>Summary</div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>{data?.name}</DrawerTitle>
                        <DrawerDescription>
                            <p className="flex gap-4.5">
                                <span>+91 {data?.phoneNumber}</span>{" "}
                                <span className="text-cs-foreground-primary hover:underline cursor-pointer">
                                    {data?.email}
                                </span>{" "}
                            </p>
                        </DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
