"use client";

import { useState } from "react";
import { Legend, Panel, Slider, Stat } from "@/components/ui";

const split = (n: number) => [Math.floor(n / 100), n % 100] as const;
const FOUND = Array.from({ length: 9000 }, (_, i) => i + 1000).filter((n) => {
  const [a, b] = split(n);
  return (a + b) ** 2 === n;
});

export default function Square3025() {
  const [n, setN] = useState(3025);
  const [a, b] = split(n);
  const s = a + b;
  const sq = s * s;
  const ok = sq === n;
  const size = 300;
  const u = size / s;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <Panel>
        <Legend
          items={[
            { color: "var(--gold)", label: `${a}²` },
            { color: "var(--teal)", label: `2 × ${a} × ${b}` },
            { color: "var(--clay)", label: `${b}²` },
          ]}
        />
        <svg viewBox={`-30 -10 ${size + 40} ${size + 40}`} className="mt-3 w-full max-w-sm">
          <rect x={0} y={0} width={a * u} height={a * u} fill="var(--gold)" />
          <rect x={a * u} y={0} width={b * u} height={a * u} fill="var(--teal)" opacity={0.85} />
          <rect x={0} y={a * u} width={a * u} height={b * u} fill="var(--teal)" opacity={0.85} />
          <rect x={a * u} y={a * u} width={b * u} height={b * u} fill="var(--clay)" />
          <rect x={0} y={0} width={size} height={size} fill="none" stroke="var(--ink)" />
          <text x={(a * u) / 2} y={size + 18} fontSize={13} textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-geist-mono)">
            {a}
          </text>
          <text x={a * u + (b * u) / 2} y={size + 18} fontSize={13} textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-geist-mono)">
            {b}
          </text>
          <text x={-8} y={(a * u) / 2} fontSize={13} textAnchor="end" fill="var(--muted)" fontFamily="var(--font-geist-mono)">
            {a}
          </text>
          <text x={-8} y={a * u + (b * u) / 2} fontSize={13} textAnchor="end" fill="var(--muted)" fontFamily="var(--font-geist-mono)">
            {b}
          </text>
        </svg>
      </Panel>

      <Panel>
        <div className="flex flex-wrap gap-2">
          {FOUND.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setN(f)}
              className="rounded-full border border-line px-3 py-1 font-mono hover:bg-surface-2"
              style={f === n ? { background: "var(--ink)", color: "var(--bg)" } : undefined}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <Slider label="Ou teste qualquer número" value={n} min={1000} max={9999} onChange={setN} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Stat label="Metades" value={`${a} + ${String(b).padStart(2, "0")} = ${s}`} />
          <Stat label={`${s}²`} value={sq.toLocaleString("pt-BR")} tone={ok ? "var(--good)" : "var(--bad)"} />
        </div>
        <p className="mt-3 font-medium" style={{ color: ok ? "var(--good)" : "var(--muted)" }}>
          {ok ? `${n} = (${a} + ${String(b).padStart(2, "0")})² ✓` : `${sq.toLocaleString("pt-BR")} ≠ ${n.toLocaleString("pt-BR")}`}
        </p>
        <p className="mt-3 text-sm text-muted">
          O computador testou os 9.000 números de 1000 a 9999 e só estes {FOUND.length} passaram. O quadrado é a
          conta (a + b)² = a² + 2ab + b² desenhada.
        </p>
      </Panel>
    </div>
  );
}
