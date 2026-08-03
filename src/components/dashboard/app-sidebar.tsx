"use client";

import * as React from "react";
import { LogOut } from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuthStore();

  const navGroups = () => {
    const role = user?.role;
    if (role !== "recruiter" && role !== "talent") return [];

    return [
      {
        label: "Dashboard",
        href: `/dashboard`,
        icon: "/assets/icons/sidebar/dash-icon.svg",
        activeIcon: "/assets/icons/sidebar/dash-icon-active.svg",
      },
      {
        label: "Explore",
        href: `/dashboard/explore`,
        icon: "/assets/icons/sidebar/explore-icon.svg",
      },
      {
        label: "Messages",
        href: `/dashboard/messages`,
        icon: "/assets/icons/sidebar/messages-icon.svg",
        activeIcon: "/assets/icons/sidebar/messages-icon-active.svg",
        // badge: 23,
      },
      {
        label: "Application Tracker",
        href: `/dashboard/application-tracker`,
        icon: "/assets/icons/sidebar/app-tracker-icon.svg",
      },
      {
        label: "Profile",
        href: `/dashboard/profile`,
        icon: "/assets/icons/sidebar/profile-icon.svg",
      },
    ];
  };

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // adjust threshold to match your collapsed width
        setCollapsed(width < 96);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <Sidebar
        collapsible="icon"
        className="shadow-[7px_4px_27px_-13px_rgba(0,0,0,0.1)] group-data-[side=left]:border-r-0"
        {...props}
      >
        {/* active org */}
        <SidebarHeader className="mb-[10px]">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground pl-[24px]"
                asChild
              >
                <Link
                  href={"/dashboard"}
                  className="flex items-center gap-[4px] md:gap-[10px]"
                >
                  <div className="relative size-[22px] md:hidden md:group-data-[collapsible=icon]:block">
                    <Image
                      src="/assets/icons/brand-icon.svg"
                      alt="Talentboard Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-semibold md:text-[24px] md:hidden">
                    Talentboard
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navGroups()} collapsed={collapsed} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-[20px]"
                onClick={logout}
              >
                <LogOut />
                <p className="truncate text-[14px] font-semibold capitalize">
                  Logout
                </p>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
