import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Manuel Peña — Street Photography, New York";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LEAD = "public/images/work/shadow-play/shadow-play-8.jpg";

export default async function OpengraphImage() {
  const photo = await readFile(path.join(process.cwd(), LEAD));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#111", position: "relative" }}>
        <img src={src} alt="" width={1200} height={800} style={{ position: "absolute", top: -85, left: 0 }} />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "120px 56px 44px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75))",
            color: "#f4f1ec",
          }}
        >
          <div style={{ display: "flex", fontSize: 72, fontWeight: 600, letterSpacing: "-0.04em" }}>Manuel Peña</div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 }}>
            Street photography · New York
          </div>
        </div>
      </div>
    ),
    size,
  );
}
