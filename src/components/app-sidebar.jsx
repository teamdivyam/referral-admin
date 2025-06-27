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
import { Home, Info, Settings, Users, Wallet } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageContext } from "../contexts/PageContext";
import { Button } from "@/components/ui/button";

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
                menuIcon: Home,
            },
            {
                index: 2,
                menuTitle: "Users Managment",
                menuURL: "/users",
                menuIcon: Users,
            },
            {
                index: 3,
                menuTitle: "Withdrawals",
                menuURL: "/withdrawals",
                menuIcon: Wallet,
            },
        ],
    },
    {
        groupLabel: "ACCOUNT",
        groupContent: [
            { index: 4, menuTitle: "Help", menuURL: "/help", menuIcon: Info },
            {
                index: 5,
                menuTitle: "Settings",
                menuURL: "/settings",
                menuIcon: Settings,
            },
        ],
    },
];

export function AppSidebar() {
    const { currentPage, setCurrentPage } = useContext(PageContext);
    const navigate = useNavigate();

    const logout = async () => {
        localStorage.removeItem("token");

        navigate("/login")
    };

    return (
        <Sidebar className="border-r">
            <SidebarHeader>
                <div className="flex mt-4 gap-2 items-center">
                    <img
                        src="/img/logo.png"
                        alt="logo"
                        className="w-16 invert rotateImg dark:invert-0"
                    />
                    <div className="flex flex-col">
                        <span className="text-cs-foreground-primary font-semibold text-xl">
                            Divyam
                        </span>
                        <span className="text-cs-foreground-secondary text-sm">
                            Referral Dashboard
                        </span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="mt-6 px-4">
                {sidebarNavigationLinks.map((group) => (
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-cs-foreground-primary">
                            {group.groupLabel}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.groupContent.map((links) => (
                                    <SidebarMenuItem asChild>
                                        <SidebarMenuButton
                                            asChild
                                            size="base"
                                            className={`${
                                                currentPage === links.index
                                                    ? "bg-blue-100"
                                                    : ""
                                            } pl-4 hover:bg-blue-100`}
                                        >
                                            <Link
                                                to={links.menuURL}
                                                onClick={() => {
                                                    setCurrentPage(links.index);
                                                }}
                                                className="text-cs-foreground-secondary data-[active=true]:text-sidebar-primary data-[active=false]:hover:text-sidebar-primary"
                                            >
                                                <links.menuIcon
                                                    className={`${
                                                        currentPage ===
                                                        links.index
                                                            ? "text-cs-icon-primary"
                                                            : ""
                                                    } hover:bg-blue-100`}
                                                />
                                                <span
                                                    className={`${
                                                        currentPage ===
                                                        links.index
                                                            ? "text-cs-icon-primary"
                                                            : ""
                                                    } text-sm`}
                                                >
                                                    {links.menuTitle}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
                <Button
                    variant="outline"
                    className="bg-cs-icon-primary text-white cursor-pointer hover:bg-cs-icon-primary/85 hover:text-white"
                    onClick={logout}
                >
                    Logout
                </Button>
            </SidebarContent>
        </Sidebar>
    );
}
