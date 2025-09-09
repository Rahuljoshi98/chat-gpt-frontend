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
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  GptsIcon,
  LibraryIcon,
  Logo,
  NewChatIcon,
  NewProjectIcon,
  SoraIcon,
} from "../Common/Icons";

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
    },
    {
      name: "Sales & Marketing",
      url: "#",
    },
    {
      name: "Travel",
      url: "#",
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className={`gap-0`}>
        <NavMain navItems={data.navMainItems1} />
        <NavMain navItems={data.navMainItems2} />
        <NavMain navItems={data.navMainItems3} />

        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className={`border-t border-[#ffffff0d]`}>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
