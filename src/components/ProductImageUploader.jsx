"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Loader2,
  ImagePlus,
  X,
  Star,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_EXTS = [".jpg", ".jpeg", ".png", ".webp"];

export default function ProductImageUploader({
  images = [],
  setImages,
  error,
  folder = "products",
  onUploadingChange,
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [copiedIdx, setCopiedIdx] = useState(null);

  /**
   * Client-side validation: verifies type and size limit (<= 5MB)
   */
  const validateFiles = (fileList) => {
    const valid = [];
    const invalid = [];

    Array.from(fileList).forEach((file) => {
      const ext = ("." + file.name.split(".").pop()).toLowerCase();
      const isTypeOk = ALLOWED_TYPES.includes(file.type) || ALLOWED_EXTS.includes(ext);
      const isSizeOk = file.size <= MAX_FILE_SIZE_BYTES;

      if (!isTypeOk) {
        invalid.push(`"${file.name}" is not a valid format. Only JPG, PNG, and WebP are allowed.`);
      } else if (!isSizeOk) {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        invalid.push(`"${file.name}" (${sizeMb}MB) exceeds the 5MB maximum limit.`);
      } else {
        valid.push(file);
      }
    });

    return { valid, invalid };
  };

  /**
   * Upload using XMLHttpRequest to get accurate upload progress
   */
  const uploadWithProgress = (formData) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
          setUploadStatus(`Uploading to S3... ${percent}%`);
        }
      });

      xhr.addEventListener("load", () => {
        try {
          const res = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300 && res.success) {
            resolve(res);
          } else {
            reject(new Error(res.error || `Upload failed with HTTP status ${xhr.status}`));
          }
        } catch (e) {
          reject(new Error("Invalid response from server"));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Network connection error during file upload."));
      });

      xhr.addEventListener("abort", () => {
        reject(new Error("Upload aborted by client."));
      });

      xhr.open("POST", "/api/upload");
      xhr.send(formData);
    });
  };

  const handleFilesSelected = async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    const { valid, invalid } = validateFiles(fileList);

    // Notify user about any invalid files
    if (invalid.length > 0) {
      invalid.forEach((msg) => toast.error(msg));
    }

    if (valid.length === 0) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    onUploadingChange?.(true);
    setUploadProgress(0);
    setUploadStatus(`Preparing ${valid.length} file(s)...`);

    const formData = new FormData();
    valid.forEach((f) => formData.append("files", f));
    formData.append("folder", folder);

    try {
      const data = await uploadWithProgress(formData);

      if (data.success && Array.isArray(data.urls) && data.urls.length > 0) {
        setImages((prev) => [...prev, ...data.urls]);
        if (data.provider === "cloudinary") {
          toast.success(
            `${data.count} image(s) uploaded to Cloudinary successfully! ☁️`
          );
        } else if (data.provider === "s3") {
          toast.success(
            `${data.count} image(s) uploaded to AWS S3 successfully! 🚀`
          );
        } else {
          toast.success(
            `${data.count} image(s) uploaded successfully! 📸`
          );
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.message || "Failed to upload image(s).");
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
      setUploadProgress(0);
      setUploadStatus("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddCustomUrl = (e) => {
    e.preventDefault();
    const trimmed = customUrl.trim();
    if (!trimmed) return;
    if (
      !trimmed.startsWith("http://") &&
      !trimmed.startsWith("https://") &&
      !trimmed.startsWith("/")
    ) {
      toast.error("Please enter a valid image URL (e.g., https://...)");
      return;
    }
    setImages((prev) => [...prev, trimmed]);
    setCustomUrl("");
    toast.success("Image URL added to gallery! 🔗");
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetPrimary = (indexToPrimary) => {
    setImages((prev) => {
      const selected = prev[indexToPrimary];
      const rest = prev.filter((_, idx) => idx !== indexToPrimary);
      return [selected, ...rest];
    });
    toast.info("Set as primary product photo ⭐");
  };

  const handleCopyUrl = (url, idx) => {
    navigator.clipboard.writeText(url);
    setCopiedIdx(idx);
    toast.info("Image URL copied to clipboard! 📋");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const isCloudUrl = (url) => {
    if (typeof url !== "string") return false;
    return url.includes("cloudinary.com") || url.includes(".s3.") || url.includes(".amazonaws.com");
  };

  return (
    <div className="border border-slate-200 rounded-3xl p-5 sm:p-6 bg-slate-50/50 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ImagePlus size={18} className="text-emerald-600" />
            Product Photos &amp; Cloud Gallery <span className="text-red-500">*</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload high-resolution images to Cloudinary / S3 or enter web URLs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {images.length} photo{images.length === 1 ? "" : "s"} selected
          </span>
        </div>
      </div>

      {/* Drag & Drop Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!isUploading) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!isUploading) handleFilesSelected(e.dataTransfer.files);
        }}
        onClick={() => {
          if (!isUploading) fileInputRef.current?.click();
        }}
        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-emerald-500 bg-emerald-50/80 scale-[1.01]"
            : isUploading
            ? "border-emerald-300 bg-emerald-50/40 cursor-not-allowed opacity-90"
            : "border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/20"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={isUploading}
          onChange={(e) => handleFilesSelected(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
            {isUploading ? (
              <Loader2 size={24} className="animate-spin text-emerald-600" />
            ) : (
              <UploadCloud size={24} />
            )}
          </div>

          {isUploading ? (
            <div className="w-full max-w-xs space-y-2 mt-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>{uploadStatus || "Uploading..."}</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-emerald-700 hover:underline">
                  Click to browse
                </span>{" "}
                <span className="text-slate-500 font-medium">or drag &amp; drop images here</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>Supports JPEG, PNG, WebP • Max 5MB per file • AWS S3 Hosted</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* External URL Input Option */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Or paste an image web URL (https://...)"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          disabled={isUploading}
          className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-emerald-500"
        />
        <button
          type="button"
          onClick={handleAddCustomUrl}
          disabled={isUploading || !customUrl.trim()}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition shrink-0 cursor-pointer"
        >
          Add URL
        </button>
      </div>

      {/* Uploaded Images Gallery */}
      {images.length > 0 && (
        <div className="pt-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Image Gallery ({images.length}) • First photo is the Primary Display Thumbnail
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((img, idx) => {
              const isCloud = isCloudUrl(img);
              const isCloudinary = typeof img === "string" && img.includes("cloudinary.com");
              const isS3 = typeof img === "string" && (img.includes(".s3.") || img.includes(".amazonaws.com"));
              return (
                <div
                  key={idx}
                  className={`relative rounded-2xl overflow-hidden border aspect-square group bg-white shadow-xs transition-all ${
                    idx === 0
                      ? "ring-2 ring-emerald-500 border-emerald-500"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Product preview ${idx + 1}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                    unoptimized={img.startsWith("data:")}
                  />

                  {/* Primary Badge */}
                  {idx === 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5 z-10">
                      <Star size={10} className="fill-current" /> Primary
                    </span>
                  )}

                  {/* Cloud Storage Indicator */}
                  {isCloud && idx !== 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-slate-900/80 text-white text-[8px] font-medium px-1.5 py-0.5 rounded-md shadow-xs z-10">
                      {isCloudinary ? "Cloudinary" : isS3 ? "S3" : "Cloud"}
                    </span>
                  )}

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-2 z-20">
                    <div className="w-full flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(img, idx)}
                        className="p-1 bg-white/80 hover:bg-white text-slate-700 rounded-lg transition shadow-xs cursor-pointer"
                        title="Copy S3 Image URL"
                      >
                        {copiedIdx === idx ? (
                          <CheckCircle2 size={13} className="text-emerald-600" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition shadow-xs cursor-pointer"
                        title="Remove image"
                      >
                        <X size={13} />
                      </button>
                    </div>

                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(idx)}
                        className="w-full py-1 bg-white/95 hover:bg-white text-slate-900 text-[10px] font-bold rounded-lg transition shadow-xs cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Star size={10} /> Make Primary
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
