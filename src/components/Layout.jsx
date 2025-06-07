import { Link, Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Info } from "lucide-react";
import ModeToggle from "./mode-toggle";
import { useContext, useEffect } from "react";
import { PageContext } from "../contexts/PageContext";

const pageHeaders = {
    dashboard: { title: "Main Dashboard", index: 0 },
    users: { title: "Users Management", index: 1 },
    withdrawals: {
        title: "Withdrawals",
        index: 2,
    },
    settings: { title: "Settings", index: 3 },
};

export default function Layout() {
    const location = useLocation();
    const loc = location.pathname.split("/")[1];

    const { setCurrentPage } = useContext(PageContext);

    useEffect(() => {
        if (!pageHeaders[loc]) {
            setCurrentPage(0);
        } else {
            setCurrentPage(pageHeaders[loc]?.index);
        }
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full min-h-screen bg-cs-background-primary">
                <div className="md:hidden">
                    <SidebarTrigger />
                </div>
                <div className="px-6 py-2 md:pt-8">
                    <div className="flex justify-between items-start pb-12">
                        <div className="flex flex-col gap-1">
                            <div className="hidden text-sm text-cs-foreground-secondary md:block">
                                Pages / {loc}
                            </div>
                            <div className="text-3xl font-semibold text-cs-foreground-primary">
                                {pageHeaders[loc]?.title}
                            </div>
                        </div>
                        <div className="hidden bg-cs-background-secondary rounded-full shadow-sm px-6 py-1.5 items-center gap-3.5 md:flex">
                            <Link
                                to="/"
                                className="text-cs-foreground-secondary"
                            >
                                <Bell className="size-4" />
                            </Link>

                            <Link
                                to="/"
                                className="text-cs-foreground-secondary"
                            >
                                <Info className="size-4" />
                            </Link>

                            <ModeToggle />
                        </div>
                    </div>
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
}
