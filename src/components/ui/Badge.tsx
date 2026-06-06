import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
    warning: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
    destructive: "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-500",
    outline: "bg-transparent text-muted-foreground border-border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-all",
        variants[variant],
        variant === "success" && "animate-pulse-slow",
        className
      )}
      {...props}
    >
      {variant === "success" && (
        <span className="mr-1.5 flex h-1.5 w-1.5 items-center justify-center rounded-full bg-emerald-400" />
      )}
      {props.children}
    </div>
  );
}

export { Badge };
