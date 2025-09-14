"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({ navItems, closeSideBar, pathname }) {
  const { isMobile } = useSidebar();

  const handleSideBar = () => {
    if (isMobile && closeSideBar) {
      closeSideBar();
    }
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems?.map((item) => (
          <SidebarMenuItem
            key={item.name}
            className={`flex justify-between ${
              pathname == item?.url && pathname != "#"
                ? "bg-[#2f2f2f] rounded-md"
                : ""
            }`}
          >
            <SidebarMenuButton asChild onClick={() => handleSideBar()}>
              <Link
                href={item.url}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <item.icon />
                  <span className="group-data-[collapsible=icon]:hidden sm:text-[16px] text-sm">
                    {item.name}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
