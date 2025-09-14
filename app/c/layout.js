import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/src/Components/Sidebar";
import Header from "@/src/Components/Common/Header";

export default function RootLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen bg-[#212121] relative">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
