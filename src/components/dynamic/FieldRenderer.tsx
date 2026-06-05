import React from "react";
import { AppField } from "@/types";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { AlertTriangle, Check } from "lucide-react";

interface FieldRendererProps {
  field: AppField;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ field, register, errors }) => {
  if (!field || !field.name) {
    return (
      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm mb-4 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        Missing or corrupted field definition
      </div>
    );
  }

  const error = errors[field.name];

  const inputClass = `w-full px-4 py-3 rounded-xl bg-slate-900/70 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 font-medium text-sm ${
    error
      ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50"
      : "border-white/8 focus:ring-emerald-500/30 focus:border-emerald-500/40 hover:border-white/15"
  }`;

  const commonProps = {
    ...register(field.name, { required: field.required }),
    placeholder: field.placeholder || `Enter ${field.label || field.name}...`,
    className: inputClass,
  };

  const label = (
    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
      {field.label || field.name}
      {field.required && <span className="text-emerald-500 text-[10px]">required</span>}
    </label>
  );

  const errorMsg = error && (
    <p className="text-xs text-red-400 mt-1.5 ml-1 flex items-center gap-1 font-medium">
      <AlertTriangle className="w-3 h-3" />
      {error.message as string}
    </p>
  );

  const container = "mb-5 group";

  switch (field.type) {
    case "email":
      return (
        <div className={container}>
          {label}
          <input type="email" {...commonProps} />
          {errorMsg}
        </div>
      );
    case "number":
      return (
        <div className={container}>
          {label}
          <input type="number" {...commonProps} />
          {errorMsg}
        </div>
      );
    case "date":
      return (
        <div className={container}>
          {label}
          <input type="date" {...commonProps} style={{ colorScheme: 'dark' }} />
          {errorMsg}
        </div>
      );
    case "textarea":
      return (
        <div className={container}>
          {label}
          <textarea {...commonProps} rows={4} className={`${inputClass} resize-none`} />
          {errorMsg}
        </div>
      );
    case "select":
      return (
        <div className={container}>
          {label}
          <select {...commonProps} className={`${inputClass} cursor-pointer [&>option]:bg-slate-900 [&>option]:text-slate-200`}>
            <option value="" className="bg-slate-900 text-slate-400">Select an option...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-900 text-slate-200">
                {opt}
              </option>
            ))}
          </select>
          {errorMsg}
        </div>
      );
    case "boolean":
      return (
        <div className="flex items-center gap-3 mb-5 p-3 bg-slate-900/50 border border-white/8 rounded-xl hover:border-emerald-500/20 transition-colors cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              {...register(field.name, { required: field.required })}
              className="peer sr-only"
              id={field.name}
            />
            <label
              htmlFor={field.name}
              className="flex items-center justify-center w-5 h-5 rounded-md border-2 border-white/20 bg-white/5 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 cursor-pointer transition-all"
            >
              <Check className="w-3 h-3 text-slate-950 opacity-0 peer-checked:opacity-100 transition-opacity" />
            </label>
          </div>
          <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200 transition-colors cursor-pointer">
            {field.label || field.name}
          </span>
        </div>
      );
    case "text":
    default:
      if (field.type !== "text" && field.type !== undefined) {
        return (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mb-4 font-medium">
            Unsupported field type: <span className="font-mono bg-red-500/10 px-1.5 py-0.5 rounded">{field.type}</span>
          </div>
        );
      }
      return (
        <div className={container}>
          {label}
          <input type="text" {...commonProps} />
          {errorMsg}
        </div>
      );
  }
};
