"use client";

import { useState } from "react";
import { Button, Panel, Slider, Stat } from "@/components/ui";

const TOTAL = 50;
const W = 500;
const u = W / TOTAL;

export default function Debt() {
  const [first, setFirst] = useState([20, 15, 9]);

  const paidSoFar = first.reduce((a, b) => a + b, 0);
  const payments = [...first, TOTAL - paidSoFar];
  const remaining: number[] = [];
  payments.reduce((left, p) => {
    remaining.push(left - p);
    return left - p;
  }, TOTAL);
  const remSum = remaining.reduce((a, b) => a + b, 0);

  const setAt = (i: number, v: number) =>
    setFirst((f) => {
      const next = [...f];
      next[i] = v;
      // Keep the total at 50 by trimming later installments.
      let over = next.reduce((a, b) => a + b, 0) - TOTAL;
      for (let k = next.length - 1; k >= 0 && over > 0; k--) {
        if (k === i) continue;
        const cut = Math.min(next[k], over);
        next[k] -= cut;
        over -= cut;
      }
      return next;
    });

  // Lay the leftovers end to end, wrapping every 50 so the overflow stays visible.
  const wrapped: { x: number; w: number; row: number; i: number }[] = [];
  let pos = 0;
  remaining.forEach((r, i) => {
    let left = r;
    while (left > 0) {
      const row = Math.floor(pos / TOTAL);
      const x = pos % TOTAL;
      const w = Math.min(left, TOTAL - x);
      wrapped.push({ x, w, row, i });
      pos += w;
      left -= w;
    }
  });
  const lastRow = Math.max(0, Math.ceil(pos / TOTAL) - 1);
  const height = 270 + lastRow * 36;

  let cum = 0;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      <Panel>
        <svg viewBox={`0 0 ${W + 90} ${height}`} className="w-full">
          <text x={0} y={12} fontSize={12} fill="var(--muted)">
            Cada linha é a mesma dívida de 50, depois de mais um pagamento
          </text>
          {payments.map((p, i) => {
            const y = 26 + i * 44;
            const x0 = cum * u;
            cum += p;
            return (
              <g key={i}>
                <rect x={0} y={y} width={x0} height={30} fill="var(--gold)" opacity={0.25} />
                <rect x={x0} y={y} width={p * u} height={30} fill="var(--gold)" style={{ transition: "all 0.3s" }} />
                <rect
                  x={cum * u}
                  y={y}
                  width={remaining[i] * u}
                  height={30}
                  fill="var(--clay)"
                  style={{ transition: "all 0.3s" }}
                />
                <text x={W + 8} y={y + 20} fontSize={13} fontFamily="var(--font-geist-mono)" fill="var(--ink)">
                  {p} | {remaining[i]}
                </text>
              </g>
            );
          })}
          <line x1={W} x2={W} y1={20} y2={height} stroke="var(--ink)" strokeDasharray="3 3" />
          <text x={0} y={218} fontSize={12} fill="var(--muted)">
            Somando os restos em fila (cada linha tem 50):
          </text>
          {wrapped.map((seg, k) => (
            <rect
              key={k}
              x={seg.x * u}
              y={228 + seg.row * 36}
              width={Math.max(seg.w * u - 1, 0)}
              height={30}
              fill="var(--clay)"
              opacity={1 - seg.i * 0.2}
            />
          ))}
          <text x={W + 8} y={248 + lastRow * 36} fontSize={13} fontFamily="var(--font-geist-mono)" fill="var(--clay)">
            = {remSum}
          </text>
        </svg>
        <div className="mt-2 flex gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-sm bg-gold" /> pago nesta parcela
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-sm bg-clay" /> ainda devendo
          </span>
        </div>
      </Panel>

      <Panel>
        <div className="space-y-3">
          {first.map((v, i) => (
            <Slider key={i} label={`Parcela ${i + 1}`} value={v} min={0} max={TOTAL} onChange={(x) => setAt(i, x)} />
          ))}
          <p className="text-sm text-muted">Parcela 4: o que falta ({payments[3]})</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Stat label="Soma dos pagamentos" value={50} tone="var(--gold)" />
          <Stat label="Soma dos restos" value={remSum} tone="var(--clay)" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => setFirst([20, 15, 9])}>
            Do livro
          </Button>
          <Button variant="ghost" onClick={() => setFirst([47, 1, 1])}>
            Paga quase tudo
          </Button>
          <Button variant="ghost" onClick={() => setFirst([1, 1, 1])}>
            Deixa pro fim
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted">
          Pague quase tudo de uma vez e os restos somam pouco; deixe para o fim e passam de 140. A soma do restante
          nunca teve obrigação de dar 50.
        </p>
      </Panel>
    </div>
  );
}
