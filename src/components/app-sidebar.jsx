// import {
//     Sidebar,
//     SidebarHeader,
//     SidebarContent,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarGroupLabel,
// } from "@/components/ui/sidebar";
// import { Home, Info, Settings, Users, Wallet } from "lucide-react";
// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { PageContext } from "../contexts/PageContext";
// import { Button } from "@/components/ui/button";

// const sidebarNavigationLinks = [
//     {
//         groupLabel: "MAIN MENU",
//         groupContent: [
//             {
//                 index: 0,
//                 menuTitle: "Dashboard",
//                 menuURL: "/dashboard",
//                 menuIcon: Home,
//             },
//             {
//                 index: 1,
//                 menuTitle: "Referrals",
//                 menuURL: "/referral",
//                 menuIcon: Home,
//             },
//             {
//                 index: 2,
//                 menuTitle: "Users Managment",
//                 menuURL: "/users",
//                 menuIcon: Users,
//             },
//             {
//                 index: 3,
//                 menuTitle: "Withdrawals",
//                 menuURL: "/withdrawals",
//                 menuIcon: Wallet,
//             },
//         ],
//     },
//     {
//         groupLabel: "ACCOUNT",
//         groupContent: [
//             { index: 4, menuTitle: "Help", menuURL: "/help", menuIcon: Info },
//             {
//                 index: 5,
//                 menuTitle: "Settings",
//                 menuURL: "/settings",
//                 menuIcon: Settings,
//             },
//         ],
//     },
// ];

// export function AppSidebar({ sidebarOpen, setSidebarOpen }) {
//     const { currentPage, setCurrentPage } = useContext(PageContext);
    
//     const navigate = useNavigate();

//     const logout = async () => {
//         localStorage.removeItem("token");

//         navigate("/login")
//     };

//     return (
//         <Sidebar className="border-r" open={sidebarOpen}>
//             <SidebarHeader>
//                 <div className="flex mt-4 gap-2 items-center">
//                     <img
//                         src="/img/logo.png"
//                         alt="logo"
//                         className="w-16 invert rotateImg dark:invert-0"
//                     />
//                     <div className="flex flex-col">
//                         <span className="text-cs-foreground-primary font-semibold text-xl">
//                             Divyam
//                         </span>
//                         <span className="text-cs-foreground-secondary text-sm">
//                             Referral Dashboard
//                         </span>
//                     </div>
//                 </div>
//             </SidebarHeader>
//             <SidebarContent className="mt-6 px-4">
//                 {sidebarNavigationLinks.map((group) => (
//                     <SidebarGroup>
//                         <SidebarGroupLabel className="text-cs-foreground-primary">
//                             {group.groupLabel}
//                         </SidebarGroupLabel>
//                         <SidebarGroupContent>
//                             <SidebarMenu>
//                                 {group.groupContent.map((links) => (
//                                     <SidebarMenuItem asChild>
//                                         <SidebarMenuButton
//                                             asChild
//                                             size="base"
//                                             className={`${
//                                                 currentPage === links.index
//                                                     ? "bg-blue-100"
//                                                     : ""
//                                             } pl-4 hover:bg-blue-100`}
//                                         >
//                                             <Link
//                                                 to={links.menuURL}
//                                                 onClick={() => {
//                                                     setCurrentPage(links.index);
//                                                     setSidebarOpen(false);
//                                                 }}
//                                                 className="text-cs-foreground-secondary data-[active=true]:text-sidebar-primary data-[active=false]:hover:text-sidebar-primary"
//                                             >
//                                                 <links.menuIcon
//                                                     className={`${
//                                                         currentPage ===
//                                                         links.index
//                                                             ? "text-cs-icon-primary"
//                                                             : ""
//                                                     } hover:bg-blue-100`}
//                                                 />
//                                                 <span
//                                                     className={`${
//                                                         currentPage ===
//                                                         links.index
//                                                             ? "text-cs-icon-primary"
//                                                             : ""
//                                                     } text-sm`}
//                                                 >
//                                                     {links.menuTitle}
//                                                 </span>
//                                             </Link>
//                                         </SidebarMenuButton>
//                                     </SidebarMenuItem>
//                                 ))}
//                             </SidebarMenu>
//                         </SidebarGroupContent>
//                     </SidebarGroup>
//                 ))}
//                 <Button
//                     variant="outline"
//                     className="bg-cs-icon-primary text-white cursor-pointer hover:bg-cs-icon-primary/85 hover:text-white"
//                     onClick={logout}
//                 >
//                     Logout
//                 </Button>
//             </SidebarContent>
//         </Sidebar>
//     );
// }

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
import { Home, Info, Settings, Users, Wallet, LogOut, ChevronRight } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageContext } from "../contexts/PageContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        menuTitle: "User Management",
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
      { index: 4, menuTitle: "Help Center", menuURL: "/help", menuIcon: Info },
      {
        index: 5,
        menuTitle: "Settings",
        menuURL: "/settings",
        menuIcon: Settings,
      },
    ],
  },
];

export function AppSidebar({ sidebarOpen, setSidebarOpen }) {
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Sidebar className="border-r bg-gradient-to-b from-background to-muted/20" open={sidebarOpen}>
      {/* Sidebar Header with User Profile */}
      <SidebarHeader className="px-4 py-4">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/img/logo.png" alt="Company Logo" className="w-16 invert rotateImg dark:invert-0"/>
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold tracking-tight">Divyam</h2>
            <p className="text-sm text-muted-foreground">Referral Dashboard</p>
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
          onClick={logout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
          <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </Button>
      </div>
    </Sidebar>
  );
}