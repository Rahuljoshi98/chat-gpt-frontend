"use client";
import {
  CircleUserRound,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useClerk } from "@clerk/nextjs";
import { HeaderSelector } from "../Common/selector";
import { useSelector } from "react-redux";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { signOut } = useClerk();

  const selector = HeaderSelector();
  const { userDetails } = useSelector(selector);

  const handleLogout = () => {
    signOut();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ring-0">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:ring-0 cursor-pointer"
            >
              {userDetails?.email && (
                <>
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage
                      src={userDetails?.image}
                      alt={userDetails?.fullName}
                    />
                    <AvatarFallback className="rounded-lg">U</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {userDetails?.fullName || userDetails?.email}
                    </span>
                    <span className="truncate text-xs text-[#afafaf]">
                      Free
                    </span>
                  </div>
                  <button className=" rounded-xl bg-[#212121] hover:bg-[#2f2f2f] text-sm cursor-pointer text-medium border-1 border-[#ffffff26] hover:shadow px-3  py-1">
                    Upgrade
                  </button>
                </>
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
                className={`pointer-events-none sm:text-[16px] text-sm text-[#afafaf]`}
              >
                <CircleUserRound className="text-[#afafaf]" />
                {userDetails?.email}
              </DropdownMenuItem>

              <DropdownMenuItem className="sm:text-[16px] text-sm text-white opacity-50 cursor-not-allowed">
                <Sparkles className="text-white" />
                Upgrade Plane
              </DropdownMenuItem>

              <DropdownMenuItem className="sm:text-[16px] text-sm text-white opacity-50 cursor-not-allowed">
                <Settings2 className="text-white" />
                Customize ChatGPT
              </DropdownMenuItem>

              <DropdownMenuItem className="sm:text-[16px] text-sm text-white opacity-50 cursor-not-allowed">
                <Settings className="text-white" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="sm:text-[16px] text-sm text-white opacity-50 cursor-not-allowed">
              <LifeBuoy className="text-white" />
              Help
            </DropdownMenuItem>

            <DropdownMenuItem
              className={`sm:text-[16px] text-sm text-white cursor-pointer`}
              onClick={() => handleLogout()}
            >
              <LogOut className="text-white" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
