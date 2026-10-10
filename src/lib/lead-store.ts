import fs from "fs";
import path from "path";
import { supabaseAdmin } from "@/lib/supabase";

export interface LeadRecord {
  id: string;
  type: "contact" | "intake_wizard";
  fullName: string;
  email: string;
  organization: string;
  projectType: string;
  budget: string;
  timeline?: string;
  projectStage?: string;
  description: string;
  status: "New" | "Reviewing" | "Discovery Scheduled" | "Proposal Sent" | "Active Client" | "Archived";
  createdAt: string;
  internalNotes?: string;
}

// Initial sample leads for immediate triage testing
const initialSampleLeads: LeadRecord[] = [
  {
    id: "lead_101",
    type: "intake_wizard",
    fullName: "Dr. Arvind Rao",
    email: "principal@stjudeacademy.edu",
    organization: "St. Jude Senior Secondary School",
    projectType: "School / Academic Portal",
    budget: "Comprehensive System ($5,000 - $10,000)",
    timeline: "1 - 3 Months",
    projectStage: "Idea",
    description: "Looking to digitize our daily attendance for 1,200 students and introduce online fee payments with automated SMS alerts for parents.",
    status: "Discovery Scheduled",
    createdAt: "2025-01-14T09:30:00Z",
    internalNotes: "Initial discovery call scheduled for Thursday 3 PM IST. Target launch next semester.",
  },
  {
    id: "lead_102",
    type: "contact",
    fullName: "Kavya Menon",
    email: "kavya@nexaroute.tech",
    organization: "NexaRoute Logistics (YC Prep)",
    projectType: "Startup MVP",
    budget: "MVP ($5,000 - $10,000)",
    description: "Need a fast Next.js + PostgreSQL MVP for route optimization dashboard and warehouse dispatch logging in 6 weeks.",
    status: "Proposal Sent",
    createdAt: "2025-01-15T14:15:00Z",
    internalNotes: "Shared multi-tenant architecture proposal and sprint timeline.",
  },
  {
    id: "lead_103",
    type: "intake_wizard",
    fullName: "Suresh Gupta",
    email: "suresh@guptasurgicals.com",
    organization: "Gupta Medical Supplies",
    projectType: "Custom Internal Business Tool",
    budget: "Small Project (< $2,500)",
    timeline: "ASAP (< 4 Weeks)",
    projectStage: "Modernization",
    description: "Replacing shared Excel sheets with a web app that tracks purchase orders, inventory counts, and auto-generates delivery challan PDFs.",
    status: "New",
    createdAt: "2025-01-16T11:00:00Z",
  },
];

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

function ensureStorage(): LeadRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialSampleLeads, null, 2), "utf-8");
      return [...initialSampleLeads];
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [...initialSampleLeads];
  } catch (err) {
    console.warn("[lead-store] File storage unavailable, falling back to memory:", err);
    return [...initialSampleLeads];
  }
}

let leadsStore: LeadRecord[] = ensureStorage();

function persistLeads(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(leadsStore, null, 2), "utf-8");
  } catch (err) {
    console.warn("[lead-store] Failed writing leads to file:", err);
  }
}

export function getLeads(): LeadRecord[] {
  // Always refresh from disk if file was updated externally
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        leadsStore = parsed;
      }
    }
  } catch {
    // Keep current memory store
  }

  return [...leadsStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Asynchronously loads leads from Supabase if configured, falling back to local file.
 */
export async function getLeadsAsync(): Promise<LeadRecord[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        // Map Supabase rows to LeadRecord structure
        const mappedLeads: LeadRecord[] = data.map((row: any) => ({
          id: row.id,
          type: (row.project_type?.toLowerCase().includes("intake") ? "intake_wizard" : "contact") as any,
          fullName: row.name || "Anonymous",
          email: row.email,
          organization: row.organization || "",
          projectType: row.project_type || "General Inquiry",
          budget: row.budget || "Not specified",
          timeline: row.timeline || undefined,
          description: row.description || "",
          status: (row.status || "New") as any,
          createdAt: row.created_at || new Date().toISOString(),
        }));

        // Merge with local store to keep everything synced
        leadsStore = mappedLeads;
        persistLeads();
        return mappedLeads;
      }
    } catch (err) {
      console.warn("[lead-store] Supabase fetch failed, using local store:", err);
    }
  }

  return getLeads();
}

export function addLead(lead: Omit<LeadRecord, "id" | "createdAt" | "status">): LeadRecord {
  const newLead: LeadRecord = {
    ...lead,
    id: `lead_${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  leadsStore.unshift(newLead);
  persistLeads();

  // Asynchronously sync to Supabase
  if (supabaseAdmin) {
    Promise.resolve(
      supabaseAdmin
        .from("leads")
        .upsert({
          id: newLead.id,
          name: newLead.fullName,
          email: newLead.email,
          organization: newLead.organization || "",
          project_type: newLead.projectType,
          timeline: newLead.timeline || "Not specified",
          budget: newLead.budget,
          description: newLead.description,
          status: newLead.status,
          created_at: newLead.createdAt,
        })
    )
      .then(({ error }) => {
        if (error) {
          console.warn("[supabase] Failed to sync new lead to Supabase:", error.message);
        } else {
          console.log("[supabase] Successfully saved lead to Supabase:", newLead.id);
        }
      })
      .catch((err: unknown) => {
        console.warn("[supabase] Exception syncing lead to Supabase:", err);
      });
  }

  return newLead;
}

export function updateLeadStatus(id: string, status: LeadRecord["status"], internalNotes?: string): LeadRecord | null {
  const leadIndex = leadsStore.findIndex((l) => l.id === id);
  if (leadIndex === -1) return null;

  leadsStore[leadIndex].status = status;
  if (internalNotes !== undefined) {
    leadsStore[leadIndex].internalNotes = internalNotes;
  }
  persistLeads();

  // Asynchronously update Supabase
  if (supabaseAdmin) {
    Promise.resolve(
      supabaseAdmin
        .from("leads")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
    )
      .then(({ error }) => {
        if (error) {
          console.warn("[supabase] Failed to update lead status in Supabase:", error.message);
        }
      })
      .catch((err: unknown) => {
        console.warn("[supabase] Exception updating lead in Supabase:", err);
      });
  }

  return leadsStore[leadIndex];
}

export function deleteLead(id: string): boolean {
  const initialLength = leadsStore.length;
  leadsStore = leadsStore.filter((l) => l.id !== id);
  if (leadsStore.length !== initialLength) {
    persistLeads();

    // Asynchronously delete from Supabase
    if (supabaseAdmin) {
      Promise.resolve(
        supabaseAdmin
          .from("leads")
          .delete()
          .eq("id", id)
      )
        .then(({ error }) => {
          if (error) {
            console.warn("[supabase] Failed to delete lead from Supabase:", error.message);
          }
        })
        .catch((err: unknown) => {
          console.warn("[supabase] Exception deleting lead from Supabase:", err);
        });
    }

    return true;
  }
  return false;
}
