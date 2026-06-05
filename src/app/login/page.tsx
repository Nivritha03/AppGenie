"use client";

import { signIn } from "next-auth/react";
import { Sparkles, Globe, Zap, Shield, Cpu } from "lucide-react";

const features = [
  { icon: Zap, label: "AI-Powered Generation" },
  { icon: Shield, label: "Enterprise Security" },
  { icon: Cpu, label: "Dynamic Schema Engine" },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden selection:bg-emerald-500/30">

      {/* Vibe Coder Ambient Background — identical to homepage */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[5%] left-[15%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[130px] mix-blend-screen animate-float"></div>
        <div className="absolute bottom-[5%] right-[10%] w-[700px] h-[700px] bg-teal-600/10 rounded-full blur-[160px] mix-blend-screen animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/[0.02] rounded-full animate-[spin_90s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] border border-white/[0.015] rounded-full animate-[spin_120s_linear_infinite_reverse]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">

        {/* Glow card border */}
        <div className="relative group">
          <div className="absolute -inset-[1.5px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-[2rem] blur-sm opacity-30 animate-gradient-x group-hover:opacity-60 transition-all duration-700"></div>

          <div className="relative bg-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 flex flex-col items-center text-center shadow-2xl">

            {/* Logo */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-2xl animate-pulse-glow"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-slate-950" />
              </div>
            </div>

            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
              AppGenie
            </h1>
            <p className="text-slate-400 mb-8 text-base font-medium leading-relaxed max-w-xs">
              Your AI-powered application factory. Describe it, generate it, ship it.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {features.map(({ icon: Icon, label }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/8 rounded-full text-xs font-semibold text-slate-400 animate-slide-up"
                  style={{ animationDelay: `${i * 100 + 200}ms`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  <Icon className="w-3 h-3 text-emerald-400" />
                  {label}
                </div>
              ))}
            </div>

            {/* Sign In Button */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-4 px-6 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group/btn animate-pulse-glow"
            >
              <Globe className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
              Continue with Google
            </button>

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-white/5 w-full">
              <div className="flex items-center justify-center gap-2 text-emerald-500/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Secured · Encrypted · Private</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
