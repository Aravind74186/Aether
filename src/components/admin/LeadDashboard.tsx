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
      <div className="max-w-md mx-auto rounded-3xl border border-stone-200 bg-white p-12 text-center space-y-4 shadow-xs">
        <RefreshCw className="w-6 h-6 text-orange-600 animate-spin mx-auto" />
        <p className="text-xs font-mono text-stone-500">Verifying admin session...</p>
      </div>
    );
  }

  // Login Gateway View
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto rounded-3xl border border-stone-200/90 bg-white p-8 space-y-6 shadow-xl shadow-stone-900/5">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 mx-auto shadow-2xs">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-950 tracking-tight">
            Aether Lead Operations Gateway
          </h2>
          <p className="text-xs text-stone-500 font-mono">
            Enter internal engineering passphrase to access triage dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold">
              Passphrase
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Enter passphrase (hint: aether2025)"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white font-mono shadow-2xs transition-colors"
              />
            </div>
            {authError && (
              <p className="text-xs text-red-600 font-mono">
                Incorrect passphrase. Use `aether2025` for development access.
              </p>
            )}
          </div>

          <Button type="submit" size="md" variant="primary" className="w-full justify-center bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20" disabled={isLoading}>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-700 font-semibold uppercase">
              Internal Operations Portal
            </span>
            <Badge variant="success">Authenticated</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight mt-1">
            Inbound Project Leads & Triage
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" onClick={exportToCSV} className="bg-white hover:bg-stone-50 border-stone-200 text-stone-700 shadow-2xs">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Button>
          <Button size="sm" variant="secondary" onClick={fetchLeads} className="bg-white hover:bg-stone-50 border-stone-200 text-stone-700 shadow-2xs">
            <RefreshCw className={`w-3.5 h-3.5 text-orange-600 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
          <Button size="sm" variant="outline" onClick={handleLogout} className="text-stone-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 bg-white border-stone-200 shadow-2xs transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-stone-200 space-y-1 shadow-xs">
          <div className="text-xs font-mono text-stone-500 font-medium">Total Leads</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono">{leads.length}</div>
        </div>
        <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-1 shadow-xs">
          <div className="text-xs font-mono text-amber-700 font-medium">New / Uncontacted</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-mono">
            {leads.filter((l) => l.status === "New").length}
          </div>
        </div>
        <div className="p-5 rounded-3xl bg-orange-50/70 border border-orange-200 space-y-1 shadow-xs">
          <div className="text-xs font-mono text-orange-700 font-medium">In Discovery</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-800 font-mono">
            {leads.filter((l) => l.status === "Discovery Scheduled").length}
          </div>
        </div>
        <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-1 shadow-xs">
          <div className="text-xs font-mono text-emerald-700 font-medium">Active / Won</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono">
            {leads.filter((l) => l.status === "Active Client" || l.status === "Proposal Sent").length}
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="rounded-3xl border border-stone-200 bg-white p-4 sm:p-5 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, organization, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white font-mono shadow-2xs transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs font-mono">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  selectedStatus === st
                    ? "bg-orange-600 text-white font-bold shadow-xs"
                    : "bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-3xl border border-stone-200 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/80 text-stone-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Inquiry / Contact</th>
                <th className="py-3.5 px-4 font-semibold">Organization & Type</th>
                <th className="py-3.5 px-4 font-semibold">Budget Range</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Received At</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400 font-mono">
                    No leads matching your current criteria.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-950 font-sans">{lead.fullName}</div>
                      <div className="text-stone-500 text-[11px]">{lead.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-stone-800 font-sans font-medium">{lead.organization}</div>
                      <div className="text-orange-600 text-[11px] font-semibold">{lead.projectType}</div>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-700 font-semibold">{lead.budget}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(lead.status)}</td>
                    <td className="py-3.5 px-4 text-stone-500">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="text-orange-600 hover:text-orange-700 font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto text-stone-900">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-xs font-mono text-orange-600 uppercase font-bold tracking-wider">
                  Lead Details • {selectedLead.id}
                </span>
                <h3 className="text-xl font-bold text-stone-950 mt-0.5">{selectedLead.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-stone-400 hover:text-stone-700 font-mono text-sm cursor-pointer"
              >
                [Close ✕]
              </button>
            </div>

            {statusUpdateMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{statusUpdateMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
                <div className="text-stone-500 font-medium">Organization</div>
                <div className="text-stone-950 font-bold mt-0.5 text-sm">{selectedLead.organization}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
                <div className="text-stone-500 font-medium">Email Address</div>
                <a href={`mailto:${selectedLead.email}`} className="text-orange-600 hover:text-orange-700 font-bold hover:underline mt-0.5 block text-sm">
                  {selectedLead.email}
                </a>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
                <div className="text-stone-500 font-medium">Project Type & Scope</div>
                <div className="text-stone-900 font-semibold mt-0.5">{selectedLead.projectType}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
                <div className="text-stone-500 font-medium">Budget Range</div>
                <div className="text-emerald-700 font-bold mt-0.5 text-sm">{selectedLead.budget}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-stone-500 font-bold">
                Project Requirements & Description:
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-800 leading-relaxed font-mono whitespace-pre-wrap shadow-2xs">
                {selectedLead.description}
              </div>
            </div>

            {/* Change Status Buttons */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase text-stone-500 font-bold">
                  Update Lead Triage Status:
                </div>
                <button
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-red-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
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
                      className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                        selectedLead.status === st
                          ? "bg-orange-600 border-orange-600 text-white font-bold shadow-xs"
                          : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700"
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
