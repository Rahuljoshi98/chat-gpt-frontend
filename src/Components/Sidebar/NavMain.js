"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavMain({ navItems, closeSideBar }) {
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
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild onClick={() => handleSideBar()}>
              <a href={item.url} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <item.icon />
                  <span className="group-data-[collapsible=icon]:hidden sm:text-[16px] text-sm">
                    {item.name}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
