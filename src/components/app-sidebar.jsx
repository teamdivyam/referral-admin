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
import { useState } from "react";
import { Link } from "react-router-dom";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Agents Management",
        url: "/agents",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const [activePageIndex, setActivePageIndex] = useState(0);

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
                                        isActive={activePageIndex === index}
                                        size="base"
                                    >
                                        <Link
                                            to={item.url}
                                            onClick={() => {
                                                setActivePageIndex(index);  
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

