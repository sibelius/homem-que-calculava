"use client";

import { useState } from "react";
import { Button, Panel, Slider } from "@/components/ui";

const COLORS = ["var(--gold)", "var(--teal)", "var(--clay)", "var(--indigo)"];

function simulate(k: number) {
  const total = (k - 1) ** 2;
  const steps: { fixed: number; frac: number; left: number }[] = [];
  let left = total;
  for (let d = 1; left > 0; d++) {
    const afterFixed = left - d;
    const frac = afterFixed / k;
    steps.push({ fixed: d, frac, left: afterFixed - frac });
    left = afterFixed - frac;
  }
  return { total, steps };
}

export default function Pearls() {
  const [k, setK] = useState(7);
  const [step, setStep] = useState(0);
  const { total, steps } = simulate(k);
  const done = steps.slice(0, step);

  // Owner of each pearl: index of the daughter, or null if still in the chest.
  const owner: (number | null)[] = Array(total).fill(null);
  let pos = 0;
  done.forEach((s, d) => {
    for (let i = 0; i < s.fixed + s.frac; i++) owner[pos++] = d;
  });
  const current = steps[step - 1];
  const cols = Math.ceil(Math.sqrt(total));

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <Panel>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm text-muted">
            {total} pérolas · {step === 0 ? "no cofre" : `${step} de ${steps.length} filhas já escolheram`}
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setStep(0)} disabled={step === 0}>
              Recomeçar
            </Button>
            <Button onClick={() => setStep((s) => Math.min(steps.length, s + 1))} disabled={step === steps.length}>
              Próxima filha
            </Button>
          </div>
        </div>
        <svg viewBox={`0 0 ${cols * 30} ${Math.ceil(total / cols) * 30}`} className="mx-auto w-full max-w-md">
          {owner.map((o, i) => {
            const x = (i % cols) * 30 + 15;
            const y = Math.floor(i / cols) * 30 + 15;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={11}
                fill={o === null ? "var(--surface-2)" : COLORS[o % COLORS.length]}
                stroke="var(--line)"
                opacity={o === null ? 1 : 0.9}
                style={{ transition: "fill 0.4s" }}
              />
            );
          })}
        </svg>
        <p className="mt-3 min-h-12 font-mono text-sm">
          {current
            ? `Filha ${step}: pega ${current.fixed}, sobram ${current.frac * k}, pega 1/${k} disso = ${current.frac}. Total: ${current.fixed + current.frac}. Restam ${current.left}.`
            : `Cada filha leva n pérolas e 1/${k} do que sobrar.`}
        </p>
      </Panel>

      <Panel>
        <Slider
          label="A fração é 1/k, com k ="
          value={k}
          min={3}
          max={11}
          onChange={(v) => {
            setK(v);
            setStep(0);
          }}
        />
        <table className="mt-4 w-full font-mono text-sm">
          <thead className="text-left text-xs text-muted">
            <tr>
              <th className="font-normal">filha</th>
              <th className="font-normal">fixas</th>
              <th className="font-normal">1/{k} do resto</th>
              <th className="font-normal">total</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s, i) => (
              <tr key={i} style={{ opacity: i < step ? 1 : 0.35, color: COLORS[i % COLORS.length] }}>
                <td>{i + 1}</td>
                <td>{s.fixed}</td>
                <td>{s.frac}</td>
                <td>{s.fixed + s.frac}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-sm">
          Com 1/{k}: <b>{total}</b> pérolas = {k - 1} filhas × {k - 1} pérolas.
        </p>
      </Panel>
    </div>
  );
}
