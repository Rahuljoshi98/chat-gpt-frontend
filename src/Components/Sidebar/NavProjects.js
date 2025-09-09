"use client";
import { Archive, MoreHorizontal, Pencil, Share, Trash2 } from "lucide-react";

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
              <DropdownMenuTrigger className="ring-0" asChild>
                <SidebarMenuAction showOnHover className="focus-visible:ring-0">
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-fit rounded-md bg-[#353535]"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
                sideOffset={-20}
                alignOffset={18}
              >
                <DropdownMenuItem>
                  <Share className="w-4 h-4 text-muted-foreground" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Archive className="w-4 h-4 text-muted-foreground" />
                  <span>Archive</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={`text-red-400 focus:text-red-400`}>
                  <Trash2 className="w-4 h-4 text-red-400" />
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
