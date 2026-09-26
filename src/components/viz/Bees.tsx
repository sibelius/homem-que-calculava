"use client";

import { useState } from "react";
import { Legend, Panel, Slider } from "@/components/ui";

const parts = (x: number) => [Math.sqrt(x / 2), (8 * x) / 9, 2];
const PART_LABELS = ["√(x/2) no jasmineiro", "8/9 ficaram para trás", "2 na flor de lótus"];
const PART_COLORS = ["var(--teal)", "var(--gold)", "var(--clay)"];
const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(2).replace(".", ","));

const XMAX = 150;
const PW = 320;
const PH = 200;
const sx = (x: number) => 30 + (x / XMAX) * (PW - 40);
const YMIN = -7;
const YMAX = 4;
const sy = (y: number) => 10 + ((YMAX - y) / (YMAX - YMIN)) * (PH - 30);
const gap = (x: number) => parts(x).reduce((a, b) => a + b, 0) - x;

export default function Bees() {
  const [x, setX] = useState(40);
  const ps = parts(x);
  const sum = ps.reduce((a, b) => a + b, 0);
  const diff = sum - x;
  const solved = Math.abs(diff) < 1e-9;
  const scale = 440 / Math.max(x, sum, 1);

  const curve = Array.from({ length: 151 }, (_, i) => `${i === 0 ? "M" : "L"}${sx(i)},${sy(gap(i))}`).join(" ");

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <Panel>
        <Legend items={PART_LABELS.map((l, i) => ({ label: l, color: PART_COLORS[i] }))} />
        <svg viewBox="0 0 500 120" className="mt-4 w-full">
          <text x={0} y={22} fontSize={12} fill="var(--muted)">
            partes
          </text>
          {(() => {
            let off = 50;
            return ps.map((p, i) => {
              const w = p * scale;
              const r = <rect key={i} x={off} y={8} width={Math.max(w - 1, 0)} height={24} fill={PART_COLORS[i]} style={{ transition: "all 0.2s" }} />;
              off += w;
              return r;
            });
          })()}
          <text x={0} y={62} fontSize={12} fill="var(--muted)">
            enxame
          </text>
          <rect x={50} y={48} width={x * scale} height={24} fill="var(--ink)" opacity={0.8} style={{ transition: "all 0.2s" }} />
          <text x={50} y={100} fontSize={14} fontFamily="var(--font-geist-mono)" fill={solved ? "var(--good)" : "var(--ink)"}>
            {fmt(ps[0])} + {fmt(ps[1])} + 2 = {fmt(sum)} {solved ? "=" : diff > 0 ? ">" : "<"} {x}
          </text>
        </svg>

        {solved ? (
          <div className="mt-2 flex flex-wrap gap-4">
            {[6, 64, 2].map((n, g) => (
              <div key={g} className="flex max-w-[16rem] flex-wrap gap-0.5">
                {Array.from({ length: n }, (_, i) => (
                  <span key={i} className="pop text-base leading-none" style={{ animationDelay: `${i * 8}ms`, color: PART_COLORS[g] }}>
                    ●
                  </span>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted">
            {diff > 0 ? "As partes passam do enxame: tente um número maior." : "As partes não completam o enxame: tente um número menor."}
          </p>
        )}
        <div className="mt-4">
          <Slider label="Tamanho do enxame (x)" value={x} min={2} max={XMAX} step={2} onChange={setX} />
        </div>
      </Panel>

      <Panel>
        <h3 className="font-display text-lg">Partes − enxame</h3>
        <svg viewBox={`0 0 ${PW} ${PH}`} className="mt-2 w-full">
          <rect x={sx(0)} y={sy(YMAX)} width={sx(XMAX) - sx(0)} height={sy(0) - sy(YMAX)} fill="var(--clay)" opacity={0.08} />
          <line x1={sx(0)} y1={sy(0)} x2={sx(XMAX)} y2={sy(0)} stroke="var(--ink)" strokeDasharray="4 3" />
          <line x1={sx(0)} y1={sy(YMIN)} x2={sx(0)} y2={sy(YMAX)} stroke="var(--line)" />
          <path d={curve} fill="none" stroke="var(--gold)" strokeWidth={2.5} />
          <line x1={sx(x)} x2={sx(x)} y1={sy(YMIN)} y2={sy(YMAX)} stroke="var(--clay)" />
          <circle cx={sx(x)} cy={sy(gap(x))} r={4} fill={solved ? "var(--good)" : "var(--clay)"} />
          <circle cx={sx(72)} cy={sy(0)} r={4} fill="none" stroke="var(--good)" strokeWidth={2} />
          <text x={sx(72)} y={sy(0) - 10} fontSize={11} textAnchor="middle" fill="var(--good)">
            72
          </text>
          <text x={sx(XMAX)} y={sy(YMAX) + 12} fontSize={10} textAnchor="end" fill="var(--muted)">
            partes demais
          </text>
          <text x={sx(XMAX)} y={sy(YMIN) - 4} fontSize={10} textAnchor="end" fill="var(--muted)">
            partes de menos
          </text>
          {[0, 50, 100, 150].map((t) => (
            <text key={t} x={sx(t)} y={PH - 4} fontSize={10} textAnchor="middle" fill="var(--muted)">
              {t}
            </text>
          ))}
        </svg>
        <p className="mt-2 text-sm text-muted">
          A curva mede quanto as partes passam (ou faltam) do enxame. Ela só cruza o zero em 72. Com x = 2y², a
          equação vira 2y² − 9y − 18 = 0, cuja única raiz positiva é y = 6.
        </p>
      </Panel>
    </div>
  );
}
