import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import {
  getProjectsDatabase,
  saveProjectsDatabase,
  generateProjectId,
} from "@/lib/projects-db";
import { ProjectItem } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  const db = getProjectsDatabase();
  return NextResponse.json({ projects: db.projects });
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const body = await req.json();
    const {
      title,
      category,
      description,
      status,
      technologies,
      highlight,
      githubUrl,
      demoUrl,
      notes,
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Project title is required." }, { status: 400 });
    }
    if (!description || !description.trim()) {
      return NextResponse.json({ error: "Project description is required." }, { status: 400 });
    }

    const db = getProjectsDatabase();
    let baseId = generateProjectId(title);
    let candidateId = baseId;
    let counter = 1;

    while (db.projects.some((p) => p.id === candidateId)) {
      candidateId = `${baseId}-${counter}`;
      counter++;
    }

    const newProject: ProjectItem = {
      id: candidateId,
      title: title.trim(),
      category: category || "Developer Tools",
      description: description.trim(),
      status: status || "In Development",
      technologies: Array.isArray(technologies) ? technologies : [],
      highlight: highlight ? highlight.trim() : "",
      githubUrl: githubUrl ? githubUrl.trim() : undefined,
      demoUrl: demoUrl ? demoUrl.trim() : undefined,
      notes: notes ? notes.trim() : undefined,
    };

    db.projects.unshift(newProject);
    saveProjectsDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Project created successfully.",
      project: newProject,
    });
  } catch (error) {
    console.error("[POST /api/admin/projects ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}
