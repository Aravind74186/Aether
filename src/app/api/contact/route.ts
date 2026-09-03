import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limiter";
import { addLead } from "@/lib/lead-store";
import { dispatchLeadWebhook } from "@/lib/webhook-dispatcher";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (5 submissions per minute per IP)
    const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
    const rateLimit = checkRateLimit(ip, 5, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    // 2. Validate payload
    const body = await req.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMsg = validationResult.error.issues.map((e) => e.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const data = validationResult.data;

    // Save into internal lead store
    addLead({
      type: "contact",
      fullName: data.name,
      email: data.email,
      organization: data.organization,
      projectType: data.projectType,
      budget: data.budgetRange,
      description: data.description,
    });

    // 3. Multi-channel webhook dispatch (Discord / Slack / Generic)
    await dispatchLeadWebhook({
      type: "contact_inquiry",
      name: data.name,
      email: data.email,
      organization: data.organization,
      projectType: data.projectType,
      budget: data.budgetRange,
      description: data.description,
    });

    return NextResponse.json({
      success: true,
      message: "Your project inquiry has been received. Our engineering team will review it within 24 hours.",
    });
  } catch (error) {
    console.error("Error processing contact request:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please reach out via email directly." },
      { status: 500 }
    );
  }
}
