import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

// Built-in intelligent response engine grounded in Aether's actual architecture and policies
function getGroundedResponse(userQuery: string): { reply: string; suggestedAction?: { label: string; href: string } } {
  const q = userQuery.toLowerCase();

  if (q.includes("tech stack") || q.includes("technology") || q.includes("framework") || q.includes("frontend") || q.includes("backend")) {
    return {
      reply: "Aether builds on a strictly typed, production-ready stack:\n• Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, Radix UI\n• Backend & APIs: Node.js, Python FastAPI, Next.js Server Actions with Zod validation\n• Database: PostgreSQL (Relational with strict ACID locks) and pgvector for RAG\n• Infrastructure: Docker, GitHub Actions CI/CD, and Linux VPS.",
      suggestedAction: { label: "Inspect Full Technology Ecosystem", href: "/technology" },
    };
  }

  if (q.includes("school") || q.includes("college") || q.includes("education") || q.includes("attendance") || q.includes("campus")) {
    return {
      reply: "We engineer tailored education platforms including CampusFlow (our modular academic and attendance system), digital fee collection, and departmental examination portals. We prioritize 1-click attendance, parent SMS/email alerts, and student data isolation without bloated enterprise software.",
      suggestedAction: { label: "View Education Solutions", href: "/solutions#schools" },
    };
  }

  if (q.includes("mvp") || q.includes("startup") || q.includes("timeline") || q.includes("how long")) {
    return {
      reply: "Our typical MVP engineering cycle ranges from 4 to 8 weeks. We handle complete system design, multi-tenant database schemas, secure authentication, Stripe billing integration, and production deployment in transparent milestones.",
      suggestedAction: { label: "Scope Your Startup MVP", href: "/start-a-project" },
    };
  }

  if (q.includes("ai") || q.includes("rag") || q.includes("llm") || q.includes("automation") || q.includes("document")) {
    return {
      reply: "We build practical, verifiable AI systems—like DocuPulse, our RAG document search pipeline. We combine vector embeddings (pgvector) with keyword search to enforce strict source citations and prevent hallucinations.",
      suggestedAction: { label: "Explore AI Case Study", href: "/case-studies/docupulse-intelligent-document-rag-pipeline" },
    };
  }

  if (q.includes("price") || q.includes("cost") || q.includes("budget") || q.includes("quote")) {
    return {
      reply: "Projects typically range from small discovery/portal builds ($2,500 - $5,000) to full MVP architectures and comprehensive institutional platforms ($5,000 - $10,000+). We provide fixed-scope milestones with zero hidden licensing costs.",
      suggestedAction: { label: "Use Interactive Intake Wizard", href: "/start-a-project" },
    };
  }

  if (q.includes("process") || q.includes("how do you work") || q.includes("steps")) {
    return {
      reply: "We follow a 7-step engineering methodology: 01 Discovery, 02 Planning & Schema, 03 UI/UX Design, 04 Modular Development, 05 Testing & QA, 06 Production Deployment, and 07 Ongoing Maintenance.",
      suggestedAction: { label: "Review 7-Step Process", href: "/process" },
    };
  }

  return {
    reply: "I am Aether's Technical Scoping Assistant. I can help answer questions about our software development services, technology stack, education solutions, startup MVPs, or project intake process. How can I assist with your requirements today?",
    suggestedAction: { label: "Submit a Project Request", href: "/start-a-project" },
  };
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
    const rateLimit = checkRateLimit(ip, 15, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a moment." },
        { status: 429 }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const result = getGroundedResponse(message);

    return NextResponse.json({
      success: true,
      reply: result.reply,
      suggestedAction: result.suggestedAction,
    });
  } catch (error) {
    console.error("Assistant API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response." },
      { status: 500 }
    );
  }
}
