"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  PlusSquare, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  Sparkles,
  LogOut,
  AppWindow,
  History,
  Home as HomeIcon,
  User,
  Bell
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { signOut } from "next-auth/react";
import { GenieLampIcon } from "@/components/AppGenieLogo";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MENU_ITEMS = [
  { icon: HomeIcon, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: PlusSquare, label: "AI Builder", href: "/builder" },
  { icon: Bell, label: "Notifications", href: "/dashboard?tab=notifications" },
  { icon: Settings, label: "Settings", href: "/dashboard?tab=settings" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      className="relative z-40 flex h-screen flex-col border-r border-border bg-card/60 backdrop-blur-2xl transition-all"
    >
      <div className="flex h-16 items-center justify-between px-6">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2.5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--glow-start))] to-[hsl(var(--glow-end))] shadow-lg">
                <Sparkles className="h-4 w-4 text-white dark:text-slate-950" />
              </div>
              <span className="inline-flex items-center gap-2 text-lg font-black tracking-tight text-foreground">
                <GenieLampIcon size={28} />
                AppGenie
              </span>
            </motion.div>
          )}
          {isCollapsed && (
            <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.5 }}
               className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500"
            >
              <Sparkles className="h-4 w-4 text-slate-950" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {MENU_ITEMS.map((item) => {
          const isHome = item.label === "Home" && pathname === "/";
          const isDashboard = item.label === "Dashboard" && pathname === "/dashboard" && !search;
          const isBuilder = item.label === "AI Builder" && pathname === "/builder";
          const isNotifications = item.label === "Notifications" && pathname === "/dashboard" && search.includes("tab=notifications");
          const isSettings = item.label === "Settings" && pathname === "/dashboard" && search.includes("tab=settings");
          
          const active = isHome || isDashboard || isBuilder || isNotifications || isSettings;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-semibold transition-all hover:bg-white/5",
                active ? "text-emerald-400 bg-emerald-500/10" : "text-slate-400"
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5 transition-transform group-hover:scale-110", active ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200")} />
              {!isCollapsed && (
                <motion.span
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="text-xs"
                >
                  {item.label}
                </motion.span>
              )}
              {active && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 h-5 w-1 rounded-r-full bg-[hsl(var(--glow-start))] shadow-[0_0_10px_rgba(var(--glow-start),0.5)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 p-3 border-t border-white/5">
        <Link
          href="/dashboard/profile"
          className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-semibold text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
            <span className="text-[9px] font-bold">JD</span>
          </div>
          {!isCollapsed && <span className="text-xs">My Profile</span>}
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 font-semibold text-muted-foreground transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4.5 w-4.5 transition-transform group-hover:rotate-12" />
          {!isCollapsed && <span className="text-xs">Sign Out</span>}
        </button>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-400 shadow-lg hover:bg-slate-800 hover:text-white"
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
      </button>
    </motion.aside>
  );
}
