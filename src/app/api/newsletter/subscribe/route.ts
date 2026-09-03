import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { checkRateLimit } from "@/lib/rate-limiter";

export const dynamic = "force-dynamic";

interface SubscriberRecord {
  email: string;
  subscribedAt: string;
  source: string;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "newsletter-subscribers.json");

function getSubscribers(): SubscriberRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBSCRIBERS_FILE)) {
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const raw = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSubscribers(subscribers: SubscriberRecord[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf-8");
  } catch (err) {
    console.error("[NEWSLETTER STORAGE ERROR]:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting (max 5 requests per minute)
    const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
    const rateLimit = checkRateLimit(`newsletter_${ip}`, 5, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many subscription attempts. Please wait a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const email = body.email?.trim().toLowerCase();

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid corporate or professional email address." },
        { status: 400 }
      );
    }

    const subscribers = getSubscribers();
    const alreadySubscribed = subscribers.some((s) => s.email === email);

    if (alreadySubscribed) {
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to Aether Engineering Publications.",
      });
    }

    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
      source: "website_insights_footer",
    });

    saveSubscribers(subscribers);

    return NextResponse.json({
      success: true,
      message: "Subscription confirmed. Welcome to Aether Engineering Publications.",
    });
  } catch (error) {
    console.error("[NEWSLETTER SUBSCRIBE ERROR]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing subscription." },
      { status: 500 }
    );
  }
}
