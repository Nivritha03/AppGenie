"use client";

import React, { useState } from "react";
import { AppEntity } from "@/types";
import { useForm } from "react-hook-form";
import { FieldRenderer } from "./FieldRenderer";
import { Loader2, Plus, Sparkles } from "lucide-react";

interface FormRendererProps {
  entity: AppEntity;
  onSubmit: (data: any) => Promise<void>;
  initialData?: any;
  submitLabel?: string;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  entity,
  onSubmit,
  initialData,
  submitLabel = "Save Record",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      if (!initialData) reset();
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="relative bg-slate-950/70 backdrop-blur-xl border border-white/8 rounded-2xl shadow-2xl overflow-hidden group"
    >
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

      {/* Subtle background glow on hover */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              {initialData ? "Update" : "New"} {entity.label || entity.name}
            </h2>
            <p className="text-[11px] text-slate-600 mt-0.5">{entity.fields.length} fields</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-1">
        {entity.fields.map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            register={register}
            errors={errors}
          />
        ))}
      </div>

      <div className="px-6 pb-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
};
