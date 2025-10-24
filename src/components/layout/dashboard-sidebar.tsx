
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AreaChart,
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
  const pathname = usePathname();
  const isActive = (path: string) => {
    // For the main dashboard, check for exact match.
    if (path === '/dashboard') {
      return pathname === path;
    }
    // For other pages, check if the pathname starts with the path.
    return pathname.startsWith(path);
  }

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
              isActive={isActive('/dashboard') && pathname === '/dashboard'}
            >
              <Link href="/dashboard">
                <LayoutGrid />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Crop Health' }} isActive={isActive('/dashboard/crop-health')}>
              <Link href="/dashboard/crop-health">
                <Leaf />
                <span>Crop Health</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Market Insights' }} isActive={isActive('/dashboard/market-insights')}>
              <Link href="/dashboard/market-insights">
                <LineChart />
                <span>Market Insights</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Receipts' }} isActive={isActive('/dashboard/receipts')}>
              <Link href="/dashboard/receipts">
                <Receipt />
                <span>Receipts</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Analytics' }} isActive={isActive('/dashboard/analytics')}>
              <Link href="/dashboard/analytics">
                <AreaChart />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'AgroBot' }} isActive={isActive('/dashboard/chatbot')}>
              <Link href="/dashboard/chatbot">
                <Bot />
                <span>AgroBot</span>
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
