"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { User, Mail, Shield, ShieldCheck, CreditCard, Trash2 } from "lucide-react";
import { 
  GlassContainer, 
  PageTransition, 
  StaggerContainer, 
  StaggerItem,
  AnimatedCard,
  Badge,
  Button 
} from "@/components/ui";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <PageTransition>
      <div className="p-6 md:p-10 lg:p-12">
        <header className="mb-12">
          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            My <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-medium text-slate-400">
            Manage your personal information and workspace security.
          </p>
        </header>

        <StaggerContainer>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <StaggerItem>
                 <AnimatedCard className="flex flex-col items-center p-10 text-center">
                    <div className="relative mb-6">
                       <div className="h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-1 shadow-2xl">
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-white">
                             <User className="h-10 w-10" />
                          </div>
                       </div>
                       <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-slate-950 bg-emerald-500 text-slate-950">
                          <ShieldCheck className="h-4 w-4" />
                       </div>
                    </div>
                    <h3 className="text-2xl font-black text-white">{session?.user?.name || "User"}</h3>
                    <p className="text-slate-400 font-medium">{session?.user?.email}</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                       <Badge variant="success">Developer</Badge>
                       <Badge>Beta Access</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="mt-8 w-full">Change Password</Button>
                 </AnimatedCard>
              </StaggerItem>
            </div>

            <div className="lg:col-span-2">
              <StaggerItem>
                 <div className="space-y-8">
                    <GlassContainer className="p-8">
                       <h3 className="text-xl font-black text-white">Account Details</h3>
                       <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div className="space-y-1.5">
                             <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</p>
                             <p className="text-lg font-bold text-white">{session?.user?.name || "Not set"}</p>
                          </div>
                          <div className="space-y-1.5">
                             <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</p>
                             <p className="text-lg font-bold text-white">{session?.user?.email}</p>
                          </div>
                          <div className="space-y-1.5">
                             <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Security Rating</p>
                             <div className="flex items-center gap-2">
                                <div className="h-2 w-32 rounded-full bg-white/5">
                                   <div className="h-full w-[85%] rounded-full bg-emerald-500" />
                                </div>
                                <span className="text-sm font-bold text-emerald-400">Excellent</span>
                             </div>
                          </div>
                          <div className="space-y-1.5">
                             <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Joined</p>
                             <p className="text-lg font-bold text-white">June 2026</p>
                          </div>
                       </div>
                    </GlassContainer>

                    <GlassContainer className="p-8">
                       <div className="flex items-center justify-between">
                          <div>
                             <h3 className="text-xl font-black text-white">Subscription</h3>
                             <p className="mt-1 text-sm text-slate-400">Manage your billing and plan details.</p>
                          </div>
                          <Badge variant="success" className="h-8">Pro Yearly</Badge>
                       </div>
                       <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                          <Button variant="premium" className="flex-1">Upgrade Plan</Button>
                          <Button variant="outline" className="flex-1">View Billing History</Button>
                       </div>
                    </GlassContainer>
                 </div>
              </StaggerItem>
            </div>
          </div>
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
