"use client";

import { useState } from "react";
import { Button, Panel } from "@/components/ui";

function siamese(n: number) {
  const g = Array.from({ length: n }, () => Array(n).fill(0) as number[]);
  let r = 0;
  let c = Math.floor(n / 2);
  for (let k = 1; k <= n * n; k++) {
    g[r][c] = k;
    const nr = (r - 1 + n) % n;
    const nc = (c + 1) % n;
    if (g[nr][nc]) r = (r + 1) % n;
    else [r, c] = [nr, nc];
  }
  return g.flat();
}

const SQUARES = {
  "Lo Shu 3×3": [4, 9, 2, 3, 5, 7, 8, 1, 6],
  "Dürer 4×4": [16, 3, 2, 13, 5, 10, 11, 8, 9, 6, 7, 12, 4, 15, 14, 1],
  "5×5": siamese(5),
};
type Name = keyof typeof SQUARES;

type Line = { key: string; cells: number[] };

function linesFor(n: number): Line[] {
  const idx = (r: number, c: number) => r * n + c;
  const range = Array.from({ length: n }, (_, i) => i);
  return [
    ...range.map((r) => ({ key: `r${r}`, cells: range.map((c) => idx(r, c)) })),
    ...range.map((c) => ({ key: `c${c}`, cells: range.map((r) => idx(r, c)) })),
    { key: "d0", cells: range.map((i) => idx(i, i)) },
    { key: "d1", cells: range.map((i) => idx(i, n - 1 - i)) },
  ];
}

export default function MagicSquare() {
  const [name, setName] = useState<Name>("Lo Shu 3×3");
  const [grid, setGrid] = useState<number[]>(SQUARES["Lo Shu 3×3"]);
  const [hover, setHover] = useState<string | null>(null);
  const [picked, setPicked] = useState<number | null>(null);

  const n = Math.round(Math.sqrt(grid.length));
  const target = (n * (n * n + 1)) / 2;
  const lines = linesFor(n);
  const sums = Object.fromEntries(lines.map((l) => [l.key, l.cells.reduce((a, i) => a + grid[i], 0)]));
  const highlighted = new Set(lines.find((l) => l.key === hover)?.cells ?? []);
  const magic = lines.every((l) => sums[l.key] === target);

  const choose = (nm: Name) => {
    setName(nm);
    setGrid(SQUARES[nm]);
    setPicked(null);
  };

  const shuffle = () => {
    const g = [...grid];
    for (let i = g.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [g[i], g[j]] = [g[j], g[i]];
    }
    setGrid(g);
    setPicked(null);
  };

  const clickCell = (i: number) => {
    if (picked === null) return setPicked(i);
    const g = [...grid];
    [g[picked], g[i]] = [g[i], g[picked]];
    setGrid(g);
    setPicked(null);
  };

  const cell = 56;
  const size = n * cell;

  const sumTag = (k: string, x: number, y: number) => (
    <g key={k} onMouseEnter={() => setHover(k)} onMouseLeave={() => setHover(null)} style={{ cursor: "default" }}>
      <circle cx={x} cy={y} r={16} fill={hover === k ? "var(--ink)" : "transparent"} />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize={14}
        fontFamily="var(--font-geist-mono)"
        fill={hover === k ? "var(--bg)" : sums[k] === target ? "var(--good)" : "var(--bad)"}
      >
        {sums[k]}
      </text>
    </g>
  );

  return (
    <Panel>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SQUARES) as Name[]).map((nm) => (
            <button
              key={nm}
              type="button"
              onClick={() => choose(nm)}
              className="rounded-full border border-line px-3 py-1 text-sm hover:bg-surface-2"
              style={nm === name ? { background: "var(--ink)", color: "var(--bg)" } : undefined}
            >
              {nm}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => choose(name)}>
            Restaurar
          </Button>
          <Button onClick={shuffle}>Embaralhar</Button>
        </div>
      </div>

      <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
        <svg viewBox={`-40 -40 ${size + 80} ${size + 80}`} className="mx-auto w-full max-w-md">
          {grid.map((v, i) => {
            const r = Math.floor(i / n);
            const c = i % n;
            const on = highlighted.has(i);
            return (
              <g key={i} onClick={() => clickCell(i)} style={{ cursor: "pointer" }}>
                <rect
                  x={c * cell + 2}
                  y={r * cell + 2}
                  width={cell - 4}
                  height={cell - 4}
                  rx={8}
                  fill={picked === i ? "var(--clay)" : on ? "var(--gold)" : "var(--surface-2)"}
                  style={{ transition: "fill 0.2s" }}
                />
                <text
                  x={c * cell + cell / 2}
                  y={r * cell + cell / 2 + 7}
                  textAnchor="middle"
                  fontSize={20}
                  fontFamily="var(--font-fraunces)"
                  fill={on || picked === i ? "var(--bg)" : "var(--ink)"}
                >
                  {v}
                </text>
              </g>
            );
          })}
          {Array.from({ length: n }, (_, i) => (
            <g key={i}>
              {sumTag(`r${i}`, size + 22, i * cell + cell / 2)}
              {sumTag(`c${i}`, i * cell + cell / 2, size + 22)}
            </g>
          ))}
          {sumTag("d0", size + 22, size + 22)}
          {sumTag("d1", -22, size + 22)}
        </svg>

        <div>
          <div className="font-display text-5xl" style={{ color: magic ? "var(--good)" : "var(--muted)" }}>
            {target}
          </div>
          <p className="mt-1 text-sm text-muted">
            soma mágica = {n}({n}² + 1)/2
          </p>
          <p className="mt-4 text-sm" style={{ color: magic ? "var(--good)" : "var(--ink)" }}>
            {magic
              ? "Todas as linhas, colunas e diagonais somam o mesmo."
              : "Algumas somas estão erradas (em vermelho). Toque em dois números para trocá-los de lugar."}
          </p>
          <p className="mt-3 text-xs text-muted">
            Passe o mouse sobre uma soma para ver a linha que ela soma. O 5×5 foi gerado pelo método siamês: suba na
            diagonal e, se a casa estiver ocupada, desça uma.
          </p>
        </div>
      </div>
    </Panel>
  );
}
