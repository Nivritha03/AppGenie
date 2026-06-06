import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20",
      premium: "bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 hover:from-emerald-400 hover:to-teal-500 shadow-[0_4px_20px_rgba(16,185,129,0.3)] light:from-purple-600 light:to-blue-600 light:text-white light:shadow-purple-500/30",
      destructive: "bg-red-600 text-white hover:bg-red-500",
      outline: "border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-foreground hover:border-foreground/20 light:border-black/10 light:bg-black/5 light:hover:bg-black/10",
      secondary: "bg-white/5 text-foreground hover:bg-white/10 light:bg-black/5 light:hover:bg-black/10",
      ghost: "hover:bg-white/5 text-foreground light:hover:bg-black/5",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-11 px-6 rounded-xl",
      sm: "h-9 px-3 rounded-lg text-xs",
      lg: "h-14 px-10 rounded-2xl text-base",
      icon: "h-10 w-10 rounded-xl",
    };

    return (
      <motion.button
        whileHover={{ y: -1, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref as any}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
