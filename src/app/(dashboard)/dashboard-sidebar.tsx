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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
