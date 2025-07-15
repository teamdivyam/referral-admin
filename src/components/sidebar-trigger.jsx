import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function SidebarTrigger({ sidebarOpen, setSidebarOpen }) {
    // If you're using shadcn's useSidebar hook
    const { toggle } = useSidebar();

    const handleClick = () => {
        // Use the shadcn toggle if available, otherwise fallback to your state
        if (toggle) {
            toggle();
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    return (
        <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={handleClick}
        >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    );
}
