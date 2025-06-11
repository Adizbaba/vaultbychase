"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebarNav } from "@/components/dashboard/dashboard-sidebar-nav";
import { SidebarProvider } from "@/components/ui/sidebar"; // Using the existing complex sidebar
import { useSessionTimeout } from "@/hooks/use-session-timeout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enable session timeout monitoring
  useSessionTimeout();

  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebarNav />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
