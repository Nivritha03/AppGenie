"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { validateConfig } from "@/lib/validator";
import { 
  Loader2, 
  Sparkles, 
  AlertCircle, 
  Wand2, 
  Terminal, 
  AppWindow, 
  ChevronRight,
  BrainCircuit,
  Database,
  MonitorCheck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  GlassContainer,
  StaggerContainer,
  StaggerItem,
  Glow,
  ShimmerText
} from "@/components/ui";

const EXAMPLES = [
  "Student CRM with attendance tracking",
  "Inventory Management System",
  "HR Employee Portal",
  "Library Management App"
];

const STEPS = [
  { id: "prompt", label: "Architect", icon: Wand2 },
  { id: "ai", label: "AI Brain", icon: BrainCircuit },
  { id: "schema", label: "JSON Schema", icon: Database },
  { id: "deploy", label: "Deployment", icon: MonitorCheck },
];

export default function AppBuilder() {
  const [prompt, setPrompt] = useState("");
  const [configText, setConfigText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  // Simulate streaming effect for JSON
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    if (configText && !isGenerating) {
      setDisplayText("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(configText.slice(0, i));
        i += 150; // Fast stream
        if (i >= configText.length) {
          setDisplayText(configText);
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [configText, isGenerating]);

  const handleGenerateAI = async () => {
    if (!prompt.trim()) return;
    setError(null);
    setIsGenerating(true);
    setCurrentStep(1); // AI Brain step

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate AI configuration");
      }

      setConfigText(JSON.stringify(data, null, 2));
      setCurrentStep(2); // Schema step
    } catch (err: any) {
      setError(err.message || "Failed to reach AI generator. Please ensure GEMINI_API_KEY is configured.");
      setCurrentStep(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveApp = async () => {
    setError(null);
    if (!configText.trim()) {
      setError("Please generate or provide a JSON schema first.");
      return;
    }
    setIsSaving(true);
    setCurrentStep(3); // Deploy step

    try {
      const parsed = JSON.parse(configText);
      const validation = validateConfig(parsed);

      if (!validation.success) {
        setError(validation.error || "Invalid configuration");
        setIsSaving(false);
        setCurrentStep(2);
        return;
      }

      const response = await fetch("/api/apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.name,
          config: parsed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save application");
      }

      const app = await response.json();
      router.push(`/app/${app.id}`);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax. Please fix any syntax errors before generating.");
      setCurrentStep(2);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen p-6 md:p-10 lg:p-20 overflow-x-hidden">
      <Glow className="top-0 left-1/4 w-[800px] h-[400px] opacity-10" />
      
      <div className="mx-auto max-w-5xl">
        <header className="mb-16 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
          >
            <Sparkles className="h-10 w-10 text-emerald-400" />
          </motion.div>
          <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
            AI <ShimmerText text="Architecture" />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-slate-400">
            Design robust, full-stack applications in seconds. Describe your vision, and we'll handle the engineering.
          </p>
        </header>

        {/* Workflow Progress */}
        <div className="mb-16 hidden md:block">
           <div className="relative flex justify-between">
             <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-white/5" />
             <motion.div 
                className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2"
                animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
             />
             {STEPS.map((step, idx) => (
               <div key={idx} className="relative z-10 flex flex-col items-center">
                 <div className={cn(
                   "flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-slate-950 transition-all duration-300",
                   currentStep >= idx ? "bg-emerald-500 text-slate-950" : "bg-slate-900 text-slate-500"
                 )}>
                   {currentStep > idx ? <CheckCircle2 className="h-6 w-6" /> : <step.icon className="h-5 w-5" />}
                 </div>
                 <span className={cn(
                   "mt-3 text-xs font-black uppercase tracking-widest",
                   currentStep >= idx ? "text-emerald-400" : "text-slate-600"
                 )}>{step.label}</span>
               </div>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Main Input Area */}
          <div className="lg:col-span-3 space-y-8">
            <GlassContainer className="relative overflow-hidden p-8">
              <div className="mb-6 flex items-center gap-3">
                <Wand2 className="h-6 w-6 text-emerald-400" />
                <h2 className="text-xl font-black text-white">Application Requirements</h2>
              </div>
              
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Create a modern SaaS for fleet management with real-time tracking, driver profiles, and maintenance logs."
                  className="min-h-[240px] w-full resize-none rounded-2xl border border-white/10 bg-slate-950/50 p-6 font-medium text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
                <Glow className="bottom-4 right-4 h-20 w-20 opacity-10 group-focus-within:opacity-30" />
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="mr-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Pick a starting point:</span>
                {EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(ex)}
                    className="rounded-full bg-white/5 border border-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              <div className="mt-10 flex justify-end">
                <Button 
                  variant="premium" 
                  size="lg"
                  disabled={isGenerating || !prompt}
                  onClick={handleGenerateAI}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Synthesizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Architecture
                    </>
                  )}
                </Button>
              </div>
            </GlassContainer>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-400"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm font-bold">{error}</p>
              </motion.div>
            )}
          </div>

          {/* Logic & Schema Preview */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2rem] opacity-20 blur-xl" />
              <GlassContainer className="flex h-full min-h-[500px] flex-col overflow-hidden bg-slate-950/80">
                <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Schema.json</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/30" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/30" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/30" />
                  </div>
                </div>
                
                <textarea
                  value={isGenerating ? "// Brainstorming architecture..." : displayText || configText}
                  onChange={(e) => setConfigText(e.target.value)}
                  className="w-full flex-1 resize-none bg-transparent p-6 font-mono text-sm leading-relaxed text-emerald-300/90 focus:outline-none"
                  spellCheck={false}
                  placeholder="// Your generated JSON configuration will appear here."
                />

                <div className="p-6 bg-white/[0.02] border-t border-white/5">
                  <Button 
                    className="w-full" 
                    variant="premium"
                    disabled={isSaving || !configText.trim() || isGenerating}
                    onClick={handleSaveApp}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Deploying App Gen...
                      </>
                    ) : (
                      <>
                         <AppWindow className="mr-2 h-5 w-5" />
                         Build Application
                      </>
                    )}
                  </Button>
                </div>
              </GlassContainer>
            </div>
            
            {/* Thinking Interaction */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20 overflow-hidden"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -right-20 -top-20 h-60 w-60 rounded-full border-[20px] border-emerald-500/10"
                  />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20">
                      <BrainCircuit className="h-8 w-8 text-emerald-400 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-black text-white">Magical Brain Active</h3>
                    <p className="mt-2 text-xs font-medium text-slate-400 leading-relaxed">
                      We're architecting your relational schema, defining data structures, and building the UI logic.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Back */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
        <Link href="/dashboard">
          <GlassContainer className="px-6 py-3 border-emerald-500/10 hover:border-emerald-500/40 transition-all group flex items-center gap-3">
             <ArrowRight className="h-4 w-4 rotate-180 text-emerald-400" />
             <span className="text-sm font-black uppercase tracking-widest text-white group-hover:text-emerald-400">Back to Dashboard</span>
          </GlassContainer>
        </Link>
      </div>
    </div>
  );
}
