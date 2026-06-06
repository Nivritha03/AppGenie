"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui";

export function SignOutButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/login" })}
      title="Sign out"
      className="gap-2 border-white/5 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
    >
      <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      <span className="hidden sm:inline">Sign out</span>
    </Button>
  );
}
