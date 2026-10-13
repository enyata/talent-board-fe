"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AdminAppSidebar } from "./admin/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLogout } from "@/hooks/useLogout";
import { useAdminUsersStore } from "@/store/adminUsersStore";
import Image from "next/image";

export function AdminDashboardSubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { handleLogout, isPending } = useLogout();
  const { user } = useAuthStore();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments.at(-1);
  // /user-management/[userId] shows a breadcrumb instead of a plain title.
  const profileUserId =
    segments[0] === "user-management" ? segments[1] : undefined;
  const profileUser = useAdminUsersStore((s) =>
    profileUserId ? s.users.find((u) => u.id === profileUserId) : undefined,
  );
  const isDynamicId =
    !!lastSegment &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      lastSegment,
    );
  const pageTitle = isDynamicId
    ? "Talent Profile"
    : lastSegment === "admin-dashboard"
      ? "Dashboard"
      : lastSegment?.replace(/-/g, " ");
  const initials =
    `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`.toUpperCase();

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "250px" } as React.CSSProperties}
    >
      <AdminAppSidebar />
      <SidebarInset>
        <header className="flex h-[52px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4 md:px-[32px]">
          <div className="flex items-center justify-between w-[100%]">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-4 border mr-3"
              />
              {profileUserId ? (
                <nav
                  aria-label="Breadcrumb"
                  className="-ml-2 flex min-w-0 items-center gap-1.5 text-[16px] leading-[19.2px] font-bold whitespace-nowrap"
                >
                  <Link
                    href="/user-management"
                    className="flex items-center gap-1.5 text-[#9DA1A6] hover:text-[#252C32]"
                  >
                    <Image
                      src="/assets/icons/admin/profile.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    <span className="hidden sm:inline">User management</span>
                  </Link>
                  <Image
                    src="/assets/icons/admin/breadcrumb-chevron.svg"
                    alt=""
                    width={14}
                    height={14}
                  />
                  <span className="truncate text-[#09090B]">
                    {profileUser
                      ? `${profileUser.firstName} ${profileUser.lastName}`
                      : "User profile"}
                  </span>
                </nav>
              ) : (
                <p className="-ml-2 font-medium text-[18px] md:text-[24px] first-letter:uppercase">
                  {pageTitle}
                </p>
              )}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size={isMobile ? "sm" : "lg"}
                    className="justify-between data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    variant={"ghost"}
                  >
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage
                        src={"/avatars/shadcn.jpg"}
                        alt={user?.first_name}
                      />
                      <AvatarFallback className="font-normal rounded-lg">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-normal text-[14px] capitalize">
                        {user?.first_name}
                      </span>
                      <span className="truncate font-medium text-[#9DA1A6] text-[8px] capitalize">
                        {user?.role?.replace(/_/, " ")}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  // side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={"/avatars/shadcn.jpg"}
                          alt={user?.first_name}
                        />
                        <AvatarFallback className="rounded-lg">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium capitalize">
                          {`${user?.first_name} ${user?.last_name}`}
                        </span>
                        <span className="truncate text-xs capitalize">
                          {user?.role?.replace(/_/, " ")}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/profile`}>
                        <User />
                        My profile
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleLogout()}
                    disabled={isPending}
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
