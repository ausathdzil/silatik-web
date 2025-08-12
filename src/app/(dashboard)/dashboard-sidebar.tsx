'use client';

import {
  ChartColumnIncreasingIcon,
  ClipboardCheckIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  SmartphoneIcon,
  UserRoundCogIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { NavMain, NavUser } from './dashboard-nav';

const data = {
  user: {
    name: 'John Doe',
    email: 'm@example.com',
  },
  navMain: [
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
    {
      title: 'Silantik Mobile',
      icon: SmartphoneIcon,
      url: '/mobile',
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: SettingsIcon,
    },
  ],
};

export function DashboardSidebar() {
  return (
    <Sidebar variant="floating" collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton className="flex justify-center" asChild>
            <Link href="/">
              <Image src="/logo.svg" alt="logo" width={20} height={20} />
              <span className="font-monomaniac-one text-xl">SILANTIK</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
