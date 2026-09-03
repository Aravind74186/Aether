import fs from "fs";
import path from "path";
import crypto from "crypto";
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

// Atomic write to avoid file corruption
export function saveProjectsDatabase(db: ProjectsDatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
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
