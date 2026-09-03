"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Lock,
  Server,
  FileCheck,
  AlertTriangle,
  Clock,
  Download,
  CheckCircle2,
  Key,
  Database,
  EyeOff,
  Radio,
  FileText,
} from "lucide-react";

export function TrustCenter() {
  const [activeSection, setActiveSection] = useState<"privacy" | "security" | "sla" | "disclosure">("privacy");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copySecurityEmail = () => {
    navigator.clipboard.writeText("security@aethertech.example.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl space-y-10">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
              Enterprise Governance & Assurance
            </span>
            <Badge variant="success">Trust & Security Portal</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Security, Privacy & SLA Commitments
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Documented engineering standards for institutional student records, multi-tenant databases, and enterprise SLAs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Systems Status: 99.98% 30d Uptime</span>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveSection("privacy")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeSection === "privacy"
              ? "bg-orange-600 text-white font-semibold shadow-md"
              : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Data Privacy & Student Governance</span>
        </button>

        <button
          onClick={() => setActiveSection("security")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeSection === "security"
              ? "bg-orange-600 text-white font-semibold shadow-md"
              : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encryption & Infrastructure Controls</span>
        </button>

        <button
          onClick={() => setActiveSection("sla")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeSection === "sla"
              ? "bg-orange-600 text-white font-semibold shadow-md"
              : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>SLA & Incident Response</span>
        </button>

        <button
          onClick={() => setActiveSection("disclosure")}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeSection === "disclosure"
              ? "bg-orange-600 text-white font-semibold shadow-md"
              : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Vulnerability Disclosure</span>
        </button>
      </div>

      {/* Section 1: Data Privacy & Student Governance */}
      {activeSection === "privacy" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orange-950/60 border border-orange-800/40 flex items-center justify-center text-orange-400 mb-2">
                <EyeOff className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">Zero Third-Party Sharing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Client data, student marks, and attendance logs are never sold, analyzed for advertising, or used to train public AI models.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 mb-2">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">Tenant Isolation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All multi-tenant architectures utilize strict row-level security (RLS) or dedicated schema partitions to prevent cross-organization data leakage.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orange-950/60 border border-orange-800/40 flex items-center justify-center text-orange-400 mb-2">
                <FileCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white font-mono">Data Sovereignty & Deletion</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Institutions retain 100% legal ownership of their database records with automated 1-click JSON/CSV export and cryptographically verified deletion runbooks.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3 font-mono text-xs text-slate-300">
            <div className="text-white font-bold uppercase tracking-wider text-xs">
              Institutional Privacy Framework Alignment:
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>FERPA / Education Record Compliance:</strong> Strict student record access controls restricted exclusively to verified parents, teachers, and administrators.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>DPDP & GDPR Principles:</strong> Explicit consent models, role-based data minimization, and audit-logged data modification trails.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Section 2: Security & Encryption */}
      {activeSection === "security" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-orange-400 font-semibold">
                <Key className="w-4 h-4" />
                <span>Cryptography & Session Protection</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">•</span>
                  <span><strong>In Transit:</strong> Mandatory TLS 1.3 encryption with strict HTTP Strict Transport Security (HSTS) preloading.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">•</span>
                  <span><strong>At Rest:</strong> AES-256 encrypted block storage for all PostgreSQL volumes and document object stores.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold">•</span>
                  <span><strong>Authentication:</strong> Encrypted, HTTP-only, SameSite=Strict session tokens with Argon2id password hashing.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-semibold">
                <Server className="w-4 h-4" />
                <span>Backup & Recovery Runbooks</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automated Snapshots:</strong> Point-in-time recovery (PITR) with continuous WAL archiving and daily cross-region snapshots.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Recovery Target:</strong> RPO (Recovery Point Objective) &lt; 1 hour; RTO (Recovery Time Objective) &lt; 4 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Audit Trails:</strong> Immutable audit ledger logging all administrative operations, schema migrations, and role changes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: SLA & Incident Response */}
      {activeSection === "sla" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 uppercase">
                  <th className="py-3 px-4">Severity Tier</th>
                  <th className="py-3 px-4">Definition</th>
                  <th className="py-3 px-4">Target Response Time</th>
                  <th className="py-3 px-4">Target Resolution Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-red-400 font-bold">Severity 1 (Critical)</td>
                  <td className="py-3 px-4 text-slate-300">Complete production outage or critical data vulnerability</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">&lt; 1 Hour</td>
                  <td className="py-3 px-4 text-slate-400">&lt; 4 Hours</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-amber-400 font-bold">Severity 2 (High)</td>
                  <td className="py-3 px-4 text-slate-300">Core feature degraded with no viable operational workaround</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">&lt; 4 Hours</td>
                  <td className="py-3 px-4 text-slate-400">&lt; 24 Hours</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-orange-400 font-bold">Severity 3 (Standard)</td>
                  <td className="py-3 px-4 text-slate-300">Minor cosmetic or non-blocking workflow inquiry</td>
                  <td className="py-3 px-4 text-slate-400">&lt; 24 Hours</td>
                  <td className="py-3 px-4 text-slate-400">Next Scheduled Release</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
            <div>
              <span className="text-white font-bold">Production Availability SLA:</span> 99.9% Monthly Uptime Guarantee.
            </div>
            <span className="text-slate-500">Excludes scheduled maintenance windows</span>
          </div>
        </div>
      )}

      {/* Section 4: Vulnerability Disclosure */}
      {activeSection === "disclosure" && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 space-y-4 font-mono text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Responsible Vulnerability Disclosure Policy
            </h3>
            <p className="text-slate-300 leading-relaxed">
              We take software security seriously and welcome reports from security researchers and ethical hackers. If you discover a potential vulnerability in any of our deployed systems or client portals, please notify us immediately through our designated channel.
            </p>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-slate-500 text-[11px]">Security Contact Inbox:</div>
                <div className="text-orange-400 font-bold text-sm">security@aethertech.example.com</div>
              </div>
              <Button size="sm" variant="secondary" onClick={copySecurityEmail}>
                {copiedEmail ? "Copied Email ✓" : "Copy Email"}
              </Button>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-850 text-slate-400">
              <div className="text-white font-semibold">Our Commitment to Researchers:</div>
              <div>• We will acknowledge receipt of your vulnerability report within 24 hours.</div>
              <div>• We will not pursue legal action against researchers acting in good faith without data extraction.</div>
              <div>• We will provide regular updates as we validate and remediate the issue.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
