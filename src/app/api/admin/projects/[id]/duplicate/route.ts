import { NextRequest, NextResponse } from "next/server";
import { verifyAdminApi } from "@/lib/auth";
import {
  getProjectsDatabase,
  saveProjectsDatabase,
} from "@/lib/projects-db";
import { ProjectItem } from "@/types";
import crypto from "crypto";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: {
    id: string;
  };
}

export async function POST(req: NextRequest, { params }: RouteProps) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const db = getProjectsDatabase();
    const original = db.projects.find((p) => p.id === params.id);

    if (!original) {
      return NextResponse.json({ error: "Source project not found." }, { status: 404 });
    }

    const newId = `${original.id}-copy-${crypto.randomBytes(3).toString("hex")}`;
    const duplicated: ProjectItem = {
      ...original,
      id: newId,
      title: `${original.title} (Copy)`,
      status: "Prototype",
    };

    db.projects.unshift(duplicated);
    saveProjectsDatabase(db);

    return NextResponse.json({
      success: true,
      message: `Duplicated "${original.title}" as new prototype.`,
      project: duplicated,
    });
  } catch (error) {
    console.error("[POST /api/admin/projects/[id]/duplicate ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to duplicate project." },
      { status: 500 }
    );
  }
}
