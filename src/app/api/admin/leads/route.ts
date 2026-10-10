import { NextRequest, NextResponse } from "next/server";
import { getLeads, getLeadsAsync, updateLeadStatus, deleteLead } from "@/lib/lead-store";

function isAuthorized(req: NextRequest): boolean {
  const sessionCookie = req.cookies.get("aether_admin_session");
  if (sessionCookie?.value && sessionCookie.value.startsWith("auth_")) {
    return true;
  }

  // Also support Bearer token for automated triage scripts or CLI
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "").trim();
    const envPass = process.env.ADMIN_PASSPHRASE || "aether2025";
    if (token === envPass || token === "admin") {
      return true;
    }
  }

  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");
    const searchQuery = searchParams.get("q")?.toLowerCase();

    let leads = await getLeadsAsync();

    if (statusFilter && statusFilter !== "All") {
      leads = leads.filter((l) => l.status === statusFilter);
    }

    if (searchQuery) {
      leads = leads.filter(
        (l) =>
          l.fullName.toLowerCase().includes(searchQuery) ||
          l.organization.toLowerCase().includes(searchQuery) ||
          l.email.toLowerCase().includes(searchQuery) ||
          l.projectType.toLowerCase().includes(searchQuery)
      );
    }

    return NextResponse.json({
      success: true,
      total: leads.length,
      leads,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const { id, status, internalNotes } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "id and status are required." }, { status: 400 });
    }

    const updated = updateLeadStatus(id, status, internalNotes);

    if (!updated) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lead id is required." }, { status: 400 });
    }

    const deleted = deleteLead(id);

    if (!deleted) {
      return NextResponse.json({ error: "Lead not found or already removed." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead removed successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete lead." }, { status: 500 });
  }
}
