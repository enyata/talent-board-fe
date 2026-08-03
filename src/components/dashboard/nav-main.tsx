"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";

export function NavMain({
  items,
  collapsed,
}: {
  items: {
    label: string;
    href: string;
    icon?: string;
    activeIcon?: string;
    badge?: string;
    children?: {
      label: string;
      href: string;
    }[];
  }[];
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== `/${user?.role?.replace(/_/, "-")}` &&
              pathname.startsWith(item.href));

          const hasChildren = item.children && item.children.length > 0;
          const isChildActive = item.children?.some(
            (child) => pathname === child.href,
          );

          if (hasChildren) {
            return (
              <Collapsible
                key={item.href}
                defaultOpen={isActive || isChildActive}
                className="group/collapsible"
              >
                <SidebarMenuItem className="relative">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.label}
                      className={cn(
                        "group relative flex w-full cursor-pointer items-center gap-2.5 rounded-md text-[13px] font-medium text-foreground transition-all duration-150",
                        isActive || isChildActive
                          ? "bg-primary/10 font-semibold hover:!bg-primary/10"
                          : "",
                      )}
                    >
                      {item.icon && (
                        <Image
                          src={
                            (isActive || isChildActive) && item.activeIcon
                              ? item.activeIcon
                              : item.icon
                          }
                          alt=""
                          width={18}
                          height={18}
                        />
                      )}
                      {item.label}
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.children!.map((child) => {
                      const isChildItemActive = pathname === child.href;
                      return (
                        <SidebarMenuSubItem key={child.href}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isChildItemActive}
                            className="text-[13px]"
                          >
                            <Link href={child.href}>{child.label}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <SidebarMenuItem key={item.href} className="relative">
              <SidebarMenuButton
                tooltip={item.label}
                className={cn(
                  "group relative flex items-center gap-2.5 rounded-none text-[14px] font-semibold text-foreground transition-all duration-150 h-[49px] pl-[24px]",
                  isActive
                    ? "bg-primary/10 font-semibold hover:bg-primary/10"
                    : "",
                )}
                asChild
              >
                <Link href={item.href}>
                  {item.icon && (
                    <Image
                      src={
                        isActive && item.activeIcon
                          ? item.activeIcon
                          : item.icon
                      }
                      alt=""
                      width={18}
                      height={18}
                    />
                  )}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
              {item.badge && !collapsed && (
                <span className="rounded bg-amber-500/15 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wider text-secondary-foreground absolute right-2 top-1/2 -translate-y-1/2">
                  {item.badge}
                </span>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
