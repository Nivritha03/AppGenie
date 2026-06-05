"use client";

import React from "react";
import { AppWidget } from "@/types";
import { Activity, TrendingUp, Database, BarChart3 } from "lucide-react";

interface DashboardRendererProps {
  widgets: AppWidget[];
  records: any[];
}

const WIDGET_COLORS: Record<string, { bg: string; text: string; glow: string; border: string; icon: string }> = {
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "bg-purple-500",
    border: "border-purple-500/20",
    icon: "bg-purple-500/15 text-purple-400",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "bg-emerald-500",
    border: "border-emerald-500/20",
    icon: "bg-emerald-500/15 text-emerald-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "bg-amber-500",
    border: "border-amber-500/20",
    icon: "bg-amber-500/15 text-amber-400",
  },
  default: {
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    glow: "bg-teal-500",
    border: "border-teal-500/20",
    icon: "bg-teal-500/15 text-teal-400",
  },
};

export const DashboardRenderer: React.FC<DashboardRendererProps> = ({ widgets, records }) => {
  if (!widgets || widgets.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      {widgets.map((widget, idx) => {
        const entityRecords = widget.entity
          ? records.filter(r => r.entityName === widget.entity)
          : records;

        const count = entityRecords.length;
        const hasData = records.length > 0;
        const colors = WIDGET_COLORS[widget.color || "default"] || WIDGET_COLORS.default;

        const IconComponent = widget.type === "chart" ? BarChart3 : Activity;

        return (
          <div
            key={idx}
            className={`group relative bg-slate-900/50 backdrop-blur-md border ${colors.border} rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl animate-card-enter`}
            style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both', opacity: 0 }}
          >
            {/* Background glow */}
            <div className={`absolute -right-6 -top-6 w-28 h-28 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-all duration-700 ${colors.glow}`}></div>

            {/* Top shimmer line */}
            <div className={`absolute top-0 left-0 right-0 h-[1px] ${colors.bg} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

            {/* Header */}
            <div className="flex items-center justify-between mb-5 relative">
              <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${colors.text} opacity-70`}>
                {widget.title}
              </h4>
              <div className={`p-2 rounded-xl ${colors.icon} transition-all group-hover:scale-110 duration-300`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            {/* Value */}
            <div className="relative">
              {!hasData ? (
                <div className="flex items-center gap-2 mt-2">
                  <Database className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-semibold text-slate-600">No data yet</span>
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <span className={`text-4xl font-black tracking-tighter ${colors.text}`}>
                    {widget.type === "stats" ? count : `${Math.min(count * 12, 99)}%`}
                  </span>
                  {widget.type === "stats" && count > 0 && (
                    <span className="text-[10px] text-emerald-400 font-bold mb-1.5 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
              )}
              <p className="text-[11px] text-slate-600 mt-2 font-medium">
                {widget.entity ? `in ${widget.entity}` : "across all entities"}
              </p>
            </div>

            {/* Progress bar (only when has data) */}
            {hasData && widget.type === "stats" && (
              <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${colors.bg.replace('/10', '/50')}`}
                  style={{ width: `${Math.min((count / Math.max(records.length, 1)) * 100, 100)}%` }}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
