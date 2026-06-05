import Link from "next/link";
import { Sparkles, Zap, Shield, AppWindow, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { SignOutButton } from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 overflow-hidden relative">
      {/* Vibe Coder Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[150px] mix-blend-screen animate-float" style={{ animationDuration: '20s', animationDelay: '-5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.02] rounded-full animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/[0.02] rounded-full animate-[spin_90s_linear_infinite_reverse]"></div>
      </div>

      {/* Hero Section */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-3 relative group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] group-hover:scale-105 transition-all duration-300">
             <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">AppGenie</span>
        </div>
        <div className="flex items-center gap-6">
           {session ? (
             <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-1.5 pr-4 py-1.5 backdrop-blur-md shadow-lg transition-transform hover:scale-105">
                 {session.user?.image ? (
                   <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-emerald-500/50 object-cover shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
                 ) : (
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-500/30">
                     {session.user?.name?.charAt(0) || "U"}
                   </div>
                 )}
                 <div className="flex flex-col">
                   <span className="text-sm font-semibold text-slate-100">{session.user?.name || "Developer"}</span>
                   <span className="text-[10px] text-emerald-400 uppercase tracking-widest leading-tight flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                     Online
                   </span>
                 </div>
               </div>
               <Link href="/dashboard" className="px-5 py-2 glass text-emerald-300 rounded-xl font-bold text-sm hover:bg-emerald-500/10 hover:text-emerald-200 transition-all border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                 Dashboard
               </Link>
               <SignOutButton />
             </div>
           ) : (
             <>
               <Link href="/login" className="text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors hidden sm:block">Login</Link>
               <Link href="/login" className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]">Get Started</Link>
             </>
           )}
        </div>
      </nav>

      <main>
        <section className="px-6 pt-24 pb-32 max-w-7xl mx-auto text-center relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider mb-8 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:bg-emerald-500/5 transition-colors cursor-default">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-emerald-300"></span>
              Next.js 15 Supported
           </div>
           
           <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight max-w-5xl mx-auto drop-shadow-2xl">
             Generate Full-Stack <br className="hidden sm:block" />
             <span className="relative">
               <span className="bg-gradient-to-rn from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                 Apps in Seconds.
               </span>
               <div className="absolute -inset-1 blur-2xl bg-emerald-500/20 -z-10 rounded-full opacity-50"></div>
             </span>
           </h1>
           
           <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
             The only platform that turns your JSON schema into a production-ready application with dynamic APIs, secure databases, and native PWA support.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href={session ? "/dashboard" : "/login"} className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3">
                 {session ? "Enter Workspace" : "Start Building Now"}
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-32 relative">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent -z-10"></div>
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 border border-white/5 shadow-2xl hover:border-emerald-500/30 hover:-translate-y-2 group relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500">
                    <Zap className="w-7 h-7 text-emerald-400" />
                 </div>
                 <h3 className="text-xl font-bold mb-4 text-white">Dynamic Engine</h3>
                 <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    Zero manual code required. Our engine completely interprets your configuration and builds the UI and API on the fly in real-time.
                 </p>
              </div>
              
              <div className="glass p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 border border-white/5 shadow-2xl hover:border-teal-500/30 hover:-translate-y-2 group relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-500">
                    <Shield className="w-7 h-7 text-teal-400" />
                 </div>
                 <h3 className="text-xl font-bold mb-4 text-white">Enterprise Security</h3>
                 <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    Built-in strict RBAC ensures users can only access their own data, safeguarded effortlessly by NextAuth and isolated Prisma pooling.
                 </p>
              </div>
              
              <div className="glass p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 border border-white/5 shadow-2xl hover:border-cyan-400/30 hover:-translate-y-2 group relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500">
                    <AppWindow className="w-7 h-7 text-cyan-300" />
                 </div>
                 <h3 className="text-xl font-bold mb-4 text-white">PWA Native</h3>
                 <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    Instantly deployable as Progressive Web Apps for native-like high performance experiences with robust offline capabilities out of the box.
                 </p>
              </div>
           </div>
        </section>
      </main>
      
      <footer className="px-6 py-10 text-center text-slate-500 text-sm border-t border-white/5 bg-slate-950/50 backdrop-blur-sm relative z-10">
         <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
           <Sparkles className="w-4 h-4" />
         </div>
         <p>© 2026 AppGenie AI Platform. Engineered for the Next Generation.</p>
      </footer>
    </div>
  );
}
