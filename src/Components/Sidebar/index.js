"use client";

import * as React from "react";
import { NavMain } from "./NavMain";
import { NavProjects } from "./NavProjects";
import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  GptsIcon,
  LibraryIcon,
  Logo,
  NewChatIcon,
  NewProjectIcon,
  SoraIcon,
} from "../Common/Icons";
import { Columns2, Menu, PanelRightClose } from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "Rahul Joshi",
    email: "test@gmail.com",
    avatar: "/avatars/shadcn.jpg",
    subscription_type: "Free",
    paid: false,
  },
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      id: "1",
    },
    {
      name: "Sales & Marketing",
      url: "#",
      id: "2",
    },
    {
      name: "Travel",
      url: "#",
      id: "3",
    },
  ],
  navMainItems1: [
    {
      name: "New chat",
      url: "#",
      icon: NewChatIcon,
    },
    {
      name: "Library",
      url: "#",
      icon: LibraryIcon,
    },
  ],
  navMainItems2: [
    {
      name: "Sora",
      url: "#",
      icon: SoraIcon,
    },
    {
      name: "GPTs",
      url: "#",
      icon: GptsIcon,
    },
  ],
  navMainItems3: [
    {
      name: "New Project",
      url: "#",
      icon: NewProjectIcon,
    },
  ],
};

export function AppSidebar(props) {
  const { toggleSidebar, state } = useSidebar();
  const expanded = "[--sidebar-width:18rem]";
  const collapsed = "[--sidebar-width-icon:4rem]";
  return (
    <Sidebar
      className={`${state === "expanded" ? expanded : collapsed}`}
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <div
            className={`${
              state == "expanded" ? "block" : "hidden"
            } p-2 flex-shrink-0`}
          >
            <Logo />
          </div>
          <div
            onClick={toggleSidebar}
            className="rounded-md p-2 cursor-pointer hover:bg-sidebar-accent flex-shrink-0"
          >
            <Columns2 className="h-5 w-5 text-white" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className={`gap-0`}>
        <NavMain navItems={data?.navMainItems1} />
        <NavMain navItems={data?.navMainItems2} />
        <NavMain navItems={data?.navMainItems3} />

        <NavProjects projects={data?.projects} />
      </SidebarContent>
      <SidebarFooter className={`border-t border-[#ffffff0d]`}>
        <NavUser user={data?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
