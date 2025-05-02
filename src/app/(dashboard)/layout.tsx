import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';
import { DashboardSidebar } from './dashboard-sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <Suspense fallback={<Loader className="animate-spin" />}>
          {children}
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
