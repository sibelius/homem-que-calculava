import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Metadata } from "next";
import { ImageResponse } from "next/og";
import { getProblem } from "@/lib/problems";

export const SITE_URL = "https://homem-que-calculava.vercel.app";
export const SITE_NAME = "O Homem que Calculava — visualizado";
export const OG_SIZE = { width: 1200, height: 630 };

const HOME_TITLE = "O Homem que Calculava";
const HOME_DESCRIPTION = "Os problemas de Beremiz Samir, do livro de Malba Tahan, em visualizações interativas.";
const HOME_BLURB = "Os problemas de Beremiz Samir, do livro de Malba Tahan, para arrastar, tocar e ver a conta fechar.";

// Night-desert palette from globals.css (dark theme)
const C = {
  bg: "#13111d",
  surface: "#1c1929",
  surface2: "#262236",
  ink: "#efe6d2",
  muted: "#a99e8c",
  line: "#3a3450",
  gold: "#e0a84a",
  teal: "#4fb3a9",
  clay: "#e27a57",
  indigo: "#9d9cf0",
};
const ACCENTS = [C.gold, C.teal, C.clay, C.indigo];

type Page = { kicker: string; title: string; blurb: string; description: string; pageTitle: string; index: number };

function page(href: string): Page {
  if (href === "/") {
    return {
      kicker: "Malba Tahan · 1938",
      title: HOME_TITLE,
      blurb: HOME_BLURB,
      description: HOME_DESCRIPTION,
      pageTitle: SITE_NAME,
      index: -1,
    };
  }
  const slug = href.replace(/^\/problema\//, "");
  const found = getProblem(slug);
  if (!found) throw new Error(`No problem for ${href}`);
  const { problem, index } = found;
  return {
    kicker: `Problema ${String(index + 1).padStart(2, "0")} · Malba Tahan`,
    title: problem.title,
    blurb: problem.tagline,
    description: problem.tagline,
    pageTitle: `${problem.title} — O Homem que Calculava`,
    index,
  };
}

export function pageMetadata(href: string): Metadata {
  const p = page(href);
  return {
    title: p.pageTitle,
    description: p.description,
    openGraph: {
      title: p.pageTitle,
      description: p.description,
      url: href,
      siteName: SITE_NAME,
      type: href === "/" ? "website" : "article",
      locale: "pt_BR",
    },
    twitter: { card: "summary_large_image", title: p.pageTitle, description: p.description },
  };
}

export function ogAlt(href: string) {
  const p = page(href);
  return `${p.title}: ${p.blurb} ${SITE_NAME}`;
}

/** Chessboard of the wheat legend: square n holds 2^(n-1) grains. */
function Chessboard({ accent, size }: { accent: string; size: number }) {
  const cell = size / 8;
  const squares = [];
  for (let n = 0; n < 64; n++) {
    const row = 7 - Math.floor(n / 8);
    const col = Math.floor(n / 8) % 2 === 0 ? n % 8 : 7 - (n % 8);
    const x = col * cell;
    const y = row * cell;
    const dark = (row + col) % 2 === 1;
    squares.push(<rect key={`s${n}`} x={x} y={y} width={cell} height={cell} fill={dark ? C.surface2 : C.surface} />);
    if (n < 6) {
      // literal grains for the first squares: 1, 2, 4, 8, 16, 32
      const count = 2 ** n;
      const per = Math.ceil(Math.sqrt(count));
      const gap = (cell - 12) / per;
      for (let g = 0; g < count; g++) {
        const gx = x + 6 + gap * (g % per) + gap / 2;
        const gy = y + 6 + gap * Math.floor(g / per) + gap / 2;
        squares.push(<ellipse key={`g${n}-${g}`} cx={gx} cy={gy} rx={Math.max(gap * 0.28, 1.4)} ry={Math.max(gap * 0.38, 1.9)} fill={accent} />);
      }
    } else {
      // beyond that, the pile only grows: fill by log2 share of the board
      const t = (n - 5) / 58;
      squares.push(
        <rect
          key={`f${n}`}
          x={x + 3}
          y={y + 3}
          width={cell - 6}
          height={cell - 6}
          rx={3}
          fill={accent}
          fillOpacity={0.12 + 0.88 * t * t}
        />,
      );
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {squares}
      <rect x={0.5} y={0.5} width={size - 1} height={size - 1} fill="none" stroke={C.line} strokeWidth={1} />
    </svg>
  );
}

function camel(key: number, x: number, y: number, s: number, fill: string) {
  return (
    <g key={key} transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      {/* body with a single hump, neck and head */}
      <path d="M8 40 C8 30 14 24 22 24 C26 12 40 10 46 22 C50 26 56 26 60 28 C64 22 66 14 70 10 C73 7 78 8 80 10 L84 12 C85 14 83 16 80 16 L76 16 C74 22 72 30 68 36 C66 42 62 44 58 45 L14 45 C10 45 8 43 8 40 Z" />
      {/* legs */}
      <rect x={14} y={42} width={4} height={26} rx={2} />
      <rect x={22} y={42} width={4} height={26} rx={2} />
      <rect x={48} y={42} width={4} height={26} rx={2} />
      <rect x={56} y={42} width={4} height={26} rx={2} />
      {/* tail */}
      <path d="M8 32 C4 36 3 42 4 48 L6 48 C6 42 7 37 10 34 Z" />
    </g>
  );
}

function Desert({ accent, count }: { accent: string; count: number }) {
  const w = 1200;
  const h = 170;
  const camels = Array.from({ length: count }, (_, i) => i);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={`M0 112 C 180 84, 380 92, 540 101 C 700 106, 900 104, 1040 99 S 1160 86, 1200 88 L1200 ${h} L0 ${h} Z`} fill={C.surface} />
      <path d={`M0 140 C 220 115, 420 120, 640 138 S 1000 150, 1200 128 L1200 ${h} L0 ${h} Z`} fill={C.surface2} />
      {camels.map((i) => (
        camel(i, 560 + i * 92, 38 + (i % 2) * 2, 0.95, i === count - 1 ? accent : "#3a3450")
      ))}
    </svg>
  );
}

function Stars() {
  let s = 1938;
  const rand = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const stars = Array.from({ length: 70 }, () => ({ x: rand() * 1200, y: rand() * 460, r: 0.6 + rand() * 1.4, o: 0.25 + rand() * 0.6 }));
  return (
    <svg width={1200} height={630} viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
      {stars.map((st, i) => (
        <circle key={i} cx={st.x} cy={st.y} r={st.r} fill={C.ink} fillOpacity={st.o} />
      ))}
    </svg>
  );
}

const font = (f: string) => readFile(join(process.cwd(), "assets/fonts", f));

export async function renderOg(href: string) {
  const [display, sans, mono] = await Promise.all([
    font("Fraunces-SemiBold.woff"),
    font("SourceSans3-Regular.woff"),
    font("GeistMono-Medium.woff"),
  ]);
  const p = page(href);
  const home = p.index < 0;
  const accent = home ? C.gold : ACCENTS[p.index % ACCENTS.length];
  const titleSize = home ? 80 : p.title.length > 20 ? 66 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: C.bg,
          color: C.ink,
          fontFamily: "Source Sans",
        }}
      >
        <Stars />
        <div style={{ position: "absolute", left: 0, bottom: 0, display: "flex" }}>
          <Desert accent={accent} count={home ? 5 : 3} />
        </div>
        <div style={{ position: "absolute", top: 60, right: 64, display: "flex" }}>
          <Chessboard accent={accent} size={320} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "60px 64px 0", width: 760 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "Geist Mono",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: accent,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 6, background: accent }} />
            {p.kicker}
          </div>
          <div
            style={{
              marginTop: 30,
              fontFamily: "Fraunces",
              fontSize: titleSize,
              lineHeight: 1.04,
              letterSpacing: -1.5,
            }}
          >
            {p.title}
          </div>
          <div style={{ marginTop: 22, fontSize: 30, lineHeight: 1.3, color: C.muted, maxWidth: 640 }}>{p.blurb}</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            bottom: 30,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Geist Mono",
            fontSize: 20,
            color: C.muted,
          }}
        >
          <span style={{ color: C.ink }}>O Homem que Calculava · visualizado</span>
          <span>homem-que-calculava.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Fraunces", data: display, weight: 600, style: "normal" },
        { name: "Source Sans", data: sans, weight: 400, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
