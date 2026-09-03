import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import {
  uploadToS3,
  isS3Configured,
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE_BYTES,
  generateUniqueFileName,
} from "@/lib/s3";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * Helper to validate a file's MIME type and size.
 */
function validateFile(file) {
  const allowedMimes = Object.keys(ALLOWED_IMAGE_TYPES);
  const fileType = (file.type || "").toLowerCase();
  const fileName = file.name || "unknown";
  const ext = (path.extname(fileName) || "").toLowerCase();

  const validExts = Object.values(ALLOWED_IMAGE_TYPES).flat();

  // Validate MIME type or file extension
  const isMimeValid = allowedMimes.includes(fileType);
  const isExtValid = validExts.includes(ext);

  if (!isMimeValid && !isExtValid) {
    return {
      valid: false,
      error: `Invalid file type for "${fileName}". Only JPEG, PNG, and WebP are allowed.`,
    };
  }

  // Validate File Size (<= 5MB)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File "${fileName}" (${sizeInMB}MB) exceeds the maximum allowed size limit of 5MB.`,
    };
  }

  // Resolve canonical MIME type
  let canonicalMime = fileType;
  if (!allowedMimes.includes(canonicalMime)) {
    if (ext === ".jpg" || ext === ".jpeg") canonicalMime = "image/jpeg";
    else if (ext === ".png") canonicalMime = "image/png";
    else if (ext === ".webp") canonicalMime = "image/webp";
    else canonicalMime = "image/jpeg";
  }

  return { valid: true, mimeType: canonicalMime };
}

export async function POST(request) {
  try {
    let formData;
    try {
      formData = await request.formData();
    } catch (parseErr) {
      return NextResponse.json(
        { success: false, error: "Malformed form data: " + parseErr.message },
        { status: 400 }
      );
    }

    // Collect all files from common keys
    const rawFiles = [
      ...formData.getAll("files"),
      ...formData.getAll("file"),
      ...formData.getAll("images"),
      ...formData.getAll("image"),
    ].filter(
      (item) => item && typeof item === "object" && typeof item.arrayBuffer === "function"
    );

    if (rawFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: "No files uploaded. Please attach at least one image file." },
        { status: 400 }
      );
    }

    // 1. Validate all files before uploading
    const validatedFiles = [];
    for (const file of rawFiles) {
      const validation = validateFile(file);
      if (!validation.valid) {
        return NextResponse.json(
          { success: false, error: validation.error },
          { status: 400 }
        );
      }
      validatedFiles.push({ file, mimeType: validation.mimeType });
    }

    const uploadedResults = [];
    const cloudinaryReady = isCloudinaryConfigured();
    const s3Ready = isS3Configured();

    const providerName = cloudinaryReady ? "cloudinary" : s3Ready ? "s3" : "local";

    // 2. Upload using available cloud provider (Cloudinary prioritized, then S3, then local)
    for (const { file, mimeType } of validatedFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const originalName = file.name || "product.png";

      if (cloudinaryReady) {
        // Upload to Cloudinary
        const cloudResult = await uploadToCloudinary({
          buffer,
          folder: "products",
          originalName,
        });

        uploadedResults.push({
          url: cloudResult.url,
          key: cloudResult.publicId,
          name: originalName,
          size: file.size,
          provider: "cloudinary",
        });
      } else if (s3Ready) {
        // Upload to AWS S3
        const s3Result = await uploadToS3({
          buffer,
          originalName,
          mimeType,
          folder: "products",
        });

        uploadedResults.push({
          url: s3Result.url,
          key: s3Result.key,
          name: originalName,
          size: file.size,
          provider: "s3",
        });
      } else {
        // Local disk fallback for development when no cloud credentials provided
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        try {
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
        } catch (dirErr) {
          console.warn("Could not create uploads directory:", dirErr.message);
        }

        const uniqueName = generateUniqueFileName(originalName);
        const filePath = path.join(uploadsDir, uniqueName);

        try {
          fs.writeFileSync(filePath, buffer);
          uploadedResults.push({
            url: `/uploads/${uniqueName}`,
            key: uniqueName,
            name: originalName,
            size: file.size,
            provider: "local",
          });
        } catch (writeErr) {
          const base64 = buffer.toString("base64");
          uploadedResults.push({
            url: `data:${mimeType};base64,${base64}`,
            key: uniqueName,
            name: originalName,
            size: file.size,
            provider: "base64",
          });
        }
      }
    }

    const urls = uploadedResults.map((r) => r.url);

    return NextResponse.json({
      success: true,
      url: urls[0],
      urls,
      count: urls.length,
      files: uploadedResults,
      provider: providerName,
      cloudinaryConfigured: cloudinaryReady,
      s3Configured: s3Ready,
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json(
      { success: false, error: "Image upload failed: " + error.message },
      { status: 500 }
    );
  }
}
