import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";
import { getBlogDatabase, saveBlogDatabase } from "@/lib/blog-db";
import { verifyPassword, hashPassword, createSession, setSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting (max 5 login attempts per minute to prevent brute-force)
    const ip = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1";
    const rateLimit = checkRateLimit(`login_${ip}`, 5, 60000);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please wait 60 seconds before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    // Generic error constant to prevent account enumeration
    const genericAuthError = "Invalid email or password.";

    const db = getBlogDatabase();
    let user = db.users.find((u) => u.email.toLowerCase() === email);
    const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@aethertech.com").trim().toLowerCase();
    const envAdminPassword = process.env.ADMIN_PASSWORD;

    // Auto-create or repair admin user if matched against env credentials
    if (!user && email === envAdminEmail && envAdminPassword && password === envAdminPassword) {
      user = {
        id: "usr_admin_seed",
        email: envAdminEmail,
        passwordHash: await hashPassword(password),
        role: "ADMIN",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.users.push(user);
      saveBlogDatabase(db);
    }

    if (!user) {
      return NextResponse.json({ error: genericAuthError }, { status: 401 });
    }

    // Check password hash
    let isValid = await verifyPassword(password, user.passwordHash);

    // If password matches updated ADMIN_PASSWORD from .env, update the hash immediately
    if (!isValid && envAdminPassword && password === envAdminPassword) {
      isValid = true;
      user.passwordHash = await hashPassword(password);
      user.updatedAt = new Date().toISOString();
      saveBlogDatabase(db);
    }

    if (!isValid) {
      return NextResponse.json({ error: genericAuthError }, { status: 401 });
    }

    // Enforce ADMIN role authorization
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Access denied. Insufficient administrative privileges." },
        { status: 403 }
      );
    }

    // Create session & set HTTP-only cookie
    const session = createSession(user.id);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    setSessionCookie(response, session.id);
    return response;
  } catch (error) {
    console.error("[ADMIN LOGIN ERROR]:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred during authentication." },
      { status: 500 }
    );
  }
}
