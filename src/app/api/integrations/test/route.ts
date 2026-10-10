import { NextRequest, NextResponse } from "next/server";
import { dispatchLeadWebhook } from "@/lib/webhook-dispatcher";
import { isSupabaseConfigured, testSupabaseConnection } from "@/lib/supabase";

export async function GET() {
  const supabaseStatus = await testSupabaseConnection();

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    supabase: {
      configured: isSupabaseConfigured,
      connected: supabaseStatus.connected,
      message: supabaseStatus.message,
    },
    webhook: {
      configured: !!process.env.LEAD_WEBHOOK_URL,
    },
    email: {
      configured: !!process.env.RESEND_API_KEY,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const success = await dispatchLeadWebhook({
      type: "contact_inquiry",
      name: "Aether Verification Bot",
      email: "test.lead@aethertech.example.com",
      organization: "Aether Verification Labs",
      projectType: "Automated Integration Health Check",
      budget: "$5,000 - $10,000",
      timeline: "Immediate",
      description: "This is a live test ping confirming that the multi-channel webhook dispatch pipeline is operational.",
    });

    return NextResponse.json({
      success: true,
      webhookConfigured: !!process.env.LEAD_WEBHOOK_URL,
      dispatched: success,
      message: process.env.LEAD_WEBHOOK_URL
        ? "Test lead dispatched to configured webhook."
        : "Webhook endpoint tested successfully. (Set LEAD_WEBHOOK_URL in .env.local to enable external Discord/Slack forwarding).",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to test integration." }, { status: 500 });
  }
}
