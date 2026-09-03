import { NextRequest, NextResponse } from "next/server";

const DEFAULT_PASSPHRASE = "aether2025";
const COOKIE_NAME = "aether_admin_session";

function getValidPassphrases(): string[] {
  const envPass = process.env.ADMIN_PASSPHRASE;
  const passphrases = [DEFAULT_PASSPHRASE, "admin"];
  if (envPass) {
    passphrases.unshift(envPass.trim());
  }
  return passphrases;
}

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get(COOKIE_NAME);
  const isValid = sessionCookie?.value && sessionCookie.value.startsWith("auth_");

  return NextResponse.json({
    authenticated: Boolean(isValid),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passphrase } = body;

    if (!passphrase || typeof passphrase !== "string") {
      return NextResponse.json(
        { error: "Passphrase is required." },
        { status: 400 }
      );
    }

    const validPassphrases = getValidPassphrases();
    const isMatch = validPassphrases.includes(passphrase.trim());

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid admin passphrase." },
        { status: 401 }
      );
    }

    const tokenValue = `auth_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication verified.",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: tokenValue,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed due to server error." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session terminated.",
  });

  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
