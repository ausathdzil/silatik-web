import {
  ChartColumnIncreasingIcon,
  ClipboardCheckIcon,
  LayoutDashboardIcon,
  UserRoundCogIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const items = [
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    url: '/',
  },
  {
    title: 'Analytics',
    icon: ChartColumnIncreasingIcon,
    url: '/analytics',
  },
  {
    title: 'Cadre',
    icon: UserRoundCogIcon,
    url: '/cadre',
  },
  {
    title: 'Metrics',
    icon: ClipboardCheckIcon,
    url: '/metrics',
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
