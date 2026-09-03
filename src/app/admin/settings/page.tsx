import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ShieldCheck, Key, Server, Lock, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-slate-850">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          System & Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
          Server-side authentication state, session parameters, and operational integrity
        </p>
      </div>

      <div className="space-y-6">
        {/* Active Admin Profile Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-800/40 flex items-center justify-center text-orange-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Active Administrator Identity</h2>
              <p className="text-xs text-slate-400 font-mono">Authenticated via server-side session</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
              <div className="text-slate-500">Email Address:</div>
              <div className="text-white font-semibold mt-1">{user.email}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
              <div className="text-slate-500">Authorization Level:</div>
              <div className="text-emerald-400 font-semibold mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{user.role} Role Granted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Parameters Overview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-950/80 border border-orange-800/40 flex items-center justify-center text-orange-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Cryptographic Standards</h2>
              <p className="text-xs text-slate-400 font-mono">Server-enforced security protocols</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs font-mono text-slate-300">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-850">
              <span className="text-slate-400">Password Hashing Algorithm:</span>
              <span className="text-orange-400 font-semibold">bcrypt (10 Salt Rounds)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-850">
              <span className="text-slate-400">Cookie Security Policy:</span>
              <span className="text-emerald-400 font-semibold">HttpOnly, SameSite=Lax</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-850">
              <span className="text-slate-400">Brute Force Mitigation:</span>
              <span className="text-emerald-400 font-semibold">Active (5 requests / 60s per IP)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-850">
              <span className="text-slate-400">Search Engine Indexing:</span>
              <span className="text-amber-400 font-semibold">Blocked (noindex, nofollow)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
