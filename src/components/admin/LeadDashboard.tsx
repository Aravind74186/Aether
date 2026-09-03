"use client";

import React, { useState, useEffect } from "react";
import { LeadRecord } from "@/lib/lead-store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Shield,
  Key,
  Users,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Mail,
  Building,
  DollarSign,
  Calendar,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  LogOut,
  Trash2,
} from "lucide-react";

export function LeadDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [passphrase, setPassphrase] = useState("");
  const [authError, setAuthError] = useState(false);

  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [statusUpdateMsg, setStatusUpdateMsg] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(false);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAuthError(false);
      } else {
        setAuthError(true);
      }
    } catch {
      setAuthError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setIsAuthenticated(false);
    setLeads([]);
    setSelectedLead(null);
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead record?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSelectedLead(null);
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/leads?status=${selectedStatus}&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated, selectedStatus, searchQuery]);

  const handleUpdateStatus = async (newStatus: LeadRecord["status"]) => {
    if (!selectedLead) return;

    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedLead.id,
          status: newStatus,
          internalNotes: selectedLead.internalNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSelectedLead(data.lead);
        setStatusUpdateMsg(`Status updated to ${newStatus}`);
        setTimeout(() => setStatusUpdateMsg(null), 2500);
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = ["ID", "Type", "FullName", "Email", "Organization", "ProjectType", "Budget", "Status", "CreatedAt", "Description"];
    const rows = leads.map((l) => [
      l.id,
      l.type,
      `"${l.fullName.replace(/"/g, '""')}"`,
      l.email,
      `"${l.organization.replace(/"/g, '""')}"`,
      `"${l.projectType.replace(/"/g, '""')}"`,
      `"${l.budget.replace(/"/g, '""')}"`,
      l.status,
      l.createdAt,
      `"${(l.description || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aether_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isCheckingAuth) {
    return (
      <div className="max-w-md mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-4">
        <RefreshCw className="w-6 h-6 text-orange-400 animate-spin mx-auto" />
        <p className="text-xs font-mono text-slate-400">Verifying admin session...</p>
      </div>
    );
  }

  // Login Gateway View
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-orange-950/80 border border-orange-800/40 flex items-center justify-center text-orange-400 mx-auto">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Aether Lead Operations Gateway
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Enter internal engineering passphrase to access triage dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
              Passphrase
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Enter passphrase (hint: aether2025)"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
            {authError && (
              <p className="text-xs text-red-400 font-mono">
                Incorrect passphrase. Use `aether2025` for development access.
              </p>
            )}
          </div>

          <Button type="submit" size="md" variant="primary" className="w-full justify-center" disabled={isLoading}>
            <span>{isLoading ? "Verifying..." : "Unlock Dashboard"}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </form>
      </div>
    );
  }

  const statuses = ["All", "New", "Reviewing", "Discovery Scheduled", "Proposal Sent", "Active Client", "Archived"];

  const getStatusBadge = (status: LeadRecord["status"]) => {
    switch (status) {
      case "New":
        return <Badge variant="warning">New Inbound</Badge>;
      case "Discovery Scheduled":
        return <Badge variant="brand">Discovery Call</Badge>;
      case "Proposal Sent":
        return <Badge variant="demo">Proposal Sent</Badge>;
      case "Active Client":
        return <Badge variant="success">Active Project</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
              Internal Operations Portal
            </span>
            <Badge variant="success">Authenticated</Badge>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Inbound Project Leads & Triage
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" onClick={exportToCSV}>
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Button>
          <Button size="sm" variant="secondary" onClick={fetchLeads}>
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
          <Button size="sm" variant="outline" onClick={handleLogout} className="text-slate-400 hover:text-red-400 hover:border-red-900/50">
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="text-xs font-mono text-slate-500">Total Leads</div>
          <div className="text-2xl font-bold text-white font-mono">{leads.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-1">
          <div className="text-xs font-mono text-amber-400">New / Uncontacted</div>
          <div className="text-2xl font-bold text-amber-300 font-mono">
            {leads.filter((l) => l.status === "New").length}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-800/40 space-y-1">
          <div className="text-xs font-mono text-orange-400">In Discovery</div>
          <div className="text-2xl font-bold text-orange-300 font-mono">
            {leads.filter((l) => l.status === "Discovery Scheduled").length}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-1">
          <div className="text-xs font-mono text-emerald-400">Active / Won</div>
          <div className="text-2xl font-bold text-emerald-300 font-mono">
            {leads.filter((l) => l.status === "Active Client" || l.status === "Proposal Sent").length}
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, organization, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-1 text-xs font-mono">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedStatus === st
                    ? "bg-orange-600 text-white font-semibold"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase">
                <th className="py-3 px-4">Inquiry / Contact</th>
                <th className="py-3 px-4">Organization & Type</th>
                <th className="py-3 px-4">Budget Range</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Received At</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-mono">
                    No leads matching your current criteria.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white font-sans">{lead.fullName}</div>
                      <div className="text-slate-400 text-[11px]">{lead.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-300 font-sans">{lead.organization}</div>
                      <div className="text-orange-400 text-[11px]">{lead.projectType}</div>
                    </td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">{lead.budget}</td>
                    <td className="py-3 px-4">{getStatusBadge(lead.status)}</td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Inspect & Update</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect & Triage Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-orange-400 uppercase">
                  Lead Details • {selectedLead.id}
                </span>
                <h3 className="text-xl font-bold text-white">{selectedLead.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-500 hover:text-white font-mono text-sm"
              >
                [Close ✕]
              </button>
            </div>

            {statusUpdateMsg && (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{statusUpdateMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Organization</div>
                <div className="text-white font-semibold mt-0.5">{selectedLead.organization}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Email Address</div>
                <a href={`mailto:${selectedLead.email}`} className="text-orange-400 hover:underline mt-0.5 block">
                  {selectedLead.email}
                </a>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Project Type & Scope</div>
                <div className="text-white mt-0.5">{selectedLead.projectType}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-500">Budget Range</div>
                <div className="text-emerald-400 font-semibold mt-0.5">{selectedLead.budget}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Project Requirements & Description:
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                {selectedLead.description}
              </div>
            </div>

            {/* Change Status Buttons */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                  Update Lead Triage Status:
                </div>
                <button
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-transparent hover:border-red-850 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Lead</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {statuses
                  .filter((s) => s !== "All")
                  .map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(st as LeadRecord["status"])}
                      className={`px-3 py-1.5 rounded-lg border transition-colors ${
                        selectedLead.status === st
                          ? "bg-orange-600 border-orange-500 text-white font-semibold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
