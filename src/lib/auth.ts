import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { getBlogDatabase, saveBlogDatabase, UserRecord, SessionRecord } from "./blog-db";

export const SESSION_COOKIE_NAME = "aether_admin_session";
export const SESSION_DURATION_DAYS = 7;

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createSession(userId: string): SessionRecord {
  const db = getBlogDatabase();
  const sessionId = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const session: SessionRecord = {
    id: sessionId,
    userId,
    expiresAt,
    createdAt: new Date().toISOString(),
  };

  // Clean up any old expired sessions
  const now = new Date().toISOString();
  db.sessions = db.sessions.filter((s) => s.expiresAt > now);
  db.sessions.push(session);
  saveBlogDatabase(db);

  return session;
}

export function validateSession(sessionId: string): { user: UserRecord; session: SessionRecord } | null {
  if (!sessionId) return null;
  const db = getBlogDatabase();
  const session = db.sessions.find((s) => s.id === sessionId);
  if (!session) return null;

  // Check expiration
  if (new Date(session.expiresAt) <= new Date()) {
    invalidateSession(sessionId);
    return null;
  }

  const user = db.users.find((u) => u.id === session.userId);
  if (!user) return null;

  return { user, session };
}

export function invalidateSession(sessionId: string): void {
  const db = getBlogDatabase();
  db.sessions = db.sessions.filter((s) => s.id !== sessionId);
  saveBlogDatabase(db);
}

export function setSessionCookie(response: NextResponse, sessionId: string): void {
  const maxAge = SESSION_DURATION_DAYS * 24 * 60 * 60;
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentUser(): Promise<UserRecord | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) return null;

    const result = validateSession(sessionCookie.value);
    return result ? result.user : null;
  } catch {
    return null;
  }
}

// Server API guard - returns UserRecord or null
export function getAuthenticatedAdminFromRequest(req: NextRequest): UserRecord | null {
  const sessionId = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;

  const result = validateSession(sessionId);
  if (!result) return null;

  if (result.user.role !== "ADMIN") {
    return null;
  }

  return result.user;
}

// Strict API authorization check
export function verifyAdminApi(req: NextRequest): { success: true; user: UserRecord } | { success: false; response: NextResponse } {
  const user = getAuthenticatedAdminFromRequest(req);
  if (!user) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      ),
    };
  }

  return { success: true, user };
}
