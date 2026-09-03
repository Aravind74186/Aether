import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import {
  getProjectsDatabase,
  saveProjectsDatabase,
} from "@/lib/projects-db";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  const db = getProjectsDatabase();
  const project = db.projects.find((p) => p.id === params.id);

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function PUT(req: NextRequest, { params }: RouteProps) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const db = getProjectsDatabase();
    const index = db.projects.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const current = db.projects[index];
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

    if (title !== undefined && !title.trim()) {
      return NextResponse.json({ error: "Title cannot be empty." }, { status: 400 });
    }
    if (description !== undefined && !description.trim()) {
      return NextResponse.json({ error: "Description cannot be empty." }, { status: 400 });
    }

    const updatedProject = {
      ...current,
      title: title !== undefined ? title.trim() : current.title,
      category: category !== undefined ? category : current.category,
      description: description !== undefined ? description.trim() : current.description,
      status: status !== undefined ? status : current.status,
      technologies: technologies !== undefined ? technologies : current.technologies,
      highlight: highlight !== undefined ? highlight.trim() : current.highlight,
      githubUrl: githubUrl !== undefined ? (githubUrl ? githubUrl.trim() : undefined) : current.githubUrl,
      demoUrl: demoUrl !== undefined ? (demoUrl ? demoUrl.trim() : undefined) : current.demoUrl,
      notes: notes !== undefined ? (notes ? notes.trim() : undefined) : current.notes,
    };

    db.projects[index] = updatedProject;
    saveProjectsDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    console.error("[PUT /api/admin/projects/[id] ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteProps) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const db = getProjectsDatabase();
    const index = db.projects.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const removed = db.projects.splice(index, 1)[0];
    saveProjectsDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
      deletedId: removed.id,
    });
  } catch (error) {
    console.error("[DELETE /api/admin/projects/[id] ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 }
    );
  }
}
