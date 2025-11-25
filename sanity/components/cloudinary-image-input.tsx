"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ObjectInputProps } from "sanity";
import { set, unset } from "sanity";

type CloudinaryAssetValue = {
  _type?: "cloudinary.asset";
  publicId?: string;
  secureUrl?: string;
  width?: number;
  height?: number;
  format?: string;
};

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: unknown, result: CloudinaryUploadResult) => void,
      ) => { open: () => void };
    };
  }
}

type CloudinaryUploadInfo = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  asset_id: string;
};

type CloudinaryUploadResult = {
  event: string;
  info: CloudinaryUploadInfo;
};

const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.SANITY_STUDIO_CLOUDINARY_CLOUD_NAME;
const uploadPreset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
  process.env.SANITY_STUDIO_CLOUDINARY_UPLOAD_PRESET;
const defaultFolder = "flawless/gallery";

export function CloudinaryImageInput(
  props: ObjectInputProps<CloudinaryAssetValue>,
) {
  const { value, onChange, readOnly } = props;
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.cloudinary) {
      setWidgetReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => setWidgetReady(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpload = useCallback(() => {
    if (!window.cloudinary || !cloudName || !uploadPreset) {
      return;
    }
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: defaultFolder,
        multiple: false,
        sources: ["local", "url", "camera"],
      },
      (error, result) => {
        if (!error && result?.event === "success") {
          const info = result.info;
          onChange(
            set({
              _type: "cloudinary.asset",
              publicId: info.public_id,
              secureUrl: info.secure_url,
              width: info.width,
              height: info.height,
              format: info.format,
            }),
          );
        }
      },
    );
    widget.open();
  }, [onChange]);

  const canUpload = widgetReady && !readOnly && cloudName && uploadPreset;

  const previewUrl = value?.secureUrl;

  const message = useMemo(() => {
    if (!cloudName || !uploadPreset) {
      return "Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to enable uploads.";
    }
    if (!widgetReady) {
      return "Loading Cloudinary widget...";
    }
    return null;
  }, [widgetReady]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="button"
          onClick={handleUpload}
          disabled={!canUpload}
          style={{
            padding: "0.35rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid var(--card-border, #ddd)",
            background: canUpload ? "var(--card-bg, #f5f5f5)" : "#e5e5e5",
            cursor: canUpload ? "pointer" : "not-allowed",
          }}
        >
          {value?.secureUrl ? "Replace image" : "Upload image"}
        </button>
        {value?.secureUrl ? (
          <button
            type="button"
            onClick={() => onChange(unset())}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              border: "1px solid #f5b5b5",
              background: "#ffecec",
              color: "#b42318",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        ) : null}
      </div>
      {message ? (
        <p style={{ fontSize: "0.85rem", color: "#a00" }}>{message}</p>
      ) : null}
      {previewUrl ? (
        <div>
          <div
            style={{
              width: "100%",
              maxWidth: "320px",
              borderRadius: "1rem",
              overflow: "hidden",
              border: "1px solid var(--card-border, #ddd)",
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: Next/Image is unavailable in Sanity Studio context */}
            <img
              src={previewUrl}
              alt="Cloudinary preview"
              style={{ width: "100%", display: "block" }}
            />
          </div>
          <p style={{ fontSize: "0.8rem", marginTop: "0.35rem" }}>
            {value?.publicId}
          </p>
        </div>
      ) : null}
      {/* Render default nested fields for advanced editing */}
      {props.renderDefault(props)}
    </div>
  );
}
