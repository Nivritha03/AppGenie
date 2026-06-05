"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-2xl flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="text-red-400 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Component Rendering Error</h3>
            <p className="text-white/40 text-sm max-w-xs mt-1">
              We encountered an issue while rendering this part of the application. The schema might be inconsistent.
            </p>
          </div>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-white/70 transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            Try to Recover
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
