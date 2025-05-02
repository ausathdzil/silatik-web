import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from './dashboard-sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
