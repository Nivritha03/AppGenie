"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// --- STAGGER ITEM ---
export const StaggerItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
};

// --- ANIMATED CARD ---
export const AnimatedCard = ({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ 
        y: -4,
        scale: 1.01,
        transition: { duration: 0.2 } 
      }}
      className={cn(
        "group relative backdrop-blur-md transition-all",
        "bg-slate-900/40 border border-white/10 rounded-3xl p-6",
        "hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] hover:bg-slate-800/60",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl" />
      {children}
    </motion.div>
  );
};

// --- GLASS CONTAINER ---
export const GlassContainer = ({ 
  children, 
  className,
  intensity = "medium"
}: { 
  children: React.ReactNode; 
  className?: string;
  intensity?: "low" | "medium" | "high";
}) => {
  const intensities = {
    low: "backdrop-blur-sm bg-white/2 border-white/5",
    medium: "backdrop-blur-md bg-white/5 border-white/10",
    high: "backdrop-blur-xl bg-white/10 border-white/20",
  };

  return (
    <div className={cn(
      "rounded-3xl shadow-2xl transition-all duration-300",
      intensities[intensity],
      className
    )}>
      {children}
    </div>
  );
};

// --- SHIMMER TEXT ---
export const ShimmerText = ({ 
  text, 
  className 
}: { 
  text: string; 
  className?: string 
}) => {
  return (
    <motion.span
      className={cn(
        "inline-block bg-gradient-to-r bg-[length:200%_auto] bg-clip-text text-transparent",
        "from-emerald-400 via-white to-teal-400",
        className
      )}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
};

// --- ANIMATED NUMBER ---
export const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

// --- PAGE TRANSITION ---
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// --- STAGGER CONTAINER ---
export const StaggerContainer = ({ 
  children, 
  className,
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- GLOW EFFECT ---
export const Glow = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      "absolute -z-10 pointer-events-none blur-[100px] transition-all duration-700 opacity-20",
      "bg-gradient-to-r from-emerald-500 to-teal-500",
      className
    )} />
  );
};
