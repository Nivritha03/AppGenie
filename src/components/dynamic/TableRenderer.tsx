"use client";

import React from "react";
import { AppEntity } from "@/types";
import { 
  Pencil, 
  Trash2, 
  ChevronLeft,
  ChevronRight,
  Database,
  RefreshCw
} from "lucide-react";

interface TableRendererProps {
  entity: AppEntity;
  data: any[];
  onEdit: (record: any) => void;
  onDelete: (recordId: string) => void;
  isLoading?: boolean;
}

export const TableRenderer: React.FC<TableRendererProps> = ({
  entity,
  data,
  onEdit,
  onDelete,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="w-full h-64 bg-slate-950/60 backdrop-blur-md border border-white/8 rounded-2xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 blur-lg bg-emerald-500/20 rounded-full"></div>
          </div>
          <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Loading records...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full py-20 bg-slate-950/40 backdrop-blur-md border border-dashed border-white/8 rounded-2xl flex flex-col items-center justify-center gap-5 text-center px-8 group hover:border-emerald-500/20 transition-all duration-500">
        <div className="w-16 h-16 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-500">
          <Database className="w-7 h-7 text-emerald-500/40" />
        </div>
        <div>
          <h3 className="text-white font-bold text-base mb-1.5">No records yet</h3>
          <p className="text-slate-600 text-sm max-w-xs font-medium leading-relaxed">
            Use the form to add your first <span className="text-slate-400">{entity.label || entity.name}</span> record, or import via CSV.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-slate-950/60 backdrop-blur-xl border border-white/8 rounded-2xl shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              {entity.fields.map((field, i) => (
                <th
                  key={field.name}
                  className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] whitespace-nowrap"
                >
                  {field.label || field.name}
                </th>
              ))}
              <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {data.map((record, idx) => (
              <tr
                key={record.id || idx}
                className="hover:bg-white/[0.025] transition-all duration-150 group animate-card-enter"
                style={{ animationDelay: `${idx * 40}ms`, animationFillMode: 'both', opacity: 0 }}
              >
                {entity.fields.map((field) => {
                  const val = record.data?.[field.name];
                  const display = val !== undefined && val !== null && val !== "" ? String(val) : "—";
                  return (
                    <td
                      key={field.name}
                      className="px-5 py-3.5 text-sm text-slate-300 whitespace-nowrap font-medium max-w-[200px] truncate"
                      title={display !== "—" ? display : undefined}
                    >
                      {field.type === "boolean" ? (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          display === "true" 
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" 
                            : "bg-slate-800 text-slate-500 border border-white/5"
                        }`}>
                          {display}
                        </span>
                      ) : display === "—" ? (
                        <span className="text-slate-700">—</span>
                      ) : (
                        display
                      )}
                    </td>
                  );
                })}
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                    <button
                      onClick={() => onEdit(record)}
                      className="p-2 hover:bg-emerald-500/10 rounded-lg text-slate-600 hover:text-emerald-400 transition-all duration-200"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(record.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-slate-600 hover:text-red-400 transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3.5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
        <p className="text-xs text-slate-600 font-semibold">
          <span className="text-slate-400 font-bold">{data.length}</span> record{data.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-700 cursor-not-allowed transition-colors" disabled>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-bold text-slate-700 px-1">1 / 1</span>
          <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-700 cursor-not-allowed transition-colors" disabled>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
