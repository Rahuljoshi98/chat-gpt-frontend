"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CircleUserRound,
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  Settings2,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ring-0">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:ring-0"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs text-[#afafaf]">
                  {user?.subscription_type}
                </span>
              </div>
              {user?.paid == false && (
                <button className=" rounded-xl bg-[#212121] hover:bg-[#2f2f2f] text-sm cursor-pointer text-medium border-1 border-[#ffffff26] hover:shadow px-3  py-1">
                  Upgrade
                </button>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-[#353535]"
            side={isMobile ? "bottom" : "top"}
            align={isMobile ? "end" : "start"}
            sideOffset={4}
            alignOffset={0}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={`pointer-events-none text-[16px] text-[#afafaf]`}
              >
                <CircleUserRound className="text-[#afafaf]" />
                {user?.email}
              </DropdownMenuItem>

              <DropdownMenuItem className={`text-[16px] text-white`}>
                <Sparkles className="text-white" />
                Upgrade Plane
              </DropdownMenuItem>

              <DropdownMenuItem className={`text-[16px] text-white`}>
                <Settings2 className="text-white" />
                Customize ChatGPT
              </DropdownMenuItem>

              <DropdownMenuItem className={`text-[16px] text-white`}>
                <Settings className="text-white" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className={`text-[16px] text-white`}>
              <LifeBuoy className="text-white" />
              Help
            </DropdownMenuItem>

            <DropdownMenuItem className={`text-[16px] text-white`}>
              <LogOut className="text-white" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
