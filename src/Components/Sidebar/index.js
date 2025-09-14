"use client";

import React from "react";
import { NavMain } from "./NavMain";
import { NavChats } from "./NavChats";
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
import { Columns2, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { NavProjects } from "./NavProjects";
import { usePathname } from "next/navigation";

const SIDEBAR_WIDTH_MOBILE = "18rem";
const side = "left";

const data = {
  navMainItems1: [
    { name: "New chat", url: "/c", icon: NewChatIcon },
    { name: "Library", url: "#", icon: LibraryIcon },
  ],
  navMainItems2: [
    { name: "Sora", url: "#", icon: SoraIcon },
    { name: "GPTs", url: "#", icon: GptsIcon },
  ],
};

export function AppSidebar({ openMobile, setOpenMobile, ...props }) {
  const pathname = usePathname();
  const activeChatId = pathname?.startsWith("/c/")
    ? pathname.split("/c/")[1]
    : null;

  const { toggleSidebar, state } = useSidebar();
  const expanded = "[--sidebar-width:18rem]";
  const collapsed = "[--sidebar-width-icon:4rem]";
  const isMobile = useIsMobile();

  const closeSideBar = () => {
    setOpenMobile(false);
  };

  const children = (
    <>
      <SidebarHeader>
        <div className="flex justify-between items-center">
          {state != "collapsed" && (
            <div className="p-2 flex-shrink-0">
              <Logo />
            </div>
          )}
          <div
            onClick={() => {
              if (isMobile) {
                setOpenMobile(false);
              } else {
                toggleSidebar();
              }
            }}
            className="rounded-md p-2 cursor-pointer hover:bg-sidebar-accent flex-shrink-0"
          >
            {isMobile ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Columns2 className="h-5 w-5 text-white" />
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <NavMain
          closeSideBar={closeSideBar}
          navItems={data?.navMainItems1}
          pathname={pathname}
        />
        <NavMain
          closeSideBar={closeSideBar}
          navItems={data?.navMainItems2}
          pathname={pathname}
        />
        <NavProjects closeSideBar={closeSideBar} activeChatId={activeChatId} />
        <NavChats closeSideBar={closeSideBar} activeChatId={activeChatId} />
      </SidebarContent>

      <SidebarFooter className="border-t border-[#ffffff0d]">
        <NavUser />
      </SidebarFooter>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>

          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sidebar
      className={`${state === "expanded" ? expanded : collapsed}`}
      collapsible="icon"
      {...props}
    >
      {children}
    </Sidebar>
  );
}
