"use client";
import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({ projects }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[15px] font-medium">
        Chats
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects?.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex items-center gap-2">
                <span className="group-data-[collapsible=icon]:hidden text-[16px]">
                  {item.name}
                </span>
              </a>
            </SidebarMenuButton>

            {/* Dropdown actions */}
            <DropdownMenu>
              <DropdownMenuTrigger className="" asChild>
                <SidebarMenuAction showOnHover className="">
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-fit rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
                sideOffset={-20} // small horizontal gap from trigger
                alignOffset={18}
              >
                <DropdownMenuItem>
                  <Folder className="w-4 h-4 text-muted-foreground" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="w-4 h-4 text-muted-foreground" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                  <span>Archive</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="w-4 h-4 text-muted-foreground" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
