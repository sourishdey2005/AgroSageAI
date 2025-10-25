
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AreaChart,
  Bot,
  Briefcase,
  FlaskConical,
  LayoutGrid,
  Leaf,
  LineChart,
  LogOut,
  MessageSquare,
  Receipt,
  Settings,
  BarChart3,
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { AgroSageLogo } from '../icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    // For the main dashboard, check for exact match.
    if (path === '/dashboard' || path === '/dashboard/agent') {
      return pathname === path;
    }
    // For other pages, check if the pathname starts with the path.
    return pathname.startsWith(path);
  };

  const isAgentRoute = pathname.startsWith('/dashboard/agent');
  const [isAgentMenuOpen, setIsAgentMenuOpen] = useState(isAgentRoute);

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
            <SidebarMenuButton asChild tooltip={{ children: 'Advanced Tools' }} isActive={isActive('/dashboard/advanced-tools')}>
              <Link href="/dashboard/advanced-tools">
                <FlaskConical />
                <span>Advanced Tools</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Community' }} isActive={isActive('/dashboard/community')}>
              <Link href="/dashboard/community">
                <MessageSquare />
                <span>Community</span>
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
          <SidebarSeparator />
           <Collapsible asChild onOpenChange={setIsAgentMenuOpen} open={isAgentMenuOpen}>
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild={false} tooltip={{ children: 'Agent Dashboard' }} isActive={isAgentRoute}>
                      <Briefcase />
                      <span>Agent Dashboard</span>
                      <ChevronDown className={cn("ml-auto transition-transform", isAgentMenuOpen && "rotate-180")} />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent asChild>
                  <SidebarMenuSub>
                    <SidebarMenuItem>
                      <SidebarMenuSubButton asChild isActive={pathname === '/dashboard/agent'}>
                        <Link href="/dashboard/agent">
                          <span>Overview</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuSubButton asChild isActive={pathname === '/dashboard/agent/analytics'}>
                        <Link href="/dashboard/agent/analytics">
                           <BarChart3 />
                           <span>Analytics</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
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
