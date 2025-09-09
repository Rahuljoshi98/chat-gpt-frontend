"use client";
import * as React from "react";
import { Frame, Map, PieChart } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
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
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
