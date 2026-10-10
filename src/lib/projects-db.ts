import fs from "fs";
import path from "path";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { ProjectItem } from "@/types";
import { projectsData } from "@/data/projects";

export interface ProjectsDatabaseSchema {
  projects: ProjectItem[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "projects-db.json");

// Generate initial database
function createInitialDatabase(): ProjectsDatabaseSchema {
  return {
    projects: [...projectsData],
  };
}

// Read database from atomic JSON file
export function getProjectsDatabase(): ProjectsDatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = createInitialDatabase();
      saveProjectsDatabase(initial);
      return initial;
    }

    const content = fs.readFileSync(DB_FILE, "utf-8");
    if (!content || !content.trim()) {
      const initial = createInitialDatabase();
      saveProjectsDatabase(initial);
      return initial;
    }

    const parsed = JSON.parse(content) as ProjectsDatabaseSchema;
    if (!parsed.projects || !Array.isArray(parsed.projects)) {
      parsed.projects = [];
    }
    return parsed;
  } catch (err) {
    console.error("[PROJECTS DB READ ERROR]:", err);
    return createInitialDatabase();
  }
}

// Asynchronously sync projects to Supabase table
export async function syncProjectsToSupabase(projects: ProjectItem[]): Promise<void> {
  if (!supabaseAdmin || !projects || projects.length === 0) return;
  try {
    const records = projects.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      status: p.status,
      technologies: p.technologies || [],
      highlight: p.highlight || "",
      github_url: p.githubUrl || null,
      demo_url: p.demoUrl || null,
      notes: p.notes || null,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabaseAdmin.from("projects").upsert(records, { onConflict: "id" });
    if (error) {
      console.warn("[supabase] Failed syncing projects to Supabase:", error.message);
    } else {
      console.log("[supabase] Successfully synced projects to Supabase:", records.length);
    }
  } catch (err) {
    console.warn("[supabase] Exception syncing projects:", err);
  }
}

// Atomic write to avoid file corruption with Supabase sync
export function saveProjectsDatabase(db: ProjectsDatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);

    // Asynchronously sync projects to Supabase
    if (db.projects && db.projects.length > 0) {
      syncProjectsToSupabase(db.projects);
    }
  } catch (err) {
    console.error("[PROJECTS DB WRITE ERROR]:", err);
  }
}

// Public query
export function getProjects(): ProjectItem[] {
  const db = getProjectsDatabase();
  return db.projects;
}

// Get single project
export function getProjectById(id: string): ProjectItem | null {
  const db = getProjectsDatabase();
  return db.projects.find((p) => p.id === id) || null;
}

// Generate unique slug/ID from title
export function generateProjectId(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `proj-${crypto.randomBytes(4).toString("hex")}`;
}
