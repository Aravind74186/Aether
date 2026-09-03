import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { verifyAdminApi } from "@/lib/auth";
import { getBlogDatabase, saveBlogDatabase } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const auth = verifyAdminApi(req);
  if (!auth.success) return auth.response;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided for upload." }, { status: 400 });
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file format. Only JPEG, PNG, WebP, and AVIF images are permitted.",
        },
        { status: 400 }
      );
    }

    // Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Image file size exceeds maximum permitted limit of 5MB." },
        { status: 400 }
      );
    }

    // Safe extension determination
    const extMap: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/avif": ".avif",
    };
    const extension = extMap[file.type] || ".webp";

    // Random safe filename
    const hash = crypto.randomBytes(16).toString("hex");
    const safeFilename = `${Date.now()}_${hash}${extension}`;

    // Storage abstraction: Write to public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, safeFilename);
    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    const publicUrl = `/uploads/${safeFilename}`;

    // Record media in database
    const db = getBlogDatabase();
    db.media.unshift({
      id: `med_${Date.now()}`,
      filename: safeFilename,
      url: publicUrl,
      size: file.size,
      mimeType: file.type,
      uploadedAt: new Date().toISOString(),
    });
    saveBlogDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully.",
      url: publicUrl,
      filename: safeFilename,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error("[POST /api/admin/media ERROR]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during image processing." },
      { status: 500 }
    );
  }
}
