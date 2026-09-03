import fs from "fs";
import path from "path";

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

export function addLead(lead: Omit<LeadRecord, "id" | "createdAt" | "status">): LeadRecord {
  const newLead: LeadRecord = {
    ...lead,
    id: `lead_${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  leadsStore.unshift(newLead);
  persistLeads();
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
  return leadsStore[leadIndex];
}

export function deleteLead(id: string): boolean {
  const initialLength = leadsStore.length;
  leadsStore = leadsStore.filter((l) => l.id !== id);
  if (leadsStore.length !== initialLength) {
    persistLeads();
    return true;
  }
  return false;
}
