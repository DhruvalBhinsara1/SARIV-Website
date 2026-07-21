import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
          <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="#ffffff" />
        </svg>
      </div>
    ),
    size
  );
}
