"use client";

import { signIn } from "next-auth/react";
import { Sparkles, Globe, Zap, Shield, Cpu, ArrowRight } from "lucide-react";
import { 
  Button, 
  GlassContainer, 
  Glow, 
  ShimmerText, 
  PageTransition,
  StaggerContainer,
  StaggerItem
} from "@/components/ui";
import { GenieLampIcon } from "@/components/AppGenieLogo";

const features = [
  { icon: Zap, label: "AI Generation" },
  { icon: Shield, label: "Secure RBAC" },
  { icon: Cpu, label: "Dynamic Schema" },
];

export default function LoginPage() {
  return (
    <PageTransition>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] p-6 selection:bg-emerald-500/30">
        <Glow className="top-1/4 left-1/4 h-[600px] w-[600px] opacity-10" />
        <Glow className="bottom-1/4 right-1/4 h-[600px] w-[600px] opacity-10 blur-[150px]" />

        <div className="relative z-10 w-full max-w-md">
          <div className="relative group">
            {/* Outer Glow */}
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700" />
            
            <GlassContainer className="relative flex flex-col items-center p-10 text-center shadow-2xl bg-slate-950/80">
              <StaggerContainer>
                <StaggerItem>
                  <div className="relative mb-10">
                    <div className="absolute inset-0 rounded-2xl bg-emerald-500/30 blur-2xl animate-pulse" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-2xl transition-transform duration-500 group-hover:scale-110">
                      <Sparkles className="h-12 w-12 text-slate-950" />
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <h1 className="text-4xl font-black tracking-tight text-white">
                    Welcome to{" "}
                    <span className="inline-flex items-center gap-2 align-middle">
                      <GenieLampIcon size={48} className="text-white" />
                      <ShimmerText text="AppGenie" />
                    </span>
                  </h1>
                  <p className="mt-4 text-lg font-medium text-slate-400">
                    Your AI-powered application workspace.
                  </p>
                </StaggerItem>

                <StaggerItem>
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <feat.icon className="h-3 w-3 text-emerald-400" />
                        {feat.label}
                      </div>
                    ))}
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="mt-12 w-full">
                    <Button 
                      variant="premium" 
                      size="lg" 
                      className="w-full h-16 text-lg group"
                      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    >
                      <Globe className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" />
                      Continue with Google
                    </Button>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="mt-10 border-t border-white/5 pt-10">
                    <div className="flex items-center justify-center gap-4 text-emerald-500/40">
                       <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Access Only</span>
                       <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </GlassContainer>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
