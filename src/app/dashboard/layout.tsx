"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { PageTransition } from "@/components/ui/DesignSystem";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#020617]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  );
}
