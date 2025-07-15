import { Link, Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
    Bell,
    Info,
    Monitor,
    Moon,
    Sun,
    LifeBuoy,
    MessageSquare,
    BookOpen,
    ChevronDown,
    User,
    Settings,
    LogOut,
} from "lucide-react";
import ModeToggle from "./mode-toggle";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../contexts/PageContext";
import SidebarTrigger from "./sidebar-trigger";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useTheme from "../hooks/useTheme";

const pageHeaders = {
    dashboard: { title: "Main Dashboard", index: 0 },
    referral: { title: "Referral", index: 1 },
    users: { title: "Users Management", index: 2 },
    withdrawals: {
        title: "Withdrawals",
        index: 3,
    },
    help: { title: "Helps", index: 4 },
    settings: { title: "Settings", index: 5 },
};

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { setTheme } = useTheme();
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
            <AppSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <main className="w-full min-h-screen bg-cs-background-primary">
                <div className="md:hidden">
                    <SidebarTrigger
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                </div>
                <div className="px-6 py-2 md:pt-8">
                    <div className="flex justify-between items-start pb-8">
                        <div className="flex flex-col gap-1">
                            {/* <div className="hidden text-sm text-cs-foreground-secondary md:block">
                                Pages / {loc}
                            </div> */}
                            <div className="text-3xl font-semibold text-cs-foreground-primary">
                                {pageHeaders[loc]?.title}
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 bg-cs-background-secondary rounded-md shadown-md py-2.5 px-2">
                            {/* Notification Bell with Badge */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative rounded-full"
                                    >
                                        <Bell className="h-4 w-4" />
                                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border border-background"></span>
                                        <span className="sr-only">
                                            Notifications
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-72 p-2"
                                >
                                    <div className="flex items-center justify-between px-2 py-1">
                                        <h4 className="text-sm font-medium">
                                            Notifications
                                        </h4>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs h-6"
                                        >
                                            Mark all as read
                                        </Button>
                                    </div>
                                    <div className="h-60 overflow-y-auto">
                                        {/* Notification items would go here */}
                                        <div className="text-center text-sm text-muted-foreground py-8">
                                            No new notifications
                                        </div>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Help/Info Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <Info className="h-4 w-4" />
                                        <span className="sr-only">Help</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <DropdownMenuItem className="cursor-pointer">
                                        <LifeBuoy className="mr-2 h-4 w-4" />
                                        <span>Help Center</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        <span>Contact Support</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        <span>Documentation</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Theme Toggle - Enhanced */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">
                                            Toggle theme
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <DropdownMenuItem
                                    onClick={() => setTheme("light")}
                                    >
                                        <Sun className="mr-2 h-4 w-4" />
                                        <span>Light</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                    onClick={() => setTheme("dark")}
                                    >
                                        <Moon className="mr-2 h-4 w-4" />
                                        <span>Dark</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                    onClick={() => setTheme("dark")}
                                    >
                                        <Monitor className="mr-2 h-4 w-4" />
                                        <span>System</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* User Profile Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="rounded-full pl-2 pr-1"
                                    >
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src="/avatars/default.png" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/settings"
                                        >
                                            <User className="h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/settings"
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer text-red-500">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
}
