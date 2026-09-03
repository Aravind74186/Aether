import { NextRequest, NextResponse } from "next/server";
import { projectIntakeSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limiter";
import { addLead } from "@/lib/lead-store";
import { dispatchLeadWebhook } from "@/lib/webhook-dispatcher";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
    const rateLimit = checkRateLimit(ip, 5, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a moment." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validationResult = projectIntakeSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMsg = validationResult.error.issues.map((e) => e.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const data = validationResult.data;

    // Save into internal lead store
    addLead({
      type: "intake_wizard",
      fullName: data.fullName,
      email: data.email,
      organization: data.organization,
      projectType: data.projectType.join(", "),
      budget: data.budget,
      timeline: data.timeline,
      projectStage: data.projectStage,
      description: `Goal: ${data.projectGoal} | Problem: ${data.problemToSolve} ${
        data.additionalNotes ? `| Notes: ${data.additionalNotes}` : ""
      }`,
    });

    // Multi-channel webhook dispatch (Discord / Slack / Generic)
    await dispatchLeadWebhook({
      type: "project_intake",
      name: data.fullName,
      email: data.email,
      organization: data.organization,
      projectType: data.projectType,
      budget: data.budget,
      timeline: data.timeline,
      description: `Goal: ${data.projectGoal} | Problem: ${data.problemToSolve}`,
      notes: data.additionalNotes,
    });

    return NextResponse.json({
      success: true,
      message: "Project intake successfully logged. A technical feasibility breakdown is being prepared.",
    });
  } catch (error) {
    console.error("Error processing intake request:", error);
    return NextResponse.json(
      { error: "Failed to process project request. Please email us directly." },
      { status: 500 }
    );
  }
}
