import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
    Home,
    Info,
    Settings,
    Users,
    Wallet,
    LogOut,
    ChevronRight,
} from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageContext } from "../contexts/PageContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation } from "@tanstack/react-query";
import AdminService from "../services/admin.service";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";

const sidebarNavigationLinks = [
    {
        groupLabel: "MAIN MENU",
        groupContent: [
            {
                index: 0,
                menuTitle: "Dashboard",
                menuURL: "/dashboard",
                menuIcon: Home,
            },
            {
                index: 1,
                menuTitle: "Referrals",
                menuURL: "/referral",
                menuIcon: Users,
            },
            {
                index: 2,
                menuTitle: "Withdrawals",
                menuURL: "/withdrawals",
                menuIcon: Wallet,
            },
        ],
    },
    {
        groupLabel: "MANAGEMENT",
        groupContent: [
            {
                index: 3,
                menuTitle: "User",
                menuURL: "/users",
                menuIcon: Info,
            },
            {
                index: 4,
                menuTitle: "Admin",
                menuURL: "/admins",
                menuIcon: Settings,
            },
        ],
    },
    {
        groupLabel: "ACCOUNT",
        groupContent: [
            {
                index: 5,
                menuTitle: "Help Center",
                menuURL: "/help",
                menuIcon: Info,
            },
            {
                index: 6,
                menuTitle: "Settings",
                menuURL: "/settings",
                menuIcon: Settings,
            },
        ],
    },
];

const fetchLogoutSession = async () => {
    try {
        const response = await AdminService.logout();
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export function AppSidebar({ sidebarOpen, setSidebarOpen }) {
    const { currentPage, setCurrentPage } = useContext(PageContext);
    const { setAuthData } = useAuth();

    const mutateLogout = useMutation({
        mutationFn: fetchLogoutSession,
        onSuccess: (data) => {
            toast(data.message);
            localStorage.removeItem("token");
            setAuthData(null);
        },
    });

    return (
        <Sidebar
            className="border-r bg-gradient-to-b from-background to-muted/20"
            open={sidebarOpen}
        >
            {/* Sidebar Header with User Profile */}
            <SidebarHeader className="px-4 py-4">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage
                            src="/img/logo.png"
                            alt="Company Logo"
                            className="w-16 invert rotateImg dark:invert-0"
                        />
                        <AvatarFallback>DV</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold tracking-tight">
                            Divyam
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Referral Dashboard
                        </p>
                    </div>
                </div>
            </SidebarHeader>

            <Separator className="my-2" />

            {/* Navigation Content */}
            <SidebarContent className="px-3 py-4">
                {sidebarNavigationLinks.map((group) => (
                    <SidebarGroup key={group.groupLabel} className="mb-6">
                        <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {group.groupLabel}
                        </SidebarGroupLabel>
                        <SidebarGroupContent className="mt-2">
                            <SidebarMenu>
                                {group.groupContent.map((links) => (
                                    <SidebarMenuItem key={links.index}>
                                        <SidebarMenuButton
                                            asChild
                                            variant="ghost"
                                            className={`w-full justify-start px-3 ${
                                                currentPage === links.index
                                                    ? "bg-cs-background-primary text-accent-foreground"
                                                    : "hover:bg-cs-background-primary/50"
                                            }`}
                                        >
                                            <Link
                                                to={links.menuURL}
                                                onClick={() => {
                                                    setCurrentPage(links.index);
                                                    setSidebarOpen(false);
                                                }}
                                                className="group flex items-center"
                                            >
                                                <links.menuIcon className="mr-3 h-4 w-4" />
                                                <span>{links.menuTitle}</span>
                                                {/* <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" /> */}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            {/* Footer with Logout */}
            <div className="mt-auto px-4 pb-6">
                <Separator className="my-4" />
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={mutateLogout.mutate}
                >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                    <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </Button>
            </div>
        </Sidebar>
    );
}
