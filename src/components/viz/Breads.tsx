"use client";

import { useState } from "react";
import { Button, Legend, Panel, Slider, Stat } from "@/components/ui";

const STEPS = [
  "Beremiz tem 5 pães, o amigo tem 3.",
  "Cada pão é cortado em 3 pedaços: 24 pedaços.",
  "Cada um come 8 pedaços. Os pedaços contornados foram comidos pelo xeque.",
  "As 8 moedas pagam os 8 pedaços que o xeque comeu.",
];

type Slice = { owner: "b" | "a"; eater: "b" | "a" | "x" };

function buildSlices(): Slice[][] {
  const loaves: Slice[][] = [];
  let bEaten = 0;
  let aEaten = 0;
  for (let i = 0; i < 8; i++) {
    const owner = i < 5 ? "b" : "a";
    const loaf: Slice[] = [];
    for (let k = 0; k < 3; k++) {
      let eater: Slice["eater"] = "x";
      if (owner === "b" && bEaten < 8) {
        eater = "b";
        bEaten++;
      } else if (owner === "a" && aEaten < 8) {
        eater = "a";
        aEaten++;
      }
      loaf.push({ owner, eater });
    }
    loaves.push(loaf);
  }
  return loaves;
}

const LOAVES = buildSlices();
const color = { b: "var(--gold)", a: "var(--teal)", x: "var(--clay)" };

export default function Breads() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);

  const each = (a + b) / 3;
  const pay = a + b;
  const beremizGets = 2 * a - b;
  const friendGets = 2 * b - a;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <Panel>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Legend
            items={[
              { color: color.b, label: "Pão de Beremiz" },
              { color: color.a, label: "Pão do amigo" },
              { color: color.x, label: "Comido pelo xeque" },
            ]}
          />
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              ←
            </Button>
            <Button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}>
              Próximo passo
            </Button>
          </div>
        </div>

        <svg viewBox="0 0 400 190" className="w-full">
          {LOAVES.map((loaf, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 10 + col * 97;
            const y = 10 + row * 70;
            const gap = step >= 1 ? 4 : 0;
            const w = (84 - gap * 2) / 3;
            return (
              <g key={i}>
                {loaf.map((s, k) => {
                  const sx = x + k * (w + gap);
                  const eaten = step >= 2;
                  const byX = eaten && s.eater === "x";
                  return (
                    <rect
                      key={k}
                      x={sx}
                      y={y}
                      width={w}
                      height={50}
                      rx={step >= 1 ? 6 : 2}
                      fill={color[s.owner]}
                      opacity={eaten && !byX ? 0.35 : 1}
                      stroke={byX ? color.x : "none"}
                      strokeWidth={byX ? 4 : 0}
                      style={{ transition: "all 0.4s" }}
                    />
                  );
                })}
              </g>
            );
          })}
          {step >= 3 && (
            <g>
              {Array.from({ length: 8 }, (_, i) => (
                <g key={i} className="pop" style={{ animationDelay: `${i * 60}ms` }}>
                  <circle cx={30 + i * 45} cy={170} r={13} fill={i < 7 ? color.b : color.a} />
                  <text x={30 + i * 45} y={175} textAnchor="middle" fontSize={12} fill="var(--bg)" fontWeight={700}>
                    1
                  </text>
                </g>
              ))}
            </g>
          )}
        </svg>
        <p className="mt-3 min-h-12 text-sm">{STEPS[step]}</p>
        {step >= 2 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            <Stat label="Beremiz deu ao xeque" value="15 − 8 = 7" tone={color.b} />
            <Stat label="Amigo deu ao xeque" value="9 − 8 = 1" tone={color.a} />
            <Stat label="Moedas" value={step >= 3 ? "7 : 1" : "?"} />
          </div>
        )}
      </Panel>

      <Panel>
        <h3 className="font-display text-lg">E com outros números?</h3>
        <p className="mb-4 text-sm text-muted">O xeque paga uma moeda por pão, como no livro.</p>
        <div className="space-y-3">
          <Slider label="Pães de Beremiz" value={a} min={1} max={12} onChange={setA} />
          <Slider label="Pães do amigo" value={b} min={1} max={12} onChange={setB} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Stat label="Cada um come" value={`${Number.isInteger(each) ? each : each.toFixed(2).replace(".", ",")} pães`} />
          <Stat label="O xeque paga" value={`${pay} moedas`} />
          <Stat label="Beremiz recebe" value={beremizGets} tone={beremizGets < 0 ? "var(--bad)" : color.b} />
          <Stat label="O amigo recebe" value={friendGets} tone={friendGets < 0 ? "var(--bad)" : color.a} />
        </div>
        <p className="mt-3 font-mono text-sm">Beremiz: 2a − b · amigo: 2b − a</p>
        <p className="mt-2 text-xs text-muted">
          Se o resultado é negativo, essa pessoa comeu mais pão do que levou e é ela quem deve ao outro. A divisão
          ingênua ({a} : {b}) só é justa quando os dois levam a mesma quantidade.
        </p>
      </Panel>
    </div>
  );
}
