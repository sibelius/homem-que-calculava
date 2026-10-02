import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.svg: a gold camel over a chessboard strip, on the night-desert background
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#13111d" }}>
        <svg width={180} height={180} viewBox="0 0 32 32">
          <rect x="3" y="23" width="26" height="6" rx="1.5" fill="#262236" />
          <rect x="3" y="23" width="6.5" height="6" fill="#3a3450" />
          <rect x="16" y="23" width="6.5" height="6" fill="#3a3450" />
          <path
            fill="#e0a84a"
            d="M5 16.2c0-2.6 1.6-4.2 3.6-4.2 1-3 4.6-3.6 6.2-.6 1 .9 2.6.9 3.6 1.4 1-1.6 1.6-3.6 2.6-4.6.8-.7 2-.5 2.6 0l1 .5c.3.5-.2 1-1 1h-1c-.5 1.6-1 3.6-2 5.2-.6 1.4-1.6 2-2.6 2.2H7c-1.2 0-2-.4-2-.9Z"
          />
          <rect x="7.2" y="17" width="1.3" height="5" rx=".6" fill="#e0a84a" />
          <rect x="9.4" y="17" width="1.3" height="5" rx=".6" fill="#e0a84a" />
          <rect x="16.2" y="17" width="1.3" height="5" rx=".6" fill="#e0a84a" />
          <rect x="18.4" y="17" width="1.3" height="5" rx=".6" fill="#e0a84a" />
        </svg>
      </div>
    ),
    size,
  );
}
