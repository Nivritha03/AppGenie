import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-md px-4 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner",
            "light:bg-black/5 light:border-black/5 light:placeholder:text-slate-400 light:shadow-none",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
