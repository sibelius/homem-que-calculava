"use client";

import { useState } from "react";
import { Panel } from "@/components/ui";

function divisors(n: number) {
  const out: number[] = [];
  for (let d = 1; d <= n / 2; d++) if (n % d === 0) out.push(d);
  return out;
}
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

const PRESETS = [220, 284, 1184, 2620, 5020, 6232, 6, 28, 496, 12, 100];
const PALETTE = ["var(--gold)", "var(--teal)", "var(--clay)", "var(--indigo)"];

function DivisorBar({ n, scale, label }: { n: number; scale: number; label: string }) {
  const ds = divisors(n);
  const total = sum(ds);
  let x = 0;
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>
          Divisores próprios de <b className="font-mono">{n}</b>
        </span>
        <span className="font-mono">
          soma = <b>{total}</b> {label}
        </span>
      </div>
      <svg viewBox="0 0 600 44" className="w-full overflow-visible">
        {ds.map((d, i) => {
          const w = (d / scale) * 600;
          const r = (
            <g key={d}>
              <rect x={x} y={4} width={Math.max(w - 1, 0.5)} height={24} fill={PALETTE[i % PALETTE.length]} rx={2}>
                <title>{d}</title>
              </rect>
              {w > 22 && (
                <text x={x + w / 2} y={21} textAnchor="middle" fontSize={11} fill="var(--bg)" fontFamily="var(--font-geist-mono)">
                  {d}
                </text>
              )}
            </g>
          );
          x += w;
          return r;
        })}
        <line x1={(n / scale) * 600} x2={(n / scale) * 600} y1={0} y2={34} stroke="var(--ink)" strokeWidth={2} />
        <text x={(n / scale) * 600} y={44} textAnchor="middle" fontSize={10} fill="var(--muted)">
          {n}
        </text>
      </svg>
    </div>
  );
}

export default function Amicable() {
  const [n, setN] = useState(220);
  const safe = Math.min(Math.max(2, n || 2), 20000);
  const s = sum(divisors(safe));
  const s2 = s > 1 && s <= 40000 ? sum(divisors(s)) : 0;
  const perfect = s === safe;
  const amicable = !perfect && s2 === safe;
  const scale = Math.max(safe, s, s2) * 1.02;

  const verdict = perfect
    ? { text: `${safe} é perfeito: seus divisores somam ele mesmo.`, color: "var(--gold)" }
    : amicable
      ? { text: `${safe} e ${s} são números amigos.`, color: "var(--good)" }
      : s > safe
        ? { text: `${safe} é abundante: seus divisores passam dele. Não tem par.`, color: "var(--muted)" }
        : { text: `${safe} é deficiente: seus divisores não chegam nele. Não tem par.`, color: "var(--muted)" };

  return (
    <Panel>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="number"
          value={n}
          min={2}
          max={20000}
          onChange={(e) => setN(Number(e.target.value))}
          className="w-28 rounded-lg border border-line bg-bg px-3 py-1.5 font-mono outline-none focus:border-gold"
        />
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setN(p)}
            className="rounded-full border border-line px-3 py-1 font-mono text-sm hover:bg-surface-2"
            style={p === safe ? { background: "var(--ink)", color: "var(--bg)" } : undefined}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <DivisorBar n={safe} scale={scale} label={perfect ? "= ele mesmo" : amicable ? "→ o amigo" : ""} />
        {!perfect && s > 1 && s <= 40000 && <DivisorBar n={s} scale={scale} label={amicable ? `→ volta a ${safe}` : ""} />}
      </div>

      <p className="mt-4 font-medium" style={{ color: verdict.color }}>
        {verdict.text}
      </p>
      <p className="mt-1 text-xs text-muted">
        A linha preta marca o próprio número. Nos amigos, os blocos de um chegam exatamente na linha do outro.
      </p>
    </Panel>
  );
}
