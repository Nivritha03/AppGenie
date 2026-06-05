"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { 
  Plus, 
  LayoutGrid, 
  Search, 
  Clock, 
  ChevronRight, 
  Box, 
  ExternalLink,
  Sparkles,
  LogOut
} from "lucide-react";

export default function Dashboard() {
  const { data: session } = useSession();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 overflow-hidden relative">
      
      {/* Ambient Vibe Coder Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen animate-float"></div>
        <div className="absolute bottom-[10%] right-[30%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <nav className="border-b border-white/5 bg-slate-950/60 backdrop-blur-2xl sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
             <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-slate-950" />
             </div>
             <span className="font-black text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">AppGenie</span>
          </Link>
          
          <div className="flex items-center gap-3">
             {session?.user && (
               <>
                 <div className="hidden sm:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-1.5 pr-4 py-1.5 backdrop-blur-md shadow-lg">
                   {session.user.image ? (
                     <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-emerald-500/50 object-cover" />
                   ) : (
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-500/30">
                       {session.user.name?.charAt(0) || "U"}
                     </div>
                   )}
                   <div className="flex flex-col">
                     <span className="text-sm font-semibold text-slate-100">{session.user.name}</span>
                     <span className="text-[10px] text-emerald-400 uppercase tracking-widest leading-none mt-0.5 flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                       Online
                     </span>
                   </div>
                 </div>
                 <button
                   onClick={() => signOut({ callbackUrl: "/login" })}
                   title="Sign out"
                   className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 hover:bg-red-500/10 hover:border-red-500/20 text-slate-500 hover:text-red-400 transition-all duration-200 text-sm font-semibold group"
                 >
                   <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                   <span className="hidden sm:inline">Sign out</span>
                 </button>
               </>
             )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 drop-shadow-sm">My Applications</h1>
            <p className="text-slate-400 font-medium text-lg">Manage and monitor your generated AI apps.</p>
          </div>
          
          <Link 
            href="/builder"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            Create New App
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="md:col-span-3 relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search your generated applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white placeholder:text-slate-500 shadow-inner"
                />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all">
                <LayoutGrid className="w-5 h-5 text-emerald-400 shrink-0" />
                <select className="bg-transparent text-sm font-semibold focus:outline-none w-full text-slate-200 cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white">
                    <option value="recent">Recently Modified</option>
                    <option value="az">Name A-Z</option>
                </select>
            </div>
        </div>

        {filteredApps.length === 0 ? (
          <div className="text-center py-32 bg-slate-900/40 backdrop-blur-md border border-dashed border-white/10 rounded-[2.5rem]">
             <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                <Box className="w-10 h-10 text-emerald-400" />
             </div>
             <h3 className="text-3xl font-bold mb-4">No applications found</h3>
             <p className="text-slate-400 max-w-md mx-auto mb-10 text-lg">
               {searchTerm ? "No results match your search parameters." : "Your workspace is empty. Start your journey by architecting your first AI application."}
             </p>
             <Link href="/builder" className="inline-flex items-center gap-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors group text-lg">
               Enter Builder
               <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map((app, idx) => (
              <Link 
                key={app.id}
                href={`/app/${app.id}`}
                className="group relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 transition-all hover:bg-slate-800/60 hover:border-emerald-500/30 overflow-hidden hover:-translate-y-2 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                    <ExternalLink className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner group-hover:bg-emerald-500/20">
                   <Box className="w-8 h-8 text-emerald-400" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 truncate group-hover:text-emerald-50 transition-colors">{app.name}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mb-10">
                    <Clock className="w-3.5 h-3.5 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" />
                    v1.0.0 • Updated 2h ago
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                   <div className="flex -space-x-2">
                       {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-emerald-950 flex items-center justify-center text-[10px] font-bold text-emerald-400 shadow-sm">
                               {String.fromCharCode(64 + i)}
                           </div>
                       ))}
                   </div>
                   <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 group-hover:text-emerald-300">
                      Open App
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
