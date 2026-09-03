import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import path from "path";

/**
 * Returns whether all required AWS S3 environment variables are provided.
 */
export function isS3Configured() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;
  const bucketName = process.env.AWS_BUCKET_NAME;

  return Boolean(accessKeyId && secretAccessKey && region && bucketName);
}

/**
 * Lazily instantiates and caches the S3Client instance.
 */
let cachedS3Client = null;

export function getS3Client() {
  if (cachedS3Client) {
    return cachedS3Client;
  }

  const region = process.env.AWS_REGION || "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing AWS credentials. Please define AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your environment."
    );
  }

  cachedS3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    ...(process.env.AWS_ENDPOINT ? { endpoint: process.env.AWS_ENDPOINT } : {}),
    ...(process.env.AWS_S3_FORCE_PATH_STYLE === "true" ? { forcePathStyle: true } : {}),
  });

  return cachedS3Client;
}

/**
 * Allowed MIME types and extensions for product images.
 */
export const ALLOWED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Generates a unique, collision-proof filename using crypto.randomUUID()
 */
export function generateUniqueFileName(originalName = "image.png") {
  const ext = (path.extname(originalName) || ".png").toLowerCase();
  const validExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".png";
  const uniqueId = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString("hex");
  const timestamp = Date.now();
  return `${timestamp}-${uniqueId}${validExt}`;
}

/**
 * Uploads a file buffer directly to AWS S3 using PutObjectCommand.
 * 
 * @param {Object} options
 * @param {Buffer|Uint8Array} options.buffer - File buffer
 * @param {string} options.originalName - Original file name
 * @param {string} options.mimeType - Content-Type of the file
 * @param {string} [options.folder="products"] - Destination folder in bucket
 * @returns {Promise<{ key: string, url: string, bucket: string, size: number }>}
 */
export async function uploadToS3({ buffer, originalName, mimeType, folder = "products" }) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_REGION || "us-east-1";

  if (!bucketName) {
    throw new Error("AWS_BUCKET_NAME environment variable is not defined.");
  }

  const s3Client = getS3Client();
  const fileName = generateUniqueFileName(originalName);
  const cleanFolder = folder.replace(/^\/+|\/+$/g, "");
  const key = cleanFolder ? `${cleanFolder}/${fileName}` : fileName;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: mimeType || "application/octet-stream",
  });

  await s3Client.send(command);

  // Compute public/accessible S3 URL
  let publicUrl = "";
  if (process.env.AWS_S3_CUSTOM_DOMAIN) {
    const domain = process.env.AWS_S3_CUSTOM_DOMAIN.replace(/\/+$/, "");
    publicUrl = `${domain}/${key}`;
  } else if (region === "us-east-1") {
    publicUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;
  } else {
    publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
  }

  return {
    key,
    url: publicUrl,
    bucket: bucketName,
    size: buffer.length,
    fileName,
  };
}
