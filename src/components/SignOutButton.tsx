"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      title="Sign out"
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 hover:bg-red-500/10 hover:border-red-500/20 text-slate-500 hover:text-red-400 transition-all duration-200 text-sm font-semibold group"
    >
      <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      <span className="hidden sm:inline">Sign out</span>
    </button>
  );
}
