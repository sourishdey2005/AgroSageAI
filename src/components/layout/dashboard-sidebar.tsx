'use client';

import Link from 'next/link';
import {
  Bot,
  LayoutGrid,
  Leaf,
  LineChart,
  LogOut,
  Receipt,
  Settings,
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { AgroSageLogo } from '../icons';

export default function DashboardSidebar() {
  // In a real app, you'd use usePathname and other logic to set isActive.
  // For this component, we'll assume the main dashboard is always active.
  const isActive = true;

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2" data-sidebar="logo">
          <AgroSageLogo className="w-7 h-7 text-primary" />
          <span className="text-lg font-bold font-headline">AgroSage AI</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={{ children: 'Dashboard' }}
              isActive={isActive}
            >
              <Link href="/dashboard">
                <LayoutGrid />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
         <SidebarSeparator />
         <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Settings' }}>
              <Link href="#">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Logout' }}>
              <Link href="/">
                <LogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
