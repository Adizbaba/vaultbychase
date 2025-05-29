"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Settings, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "../icons/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";


export function DashboardHeader({ pageTitle }: { pageTitle?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Implement actual logout logic here
    console.log("User logged out");
    router.push('/login');
  };
  
  // Determine the page title based on pathname if not provided
  let title = pageTitle;
  if (!title) {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 1) {
      title = pathSegments[1].charAt(0).toUpperCase() + pathSegments[1].slice(1);
    } else {
      title = "Dashboard";
    }
  }


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
         <SidebarTrigger />
        </div>
        <h1 className="text-xl font-semibold text-foreground hidden md:block">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person user" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
