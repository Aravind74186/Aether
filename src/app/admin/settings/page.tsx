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
      <div className="pb-6 border-b border-stone-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950">
          System & Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-mono mt-1">
          Server-side authentication state, session parameters, and operational integrity
        </p>
      </div>

      <div className="space-y-6">
        {/* Active Admin Profile Card */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">Active Administrator Identity</h2>
              <p className="text-xs text-stone-500 font-mono">Authenticated via server-side session</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
              <div className="text-stone-500 font-medium">Email Address:</div>
              <div className="text-stone-950 font-bold mt-1 text-sm">{user.email}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
              <div className="text-stone-500 font-medium">Authorization Level:</div>
              <div className="text-emerald-700 font-bold mt-1 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{user.role} Role Granted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Parameters Overview */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">Cryptographic Standards</h2>
              <p className="text-xs text-stone-500 font-mono">Server-enforced security protocols</p>
            </div>
          </div>

          <div className="space-y-3 pt-1 text-xs font-mono">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
              <span className="text-stone-600 font-medium">Password Hashing Algorithm:</span>
              <span className="text-orange-700 font-bold font-mono">bcrypt (10 Salt Rounds)</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
              <span className="text-stone-600 font-medium">Cookie Security Policy:</span>
              <span className="text-emerald-700 font-bold font-mono">HttpOnly, SameSite=Lax</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
              <span className="text-stone-600 font-medium">Brute Force Mitigation:</span>
              <span className="text-emerald-700 font-bold font-mono">Active (5 requests / 60s per IP)</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
              <span className="text-stone-600 font-medium">Search Engine Indexing:</span>
              <span className="text-amber-700 font-bold font-mono">Blocked (noindex, nofollow)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
