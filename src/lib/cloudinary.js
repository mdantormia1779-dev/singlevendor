import { v2 as cloudinary } from "cloudinary";

/**
 * Configure Cloudinary with environment variables
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Checks if Cloudinary credentials are provided
 */
export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Uploads a file buffer directly to Cloudinary using upload_stream
 * 
 * @param {Object} params
 * @param {Buffer|Uint8Array} params.buffer - Image buffer
 * @param {string} [params.folder="products"] - Destination folder in Cloudinary
 * @param {string} [params.originalName] - Original file name
 * @returns {Promise<{ url: string, publicId: string, size: number, format: string }>}
 */
export async function uploadToCloudinary({ buffer, folder = "products", originalName = "" }) {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary credentials missing. Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file."
    );
  }

  // Clean public_id prefix from originalName
  const baseName = originalName
    ? originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_")
    : "product";
  const uniquePublicId = `${baseName}_${Date.now()}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: uniquePublicId,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload stream error:", error);
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            size: result.bytes,
            format: result.format,
          });
        }
      }
    );

    stream.end(buffer);
  });
}

export default cloudinary;
