import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Home, Settings, Users } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../contexts/PageContext";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Users Management",
        url: "/users",
        icon: Users,
    },
    {
        title: "Withdrawals",
        url: "/withdrawals",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const { currentPage, setCurrentPage } = useContext(PageContext);

    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className="py-5 text-center text-xl text-cs-foreground-primary md:text-2xl lg:text-3xl">
                    <span className="font-bold">Divyam</span>&nbsp;
                    <span className="">Admin</span>
                </h1>
            </SidebarHeader>
            <SidebarContent className="mt-6">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item, index) => (
                                <SidebarMenuItem asChild>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={currentPage === index}
                                        size="base"
                                    >
                                        <Link
                                            to={item.url}
                                            onClick={() => {
                                                setCurrentPage(index);
                                            }}
                                            className="text-cs-foreground-secondary data-[active=true]:text-sidebar-primary data-[active=false]:hover:text-sidebar-primary"
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
