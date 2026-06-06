"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  Plus, 
  Search, 
  Clock, 
  ChevronRight, 
  Box, 
  ExternalLink,
  Sparkles,
  TrendingUp,
  AppWindow,
  Cpu,
  Layers,
  Trash2
} from "lucide-react";
import { 
  AnimatedCard, 
  AnimatedNumber, 
  StaggerContainer, 
  StaggerItem,
  GlassContainer,
  Glow,
  Badge,
  Button,
  Input
} from "@/components/ui";

function DashboardContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "active";
  
  const [apps, setApps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/apps")
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        setIsLoading(false);
      });
  }, []);

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Apps", value: apps.length, icon: AppWindow, color: "text-emerald-400" },
    { label: "Generations", value: apps.length * 12 + 5, icon: Sparkles, color: "text-teal-400" },
    { label: "AI Tokens", value: apps.length * 150, icon: Cpu, color: "text-emerald-500" },
    { label: "Uptime", value: 99.9, icon: TrendingUp, color: "text-teal-500", suffix: "%" },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-transparent">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-6 md:p-10 lg:p-12">
      <Glow className="top-0 right-0 w-[500px] h-[500px] opacity-10" />
      
      <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="success">Pro Plan</Badge>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Workspace v2.0</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
            Welcome back, <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{session?.user?.name?.split(' ')[0] || "Genie"}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium text-slate-400">
            Your AI-powered application workspace. Architect, deploy, and scale with ease.
          </p>
        </div>
        
        <Button 
          variant="premium" 
          size="default"
          onClick={() => window.location.href = '/builder'}
          className="group"
        >
          <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
          Create New App
        </Button>
      </header>

      {/* Stats Grid */}
      <StaggerContainer className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <StaggerItem key={idx}>
            <GlassContainer className="p-5 transition-all hover:border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
                  <h3 className="mt-1 text-2xl font-black text-white">
                    <AnimatedNumber value={stat.value} />
                    {stat.suffix}
                  </h3>
                </div>
                <div className={cn("rounded-xl bg-white/5 p-2.5", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </GlassContainer>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Apps List / Content */}
        <div className="lg:col-span-2">
          {activeTab === "active" && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-black text-white">Active Applications</h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                  <Input 
                    placeholder="Search apps..." 
                    className="pl-9 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {filteredApps.length === 0 ? (
                <GlassContainer className="flex flex-col items-center justify-center border-dashed p-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    <Box className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">No apps found</h3>
                  <p className="mt-1 max-w-xs text-sm text-slate-400">
                    Start your journey by creating your first AI-generated application.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-6"
                    onClick={() => window.location.href = '/builder'}
                  >
                    Go to Builder
                  </Button>
                </GlassContainer>
              ) : (
                <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                  {filteredApps.map((app) => (
                    <StaggerItem key={app.id}>
                      <div className="group relative">
                        <Link href={`/app/${app.id}`}>
                          <AnimatedCard className="flex items-center gap-5 p-5">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 shadow-inner group-hover:bg-emerald-500/20 transition-colors">
                              <Layers className="h-7 w-7" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2.5">
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{app.name}</h3>
                                <Badge variant="success" className="text-[10px] h-4">Active</Badge>
                              </div>
                              <div className="mt-1.5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Updated 2h ago</span>
                                <span>•</span>
                                <span>Internal Tool</span>
                              </div>
                            </div>
                            <div className="hidden items-center gap-1.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity md:flex">
                              <span className="text-xs font-bold">Open</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          </AnimatedCard>
                        </Link>
                        <button 
                          onClick={async (e) => {
                            e.preventDefault();
                            if (confirm("Are you sure you want to delete this app?")) {
                              await fetch(`/api/apps/${app.id}`, { method: 'DELETE' });
                              setApps(apps.filter(a => a.id !== app.id));
                            }
                          }}
                          className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-500 opacity-0 transition-all hover:bg-red-500 hover:text-white group-hover:opacity-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </>
          )}

          {activeTab === "settings" && (
            <div className="space-y-5">
              <h2 className="text-xl font-black text-white">Workspace Settings</h2>
              <GlassContainer className="p-0 overflow-hidden">
                <div className="border-b border-white/5 p-5">
                   <h3 className="text-base font-bold text-white">General Preferences</h3>
                   <p className="text-xs text-slate-400">Manage your workspace configuration and notification settings.</p>
                </div>
                <div className="p-5 space-y-5">
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="text-sm font-bold text-white">Auto-Deployment</p>
                         <p className="text-xs text-slate-400">Automatically deploy changes when config is saved.</p>
                      </div>
                      <div className="h-5 w-9 rounded-full bg-emerald-500/20 relative cursor-pointer">
                         <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-emerald-400" />
                      </div>
                   </div>
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="text-sm font-bold text-white">Analytics Sharing</p>
                         <p className="text-xs text-slate-400">Help improve AppGenie by sharing anonymous usage data.</p>
                      </div>
                      <div className="h-5 w-9 rounded-full bg-white/5 relative cursor-pointer">
                         <div className="absolute left-1 top-1 h-3 w-3 rounded-full bg-slate-500" />
                      </div>
                   </div>
                </div>
              </GlassContainer>
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
           <GlassContainer className="p-6">
              <h3 className="text-lg font-black text-white">AI Utilization</h3>
              <div className="mt-5 space-y-5">
                {[
                  { label: "Gemini 1.5 Pro", usage: 75, color: "bg-emerald-500" },
                  { label: "Database Storage", usage: 30, color: "bg-teal-500" },
                  { label: "API Requests", usage: 45, color: "bg-emerald-400" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="mb-1.5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-300">{item.label}</span>
                       <span className="text-emerald-400">{item.usage}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.usage}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={cn("h-full rounded-full", item.color)} 
                      />
                    </div>
                  </div>
                ))}
              </div>
           </GlassContainer>

           <GlassContainer className="relative overflow-hidden p-6">
              <Glow className="-right-10 top-0 h-32 w-32 opacity-20" />
              <h3 className="text-lg font-black text-white">Need inspiration?</h3>
              <p className="mt-1 text-xs font-medium text-slate-400">
                Check out the community templates and see what others are building.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-5 w-full"
                onClick={() => window.open('https://vercel.com/templates', '_blank')}
              >
                Explore Templates
              </Button>
           </GlassContainer>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-transparent p-12">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
