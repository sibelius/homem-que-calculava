"use client";

import { useState } from "react";
import { Button, Panel, Slider, Stat } from "@/components/ui";

const fmt = (n: bigint) => n.toLocaleString("pt-BR");
const grains = (square: number) => 1n << BigInt(square - 1);
const upTo = (square: number) => (1n << BigInt(square)) - 1n;

// ~0,05 g por grão; produção mundial de trigo ~800 milhões de toneladas/ano.
function tonnes(n: bigint) {
  return Number(n) * 0.05e-6;
}

export default function Chess() {
  const [k, setK] = useState(10);
  const [hover, setHover] = useState<number | null>(null);
  const [log, setLog] = useState(false);

  const focus = hover ?? k;
  const total = upTo(k);
  const t = tonnes(total);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <Panel>
        <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-lg border border-line">
          {Array.from({ length: 64 }, (_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            // Numbering snakes from the bottom-left corner like the legend is usually told.
            const r = 7 - row;
            const square = r * 8 + (r % 2 === 0 ? col : 7 - col) + 1;
            const filled = square <= k;
            const intensity = (square - 1) / 63;
            const dark = (row + col) % 2 === 1;
            return (
              <button
                type="button"
                key={i}
                onMouseEnter={() => setHover(square)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setK(square)}
                className="relative flex items-center justify-center font-mono text-[10px] sm:text-xs"
                style={{
                  background: filled
                    ? `color-mix(in srgb, var(--gold) ${25 + intensity * 75}%, var(--surface))`
                    : dark
                      ? "var(--surface-2)"
                      : "var(--surface)",
                  outline: focus === square ? "2px solid var(--ink)" : undefined,
                  outlineOffset: -2,
                  color: filled && intensity > 0.55 ? "var(--bg)" : "var(--muted)",
                }}
              >
                {square}
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <Slider label="Encher até a casa" value={k} min={1} max={64} onChange={setK} />
        </div>
      </Panel>

      <div className="flex flex-col gap-4">
        <Panel>
          <div className="grid gap-2">
            <Stat label={`Grãos na casa ${focus}`} value={`2^${focus - 1} = ${fmt(grains(focus))}`} />
            <Stat label={`Total até a casa ${k}`} value={fmt(total)} tone="var(--gold)" />
            <Stat
              label="Peso aproximado (0,05 g por grão)"
              value={
                t < 1
                  ? `${(t * 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} g`
                  : `${t.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} t`
              }
            />
          </div>
          {k === 64 && (
            <p className="mt-3 text-sm">
              Cerca de {Math.round(t / 800e6).toLocaleString("pt-BR")} anos da produção mundial de trigo de hoje
              (~800 milhões de toneladas por ano).
            </p>
          )}
        </Panel>

        <Panel>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-lg">Grãos por casa</h3>
            <Button variant="ghost" onClick={() => setLog((l) => !l)}>
              {log ? "Escala logarítmica" : "Escala linear"}
            </Button>
          </div>
          <svg viewBox="0 0 320 140" className="w-full">
            {Array.from({ length: 64 }, (_, i) => {
              const sq = i + 1;
              const v = log ? (sq - 1) / 63 : sq > k ? 0 : Math.pow(2, sq - k);
              const h = Math.max(0.5, Math.min(1, v) * 130);
              return (
                <rect
                  key={sq}
                  x={i * 5}
                  y={135 - h}
                  width={4}
                  height={h}
                  fill={sq <= k ? "var(--gold)" : "var(--line)"}
                  opacity={sq === focus ? 1 : 0.85}
                  style={{ transition: "all 0.3s" }}
                />
              );
            })}
          </svg>
          <p className="mt-2 text-xs text-muted">
            {log
              ? "Em escala logarítmica, dobrar vira um degrau fixo: uma rampa reta."
              : `Em escala linear, com a casa ${k} no topo, todas as casas antes dela quase somem. Cada casa tem mais grãos que todas as anteriores somadas.`}
          </p>
        </Panel>
      </div>
    </div>
  );
}
