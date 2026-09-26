"use client";

import { useState } from "react";
import { Legend, Panel, Slider, Stat } from "@/components/ui";

const SISTERS = [
  { name: "Primeira irmã", apples: 50 },
  { name: "Segunda irmã", apples: 30 },
  { name: "Terceira irmã", apples: 10 },
];

const revenue = (n: number, m: number, p: number) => Math.floor(n / m) + (n % m) * p;

const SOLUTIONS: [number, number][] = [];
for (let m = 2; m <= 30; m++)
  for (let p = 1; p <= 30; p++) {
    const r = SISTERS.map((s) => revenue(s.apples, m, p));
    if (r.every((x) => x === r[0])) SOLUTIONS.push([m, p]);
  }

export default function Apples() {
  const [m, setM] = useState(7);
  const [p, setP] = useState(3);
  const rev = SISTERS.map((s) => revenue(s.apples, m, p));
  const equal = rev.every((r) => r === rev[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      <Panel>
        <Legend
          items={[
            { color: "var(--gold)", label: `Manhã: ${m} maçãs por 1 dinar` },
            { color: "var(--clay)", label: `Tarde: ${p} dinares por maçã` },
          ]}
        />
        <div className="mt-4 space-y-5">
          {SISTERS.map((s, si) => {
            const bundles = Math.floor(s.apples / m);
            const rest = s.apples % m;
            return (
              <div key={s.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>
                    {s.name} · {s.apples} maçãs
                  </span>
                  <span className="font-mono">
                    {bundles} + {rest}×{p} = <b style={{ color: equal ? "var(--good)" : undefined }}>{rev[si]}</b> dinares
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: bundles }, (_, b) => (
                    <div key={b} className="flex gap-px rounded-md border border-gold/60 p-0.5" title={`${m} maçãs → 1 dinar`}>
                      {Array.from({ length: m }, (_, a) => (
                        <span key={a} className="inline-block size-2 rounded-full bg-gold" />
                      ))}
                    </div>
                  ))}
                  {Array.from({ length: rest }, (_, a) => (
                    <span key={a} className="inline-block size-4 self-center rounded-full bg-clay" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 font-medium" style={{ color: equal ? "var(--good)" : "var(--muted)" }}>
          {equal ? `As três voltam com ${rev[0]} dinares.` : "Os valores não batem. Ajuste os preços."}
        </p>
      </Panel>

      <Panel>
        <div className="space-y-3">
          <Slider label="Maçãs por dinar (manhã)" value={m} min={2} max={30} onChange={setM} />
          <Slider label="Dinares por maçã (tarde)" value={p} min={1} max={30} onChange={setP} />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {rev.map((r, i) => (
            <Stat key={i} label={`${SISTERS[i].apples} maçãs`} value={r} tone={equal ? "var(--good)" : undefined} />
          ))}
        </div>
        <h4 className="mt-5 text-sm font-medium">Outros preços que também funcionam</h4>
        <div className="mt-2 flex flex-wrap gap-1">
          {SOLUTIONS.map(([sm, sp]) => (
            <button
              key={`${sm}-${sp}`}
              type="button"
              onClick={() => {
                setM(sm);
                setP(sp);
              }}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-xs hover:bg-surface-2"
              style={sm === m && sp === p ? { background: "var(--ink)", color: "var(--bg)" } : undefined}
            >
              {sm} por 1 · {sp} cada
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}
