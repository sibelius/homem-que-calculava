"use client";

import { useState } from "react";
import { Button, Legend, Panel, Slider, Stat } from "@/components/ui";

const HEIRS = [
  { label: "Mais velho · 1/2", frac: 1 / 2, color: "var(--gold)" },
  { label: "Do meio · 1/3", frac: 1 / 3, color: "var(--teal)" },
  { label: "Mais novo · 1/9", frac: 1 / 9, color: "var(--clay)" },
];

function Camel({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 24" className="h-7 w-9 pop" aria-hidden fill={color}>
      <ellipse cx={13} cy={10} rx={6} ry={5} />
      <rect x={5} y={10} width={17} height={6} rx={3} />
      <polygon points="19,14 24,4 27,5 23,15" />
      <rect x={24.5} y={2.5} width={6} height={3.5} rx={1.7} />
      {[7, 10, 17, 20].map((x) => (
        <rect key={x} x={x} y={14} width={1.8} height={9} rx={0.9} />
      ))}
    </svg>
  );
}

export default function Camels() {
  const [borrowed, setBorrowed] = useState(false);
  const [n, setN] = useState(35);

  const total = borrowed ? 36 : 35;
  const shares = HEIRS.map((h) => total * h.frac);
  const whole = borrowed;
  const given = whole ? shares.reduce((a, b) => a + b, 0) : 0;

  // Sequence of camel owners for the grid.
  const owners: (number | "left" | "beremiz")[] = [];
  if (whole) {
    shares.forEach((s, i) => {
      for (let k = 0; k < s; k++) owners.push(i);
    });
    owners.push("beremiz", "left");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <Panel>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Legend
            items={[
              ...HEIRS.map((h) => ({ color: h.color, label: h.label })),
              { color: "var(--indigo)", label: "Beremiz" },
            ]}
          />
          <Button onClick={() => setBorrowed((b) => !b)}>
            {borrowed ? "Recomeçar" : "Emprestar o camelo de Beremiz"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          {whole
            ? owners.map((o, i) => (
                <Camel
                  key={`${i}-${String(o)}`}
                  color={typeof o === "number" ? HEIRS[o].color : "var(--indigo)"}
                />
              ))
            : Array.from({ length: 35 }, (_, i) => <Camel key={i} color="var(--muted)" />)}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {HEIRS.map((h, i) => (
            <Stat
              key={h.label}
              label={h.label.split(" · ")[0]}
              value={whole ? shares[i] : shares[i].toFixed(2).replace(".", ",")}
              tone={h.color}
            />
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          {whole
            ? `Divididos: ${given}. Sobram 2 — um volta a Beremiz e o outro fica como pagamento.`
            : "Com 35 camelos as partes não são inteiras: ninguém quer meio camelo."}
        </p>
      </Panel>

      <Panel>
        <h3 className="font-display text-lg">A parte que o pai esqueceu</h3>
        <p className="mb-4 text-sm text-muted">Cada faixa é uma fração da herança. Elas não completam o todo.</p>
        <svg viewBox="0 0 360 60" className="w-full">
          {(() => {
            let x = 0;
            return HEIRS.map((h) => {
              const w = h.frac * 360;
              const r = <rect key={h.label} x={x} y={10} width={w - 2} height={40} rx={4} fill={h.color} />;
              x += w;
              return r;
            });
          })()}
          <rect
            x={(17 / 18) * 360}
            y={10}
            width={360 / 18}
            height={40}
            rx={4}
            fill="none"
            stroke="var(--ink)"
            strokeDasharray="3 3"
          />
        </svg>
        <p className="mt-2 font-mono text-sm">1/2 + 1/3 + 1/9 = 17/18 · falta 1/18</p>

        <div className="mt-6">
          <Slider label="Tamanho do rebanho" value={n} min={17} max={72} onChange={setN} />
          <table className="mt-3 w-full font-mono text-sm">
            <thead className="text-left text-xs text-muted">
              <tr>
                <th className="font-normal">camelos</th>
                <th className="font-normal">1/2</th>
                <th className="font-normal">1/3</th>
                <th className="font-normal">1/9</th>
                <th className="font-normal">sobra</th>
              </tr>
            </thead>
            <tbody>
              {[n, n + 1].map((m) => {
                const parts = HEIRS.map((h) => m * h.frac);
                const ok = parts.every((p) => Number.isInteger(p));
                const rest = m - parts.reduce((a, b) => a + b, 0);
                const f = (v: number) => (Number.isInteger(v) ? v : v.toFixed(2).replace(".", ","));
                return (
                  <tr key={m} style={{ color: ok ? "var(--good)" : undefined }}>
                    <td>{m}</td>
                    {parts.map((p, i) => (
                      <td key={i}>{f(p)}</td>
                    ))}
                    <td>{f(rest)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-muted">
            As partes ficam inteiras quando o rebanho mais o camelo emprestado é múltiplo de 18. Com 17 camelos, Beremiz só recebe o dele de volta; com 35, ganha 1; com 53, ganha 2.
          </p>
        </div>
      </Panel>
    </div>
  );
}
