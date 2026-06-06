"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, Shield, AppWindow, ArrowRight, Code, Database, Cpu } from "lucide-react";
import { useSession } from "next-auth/react";
import { SignOutButton } from "@/components/SignOutButton";
import { GenieLampIcon } from "@/components/AppGenieLogo";
import { 
  Button, 
  Badge, 
  AnimatedCard, 
  StaggerContainer, 
  StaggerItem,
  Glow,
  ShimmerText
} from "@/components/ui";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] selection:bg-emerald-500/30">
      <Glow className="-top-20 -left-20 w-[800px] h-[500px] opacity-10 blur-[150px]" />
      <Glow className="bottom-0 right-0 w-[600px] h-[600px] opacity-10 blur-[150px]" />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Sparkles className="h-5 w-5 text-slate-950" />
            </div>
            <span className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-white">
              <GenieLampIcon size={32} />
              AppGenie
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <SignOutButton />
              </div>
            ) : (
              <>
                <Link href="/login" className="hidden text-sm font-bold text-slate-400 hover:text-emerald-400 transition-colors sm:block">Login</Link>
                <Link href="/login">
                  <Button variant="premium" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-40 text-center">
          <StaggerContainer>
            <StaggerItem>
              <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                The Next Generation of AI Development
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <h1 className="mx-auto max-w-5xl text-6xl font-black leading-[1.05] tracking-tighter text-white md:text-8xl">
                The AI Engine for <br /> <ShimmerText text="Full-Stack" /> Apps.
              </h1>
            </StaggerItem>
            
            <StaggerItem>
              <p className="mx-auto mt-8 max-w-2xl text-xl font-medium leading-relaxed text-slate-400">
                Transform natural language into powerful, production-grade applications.
                <span className="inline-flex items-center gap-1.5 align-middle text-slate-400">
                  <GenieLampIcon size={26} className="-mt-0.5" />
                  AppGenie
                </span>{" "}handles the architecture, database, and UI — you handle the vision.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
                <Link href={session ? "/dashboard" : "/login"}>
                  <Button variant="premium" size="lg" className="group h-16 px-10 text-lg">
                    {session ? "Enter Workspace" : "Launch Your App"}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg">
                  Explore Features
                </Button>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Premium UI Component Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-32 perspective-1000"
          >
            <div className="absolute -inset-10 rounded-[4rem] bg-emerald-500/10 blur-[80px]" />
            
            {/* The "Generated App" Preview */}
            <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-1 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:border-emerald-500/30">
               {/* Browser Top Bar */}
               <div className="flex items-center justify-between bg-white/5 px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/30" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/30" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/30" />
                  </div>
                  <div className="flex h-5 w-80 items-center justify-center rounded-full bg-white/5 px-4">
                     <span className="text-[10px] font-bold text-slate-500">appgenie.dev/generated-app-v1</span>
                  </div>
                  <div className="flex gap-3">
                     <div className="h-2 w-8 rounded-full bg-white/5" />
                     <div className="h-2 w-8 rounded-full bg-white/5" />
                  </div>
               </div>

               {/* Mock App Interface */}
               <div className="grid grid-cols-12 gap-6 p-8 text-left">
                  {/* Left Sidebar Mock */}
                  <div className="col-span-3 space-y-4">
                     <div className="h-10 w-full rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-emerald-500/40" />
                        <div className="h-2 w-20 rounded bg-emerald-500/20" />
                     </div>
                     <div className="space-y-2 pt-4">
                        {[40, 60, 30, 50].map((w, i) => (
                           <div key={i} className="h-2 rounded bg-white/5" style={{ width: `${w}%` }} />
                        ))}
                     </div>
                     <div className="mt-8 rounded-2xl bg-white/5 p-4 space-y-3">
                        <div className="h-2 w-full rounded bg-white/10" />
                        <div className="h-2 w-2/3 rounded bg-white/10" />
                        <div className="h-6 w-full rounded-lg bg-emerald-500/20" />
                     </div>
                  </div>

                  {/* Main Content Mock */}
                  <div className="col-span-9 space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="space-y-2">
                           <div className="h-4 w-48 rounded-full bg-white/10" />
                           <div className="h-2 w-32 rounded-full bg-white/5" />
                        </div>
                        <div className="flex gap-2">
                           <div className="h-8 w-8 rounded-lg bg-white/5" />
                           <div className="h-8 w-24 rounded-lg bg-emerald-500/80" />
                        </div>
                     </div>

                     <div className="grid grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                           <div key={i} className="h-32 rounded-3xl bg-white/5 border border-white/5 p-4 space-y-4">
                              <div className="h-8 w-8 rounded-lg bg-white/5" />
                              <div className="space-y-1.5">
                                 <div className="h-2 w-full rounded bg-white/10" />
                                 <div className="h-2 w-2/3 rounded bg-white/10" />
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="relative h-64 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 overflow-hidden">
                        {/* Animated Code Overlay */}
                        <div className="absolute inset-0 p-8 font-mono text-[10px] text-emerald-400/40 mix-blend-screen overflow-hidden">
                           <pre>
{`{
  "api": "/v1/records",
  "auth": "strict",
  "components": [
    "DataTable",
    "AnalyticsCard",
    "MetricGrid"
  ]
}`}
                           </pre>
                        </div>
                        {/* Floating elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
                           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-white/10 shadow-2xl">
                              <Database className="h-6 w-6 text-emerald-400" />
                           </div>
                           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                              <Cpu className="h-6 w-6" />
                           </div>
                           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-white/10 shadow-2xl">
                              <Code className="h-6 w-6 text-teal-400" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Central Animation */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <motion.div 
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-emerald-500 text-slate-950 shadow-[0_0_60px_rgba(16,185,129,0.5)] border-4 border-slate-950/20"
                  >
                    <Sparkles className="h-12 w-12" />
                  </motion.div>
                  {/* Decorative particles */}
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (i % 2 === 0 ? 60 : -60), (i % 2 === 0 ? 80 : -80)],
                        y: [0, (i < 3 ? -60 : 60), (i < 3 ? -80 : 80)],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.5,
                        ease: "easeOut" 
                      }}
                      className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-emerald-400"
                    />
                  ))}
               </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="mx-auto max-w-7xl px-6 py-40">
           <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { 
                  icon: Zap, 
                  title: "Dynamic Engine", 
                  desc: "Zero manual code required. Our engine interprets your vision and builds scalable architecture instantly.",
                  color: "from-emerald-400 to-teal-400"
                },
                { 
                  icon: Shield, 
                  title: "Strict Security", 
                  desc: "Built-in RBAC and isolated database architecture ensures your data is always enterprise-ready.",
                  color: "from-teal-400 to-emerald-500"
                },
                { 
                  icon: AppWindow, 
                  title: "Native PWA", 
                  desc: "Every app is a Progressive Web App out of the box. Installable, high performance, and offline-ready.",
                  color: "from-emerald-500 to-teal-600"
                },
              ].map((feat, i) => (
                <StaggerItem key={i}>
                  <AnimatedCard className="h-full">
                    <div className={cn(
                      "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br opacity-80 shadow-lg",
                      feat.color
                    )}>
                      <feat.icon className="h-7 w-7 text-slate-950" />
                    </div>
                    <h3 className="text-2xl font-black text-white">{feat.title}</h3>
                    <p className="mt-4 text-slate-400 leading-relaxed font-medium">
                      {feat.desc}
                    </p>
                  </AnimatedCard>
                </StaggerItem>
              ))}
           </StaggerContainer>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-slate-950/50 py-16 text-center backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
           <div className="mb-8 flex justify-center items-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/10" />
              <Sparkles className="h-6 w-6 text-emerald-500/50" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/10" />
           </div>
           <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500">
             © 2026
             <GenieLampIcon size={20} />
             AppGenie AI Platform · Engineered for Excellence
           </p>
           <div className="mt-8 flex justify-center gap-8 text-xs font-bold text-slate-600">
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-emerald-400 cursor-pointer transition-colors">Contact</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
