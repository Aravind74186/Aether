export interface LeadPayload {
  type: "contact_inquiry" | "project_intake";
  name: string;
  email: string;
  organization: string;
  projectType: string | string[];
  budget?: string;
  timeline?: string;
  description?: string;
  notes?: string;
}

export async function sendLeadEmail(payload: LeadPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL || "hello@aethertech.example.com";

  if (!apiKey) {
    return false;
  }

  const isIntake = payload.type === "project_intake";
  const subject = isIntake
    ? `[New Project Intake] ${payload.name} (${payload.organization || "No Org"})`
    : `[New Contact Inquiry] ${payload.name} (${payload.organization || "No Org"})`;

  const projectTypeStr = Array.isArray(payload.projectType)
    ? payload.projectType.join(", ")
    : payload.projectType;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
      <div style="background-color: #0f172a; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #38bdf8; margin: 0; font-size: 18px; font-weight: 600;">
          Aether Technologies &bull; Lead Alert
        </h2>
      </div>
      <h3 style="color: #0f172a; font-size: 20px; margin-top: 0;">${subject}</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Client Name:</strong></td>
          <td style="padding: 8px 0; color: #0f172a;">${payload.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${payload.email}" style="color: #ea580c;">${payload.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b;"><strong>Organization:</strong></td>
          <td style="padding: 8px 0; color: #0f172a;">${payload.organization || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b;"><strong>Project Scope:</strong></td>
          <td style="padding: 8px 0; color: #0f172a;">${projectTypeStr || "Custom"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b;"><strong>Budget:</strong></td>
          <td style="padding: 8px 0; color: #059669; font-weight: 600;">${payload.budget || "Standard"}</td>
        </tr>
        ${payload.timeline ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b;"><strong>Timeline:</strong></td>
          <td style="padding: 8px 0; color: #0f172a;">${payload.timeline}</td>
        </tr>` : ""}
      </table>
      <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; line-height: 1.6; color: #334155;">
        <strong>Project Description & Requirements:</strong><br/>
        <p style="margin-top: 8px; margin-bottom: 0; white-space: pre-wrap;">${payload.description || payload.notes || "No details provided"}</p>
      </div>
      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">
        Dispatched automatically by Aether Lead Operations Engine.
      </p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Aether Inbound <notifications@aethertech.example.com>",
        to: [toEmail],
        subject,
        html: htmlContent,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[RESEND EMAIL DISPATCH ERROR]:", err);
    return false;
  }
}

export async function dispatchLeadWebhook(payload: LeadPayload): Promise<boolean> {
  // Concurrently dispatch email if configured
  sendLeadEmail(payload).catch((err) => console.error("[EMAIL ERROR]:", err));

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  const isDiscord = webhookUrl.includes("discord.com") || webhookUrl.includes("discordapp.com");
  const isSlack = webhookUrl.includes("slack.com");

  try {
    let bodyPayload: any;

    if (isDiscord) {
      // Format as rich Discord Embed
      const typeLabel = payload.type === "project_intake" ? "🚀 New Project Scoping Intake" : "📬 New Contact Inquiry";
      const projectTypeStr = Array.isArray(payload.projectType) ? payload.projectType.join(", ") : payload.projectType;

      bodyPayload = {
        username: "Aether Lead Dispatcher",
        avatar_url: "https://aethertech.example.com/icon.svg",
        embeds: [
          {
            title: typeLabel,
            color: payload.type === "project_intake" ? 0x3b82f6 : 0x10b981, // Blue or Emerald
            fields: [
              { name: "Client Name", value: payload.name, inline: true },
              { name: "Email", value: payload.email, inline: true },
              { name: "Organization", value: payload.organization || "N/A", inline: true },
              { name: "Project Category", value: projectTypeStr || "Custom", inline: false },
              { name: "Budget", value: payload.budget || "Standard", inline: true },
              { name: "Timeline", value: payload.timeline || "Not specified", inline: true },
              { name: "Project Scope & Details", value: (payload.description || payload.notes || "No details provided").substring(0, 1000), inline: false },
            ],
            footer: { text: "Aether Technologies • Lead Operations Vault" },
            timestamp: new Date().toISOString(),
          },
        ],
      };
    } else if (isSlack) {
      // Format as Slack Block Kit
      const projectTypeStr = Array.isArray(payload.projectType) ? payload.projectType.join(", ") : payload.projectType;
      bodyPayload = {
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: payload.type === "project_intake" ? "🚀 New Project Scoping Intake" : "📬 New Contact Inquiry",
            },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Client:*\n${payload.name} (${payload.email})` },
              { type: "mrkdwn", text: `*Organization:*\n${payload.organization}` },
              { type: "mrkdwn", text: `*Category:*\n${projectTypeStr}` },
              { type: "mrkdwn", text: `*Budget:*\n${payload.budget || "Standard"}` },
            ],
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Scope / Details:*\n${payload.description || payload.notes || "No additional notes"}`,
            },
          },
        ],
      };
    } else {
      // Standard JSON Webhook
      bodyPayload = {
        event: "aether.lead_received",
        timestamp: new Date().toISOString(),
        payload,
      };
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyPayload),
    });

    return res.ok;
  } catch (err) {
    console.error("[WEBHOOK DISPATCH ERROR]:", err);
    return false;
  }
}
