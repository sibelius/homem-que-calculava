"use client";

import { useId, useState } from "react";
import { Button, Panel } from "@/components/ui";

type Fill = 1 | 0.5 | 0;
const HEIRS = [
  { name: "Herdeiro 1", color: "var(--gold)" },
  { name: "Herdeiro 2", color: "var(--teal)" },
  { name: "Herdeiro 3", color: "var(--clay)" },
];

const VASES: Fill[] = [...Array(7).fill(1), ...Array(7).fill(0.5), ...Array(7).fill(0)];

// 2 full, 3 half, 2 empty · 2 full, 3 half, 2 empty · 3 full, 1 half, 3 empty
const SOLUTION: number[] = [0, 0, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 0, 0, 1, 1, 2, 2, 2];

function Vase({ fill, color, onClick }: { fill: Fill; color?: string; onClick: () => void }) {
  const h = 44 * fill;
  const id = `clip${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-lg p-1 transition hover:bg-surface-2"
      aria-label={fill === 1 ? "vaso cheio" : fill === 0.5 ? "vaso meio cheio" : "vaso vazio"}
    >
      <svg viewBox="0 0 36 56" className="h-12 w-8">
        <defs>
          <clipPath id={id}>
            <path d="M12 4h12v6c6 3 9 9 9 18 0 14-6 24-15 24S3 42 3 28c0-9 3-15 9-18z" />
          </clipPath>
        </defs>
        <rect x={0} y={52 - h} width={36} height={h} fill="#7b1e3a" clipPath={`url(#${id})`} />
        <path
          d="M12 4h12v6c6 3 9 9 9 18 0 14-6 24-15 24S3 42 3 28c0-9 3-15 9-18z"
          fill="none"
          stroke={color ?? "var(--muted)"}
          strokeWidth={color ? 3 : 1.5}
        />
      </svg>
    </button>
  );
}

export default function Vases() {
  const [owner, setOwner] = useState<(number | null)[]>(() => VASES.map(() => null));

  const cycle = (i: number) =>
    setOwner((o) => o.map((v, k) => (k !== i ? v : v === null ? 0 : v === 2 ? null : v + 1)));

  const tally = HEIRS.map((_, h) => {
    const mine = VASES.filter((_, i) => owner[i] === h);
    return {
      count: mine.length,
      wine: mine.reduce<number>((a, b) => a + b, 0),
      full: mine.filter((v) => v === 1).length,
      half: mine.filter((v) => v === 0.5).length,
      empty: mine.filter((v) => v === 0).length,
    };
  });
  const assigned = owner.every((o) => o !== null);
  const solved = assigned && tally.every((t) => t.count === 7 && t.wine === 3.5);

  return (
    <Panel>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">Toque num vaso para entregá-lo a um herdeiro (toque de novo para trocar).</p>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setOwner(VASES.map(() => null))}>
            Limpar
          </Button>
          <Button onClick={() => setOwner(SOLUTION)}>Mostrar solução</Button>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {(["Cheios", "Meio cheios", "Vazios"] as const).map((label, g) => (
          <div key={label} className="rounded-xl border border-line bg-bg p-2">
            <div className="px-1 text-xs text-muted">{label}</div>
            <div className="flex flex-wrap">
              {VASES.slice(g * 7, g * 7 + 7).map((v, k) => {
                const i = g * 7 + k;
                const o = owner[i];
                return <Vase key={i} fill={v} color={o === null ? undefined : HEIRS[o].color} onClick={() => cycle(i)} />;
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {HEIRS.map((h, i) => {
          const t = tally[i];
          const ok = t.count === 7 && t.wine === 3.5;
          return (
            <div key={h.name} className="rounded-xl border-2 p-3" style={{ borderColor: h.color }}>
              <div className="font-medium" style={{ color: h.color }}>
                {h.name}
              </div>
              <div className="mt-1 font-mono text-sm">
                {t.count}/7 vasos · {String(t.wine).replace(".", ",")}/3,5 de vinho {ok ? "✓" : ""}
              </div>
              <div className="text-xs text-muted">
                {t.full} cheios · {t.half} meios · {t.empty} vazios
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-sm font-medium" style={{ color: solved ? "var(--good)" : "var(--muted)" }}>
        {solved
          ? "Divisão perfeita: 7 vasos e 3,5 vasos de vinho para cada um."
          : assigned
            ? "Todos os vasos foram entregues, mas a divisão ainda não é justa."
            : `${owner.filter((o) => o === null).length} vasos sem dono.`}
      </p>
    </Panel>
  );
}
