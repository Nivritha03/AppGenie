"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { validateConfig } from "@/lib/validator";
import { Loader2, Code, Sparkles, AlertCircle, Wand2, Terminal, AppWindow } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";

const EXAMPLES = [
  "Student CRM with attendance tracking",
  "Inventory Management System with stock levels",
  "HR Employee Portal",
  "Library Management App"
];

export default function AppBuilder() {
  const [prompt, setPrompt] = useState("");
  const [configText, setConfigText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleGenerateAI = async () => {
    if (!prompt.trim()) return;
    setError(null);
    setIsGenerating(true);

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
    } catch (err: any) {
      setError(err.message || "Failed to reach AI generator. Please ensure GEMINI_API_KEY is configured.");
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

    try {
      const parsed = JSON.parse(configText);
      const validation = validateConfig(parsed);

      if (!validation.success) {
        setError(validation.error || "Invalid configuration");
        setIsSaving(false);
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 relative overflow-hidden">
      
      {/* Vibe Coder Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[0%] left-[10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
        <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[150px] mix-blend-screen animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Top nav bar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <span className="font-black text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">AppGenie</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-semibold text-slate-500 hover:text-slate-200 transition-colors hidden sm:block">Dashboard</Link>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto relative z-10 p-6 md:p-12">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">
            AI Application Builder
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Describe what you want to build in plain English. The AI engine will architect your entire schema.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          
          {/* AI Prompter Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 blur-[100px] -z-10 pointer-events-none rounded-full"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <Wand2 className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Describe your application
              </h2>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Create a complex inventory management system that tracks item stock, supplier details, and shipment logs."
              className="w-full h-32 p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-white placeholder:text-slate-600 resize-none font-medium text-base mb-4 shadow-inner"
            />

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Try:</span>
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(ex)}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-emerald-500/30 text-xs text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>

            <div className="flex justify-end border-t border-white/5 pt-6">
              <button
                onClick={handleGenerateAI}
                disabled={isGenerating || !prompt}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Generating Architecture...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate with AI
                  </>
                )}
              </button>
            </div>
          </div>

          {/* JSON Editor Section */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Generated Schema</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
              </div>
              
              <textarea
                value={configText}
                onChange={(e) => setConfigText(e.target.value)}
                placeholder="// Generate with AI roughly above, or paste your raw JSON Schema here."
                className="w-full h-[400px] p-6 bg-transparent text-emerald-100/90 font-mono text-sm focus:outline-none resize-none selection:bg-emerald-500/30"
                spellCheck={false}
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 mt-4">
            {error && (
              <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-2 backdrop-blur-md">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={handleSaveApp}
              disabled={isSaving || !configText.trim()}
              className="w-full sm:w-auto px-12 py-5 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Deploying Application...
                </>
              ) : (
                <>
                  <AppWindow className="w-6 h-6" />
                  Generate Application
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
