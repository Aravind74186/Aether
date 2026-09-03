import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, invalidateSession, clearSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (sessionId) {
      invalidateSession(sessionId);
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    clearSessionCookie(response);
    return response;
  } catch (error) {
    console.error("[ADMIN LOGOUT ERROR]:", error);
    const response = NextResponse.json(
      { error: "Logout error occurred." },
      { status: 500 }
    );
    clearSessionCookie(response);
    return response;
  }
}
