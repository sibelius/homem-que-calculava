"use client";

import { useState } from "react";
import { Button, Panel } from "@/components/ui";
import { EXPRESSIONS, countFours, evaluate, usesOnlyFours } from "@/lib/fours";

function Highlighted({ expr }: { expr: string }) {
  return (
    <span>
      {expr.split("").map((ch, i) =>
        ch === "4" ? (
          <span key={i} className="text-gold">
            4
          </span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </span>
  );
}

const KEYS = ["4", "+", "−", "×", "÷", "√", "!", "^", ".", "(", ")"];

export default function Fours() {
  const [sel, setSel] = useState(7);
  const [draft, setDraft] = useState("4 + 4 − 4 ÷ 4");

  const expr = EXPRESSIONS[sel];
  const value = evaluate(draft);
  const fours = countFours(draft);
  const valid = value !== null && fours === 4 && usesOnlyFours(draft);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <Panel>
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 101 }, (_, n) => {
            const has = n in EXPRESSIONS;
            return (
              <button
                key={n}
                type="button"
                disabled={!has}
                onClick={() => setSel(n)}
                className="aspect-square rounded-md font-mono text-xs transition sm:text-sm"
                style={{
                  background: n === sel ? "var(--gold)" : has ? "var(--surface-2)" : "transparent",
                  color: n === sel ? "var(--bg)" : has ? "var(--ink)" : "var(--line)",
                  cursor: has ? "pointer" : "default",
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-xl border border-line bg-bg p-4 text-center">
          <div className="font-mono text-2xl sm:text-3xl">
            <Highlighted expr={expr} /> <span className="text-muted">=</span> {sel}
          </div>
          <div className="mt-2 flex justify-center gap-2">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i} className="pop inline-block size-3 rounded-full bg-gold" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">
          Os números em destaque têm uma expressão aqui. Os apagados também podem ser escritos com quatro quatros:
          fica de desafio.
        </p>
      </Panel>

      <Panel>
        <h3 className="font-display text-lg">Sua vez</h3>
        <p className="mb-3 text-sm text-muted">Monte uma expressão com exatamente quatro algarismos 4.</p>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full rounded-lg border border-line bg-bg px-3 py-2 font-mono text-lg outline-none focus:border-gold"
          spellCheck={false}
        />
        <div className="mt-2 flex flex-wrap gap-1">
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setDraft((d) => d + k)}
              className="min-w-9 rounded-md border border-line px-2 py-1 font-mono hover:bg-surface-2"
            >
              {k}
            </button>
          ))}
          <Button variant="ghost" onClick={() => setDraft((d) => d.slice(0, -1))}>
            ⌫
          </Button>
          <Button variant="ghost" onClick={() => setDraft("")}>
            Limpar
          </Button>
        </div>
        <div className="mt-4 rounded-xl border border-line bg-bg p-4">
          <div className="font-mono text-3xl">
            = {value === null ? "?" : Number.isInteger(value) ? value : value.toFixed(4).replace(".", ",")}
          </div>
          <div className="mt-1 text-sm" style={{ color: valid ? "var(--good)" : "var(--muted)" }}>
            {!usesOnlyFours(draft)
              ? "Só vale o algarismo 4."
              : fours !== 4
                ? `Você usou ${fours} quatro${fours === 1 ? "" : "s"}.`
                : value === null
                  ? "Expressão incompleta."
                  : Number.isInteger(value)
                    ? "Quatro quatros ✓"
                    : "Quatro quatros ✓ (mas não deu inteiro)"}
          </div>
        </div>
      </Panel>
    </div>
  );
}
