"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { FormRenderer } from "@/components/dynamic/FormRenderer";
import { TableRenderer } from "@/components/dynamic/TableRenderer";
import { AppConfig, AppEntity } from "@/types";
import { 
  ArrowLeft, 
  Plus, 
  Database, 
  FileJson,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  RefreshCw,
  ChevronRight,
  Zap
} from "lucide-react";
import Link from "next/link";
import Papa from "papaparse";
import { DashboardRenderer } from "@/components/dynamic/DashboardRenderer";
import { AppErrorBoundary } from "@/components/dynamic/ErrorBoundary";
import { SignOutButton } from "@/components/SignOutButton";

export default function AppDetails() {
  const { id: appId } = useParams();
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [activeEntityIndex, setActiveEntityIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const activeEntity = useMemo(() => {
    if (!app || !app.config.entities) return null;
    return app.config.entities[activeEntityIndex] as AppEntity;
  }, [app, activeEntityIndex]);

  const filteredRecords = useMemo(() => {
    if (!activeEntity) return [];
    return allRecords.filter(r => r.entityName === activeEntity.name);
  }, [allRecords, activeEntity]);

  const fetchAllRecords = async () => {
    setIsRefreshing(true);
    try {
        const res = await fetch(`/api/apps/${appId}/records`);
        const data = await res.json();
        setAllRecords(data);
    } catch (e) {
        console.error(e);
    } finally {
        setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetch(`/api/apps`)
      .then((res) => res.json())
      .then((apps) => {
        const found = apps.find((a: any) => a.id === appId);
        if (!found) {
            router.push('/dashboard');
            return;
        }
        setApp(found);
        setIsLoading(false);
      });
    
    fetchAllRecords();
  }, [appId]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleCreateRecord = async (data: any) => {
    const res = await fetch(`/api/apps/${appId}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, entityName: activeEntity?.name }),
    });
    
    if (res.ok) {
      showToast("Record created successfully!");
      fetchAllRecords();
    } else {
      showToast("Failed to create record", "error");
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    const res = await fetch(`/api/apps/${appId}/records/${recordId}`, {
      method: "DELETE",
    });
    
    if (res.ok) {
      showToast("Record deleted");
      fetchAllRecords();
    }
  };

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const data = results.data;
        let successCount = 0;

        for (const row of data) {
           if (Object.values(row as Record<string, any>).some(v => v !== "")) {
               const res = await fetch(`/api/apps/${appId}/records`, {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ data: row, entityName: activeEntity?.name }),
               });
               if (res.ok) successCount++;
           }
        }
        
        showToast(`Imported ${successCount} records successfully!`);
        fetchAllRecords();
      },
      error: (err) => {
        showToast(`CSV Parse Error: ${err.message}`, "error");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 blur-xl bg-emerald-500/20 rounded-full animate-pulse"></div>
          </div>
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest animate-pulse">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (!app) return null;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 relative overflow-hidden">

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-emerald-600/8 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-teal-600/8 rounded-full blur-[150px] mix-blend-screen animate-float-slow"></div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-4 rounded-2xl border shadow-2xl flex items-center gap-3 animate-slide-up backdrop-blur-xl ${
            notification.type === 'success' 
              ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300 shadow-emerald-950' 
              : 'bg-red-950/80 border-red-500/30 text-red-300 shadow-red-950'
        }`}>
          {notification.type === 'success' 
            ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> 
            : <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
          <p className="text-sm font-semibold">{notification.message}</p>
          <button onClick={() => setNotification(null)} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-slate-950/70 border-r border-white/5 backdrop-blur-2xl z-20 hidden lg:flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/5">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-all group mb-6 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40 shrink-0">
              <Database className="w-5 h-5 text-slate-950" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-base font-bold text-white truncate">{app.name}</h1>
              <p className="text-[10px] text-emerald-400/60 font-mono mt-0.5 truncate">ID: {app.id.slice(0, 14)}...</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-5 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.25em] mb-4 px-2">Entities</p>
          <div className="space-y-1">
            {app.config.entities.map((entity: any, idx: number) => (
              <button
                key={entity.name}
                onClick={() => setActiveEntityIndex(idx)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  activeEntityIndex === idx
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 shadow-sm shadow-emerald-900/20"
                    : "text-slate-500 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                }`}
              >
                <FileJson className={`w-4 h-4 transition-colors ${activeEntityIndex === idx ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                <span className="truncate">{entity.label || entity.name}</span>
                {activeEntityIndex === idx && <ChevronRight className="w-3.5 h-3.5 ml-auto text-emerald-400/50" />}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-5 border-t border-white/5 space-y-3">
          <SignOutButton />
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
            <Sparkles className="w-4 h-4 text-emerald-500/60" />
            <span className="text-[11px] font-semibold text-emerald-500/60">Powered by AppGenie AI</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 p-6 md:p-10 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-slide-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Workspace
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {activeEntity?.label || activeEntity?.name}
              </h2>
              <p className="text-slate-500 text-sm font-medium mt-1.5">
                {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''} in database
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                 <Zap className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Automation Active</span>
              </div>
              <label className="flex items-center gap-2 px-5 py-2.5 glass hover:bg-white/5 border border-white/10 hover:border-emerald-500/20 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 group hover:-translate-y-0.5">
                <Upload className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                <span className="text-slate-400 group-hover:text-slate-200 transition-colors">CSV Import</span>
                <input type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
              </label>
            </div>
          </div>

          {/* Dashboard Widgets */}
          <DashboardRenderer 
            widgets={app.config.widgets || []} 
            records={allRecords} 
          />

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="xl:col-span-4 animate-slide-up delay-100" style={{ animationFillMode: 'both' }}>
              <AppErrorBoundary>
                {activeEntity ? (
                  <FormRenderer
                    entity={activeEntity}
                    onSubmit={handleCreateRecord}
                  />
                ) : (
                  <div className="p-8 glass border border-amber-500/20 rounded-2xl text-center">
                    <p className="text-amber-400 font-medium">Select an entity to view form</p>
                  </div>
                )}
              </AppErrorBoundary>
            </div>

            {/* Table */}
            <div className="xl:col-span-8 space-y-5 animate-slide-up delay-200" style={{ animationFillMode: 'both' }}>
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
                   Data Explorer
                 </h3>
                 <button 
                  onClick={() => fetchAllRecords()}
                  disabled={isRefreshing}
                  className={`flex items-center gap-1.5 text-xs text-emerald-500 hover:text-emerald-300 font-semibold transition-all ${isRefreshing ? 'opacity-40 pointer-events-none' : ''}`}
                 >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh'}
                 </button>
              </div>
              
              <AppErrorBoundary>
                {activeEntity && (
                   <TableRenderer
                    entity={activeEntity}
                    data={filteredRecords}
                    onEdit={() => {}}
                    onDelete={handleDeleteRecord}
                    isLoading={isRefreshing && filteredRecords.length === 0}
                  />
                )}
              </AppErrorBoundary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
